const multer = require("multer");
const { BadRequestError } = require("./error-classes");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new BadRequestError("Please upload an image"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
