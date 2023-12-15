const { register, login, update, deletes, getId, getAll, getSession, updateToken } = require('../Controllers/user.controller');
const { verifyToken, verifyUser, verifyAdmin } = require('../Utils/validateJWT');

const router = require('express').Router();

// router.get("/autenticated", verifyToken, (req, res) => {
//     return res.status(200).json(req.user);
// });
// router.get("/checkUser/:id", verifyUser, (req, res) => {
//     return res.status(200).json({message: "You are logged with normal user", user: req.user});
// });
// router.get("/checkAdmin/:id", verifyAdmin, (req, res) => {
//     return res.status(200).json({message: "You are logged with admin", user: req.user});
// });
router.post("/register", register);
router.post("/login", login);
router.get("/sessionLoading", getSession);
router.put("/update/:id", verifyUser, update);
router.delete("/delete/:id", verifyUser, deletes);
router.get("/getId/:id", verifyUser, getId);
router.get("/getAll", verifyAdmin, getAll);
router.put("/updateToken/:id", updateToken)

module.exports = router;