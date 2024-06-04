const path = require("path");
const { cwd } = require("node:process");

const excelcreate = async (req, res, next) => {
	const excel = req?.files?.excel;
	const pathName = path.resolve(cwd() + "/uploads/excel/" + excel.name);
	await req.files.excel.mv(path.resolve(pathName));

	req.pathName = pathName;
	next();
};

module.exports = excelcreate;
