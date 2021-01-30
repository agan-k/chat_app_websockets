const multer = require('multer')
const fs = require('fs')
const path = require('path')


const getFileType = (file) => {
  const mimeType = file.mimetype.split('/')
  return mimeType[mimeType.length - 1]
}

const generateFileName = (req, file, cb) => {
  const extension = getFileType(file)
  
  // Here we are creating a unique and random file name and add the extension
  // 1E9 is a short notation for 1 billion
  const filename = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.' + extension
  
  cb(null, file.fieldname + '-' + filename)
}

const fileFilter = (req, file, cb) => {
  const extension = getFileType(file)
  
  // using regex to evaluate the allowed extensions
    const allowedTypes = /jpeg|jpg|png/
    
    const passed = allowedTypes.test(extension)

    if (passed) {
      return cb(null, true)
    }
    // this is how multer expects it to be returned
    return cb(null, false)
}
  
  exports.userFile = ((req, res, next) => {

  const storage = multer.diskStorage({
    // we're going to store the files in their own subdirectory inside the uploads tab
    destination: function (req, file, cb) {
      const { id } = req.user
      const dest = `uploads/user/${id}`

      // the fs module allows us to create different methods on our files
      fs.access(dest, (error) => {
        if (error) {
          // if the file doesn't exist
          return fs.mkdir(dest, (error) => {
            cb(error, dest)
          })
        } else {
          // it doesn't exist - we need to delete the current avatar since a user can only have one at a time
          fs.readdir(dest, (error, files) => {
            if (error) throw error

            for (const file of files) {
              fs.unlink(path.join(dest, file), error => {
                if (error) throw error
              })
            }
          })
          // typical cb structure - first parameter is the error and the second is the response
          return cb(null, dest)
        }
      })
    },
    filename: generateFileName
  })

  return multer({storage, fileFilter}).single('avatar')

  })()

exports.chatFile = ((req, res, nex) => {
  const storage = multer.diskStorage({
    // we're going to store the files in their own subdirectory inside the uploads tab
    destination: function (req, file, cb) {
      const { id } = req.body
      const dest = `uploads/chat/${id}`

      // the fs module allows us to create different methods on our files
      fs.access(dest, (error) => {
        if (error) {
          // if the file doesn't exist
          return fs.mkdir(dest, (error) => {
            cb(error, dest)
          })
        } else {
          return cb(null, dest)
        }
      })
    },
    filename: generateFileName
  })

  return multer({storage, fileFilter}).single('image')
  })()