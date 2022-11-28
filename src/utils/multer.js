require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// module.exports = { cloudinary };
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "DEV",
      allowedFormats: ['jpeg', 'png', 'jpg', 'mp3'],
    },
  
  });
const parser = multer({ storage: storage , onError : function(err, next) {
    console.log('error', err);
    next(err);
}, });
module.exports = {parser };