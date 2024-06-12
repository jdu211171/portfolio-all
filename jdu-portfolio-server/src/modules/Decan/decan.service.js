const sha256 = require("sha256");
const SequelizeError = require("../../errors/sequelize.error");
const { sequelize } = require("../../services/sequelize.service");
const DecanModel = require("./decan.model.js");

class DecanServices {
	constructor(sequelize) {
		DecanModel(sequelize);
		this.models = sequelize.models;
	}

	async decanHome() {
		try {
			const studentCount = await this.model.Student.count();
			const recruitorCount = await this.model.Recruitor.count();
			const teacherCount = await this.model.Teacher.count();

			return {
				student: studentCount,
				recruitor: recruitorCount,
				teacher: teacherCount,
			};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async getMe() {
		try {
			const decan = await this.models.Decan.findOne({
				attributes: { exclude: ["password", "isDeleted"] },
			});
			return decan;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async update(id, body) {
		try {
			if (body?.avatar == " ") {
				body.avatar = null;
			}
			const [_, decan] = await this.models.Decan.update(body, {
				where: { id },
				returning: true,
				individualHooks: true,
			});
			return decan?.[0];
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async checkPassword(psw) {
		try {
			const decan = await this.models.Decan.findOne({
				where: { password: sha256(psw) },
			});
			return decan;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async percantagesAndCount() {
		try {
			const where = { isDeleted: false };
			const dataModels = [
				{
					type: "学生",
					model: await this.models.Students.findAll({ where }),
				},
				{
					type: "職員",
					model: await this.models.Teachers.findAll({ where }),
				},
				{
					type: "リクルーター",
					model: await this.models.Recruitors.findAll({ where }),
				},
			];

			const result = dataModels.map((e) => {
				const count = e.model.filter((e) => e?.isActive && !e?.isArchive).length || 0;
				const inActive = e.model.filter((e) => !e?.isActive || e?.isArchive).length || 0;
				const res = {
					type: e.type.toLowerCase(),
					count,
					percentage: 0,
					inActive: inActive,
				};
				return res;
			});

			// Total count for all categories
			const totalCounts = result.reduce((sum, { count }) => sum + count, 0);

			// Calculate percentages and update the result array
			result.forEach((item) => {
				item.percentage = ((item.count / totalCounts) * 100).toFixed(0);
			});
			return result;
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new DecanServices(sequelize);
