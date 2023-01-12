// @ts-nocheck
const { Role } =require("../../models/role");
const { User } =require("../../models/user");
const{ Notification } =require("../../models/notifications");
const jwt = require("jsonwebtoken");
const emitter = require("../utils/Emitter");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      result: users.length,
      data: {
        users: users,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:"Unable to get users",
      err: error.message,
    });
  }
};

const getUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      _id:uuid ,
      include: ["role"],
    });
    res.status(200).json({
      status:"success message",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "No user with that ID",
      Error: error.stack,
    });
  }
};

const changeRole = async (req, res) => {
  const uuid = req.params.uuid;
  const { roleName } = req.body;
  const role = await Role.findOne({where: {roleName}})

  if(!role){
    res.status(404).json({
      message: "Role does not exists",
    });
  }
  else{
    try {
      const user = await User.findOne({_id:uuid ,});
      if(user.roleName == roleName){
        res.status(403).json({
          message:`The user is already an ${roleName}`,
        });
      } 
      else{   
        const notificationBody = {
          title:"Role change",
          content:`Hey ${user.name} your role has been changed from ${user.roleName} to ${role.roleName}.Your role now is ${role.roleName}`
        };
        user.roleName = role.roleName;
        user.roleId = role._id;
        await user.save();
        const notification = await Notification.create({
          title:notificationBody.title,
          content:notificationBody.content,
          receiverID:user._id,
          receiver:user.email
        });

        emitter.emit("notification request", notification);

        res.status(200).json({
          status:"success status",
          message:"user role updated message",
          data: {
            user,
            notification,
          },
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "user wrong ID",
        Error: error.message,
      });
    }
  }
};

const allNotifications = async(req,res)=>{
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRETE);
  const uuid = decoded.uuid;
  try {
    const user = await User.find()
    if(!user){
      return res.status(404).json({
        message:"No user with that ID found"
      });
    }
    const notifications = await Notification.find({_id:uuid}).sort({time:-1});
    res.status(200).json({
      status:'success status',
      count: notifications.length,
      data: {
        notifications: notifications,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail status",
      message: "try again message",
      err: error.stack,
    });
  }
}


const readNotification = async(req,res)=>{
  const notificationId = req.params.uuid;

  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRETE);
  const userId = decoded._id;
  
  try {
    const notification = await Notification.findOne({receiverID:userId,_id:notificationId});
    if (!notification) {
      return res.status(404).json({
        message:"Notification not found"
      });
    }
    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      status: 'success status',
      data: {
        notification: notification,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail status",
      message: "try again message",
      err: error.stack,
    });
  }
}

const deleteNotification = async(req,res)=>{
  const notificationId = req.params.uuid;

  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRETE);
  const userId = decoded.uuid;
  
  try {
    const notification = await Notification.findOne({receiverID:userId,_id:notificationId});
    if (!notification) {
      return res.status(404).json({
        message:"Notification not found"
      });
    }

    await notification.destroy();

    res.status(200).json({
      message:"Notification deleted",
    });
  } catch (error) {
    res.status(500).json({
      message:"try again message",
      err: error.stack,
    });
  }
}

const updateUser = async (req, res) => {
  const uuid = req.params.uuid;
  const {name,  profilePicture,idNumber,district,sector,cell,gender,email,permitId,telNumber,carplate,capacity,vehicletype,
  } = req.body;
  try {
    const user = await User.findOne({_id:uuid});

    user.name = name;
    user.profilePicture  = profilePicture;
    user.idNumber = idNumber;
    user.district = district;
    user.sector = sector;
    user.cell = cell;
    user.email = email;
    user.gender = gender;
    user.permitId = permitId;
    user.telNumber = telNumber;
    user.carplate = carplate;
    user.capacity = capacity;
    user.vehicletype = vehicletype;
    await user.save();

    res.status(200).json({
      status:"success status",
      message:"user update message",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(404).json({
      message:"user wrong ID",
      Error: error.stack,
    });
  }
};

const updateProfile = async (req, res,next) => {
  try {
    const { uuid } = req.params;
    const {name,  profilePicture,district,sector,cell,gender,email,telNumber
    } = req.body;
    const user = await User.findOne({_id:uuid});
    if (!user) {
      return res.status(404).json({message: "User Not Found"});
    }
    if (req.files) {
      const imageURIs = []; 
      const files = req.files; 
      for (const file of files) {
          const { path } = file;
          imageURIs.push(path);
      };
      user.profilePicture  = imageURIs;
      await user.save();
    

     
      return res.status(201).json({ user });
      
      }

      if (req.file && req.file.path) {
          const imageURIs = [];
          imageURIs.push(req.file.path);
          user.profilePicture = imageURIs; // add the single  
          await user.save();
          return res.status(201).json({ user });
      };
      if(!req.file && !req.files){
        return res.status(403).json({ message:"upload a file" });
      }
   
  
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "There was an error while updating",
      error: error.stack,
    });
  }
};

const deleteUser = async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({_id:uuid});

    await user.destroy();

    res.status(200).json({
      message:"User deleted succesfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
      Error: error.stack,
    });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  updateProfile,
  changeRole,
  allNotifications,
  deleteUser,
  readNotification,
  deleteNotification
};