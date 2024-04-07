const router = require("express").Router();

router.get("/posts", (req, res) => res.json({ body: [{ title: "Post" }] }));

module.exports = router;
