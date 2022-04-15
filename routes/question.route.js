const Router = require("express").Router();
const { check } = require("express-validator");

const { validateData, validateJWT } = require("../middlewares");

const {
  questionsGet,
  questionsDelete,
  questionsPost,
  questionsPut
} = require("../controllers/quiestion.controller");

const { isListByIdExist, isQuestionByIdExist } = require("../helpers/db-validators");

const router = Router;

router.get(
  "/",
  [
    validateJWT,
    check("listId", "ListId es obligatorio").not().isEmpty(),
    check("listId").custom(isListByIdExist),
    validateData,
  ],
  questionsGet
);

router.post(
  "/",
  [
    validateJWT,
    check("title", "title es obligatorio").not().isEmpty(),
    check("listId", "ListId es obligatorio").not().isEmpty(),
    check("listId").custom(isListByIdExist),
    validateData,
  ],
  questionsPost
);


router.put(
  "/:id",
  [
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(isQuestionByIdExist),
    validateData,
  ],
  questionsPut
);


router.delete(
  "/:id",
  [validateJWT, check("id", "No es un id válido").isMongoId(), validateData],
  questionsDelete
);

module.exports = router;
