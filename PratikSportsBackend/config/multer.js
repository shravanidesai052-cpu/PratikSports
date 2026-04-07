import multer from "multer";//it is middleware for handling multipart/form-data, which is primarily used for uploading files. It makes it easy to handle file uploads in Node.js applications, allowing you to specify where and how the uploaded files should be stored.
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;