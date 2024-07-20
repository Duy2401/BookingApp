const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // Or diskStorage if needed
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Optional file filter logic
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size (5MB in this example)
});

module.exports = upload;
