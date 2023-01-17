const fs = require('fs');

function ImgToBinary(imagelink){
    const imageBuffer = new Buffer(imagelink).toString('binary');
    return imageBuffer;
};

module.exports.ImgToBinary = ImgToBinary;