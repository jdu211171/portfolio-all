const studentRouter = require("./student.router.js");
const specialisationRouter = require("./specialisation.router.js");
const skillRouter = require("./skill.router.js");
const lessonResult = require("./lessonResult.router.js");
const auth = require("./auth.router.js");
const recruitor = require("./recruitor.router.js");
const decan = require("./decan.router.js");
const FileUpload = require("./fileUpload.router");
const teacher = require("./teacher.router.js");

const routes = [
	studentRouter,
	specialisationRouter,
	skillRouter,
	lessonResult,
	auth,
	recruitor,
	require("./group.router"),
	require("./info.router"),
	require("./section.router"),
	require("./validator.router"),
	require("./excel.router"),
	require("./position.router"),
	require("./backup.router"),
	decan,
	FileUpload,
	teacher,
	require("./credit.router"),
];

const combineRoutes = (app) => {
	routes.forEach((route) => {
		app.use(route);
	});
};

module.exports = combineRoutes;
