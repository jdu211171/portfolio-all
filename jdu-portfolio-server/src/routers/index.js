const studentRouter = require("./student.router.js");
const auth = require("./auth.router.js");
const recruitor = require("./recruitor.router.js");
const decan = require("./decan.router.js");
const FileUpload = require("./fileUpload.router");
const teacher = require("./teacher.router.js");

const routes = [
	studentRouter,
	auth,
	recruitor,
	require("./group.router"),
	require("./info.router"),
	require("./validator.router"),
	require("./excel.router"),
	require("./backup.router"),
	decan,
	FileUpload,
	teacher,
];

const combineRoutes = (app) => {
	routes.forEach((route) => {
		app.use(route);
	});
};

module.exports = combineRoutes;
