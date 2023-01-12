import { Assignment } from "../../models/assignments";
import { ParkingSlot } from "../../models/parkingSlot";

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
        const {vehiclePlateNumber} = req.body;
        const uuid = req.params.uuid;
        
        const slotExists = await ParkingSlot.findOne({_id:uuid})
        if (slotExists.status != 'Available') {
            return res.status(403).json({
                message:"The parking is not available"
            })
        }
        const newAssignment = await Assignment.create({
            parking:slotExists.parking,
            parkingName:slotExists.parkingName,
            slotId:slotExists._id,
            Slot:slotExists.slotCode,
            vehiclePlateNumber:"RAB 007 C",
            parkedAt:Date.now(),

        })

        slotExists.status = "Not available"
        slotExists.save();

        res.status(201).json({
            message:`Parking slot ${slotExists.slotCode} assigned to ${vehiclePlateNumber}`,
            data: {
              assignment:newAssignment,
            },
          });

          await parking.slotOccupied++
          await parking.slotAvailable--
          await parking.save()


    } catch (error) {
        res.status(500).json({
            message:"Unable to assign slot",
            error: error.message,
          });
    }
}

const unAssignSlot = async(req,res)=>{
    try {
        const uuid = req.params.uuid;
        const id = req.params.id;
        const assignment = await Assignment.findOne({_id:id});
        assignment.leftAt = Date.now();
        await assignment.save();
        const slotExists = await ParkingSlot.findOne({_id:uuid});
        slotExists.status= "Available";
        await slotExists.save();
        res.status(200).json({
            message:"Slot unAssigned sucessfully"
        })

        await parking.slotOccupied--
        await parking.slotAvailable++
        await parking.save()
    } catch (error) {
        res.status(500).json({
            message:"Unable to unAssign slot",
            error:error.message
        })
    }
   

}

module.exports = {createAssignment,getAllAssignments,unAssignSlot}