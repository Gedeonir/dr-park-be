const Parking = require("../../models/parking");
const ParkingSlot = require("../../models/parkingSlot");
const Booking = require("../../models/bookings")
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/Email");
const emitter = require("../utils/Emitter");


const createParking = async(req,res)=>{
    try {
        const{parkingName,district,sector,province,location,prices}=req.body;

        if (!parkingName||!district||!sector||!province||!location||!prices) {
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
            location,
            prices
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
      const parkings = await Parking.find({});
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

        const parking = await Parking.findByIdAndRemove({_id:uuid});

        const parkingSlots = await ParkingSlot.deleteMany({parking:uuid}).populate("parking");

        res.status(200).json({
            message:"Parking deleted succesfully",
            parkingSlots
        })
    } catch (error) {
        res.status(404).json({
            message:"Unable to delete parking",
            error:error.message
        })
    }
}    


const getParkingsByLocation=async(req,res)=>{
    try {
        const {wordEntered,filterColumn} = req.body
        let usedAttribute;
        const parkings = await Parking.find({});

        if(wordEntered && !filterColumn){
            const parkingResults = parkings.filter((value)=>{
                return(
                    value.location.toString().toLowerCase().includes(wordEntered.toString().toLowerCase())||
                    value.parkingName.toString().toLowerCase().includes(wordEntered.toString().toLowerCase())||
                    value.district.toString().toLowerCase().includes(wordEntered.toString().toLowerCase())||
                    value.sector.toString().toLowerCase().includes(wordEntered.toString().toLowerCase())||
                    value.province.toString().toLowerCase().includes(wordEntered.toString().toLowerCase())
                )
            })
            return res.status(200).json({
                parkings:parkingResults
            })
        }

        if (wordEntered && filterColumn) {
            const parkingResults = parkings.filter(
              (value) => {
                let arr = Object.keys(value._id.toJSON());
                let arr1 = Object.keys(value.toJSON());
    
                let allKeys= arr.concat(arr1);

    
                for (let i = 0; i < allKeys.length; i++) {
                  if (allKeys[i].toLowerCase() == filterColumn.toLowerCase()) {
                    usedAttribute = allKeys[i];
                  }
                }
    
                if (arr.includes(usedAttribute)) {
                  return value._id[usedAttribute]
                    .toString()
                    .toLowerCase()
                    .includes(wordEntered.toString().toLowerCase());
                } else if (arr1.includes(usedAttribute)) {
                  return value[usedAttribute]
                    .toString()
                    .toLowerCase()
                    .includes(wordEntered.toString().toLowerCase());
                } else {
                  return [];
                }
              }
            );
            return res.status(200).json({
                parkings:parkingResults
            })
          }

        return res.status(200).json({
            parkings
        })
    } catch (error) {
        res.status(404).json({
            message:"Error occured",
            error:error.message
        })
    }
}

const bookParking = async(req,res)=>{
    const uuid=req.params.uuid
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    const {checkInTime,Date,checkOutTime,phoneNumber,vehiclePlateNumber} =  req.body
    try {
        const findBooking = await Booking.findOne({email:decoded.email,status:'pending'})

        if(findBooking){
            return res.status(404).json({
                message:"You still have booking in progress"
            })
        }

        const oneParking = await Parking.findOne({_id:uuid});


        if (!oneParking) {
            return res.status(404).json({
                message:"No parking found!"
            })
        }

        const slot = await ParkingSlot.findOne({parking:oneParking._id,status:'Available'});

        console.log(slot)

        if(!slot){
            return res.status(404).json({
                message:"Parking have no available slots!"
            })
        }

        const booking = await Booking.create({
            parking:oneParking._id,
            parkingName:oneParking.parkingName,
            slotId:slot._id,
            slot:slot.slotCode,
            vehiclePlateNumber,
            email:decoded.email,
            names:decoded.name,
            Date,
            checkOutTime,
            phoneNumber
        })


        const message = `
            Dear ${decoded.name},
                You booked parking from ${checkInDate},${checkInTime} to ${checkOutDate},${checkOutTime}
            `;
            await sendEmail({
            email: decoded.email,
            subject: "Booking details information.",
            message,
            });

            const notificationBody = {
                title:"Booking",
                content:`You have Booked Slot ${slot.slotCode} from ${oneParking.parkingName}`
              };
              user.roleName = role.roleName;
              user.roleId = role._id;
              await user.save();
              const notification = await Notification.create({
                booking:booking._id,
                title:notificationBody.title,
                content:notificationBody.content,
                receiverID:user._id,
                receiver:user.email
              });
      
              emitter.emit("notification request", notification);

        return res.status(200).json({
            message:`you have Booked Slot ${slot.slotCode} from ${oneParking.parkingName}`,
            data:{
                booking
            }
        })
        
    } catch (error) {
        res.status(500).json({
            message:"Error occured",
            error:error.message
        })
    }
}


const getAllBookings = async (req, res) => {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);
    try {
      const bookings = await Booking.find({email:decoded.email});
      res.status(200).json({
        result: bookings.length,
        data: {
          bookings: bookings,
        },
      });
    } catch (error) {
      res.status(500).json({
        message:"Unable to get bookings",
        err: error.message,
      });
    }
};

const getOneBooking =async(req,res)=>{
    try {
        const uuid =req.params.uuid;

        const oneBooking = await Booking.findOne({_id:uuid});
        res.status(200).json({
            data:{
                oneBooking
            }
        })
    } catch (error) {
        res.status(404).json({
            message:"No parking found!",
            error:error.message
        })
    }
}
  

module.exports={createParking,getAllParkings,getOneParking,updateParking,deleteParking,getParkingsByLocation,bookParking,getAllBookings,getOneBooking};