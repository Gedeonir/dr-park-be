const express = require("express");

import { createAssignment, getAllAssignments, unAssignSlot } from "./Assignments.controllers";

const router = express.Router();

router.get("/",getAllAssignments);
router.post("/slots/:uuid/assign",createAssignment)
router.put("/slots/:uuid/unAssign/:id",unAssignSlot)
module.exports=router;