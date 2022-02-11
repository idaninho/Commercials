import express from 'express'
import path from 'path'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  //we want to make sure that the file uploaded is only an image
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  //extansion name, type of file.
  const mimetype = filetypes.test(file.mimetype)
  //only we both of them are true, continue
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('images only!')
    //error
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})
export default router
