// @ts-nocheck
const { Role } = require("../../models");

const createRole = async (req, res) => {
  try {
    const { roleName } = req.body;

    if (!roleName) {
      return res.status(403).json({
        message: "Please Provide a Role Name",
      });
    }

    const role = await Role.findOne({ where: { roleName } });

    if (role) {
      return res.status(403).json({
        message: `${roleName} role already exists`,
      });
    }

    const newRole = await Role.create({
      roleName,
    });

    res.status(201).json({
      message: `${roleName} role created succesfully`,
      data: {
        role: newRole,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:`Creating role failed!`,
      err: error,
    });
  }
};

const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAndCountAll();

    res.status(200).json({
      result: roles.length,
      data: {
        roles,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Fetching roles failed!",
      err: error.stack,
    });
  }
};

const getRole = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const role = await Role.findOne({
      where: { uuid },
      include: ["user"],
    });
    res.status(200).json({
      data: {
        role,
      },
    });
  } catch (error) {
    res.status(404).json({
      message:"No user found",
      Error: error.stack,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const uuid = req.params.uuid;
    const { roleName } = req.body;

    const role = await Role.findOne({ where: { uuid } });
    role.roleName = roleName;

    await role.save();

    res.status(200).json({
      message: "Role updated succesfully",
      data: {
        role,
      },
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to update role",
      Error: error.stack,
    });
  }
};

const deleteRole = async (req, res) => {
  try {
    const uuid = req.params.uuid;

    const role = await Role.findOne({
      where: { uuid },
    });
    await role.destroy();

    res.status(200).json({
      message: "Role deleted succesfully"
    });
  } catch (error) {
    res.status(404).json({
      message: "Unable to delete role",
      Error: error.stack,
    });
  }
};

module.exports = { createRole, getAllRoles, getRole, updateRole, deleteRole };
