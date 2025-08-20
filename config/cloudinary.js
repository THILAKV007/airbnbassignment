const cloudinary = require('cloudinary').v2;
const config = require('./developmentProd');

cloudinary.config({
    cloud_name: config?.cloud_name,
    api_key: config?.api_key,
    api_secret: config?.api_secret,
});

exports.uploads = (file, folder) => {

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, { resource_type: "auto", folder: folder }, (error, result) => {
            if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
            } else {
                resolve({
                    url: result.secure_url,
                    id: result.public_id
                });
            }
        });
    });
};

exports.deleteSingle = (publicId, resourceType = 'image') => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, { resource_type: resourceType }, (error, result) => {
            if (error) {
                console.error("Cloudinary delete error:", error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
};

