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

        const slotExists = await ParkingSlot.findOne({where:{slotCode}})
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
        console.log(error);
    }
}

const getAllParkingSlots = async (req, res) => {
    try {
      const parkingSlots = await ParkingSlot.findAndCountAll();
      res.status(200).json({
        result: parkingSlots.length,
        data: {
          parkings: parkingSlots,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:"Unable to get parking slots",
        err: error.message,
      });
    }
};

module.exports={createParkingSlot,getAllParkingSlots};