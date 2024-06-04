const studentQueryParser = (req, res, next) => {
	let where = {};
	let relations = {};
	let pagination = { limit: 100, offset: 0 };
	let elasticsearch = { text: "" };
	const { mainCategoryId, state, lang, limit, page, text, editor } = req.query;

	if (state) {
		where.state = state;
	}
	if (lang) {
		relations = {
			categories: true,
			creator: {
				position: true,
			},
			mainCategory: true,
		};
		relations[lang] = true;
		if (editor) {
			relations["editors"] = {
				position: true,
			};
		}
	} else {
		relations = {
			uz: true,
			ru: true,
			en: true,
			уз: true,
			categories: true,
			creator: {
				position: true,
			},
			mainCategory: true,
		};
		if (editor) {
			relations["editors"] = {
				position: true,
			};
		}
	}
	if (limit && page) {
		const offset = (+page - 1) * +limit;
		pagination.limit = +limit;
		pagination.offset = offset;
	} else if (limit && !page) {
		pagination.limit = +limit;
	}
	if (text) {
		elasticsearch.text = text;
	}

	req.where = where;
	req.relations = relations;
	req.pagination = pagination;
	req.elasticsearch = elasticsearch;
	req.slugKey = lang || "uz";

	next();
};
