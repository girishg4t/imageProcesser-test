function updateImage(image, { quality, resize, opacity }) {
    if (quality) image.quality(quality);
    if (resize) image.resize(resize.width, resize.height);
    if (opacity) image.opacity(opacity);
}

module.exports = { updateImage }