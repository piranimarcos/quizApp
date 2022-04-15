const Router = require("express").Router();
const { check } = require("express-validator");

const { validateData, validateJWT, isAdminRole, hasRole } = require('../middlewares')

const {
  usersGet,
  usersPut,
  usersDelete,
  usersPatch,
  usersPost,
} = require("../controllers/user.controller");

const {
  isValidRole,
  isEmailExist,
  isUserByIdExist,
} = require("../helpers/db-validators");

const router = Router;

router.get("/", usersGet);

router.post(
  "/",
  [
    check("email", "El email no es correcto").isEmail(),
    check("email").custom(isEmailExist),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROL']),
    check("rol").custom(isValidRole),
    validateData,
  ],
  usersPost
);

router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isUserByIdExist),
    check("rol").custom(isValidRole),
    validateData,
  ],
  usersPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isUserByIdExist),
    validateData,
  ],
  usersDelete
);

router.patch("/", usersPatch);

module.exports = router;
