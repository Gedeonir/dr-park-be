// @ts-nocheck
const  Role =require ("../../models/role");
const  User  = require("../../models/user");
const jwt = require("jsonwebtoken");
const PassGenerator = require("generate-password");
const sendEmail = require("../utils/Email");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { generateToken } = require("./../utils/GenerateToken");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const signToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const resetToken = (uuid) => {
  return jwt.sign({ uuid }, process.env.RESET_PASSWORD_SECRETE, {
    expiresIn: process.env.RESET_LINK_EXPERES_IN,
  });
};

const register = async (req, res) => {
  try {

    const {
      name,
      gender,
      district,
      sector,
      province,
      email,
      telNumber,
      password
    } = req.body;

    const hashedPass = await bcrypt.hash(password, 12);

    const userEmailExist = await User.findOne({
      where: { email },
    });

    if (userEmailExist) {
      return res.status(403).json({
        message: `${email} already exists`,
      });
    }
    const ACTIVATE_TOKEN = generateToken()

    const newUser = await User.create({
      name,
      gender,
      district,
      sector,
      province,
      email,
      telNumber,
      password: hashedPass,
      accountActivationToken:ACTIVATE_TOKEN
    });

    const URL = `https://localhost:${process.env.PORT}/activateAccount/${ACTIVATE_TOKEN}`;
    const message = `
    Dear ${newUser.name},
    Congratulations, you are most welcome to Dr-park app. please use the link to verify your account:${URL}, your username and password are the following: username:${newUser.email}, Password:${password}.
    `;
    await sendEmail({
      email: newUser.email,
      subject: "Verify your account.",
      message,
    });

    res.status(201).json({
      message:"User created successfully,Check you email to verify your account",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:"User account creation failed",
      error: error.message,
    });
  }
};

const activateAccount=async(req,res)=>{

  try {
    /**
     * Activate your account
     */
    const Token = req.params.token;

    if (!Token) {
      return res.status(401).json({
        message: "No activation Token provided",
      });
    }

    /**
     * Check if user belongs to token exist in our database
     */

    const user = await User.findOne({
      where: { accountActivationToken: Token },
    });

    if (!user) {
      return res.status(401).json({
        message: "The User belongs to this token doesn't exist",
      });
    }
    user.active = true;
    user.accountActivationToken = "";
    await user.save();

    /**
     * Sending Result message to user.
     */

    res.status(200).json({
      message: "Your Account has been activated successfully 👍🏾",
    });
  } catch (error) {
    res.status(401).json({
      message: "Something Went wrong!",
      err: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message:"Email and password must not be empty",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message:"Invalid email or password",
      });
    }

    const token = signToken(user.uuid);
    res.status(200).json({
      message: `You are logged in as ${user.name}`,
      token,
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(401).json({
      message: "Login failed",
      err: error.stack,
      errorMessage: error,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    //1) Get user based on posted email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "There is no user with that email address",
      });
    }

    //2) Generate random reset token

    const Token = generateToken();

    user.passwordResetToken = Token;
    await user.save();

    //3)Send it to user's email
    const resetURL = `http://localhost:${process.env.PORT}/resertpasswordpage/${Token}`;

    const message = `Forgot your password! please click here:${resetURL}. to reset your password.\n If you didn't forget your password please ignore this email.`;

    //3) send email

    await sendEmail({
      email: user.email,
      subject: "Your password Reset Token (valid for 10 min )",
      message,
    });
    res.status(200).json({
      message: "Token sent to email",
      token: Token,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Error while sending the email please try again after some times",
      err: error.stack,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    /**
     * Get New Password
     * Get reset Token
     */

    const { password } = req.body;
    const Token = req.params.token;

    if (!password || !Token) {
      return res.status(401).json({
        message: "Please check whether Password or Token are provided",
      });
    }

    /**
     * Check if user belongs to token exist in our database
     */

    const user = await User.findOne({
      where: { passwordResetToken: Token },
    });

    if (!user) {
      return res.status(401).json({
        message: "The User belongs to this token does'nt exist",
      });
    }

    /**
     * update User Password
     */

    const hashedPass = await bcrypt.hash(password, 12);

    user.password = hashedPass;
    user.passwordResetToken = "";
    await user.save();

    /**
     * Sending Result message to user.
     */

    res.status(200).json({
      message: "Your password has been updated successfully 👍🏾",
    });
  } catch (error) {
    res.status(401).json({
      message: "Something Went very wrong",
      err: error,
    });
  }
};

const changePassword = async (req, res) => {
  //1.Get token for logged in

  const token = req.headers.authorization.split(" ")[1];

  //3.get user from token by uuid

  const decoded = jwt.verify(token, process.env.JWT_SECRETE);
  const uuid = decoded.uuid;
  const user = await User.findOne({
    where: { uuid: uuid },
  });
  //4.get password from reques body
  const { oldpassword, newpassword1, newpassword2 } = req.body;

  //5. Check passwords
  const password = await bcrypt.compare(oldpassword, user.password);
  if (!password) {
    return res
      .status(401)
      .json({ message: "The old password is wrong, correct it and try again" });
  }
  if (newpassword1 !== newpassword2) {
    return res.status(401).json({ message: "new password does not match" });
  }

  //6.hash password
  const hashedPass = await bcrypt.hash(newpassword1, 12);

  //update pass
  user.password = hashedPass;
  await user.save();

  res.status(200).json({ message: "your password is updated successfully" });
};

module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  activateAccount
};