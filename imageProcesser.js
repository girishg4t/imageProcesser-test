const Jimp = require('jimp');
const config = require('./imageConfig.json');

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

module.exports.getImageUrlWithLogo = async (filename) => {
    const mainImage = await Jimp.read(config.folderName + '/' + filename);
    const watermark = await Jimp.read(config.logoPath);

    const [newHeight, newWidth] = getDimensions(mainImage.getHeight(), mainImage.getWidth(),
        watermark.getHeight(), watermark.getWidth(), config.ratio);
    watermark.resize(newWidth, newHeight);

    const positionX = (mainImage.getWidth() - newWidth) / 2;
    const positionY = (mainImage.getHeight() - newHeight) / 2;
    watermark.opacity(config.opacity);
    mainImage.composite(watermark,
        100,
        0,
        Jimp.HORIZONTAL_ALIGN_RIGHT | Jimp.VERTICAL_ALIGN_TOP);
    mainImage.quality(config.imageQuality).resize(config.resizeWidth,
        config.resizeHeight).write("./images/withlogo_" + filename);

    return config.folderName + '/withlogo_' + filename
}