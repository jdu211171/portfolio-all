const router = require("express").Router();
const excelcreate = require("../middlewares/studentExcel.middleware.js");
const ExcelController = require("../modules/Excel/excel.controller");

const Controller = new ExcelController();

router.post("/excel", excelcreate, Controller.getAll);

module.exports = router;
