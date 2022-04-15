const Router = require("express").Router();
const { check } = require("express-validator");

const { validateData, validateJWT } = require("../middlewares");

const {
  listsGet,
  listsDelete,
  listsPost,
  listsPut,
  listsPopulateGet,
} = require("../controllers/list.controller");

const { isUserByIdExist, isListByIdExist } = require("../helpers/db-validators");

const router = Router;

router.get(
  "/",
  [
    validateJWT,
    check("userId", "userId es obligatorio").not().isEmpty(),
    check("userId").custom(isUserByIdExist),
    validateData,
  ],
  listsPopulateGet
);


router.post(
  "/",
  [
    validateJWT,
    check("userId", "userId es obligatorio").not().isEmpty(),
    check("userId").custom(isUserByIdExist),
    check("title", "title es obligatorio").not().isEmpty(),
    validateData,
  ],
  listsPost
);


router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isListByIdExist),
    validateData,
  ],
  listsPut
);

router.delete(
  "/:id",
  [
    validateJWT,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isListByIdExist),
    validateData,
  ],
  listsDelete
);

module.exports = router;
