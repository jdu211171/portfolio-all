const { sequelize } = require("../../services/sequelize.service");
const decanModel = require("../Decan/decan.model");
const recruitorModel = require("../Recruitors/recruitor.model");
const studentModel = require("../Student/student.model");
const teacherModel = require("../Teacher/teacher.model");

class ValidatorService {
	constructor(sequelize) {
		decanModel(sequelize);
		recruitorModel(sequelize);
		studentModel(sequelize);
		teacherModel(sequelize);
		this.models = sequelize.models;
	}

	async isLoginIdUniqueInAllTables(loginId) {
		try {
			const results = await Promise.all([
				this.models.Teachers.findOne({ where: { loginId } }),
				this.models.Students.findOne({ where: { loginId } }),
				this.models.Decan.findOne({ where: { loginId } }),
				this.models.Recruitors.findOne({ where: { loginId } }),
			]);
			return results.every((result) => result === null);
		} catch (error) {
			console.log(error);
		}
	}

	async isEmailUniqueInAllTables(email) {
		try {
			const results = await Promise.all([
				this.models.Teachers.findOne({ where: { email, isDeleted: false } }),
				this.models.Students.findOne({ where: { email, isDeleted: false } }),
				this.models.Decan.findOne({ where: { email, isDeleted: false } }),
				this.models.Recruitors.findOne({ where: { email, isDeleted: false } }),
			]);
			return results.every((result) => result === null);
		} catch (error) {
			console.log(error);
		}
	}

	email(users, excel) {
		const regex = /@jdu\.uz$/g;
		const error = { error: false, message: [], status: 200 };

		for (let i = 0; i < users.length; i++) {
			const email = users[i].email;
			if (regex.test(email)) {
				// console.log(`Email ${email} at index ${i} ends with '@jdu.uz'`);
			} else {
				error.error = true;
				if (excel) {
					error.message.push(
						`No:${i} email is not useful. Please check this email`,
					);
				} else {
					error.message.push("This email can not use!");
				}
			}
		}
		if (error.error) {
			error.message = error.message.join(", ");
			error.status = 400;
		}

		return error;
	}
}

module.exports = new ValidatorService(sequelize);
