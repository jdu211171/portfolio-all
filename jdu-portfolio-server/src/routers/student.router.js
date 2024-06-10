const router = require("express").Router();
const StudentController = require("../modules/Student/student.controller.js");
const excelcreate = require("../middlewares/studentExcel.middleware.js");

const Controller = new StudentController();

router.get("/students", Controller.getStudents);
router.get("/students/top", Controller.getTopStudents);
router.get("/students/archive", Controller.getArchiveStudents);
router.get("/studentBy/:id", Controller.findByLoginId);
router.get("/student/:id", Controller.findById);
router.get("/students/certificates-count", Controller.getCertificatesCount);
router.post("/student", Controller.createStudent);
router.post("/students", excelcreate, Controller.createStudentWithExcel);
router.post(
	"/students/certificates",
	excelcreate,
	Controller.createCertification,
);
router.post("/galary", Controller.createStudentAlbom);
router.delete("/galary", Controller.removeAlbome);
router.put("/student/:id", Controller.updateStudent);
router.delete("/student/:id", Controller.deleteStudent);
router.delete("/avatar/:id", Controller.removeAvatar);

module.exports = router;
