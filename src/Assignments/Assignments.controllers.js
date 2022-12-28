const  Assignment  =require("../../models/assignments");
const  ParkingSlot  = require("../../models/parkingSlot");

const getAllAssignments = async(req,res)=>{
    try {
        const assignments = await Assignment.find();
        res.status(200).json({
          result: assignments.length,
          data: {
            assignments: assignments,
          },
        });
      } catch (error) {
        res.status(500).json({
          message:"Unable to get parkings assignments",
          err: error.message,
        });
      }
}

const createAssignment = async(req,res)=>{
    try {
        // const {vehiclePlateNumber} = req.body;
        const sensorID = req.params.sensor;
        
        const slotAssigned = await ParkingSlot.findOne({sensor:sensorID})

        if (!slotAssigned) {
          return res.status(403).json({
            message:`Slot with ${sensorID} not found`
          })
        }

        if (slotAssigned.status != 'Available') {
          return res.status(403).json({
            message:"The parking slot is not available right now"
          })
        }
        // const newAssignment = await Assignment.create({
        //     parking:slotExists.parking,
        //     parkingName:slotExists.parkingName,
        //     slotId:slotExists._id,
        //     Slot:slotExists.slotCode,
        //     vehiclePlateNumber:"RAB 007 C",
        //     parkedAt:Date.now(),

        // })

        slotAssigned.status = "Not available"
        slotAssigned.save();

        res.status(201).json({
            message:`Parking slot ${slotAssigned.slotCode} is assigned`,
          });


    } catch (error) {
        res.status(500).json({
            message:"Unable to assign slot",
            error: error.message,
          });
    }
}

const unAssignSlot = async(req,res)=>{
    try {
        // const uuid = req.params.uuid;
        // const id = req.params.id;
        // const assignment = await Assignment.findOne({_id:id});
        // assignment.leftAt = Date.now();
        // await assignment.save();
        const sensorID = req.params.sensor;
        
        const slotAssigned = await ParkingSlot.findOne({sensor:sensorID})
        slotAssigned.status= "Available";
        await slotAssigned.save();
        res.status(200).json({
            message:"Slot unAssigned sucessfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Unable to unAssign slot",
            error:error.message
        })
    }
   

}

module.exports = {createAssignment,getAllAssignments,unAssignSlot}