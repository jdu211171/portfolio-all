const path = require('path')
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')
const combineRouters = require('./routers/index.js')
const { PORT } = require('./configs/server.config.js')

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, '../../uploads')))
app.use(fileUpload({
	tempFileDir: "temp",
	useTempFiles: true,
}))

combineRouters(app)

app.use((err, req, res, next) => {
	res.status(err.status || 400).send(
		err || { error: true, status: 400, message: err.message || "Somethink went wrong" }
	);
	next();
});

app.listen(PORT, () => console.log(`Server is run on ${PORT} port`))