const SequelizeError = require("../../errors/sequelize.error");
const { sequelize } = require("../../services/sequelize.service");
const groupModel = require("./group.model");
const { Op, literal } = require("sequelize");

class GroupServices {
	constructor(sequelize) {
		groupModel(sequelize);
		this.models = sequelize.models;
	}

	async getAll({ page = 1, limit = 10, search, year, collection }) {
		const groups = await this.models.Group.findAll({
			distinct: true,
			where: {
				isDeleted: false,
				...(search && { name: { [Op.iLike]: "%" + search + "%" } }),
				...(year && { year: { [Op.eq]: year } }),
				...(collection && { collection: { [Op.eq]: collection } }),
			},
			order: [
				[
					literal(
						"CASE WHEN \"year\" = 'Fourth' THEN 1 WHEN \"year\" = 'Third' THEN 2 WHEN \"year\" = 'Second' THEN 3 ELSE 4 END",
					),
					"ASC",
				],
			],
			attributes: [
				"id",
				"name",
				"collection",
				"year",
				[
					literal(
						'(SELECT COUNT(*) FROM "Students" WHERE "Students"."groupId" = "Group"."id" AND "Students"."isActive" = true AND "Students"."isDeleted" = false AND "Students"."isArchive" = false)',
					),
					"students",
				],
			],
			group: ["Group.id"],
			raw: true,
			offset: (page - 1) * limit,
			limit,
		});

		return { count: groups.length, row: groups };
	}

	async getById(id) {
		try {
			const group = await this.models.Group.findOne({
				where: { id },
				include: [
					{
						model: this.models.Students,
						as: "students",
						attributes: [
							"id",
							"firstName",
							"lastName",
							"avatar",
							"loginId",
							"isActive",
							"isDeleted",
							"jdu",
							"jlpt",
						],
					},
				],
			});

			// Extract the plain object values without circular references
			const groupData = group.toJSON();

			return {
				...groupData,
				students: groupData?.students?.filter(
					(e) => e.isActive && !e.isDeleted && !e.isArchive,
				),
			};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async create(body) {
		try {
			const group = await this.models.Group.create(body);
			return group;
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async edit(id, body) {
		try {
			const [_, group] = await this.models.Group.update(body, {
				where: { id },
				returning: true,
			});
			return group?.[0] || {};
		} catch (error) {
			return SequelizeError(error);
		}
	}

	async delete(id) {
		try {
			const group = await this.models.Group.destroy({ where: { id } });
			return group;
		} catch (error) {
			return SequelizeError(error);
		}
	}
}

module.exports = new GroupServices(sequelize);
