const express = require("express");

const { createAssignment, getAllAssignments, unAssignSlot } = require("./Assignments.controllers");

const router = express.Router();

router.get("/",getAllAssignments);
router.put("/slots/:sensor/assign",createAssignment)
router.put("/slots/:sensor/unAssign",unAssignSlot)
module.exports=router;