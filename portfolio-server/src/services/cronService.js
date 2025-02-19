const cron = require('node-cron');
const { Draft, sequelize, Staff } = require('../models');
const emailService = require('../utils/emailService');
const { Op } = require('sequelize');

class CronService {
    static async sendDraftEmails() {
        try {
            console.log('submitted draft ...');

            // const today = new Date().toISOString().split('T')[0];
            const drafts = await sequelize.query(`
                SELECT DISTINCT ON (student_id) * 
                FROM "Drafts"
                WHERE status = 'submitted'
                ORDER BY student_id, updated_at DESC;
            `, {
                type: sequelize.QueryTypes.SELECT
            });

            if (drafts.length === 0) {
                console.log('No drafts submitted today');
                return;
            }

            const staffMembers = await Staff.findAll({ attributes: ['email'] });
            if (staffMembers.length === 0) {
                console.log('No staff found.');
                return;
            }

            const staffEmails = staffMembers.map(staff => staff.email);

            let emailBody = `
            <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
                <h2 style="color: #333;">📑 以下の学生たちがプロフィール情報を送信しました</h2>
                <p style="color: #555;">本日提出された情報:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                    <thead>
                        <tr style="background-color: #f2f2f2;">
                            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">👤 学籍番号</th>
                            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">📅 提出日</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            drafts.forEach(draft => {
                emailBody += `
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 10px;">${draft.student_id || "不明"}</td>
                        <td style="border: 1px solid #ddd; padding: 10px;">${new Date(draft.updated_at).toLocaleString()}</td>
                    </tr>
                `;
            });

            emailBody += `
                        </tbody>
                    </table>
                    <p style="margin-top: 20px; color: #777;">📧 ここで情報を確認できます. http://localhost:4000.</p>
                </div>
            `;

            // Har bir staff xodimiga email jo‘natish
            for (const email of staffEmails) {
                await emailService.sendEmail(
                    email,
                    '📩 本日提出された学生の情報',
                    `本日提出された学生情報の一覧`,
                    emailBody
                );
                console.log(`Email sent to ${email}`);
            }

            console.log('✅ Cron job finished successfully');

        } catch (error) {
            console.error('Error in scheduled task:', error);
        }
    }

    static scheduleJobs() {
        console.log('📌 Cron job started at 13:14 (UTC+5)');
        cron.schedule('14 13 * * *', CronService.sendDraftEmails);
    }
}

module.exports = CronService;
