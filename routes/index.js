const path = require("path");
const Router = require("express").Router();

const router = Router;

router.get("/titulo", (req, res) => {
  res.send("Quiz App");
});

// router.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, '/../app/build/index.html'));
// });

module.exports = router;
