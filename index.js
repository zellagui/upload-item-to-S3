require('dotenv').config();

const express = require('express');
const multer = require('multer');
const {s3upload} = require("./s3cret");
const app = express();

app.use(express.static('public'))

// store file
const storage = multer.memoryStorage();

// Upload file
const upload = multer({storage, limits: {files : 1}});

//post function
app.post("/upload", upload.single("document"), async (req, res) => {
    try {
      const result = await s3upload(req.file)
      res.json({ status: "success" });
    } catch (err) {
      console.log(err);
    }
  });

// Error handeling - one restriction about number of file limited to 1
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_COUNT") {
            return res.json({message: 'file count is limited to 1'})
        }
    }
})

app.listen(4000, () => console.log('listening on port 4000'));

