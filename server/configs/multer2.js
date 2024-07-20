const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // Hoặc sử dụng diskStorage nếu bạn cần lưu tệp vào đĩa
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Cấu hình lọc tệp nếu cần
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // Ví dụ: 5MB tối đa
});

module.exports = upload;
