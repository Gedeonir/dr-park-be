import { Parking } from "../../models/parking";

const createParking = async(req,res)=>{
    try {
        const{parkingName,district,sector,province,location}=req.body;

        if (!parkingName||!district||!sector||!province||!location) {
            return res.status(403).json({
                message: "All fields are required",
              });
        }

        const parkingExists = await Parking.findOne({parkingName:parkingName});

        if (parkingExists) {
            return res.status(403).json({
                message: `${parkingName} already exists`,
              });
        }

        const newParking = await Parking.create({
            parkingName,
            district,
            sector,
            province,
            location
        })

        res.status(201).json({
            message:`Parking ${parkingName} created successfully`,
            data: {
              parking:newParking,
            },
          });
    } catch (error) {
        res.status(500).json({
            message:"Parking creation failed",
            error: error.message,
          });
    }
}

const getAllParkings = async (req, res) => {
    try {
      const parkings = await Parking.find();
      res.status(200).json({
        result: parkings.length,
        data: {
          parkings: parkings,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:"Unable to get parkings",
        err: error.message,
      });
    }
};

const getOneParking =async(req,res)=>{
    try {
        const uuid =req.params.uuid;

        const oneParking = await Parking.findOne({_id:uuid});
        res.status(200).json({
            data:{
                oneParking
            }
        })
    } catch (error) {
        res.status(404).json({
            message:"No parking found!",
            error:error.message
        })
    }
}

const updateParking =async (req,res)=>{
    try {
        const uuid = req.params.uuid;
        const{parkingName,district,sector,province,location}=req.body;

        if (!parkingName||!district||!sector||!province||!location) {
            return res.status(403).json({
                message: "All fields are required",
              });
        }

        const parking = await Parking.findOne({_id:uuid});
        if (!parking) {
            return res.status(403).json({
                message:"No parking found!",
            })
        }

        parking.parkingName = parkingName;
        parking.district = district;
        parking.sector = sector;
        parking.province = province;
        parking.location = location;

        await parking.save();

        res.status(200).json({
            message:"Parking updated sucessfully!",
            data:{
                parking
            }
        })

    } catch (error) {
        res.status(404).json({
            message:"Unable to update parking!",
            error:error.message
        })
    }
}

const deleteParking = async(req,res)=>{
    try {
        const uuid = req.params.uuid;

        const parking = await Parking.findOne({_id:uuid});

        await parking.destroy();
        res.status(200).json({
            message:"Parking deleted succesfully"
        })
    } catch (error) {
        res.status(404).json({
            message:"Unable to delete parking",
            error:error.message
        })
    }
}    

  

module.exports={createParking,getAllParkings,getOneParking,updateParking,deleteParking};