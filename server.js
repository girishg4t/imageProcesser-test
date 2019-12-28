const express = require('express');
const path = require('path');
const { createLocalStorage } = require('./storage');
const getImagewithLogo = require("./imageProcesser");
const config = require('./imageConfig.json');
const app = express();
const port = 3000;

app.use("/" + config.destFolderName,
    express.static(path.join(__dirname, config.destFolderName)));


app.post('/getUpdatedImageURL',
    createLocalStorage(config.destFolderName).single('image'),
    async function (req, res) {
        if (!req.image) {
            res.status(500);
        }
        const imageWithLogo = await getImagewithLogo(req.file.filename, config);
        res.json({
            fileUrl: req.protocol + "://" + req.hostname + ':' + port + '/' + imageWithLogo
        });
    });

app.listen(port, function () {
    console.log("Server started on port : " + port)
});