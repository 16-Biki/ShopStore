const multer = require("multer");

const storage = multer.memoryStorage();

module.exports = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024,
  },
});
