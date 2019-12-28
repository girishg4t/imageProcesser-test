/**
 * Update the given image as per given options
 * @param {* image to be modified} image 
 * @param {* activity needs to be performed on image} options 
 */
function updateImage(image, options) {
    options.quality && image.quality(options.quality);
    options.resize && image.resize(options.resize.width, options.resize.height);
    options.opacity && image.opacity(options.opacity);
}

module.exports = { updateImage }