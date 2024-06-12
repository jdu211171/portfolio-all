let message = {
	error: false,
	msg: [],
	missingProps: [],
	missingCells: [],
};

const checkProperties = (data, who) => {
	for (const item of data) {
		const properties = Object.keys(item);
		let expectedProperties;
		if (who == "student") {
			expectedProperties = ["studentId", "email"];
		}

		message.msg.push(
			expectedProperties.filter((item) => !properties.includes(item)) +
				": You have missing propery!",
		);

		message.missingProps.push(
			...expectedProperties.filter((item) => !properties.includes(item)),
		);
	}
};

const checkValue = (data, who) => {
	const alphabet = "ABCDEFGHIJKLMOPQRSTUVWXYZ";
	let expectedProperties;
	if (who == "student") {
		expectedProperties = ["studentId", "email"];
	}

	data.forEach((item, index) => {
		const properties = Object.keys(item);

		expectedProperties.forEach((el, i) => {
			if (!properties.includes(el)) {
				const cell = `${index + 1}:${alphabet[i]}`;
				message.missingCells.push(cell);
			}
		});
	});
};

const restoreErrors = () => {
	message.missingProps = [...new Set(message.missingProps)];
	message.msg = [...new Set(message.msg)];
	if (
		message.missingProps.length > 0 ||
		message.msg.length > 0 ||
		message.missingCells.length > 0
	)
		message.error = true;
};

const validate = (data, who) => {
	message = {
		error: false,
		msg: [],
		missingProps: [],
		missingCells: [],
	};
	checkProperties(data, who);
	checkValue(data, who);
	restoreErrors();

	return message;
};

module.exports = validate;
