const express = require("express");
const router = express.Router();
const tokenController = require("../controllers/tokenController");

router.get("/api/token/checkAccess", tokenController.checkIfAccessTokenExpired);

router.post("/api/token/createNewAccess", tokenController.createNewAccessToken);

router.delete("/api/token/deleteRefresh", tokenController.removeRefreshToken);

module.exports = router;
