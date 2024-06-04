const router = require("express").Router();
const excelcreate = require("../middlewares/studentExcel.middleware");
const ParentController = require("../modules/Parent/parent.controller");

const Controller = new ParentController();

router.get("/parent", Controller.getAll);
router.get("/parent/:id", Controller.getOne);
router.post("/parent", Controller.create);
router.post("/parents", excelcreate, Controller.createWithExcel);
router.put("/parent/:id", Controller.edit);
router.put("/parentchild/:id", Controller.updatadeParentChild);
router.delete("/parent/:id", Controller.delete);

module.exports = router;
