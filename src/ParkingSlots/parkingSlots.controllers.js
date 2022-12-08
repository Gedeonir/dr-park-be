const {Parking,ParkingSlot}=require('../../models');

const createParkingSlot=async(req,res)=>{
  try {
    const uuid= req.params.uuid;

    const {slotCode,slotSize} = req.body;
    const parking = await Parking.findOne({where:{uuid}});

    if (!parking) {
        return res.status(404).json({
            message:"Parking not Found"
        })
    }

    const slotExists = await ParkingSlot.findOne({where:{slotCode:slotCode,parkingName:parking.parkingName}})
    if (slotExists) {
        return res.status(403).json({
            message:`${parking.parkingName} already has slot ${slotCode}`
        })
    }

    const newParkingSlot = await ParkingSlot.create({
        slotCode,
        slotSize,
        parking:parking.uuid,
        parkingName:parking.parkingName
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
    try {
      const parkingSlots = await ParkingSlot.findAndCountAll();
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

    const slot = await ParkingSlot.findOne({where:{uuid}})
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

    const slot = await ParkingSlot.findOne({where:{uuid}});
    if (!slot) {
      return res.status(404).json({
        message:"Parking slot not found!"
      })
    }

    const DuplicateSlot = await ParkingSlot.findOne({where:{slotCode:slotCode,parkingName:slot.parkingName}})
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

    const slot = await ParkingSlot.findOne({where:{uuid}});
    await slot.destroy();
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