const multer = require("multer");

// Configure Memory Storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
