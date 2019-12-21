const express = require('express');
const multer = require('multer');
const Jimp = require('jimp');
const path = require('path');

const app = express();

app.use("/images", express.static(path.join(__dirname, 'images')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
const upload = multer({ storage: storage });
const getDimensions = (H, W, h, w, ratio) => {
    let hh, ww;
    if ((H / W) < (h / w)) {    //GREATER HEIGHT
        hh = ratio * H;
        ww = hh / h * w;
    } else {                //GREATER WIDTH
        ww = ratio * W;
        hh = ww / w * h;
    }
    return [hh, ww];
}

app.post('/imageURL', upload.single('image'), async function (req, res) {
    console.log(req.image);
    if (!req.image) {
        res.status(500);
    }
    const mainImage = await Jimp.read('./images/' + req.file.filename);
    const watermark = await Jimp.read('./images/snowball_logo.png');

    const [newHeight, newWidth] = getDimensions(mainImage.getHeight(), mainImage.getWidth(),
     watermark.getHeight(), watermark.getWidth(), 0.6);
     watermark.resize(newWidth, newHeight);
     const positionX = (mainImage.getWidth() - newWidth) / 2;
     const positionY = (mainImage.getHeight() - newHeight) / 2;
     watermark.opacity(0.6);
     mainImage.composite(watermark,
        positionX,
        positionY,
        Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE);
        mainImage.quality(100).resize(500, 500).write("./images/withlogo_" + req.file.filename);

  
    res.json({ fileUrl: 'http://localhost:3000/images/withlogo_' + req.file.filename });
});

app.listen(3000, function () { });