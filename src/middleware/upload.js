const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
destination: (req, file, cb) => cb(null, path.join(__dirname, '..', '..', 'uploads')),
filename: (req, file, cb) => {
const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
const ext = path.extname(file.originalname);
cb(null, unique + ext);
},
});


const fileFilter = (req, file, cb) => {
const ok = /jpg|jpeg|png|webp/i.test(path.extname(file.originalname));
ok ? cb(null, true) : cb(new Error('Only image files are allowed'));
};


const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } });


module.exports = upload;