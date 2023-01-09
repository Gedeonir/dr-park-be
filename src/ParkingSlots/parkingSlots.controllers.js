const  Parking  = require("../../models/parking");
const  ParkingSlot =require("../../models/parkingSlot");
const createParkingSlot=async(req,res)=>{
  try {
    const uuid= req.params.uuid;

    const {slotCode,slotSize,sensor} = req.body;
    const parking = await Parking.findOne({_id:uuid});

    if (!parking) {
        return res.status(404).json({
          parkingNotExistsMessage:"Parking not Found"
        })
    }

    const slotExists = await ParkingSlot.findOne({slotCode:slotCode,parkingName:parking.parkingName})
    if (slotExists) {
        return res.status(409).json({
          slotExistsMessage:`${parking.parkingName} already has slot ${slotCode}`
        })
    }

    const sensorExist = await ParkingSlot.findOne({sensor:sensor,parkingName:parking.parkingName})

    if (sensorExist) {
      return res.status(409).json({
        sensorExistsMessage:`${sensor} already has been already assigned to slot`
      })
    }

    const newParkingSlot = await ParkingSlot.create({
        slotCode,
        slotSize,
        parking:parking._id,
        parkingName:parking.parkingName,
        sensor
    })

    res.status(201).json({
      message:`Parking slot ${slotCode} created successfully`,
      data: {
        parking:newParkingSlot,
      },
    });


  } catch (error) {
    res.status(500).json({
      message:"Parking slot creation failed",
      error: error.message,
    });
  }
}

const getAllParkingSlots = async (req, res) => {
  const uuid= req.params.uuid;

  try {
    const parkingSlots = await ParkingSlot.find({parking:uuid});
    if (!parkingSlots) {
      return res.status(404).json({
        message:"Parking has no slots"
      })
    }
    res.status(200).json({
      result: parkingSlots.length,
      data: {
        parkingSlots: parkingSlots,
      },
    });
  } catch (error) {
    res.status(500).json({
      message:"Unable to get parking slots",
      err: error.message,
    });
  }
};

const getOneParkingSlot = async(req,res)=>{
  try {
    const uuid = req.params.uuid;

    const slot = await ParkingSlot.findOne({_id:uuid})
    res.status(200).json({
      data:slot
    })
  } catch (error) {
    res.status(404).json({
      message:'No parking slot found',
      error:error.message
    })
  }
}

const updateParkingSlot = async(req,res)=>{
  try {
    const uuid = req.params.uuid;

    const {slotCode,slotSize,status} = req.body;

    const slot = await ParkingSlot.findOne({_id:uuid});
    if (!slot) {
      return res.status(404).json({
        message:"Parking slot not found!"
      })
    }

    const DuplicateSlot = await ParkingSlot.findOne({slotCode:slotCode,parkingName:slot.parkingName})
    if (DuplicateSlot) {
      return res.status(403).json({
        message:`${slot.parkingName} already has slot ${slotCode}`
      })
    }

    slot.slotCode = slotCode;
    slot.slotSize = slotSize;
    slot.status = status;

    await slot.save();

    res.status(200).json({
      message: "Parking slot updated succesfully",
      data: {
        slot,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to update parking slot",
      Error: error.stack,
    });
  }
}

const deleteSlot = async(req,res)=>{
  try {
    const uuid = req.params.uuid;

    const slot = await ParkingSlot.findByIdAndRemove({_id:uuid});

    res.status(200).json({
      message:"Parking slot deleted successfully"
    })
  } catch (error) {
    res.status(404).json({
      message:"Unable to delete parking slot",
      error:error.message
    })
  }
  
}

module.exports={createParkingSlot,getAllParkingSlots,getOneParkingSlot,updateParkingSlot,deleteSlot};