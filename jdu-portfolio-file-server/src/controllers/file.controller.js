const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path');
const createDirRecursively = require('../utils/recursiveDir');

class FileController {
    async uploadFile(req, res) {
        try {
            const file = req.files?.file
            const folderName = req.body?.folderName
            const fileName = uuidv4() + file?.name.replace(/\s/g, '')
            const outputDir = path.resolve(__dirname, '../../../uploads/file/', folderName || '')
            const outputPath = path.join(__dirname, '../../../uploads/file/', folderName || '', fileName)
            const url = (req.protocol + "://" + req.get("host") + path.join('/file', folderName || '', fileName)).replace(/\\/g, '/')

            if (!fs.existsSync(outputDir)) {
                createDirRecursively(outputDir)
            }

            const rej = await file.mv(outputPath)

            res.send({...rej, url})
        } catch (error) {
            
        }
    }
}

module.exports = FileController