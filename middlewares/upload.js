const multer = require("multer");

const storage = multer.diskStorage({
    // destination: (req, file, cd) => {
    //     if(file.fieldname==='audio'){
    //         cd(null, './public/audios/');
    //     }
    //     else{
    //         cd(null, './public/images/');
    //     }

    // },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        let filename
        if (file.fieldname === 'audio') {
            filename = Date.now() + "_audios" + "." + ext;
        }
        else {
            filename = Date.now() + "_images" + "." + ext;
        }
        // console.log('res ',filename,file.fieldname)
        req.filename = filename;
        cb(null, filename);
    },
});

// const storage = multer.memoryStorage();

const uploadFile = multer({
    storage: storage
});
module.exports = uploadFile;

