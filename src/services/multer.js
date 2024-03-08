import multer from "multer";
export const multerValidation = {
  image: ["image/jpeg", "image/png", "image/jpg"], //handel type image
  pdf: ["image/jpeg", "image/png", "image/jpg", "application/pdf"],
};
//handel error
export const HME = (error, req, res, next) => {
  if (error) {
    return res.status(500).json({error:"multer",error})
  } else {
    next();
  }
};

export function myMulter(customvalidation) {
  const storage = multer.diskStorage({});
  function fileFilter(req, file, cb) {
    if (customvalidation.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb("invalid file type", false);
    }
  }
  const upload = multer({ dest: "upload", fileFilter, storage });
  return upload;
}
