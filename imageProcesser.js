const Jimp = require('jimp');
const { updateImage } = require('./utils');


/**
 * This function is to read image and logo and process that
 * as per configuration and compose the final image with logo
 * @param {* image to be read } imagename 
 * @param {* image processing configuration} config 
 */
module.exports.getImagewithLogo = async (imagename, config) => {
    const mainImage = await Jimp.read(config.destFolderName + '/' + imagename);
    const logo = await Jimp.read(config.destFolderName + '/' + config.logoName);

    updateImage(mainImage, {
        quality: config.imageQuality,
        resize: {
            width: config.imageResizeWidth,
            height: config.imageResizeHeight
        },
        opacity: null
    });

    updateImage(logo, {
        quality: null,
        resize: {
            width: config.imageResizeWidth * config.logoRatio,
            height: config.imageResizeHeight * config.logoRatio
        },
        opacity: config.logoOpacity
    });

    mainImage.composite(logo, mainImage.getWidth() - logo.getWidth(), 0,
        Jimp.HORIZONTAL_ALIGN_RIGHT | Jimp.VERTICAL_ALIGN_TOP);

    const destPath = config.destFolderName + "/withlogo_" + imagename;
    mainImage.write(destPath);
    return destPath;
}