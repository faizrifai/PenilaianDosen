import multer from "multer";

export const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

export var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "resources/uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-Rize-${file.originalname}`);
  },
});

export var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
