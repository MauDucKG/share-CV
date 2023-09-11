const cvModel = require("./cv.model")
const multer = require("multer")

// Cấu hình lưu trữ tệp tin
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/") // Thay đổi đường dẫn tới thư mục lưu trữ tệp tin nếu cần thiết
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

// Kiểm tra loại tệp tin và kích thước
const fileFilter = (req, file, cb) => {
  if (file.mimetype !== "application/pdf") {
    cb(new Error("Only PDF files are allowed!"), false)
  } else {
    cb(null, true)
  }
}

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn kích thước tệp tin là 5MB
  },
  fileFilter,
})

class cvController {
  getAllcv(request, respond) {
    cvModel
      .find()
      .exec()
      .then((cvs) => {
        respond.status(200).json({
          success: true,
          message: "Done!",
          cvs: cvs,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  newcv = async function (req, res) {
    const {
      date,
      type,
      slug,
      tags,
      category,
      summary,
      title,
      status,
      createdTime,
      fullWidth,
      experience,
      workstatus,
    } = req.body

    // Truyền tệp tin được gửi lên thông qua middleware multer
    upload.single("file")(req, res, async (err) => {
      if (err) {
        if (err.message === "File too large") {
          return res.status(400).send("File size exceeds the limit of 5MB!")
        }
        return res.status(400).send(err.message)
      }

      const cv = new cvModel({
        date,
        type,
        slug,
        tags,
        category,
        summary,
        title,
        status,
        createdTime,
        fullWidth,
        experience,
        workstatus,
        file: req.file, // Lưu trữ thông tin tệp tin trong trường "file"
      })

      try {
        await cv.save()
        res.status(200).send("New CV created!")
      } catch (error) {
        res.status(500).send(error)
      }
    })
  }

  deleteCv = async function (req, res) {
    const cvId = req.params.id
    try {
      const deletedCv = await cvModel.findByIdAndRemove(cvId)
      if (!deletedCv) {
        return res.status(404).send("CV not found")
      }
      res.status(200).send("CV deleted!")
    } catch (error) {
      res.status(500).send(error)
    }
  }

  updateCv = async function (req, res) {
    const cvId = req.params.id
    const updateData = req.body
    try {
      const updatedCv = await cvModel.findByIdAndUpdate(cvId, updateData, {
        new: true,
      })
      if (!updatedCv) {
        return res.status(404).send("CV not found")
      }
      res.status(200).send("CV updated!")
    } catch (error) {
      res.status(500).send(error)
    }
  }
}

module.exports = new cvController()
