const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, File, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        cb (null, Date.now() + "-" + file.originalname);
    }

})

const UploadImage = multer({storage: storage});

module.exports = UploadImage;