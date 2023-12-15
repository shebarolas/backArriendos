const router = require('express').Router();
const { upload } = require('../Config/multer');
const {register, update, deletes, getId, getAll, countCity, countType, countByIdUser, countMoney, countMoneyHouse, getIdArr, getIdAdmin} = require('../Controllers/hotel.controller');
const { verifyAdmin } = require('../Utils/validateJWT');

router.post('/register', verifyAdmin, upload.array('image', 2), register);
router.put('/update/:id', verifyAdmin, upload.array('image', 2) ,update);
router.delete('/delete/:id', verifyAdmin, deletes);
router.get('/getId/:id', getId);
router.get('/getIdAdmin/:id', getIdAdmin);
router.get('/getAll', getAll);
router.get('/countCity', countCity);
router.get('/countType', countType);
router.get('/getByUserId/:id',verifyAdmin, countByIdUser);
router.get('/countMoney/:id',verifyAdmin, countMoney);
router.get('/countMoneyHouse/:id',verifyAdmin, countMoneyHouse);
router.get('/getIdArr/:id', verifyAdmin, getIdArr);

module.exports = router;