const Router = require("express").Router();
const { check } = require("express-validator");
const { singIn, singUp } = require("../controllers/auth.controller");
const { isUsernameExist } = require("../helpers/db-validators");
const { validateData } = require("../middlewares/validates");

const router = Router;

router.post("/signin", [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateData
], singIn);


router.post("/signup", [
    check('username', 'El username es obligatorio').not().isEmpty(),
    check("username").custom(isUsernameExist),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validateData
], singUp);


module.exports = router;
