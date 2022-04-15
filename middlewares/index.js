const validateJWT = require("../middlewares/validate-jwt");
const validateData = require("../middlewares/validates");

module.exports = {
    ...validateData,
    ...validateJWT
}