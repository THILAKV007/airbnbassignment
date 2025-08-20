// const mongoose = require('mongoose');
// const AdminActivity = mongoose.model("AdminActivity");
const cloudinary = require('../config/cloudinary');
var crypto = require("crypto");
const config = require('../config/developmentProd.js');
let password = config.passPhrase;
let algorithm = config.algorithm;
let iv = config.iv;

// exports.adminactivtylog = async function (
//   req,
//   adminuseridlog,
//   reasonlog
// ) {
//   let browserlog = "";
//   if (req != "") {
//     let ua = req.headers["user-agent"];
//     ua = ua.toLowerCase();
//     if (/firefox/i.test(ua)) browserlog = "Firefox";
//     else if (/chrome/i.test(ua)) browserlog = "Chrome";
//     else if (/safari/i.test(ua)) browserlog = "Safari";
//     else if (/msie/i.test(ua)) browserlog = "msie";
//     else browserlog = "unknown";
//   }
//   let iplog = "";
//   if (req != "") {
//     iplog =
//       typeof req.headers["x-forwarded-for"] == "string"
//         ? req.headers["x-forwarded-for"]
//         : req.headers["cf-connecting-ip"];
//   }
//   const adminlogdata = {
//     ip: iplog,
//     browser: browserlog,
//     adminuserid: adminuseridlog,
//     reason: reasonlog,
//   };
//   await AdminActivity.create(adminlogdata)
//   return true;
// };

exports.saveToCloudinary = async function (req) {
  try {
    const uploader = async (path, what) => await cloudinary.uploads(path, what);
    const urls = {};
    const files = req.files;
    if (files) {
      for (const file of files) {
        const { path, filename, fieldname } = file;
        let fileName = filename.split(".")[0];
        const parts = filename.split(/[_\.]/);
        const which = parts[1];
        const newPath = await uploader(path, which);
        urls[fieldname] = { name: fileName, location: newPath, type: which, fieldname: fieldname };
      }
    }
    return urls;
  }
  catch (err) {
    console.log("saveToCloudinary ", err)
    return null;
  }
}
exports.saveToCloudinarySingle = async function (file) {
  try {
    const uploader = async (path, what) => await cloudinary.uploads(path, what);
    const urls = {};
    if (file) {

      const { path, filename, fieldname } = file;
      let fileName = filename.split(".")[0];
      const parts = filename.split(/[_\.]/);
      const which = parts[1];
      const newPath = await uploader(path, which);
      urls[fieldname] = { name: fileName, location: newPath, type: which, fieldname: fieldname };
    }
    return urls;
  }
  catch (err) {
    console.log("saveToCloudinarySingle ", err)
    return null;
  }
}

exports.deleteCLoudinarySingle = async function (id, resource) {
  try {
    const remover = async (idProps, resourceProps) => await cloudinary.deleteSingle(idProps, resourceProps)
    const deleteFinally = await remover(id, resource)
    // console.log(deleteFinally)
    return deleteFinally;
  }
  catch (err) {
    console.log("deleteCLoudinarySingle ", err)
    return null;
  }
}
exports.encrypt = (value) => {
  var cipher = crypto.createCipheriv(algorithm, password, iv);
  var crypted = cipher.update(value, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};
exports.decrypt = (value) => {
  var decipher = crypto.createDecipheriv(algorithm, password, iv);
  var dec = decipher.update(value, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
};