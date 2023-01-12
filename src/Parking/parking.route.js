const express = require("express");

const{ getAllParkings,createParking,getOneParking,updateParking,deleteParking,getParkingsByLocation } =require( "./parking.controllers")
const { createParkingSlot,deleteSlot,getAllParkingSlots,getOneParkingSlot, updateParkingSlot } = require ("../ParkingSlots/parkingSlots.controllers");

const router = express.Router();

router.get("/",getAllParkings)
router.post("/register-new-parking",createParking);
router.route("/:uuid").get(getOneParking).patch(updateParking).delete(deleteParking)
router.route("/:uuid/slots").post(createParkingSlot).get(getAllParkingSlots)
router.route("/slots/:uuid").get(getOneParkingSlot).patch(updateParkingSlot).delete(deleteSlot)
router.route('/findByLocation/:location').get(getParkingsByLocation)

module.exports = router