const router = require("express").Router();
const BackupController = require("../modules/backup/backup.controller");

const Controller = new BackupController();

router.get("/backup", Controller.backup);
router.get("/get-backup", Controller.GetBackup);

module.exports = router;
