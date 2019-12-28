const express = require('express');
const path = require('path');
const { getLocalStorage } = require('./storage');
const { getImageUrlWithLogo } = require("./imageProcesser");
const config = require('./imageConfig.json');
const app = express();
const port = 3000;

app.use("/images", express.static(path.join(__dirname, "images")));

app.post('/imageURL',
    getLocalStorage(config.folderName).single('image'),
    async function (req, res) {
        if (!req.image) {
            res.status(500);
        }
        const imageWithLogo = await getImageUrlWithLogo(req.file.filename);

        res.json({
            fileUrl: 'http://localhost:' + port + '/' + imageWithLogo
        });
    });

app.listen(port, function () {
    console.log("Server started on port : " + port)
});