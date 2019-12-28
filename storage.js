
const multer = require('multer');

module.exports.createLocalStorage = (destFolderName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destFolderName);
        },
        filename: (req, file, cb) => {
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
    return multer({ storage: storage });
}