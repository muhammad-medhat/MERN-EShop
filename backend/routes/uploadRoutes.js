import path from "path";
import express from "express";
import multer from "multer";
import { nextTick } from "process";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  // console.log('checkFileType', file);
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
const uploads = multer({
  dest: "uploads",
});

// router.post('/',upload.single('image'), (req, res)=>{

//   res.send(upload)
// })
// Multipart: Boundary not found

router.post("/", upload.single("image"), (req, res, next) => {
  //passing upload middleware
  console.log("uploding...");
  // console.log(".body", req.body);
  // console.log(".file", req.file);
  // res.json(upload)
  const file = req.file;
  if (!file) {
    console.log("ffffffffff", file);
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  //res.send(file);

  console.log("rrrrrrrrrrrrrrrr", `/${req.file.path}`);
  res.send(`/${req.file.path}`);
});

export default router;
