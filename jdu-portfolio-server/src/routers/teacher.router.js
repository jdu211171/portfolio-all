const router = require("express").Router();
const excelcreate = require("../middlewares/studentExcel.middleware.js");
const TeacherController = require("../modules/Teacher/teacher.controller.js");

const Controller = new TeacherController();

router.get("/teachers", Controller.getAll);
router.get("/teacher/:id", Controller.getOne);
router.post("/teacher", Controller.create);
router.put("/teacher/:id", Controller.update);
router.post("/teachers", excelcreate, Controller.createWithExcel);
router.delete("/teacher/:id", Controller.delete);

module.exports = router;
