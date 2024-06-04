const { exec } = require("child_process");
const path = require("path");
const { promisify } = require("util");
const AdmZip = require('adm-zip');
const { existsSync } = require('fs')
require("dotenv").config();

class BackupController {
	async backup(req, res) {
		const execAsync = promisify(exec);
		const username = process.env.DB_USER;
		const password = process.env.DB_PASSWORD;
		const database = process.env.DB_NAME;
		const backupPath = path.resolve(__dirname, "../../backup", "backup.sql");

		const pgDumpCommand = [
			"pg_dump",
			`--username=${username}`,
			`--dbname=${database}`,
			`--file=${backupPath}`,
			"--no-owner",
			"--password",
		];

		const env = { PGPASSWORD: password };

		execAsync(pgDumpCommand.join(" "), { env }, (error, stdout, stderr) => {
			if (error) {
				console.error(`Backup failed: ${error.message}`);
				return res.status(500).send("Backup failed");
			}

			console.log("Backup created successfully");
			return res.send("Backup created successfully");
		});
	}
	async GetBackup(req, res) {
		try {
      const pathfile = path.join(process.cwd(), 'src', 'backup');
      if (existsSync(pathfile)) {
        const zip = new AdmZip();
        await zip.addLocalFolder(pathfile);
        const response = await zip.toBuffer();
        const fileName = 'backup.zip';
        const fileType = 'application/zip';

        res.writeHead(200, {
          'Content-Disposition': `attachment; filename="${fileName}`,
          'Content-Type': fileType,
        });

        return res.end(response);
      } else return { data: null, isNaN: true };
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
	}
}

module.exports = BackupController;
