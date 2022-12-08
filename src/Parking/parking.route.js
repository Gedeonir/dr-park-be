const express = require("express");

import { getAllParkings,createParking,getOneParking,updateParking,deleteParking } from "./parking.controllers";

import { createParkingSlot,deleteSlot,getAllParkingSlots,getOneParkingSlot, updateParkingSlot } from "../ParkingSlots/parkingSlots.controllers";

const router = express.Router();

router.get("/",getAllParkings)
router.post("/register-new-parking",createParking);
router.route("/:uuid").get(getOneParking).patch(updateParking).delete(deleteParking)
router.route("/:uuid/slots").post(createParkingSlot).get(getAllParkingSlots)
router.route("/slots/:uuid").get(getOneParkingSlot).patch(updateParkingSlot).delete(deleteSlot)

module.exports = router