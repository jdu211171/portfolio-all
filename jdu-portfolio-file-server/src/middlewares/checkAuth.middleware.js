const jwt = require("../utils/jwt");

const checkAuth = (publicRouters) => {
    return (req, res, next) => {
		for (let i = 0; i < publicRouters.length; i++) {
			if (
				publicRouters[i].url === req.url &&
				publicRouters[i].method === req.method
			) {
				return next();
			}
		}

		const token = req.headers.token;
		if (!token) {
			return res.status(401).send({
				error: true,
				status: 401,
				message: "Unauthorized",
			});
		} else {
			const decoded = jwt.verify(token);
			if (decoded) {
				req.user = decoded;
				return next();
			} else {
				res.status(403).send({
					error: true,
					status: 403,
					message: "Invalid token",
				});
			}
		}
	};
}

module.exports = checkAuth