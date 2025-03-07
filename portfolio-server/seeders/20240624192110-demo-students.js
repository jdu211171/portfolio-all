'use strict'

const bcrypt = require('bcrypt')
const faker = require('faker')

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const studentsData = []

		studentsData.push({
			email: 'student@jdu.uz',
			password: await bcrypt.hash('student', await bcrypt.genSalt(10)),
			student_id: '211171',
			first_name: 'Custom',
			last_name: 'User',
			date_of_birth: new Date('2000-01-01'),
			photo: 'https://randomuser.me/api/portraits/med/men/1.jpg',
			self_introduction: 'This is a custom user added for testing purposes.',
			hobbies: 'Reading, Coding',
			gallery: JSON.stringify([
				'https://preview.redd.it/i3-a-girl-said-she-kinda-fell-in-love-after-seeing-my-rice-v0-9tj8jfx60tle1.png?width=1920&format=png&auto=webp&s=1dd19415835e06901375bbe9c3b45fa4e177be8f',
				'https://preview.redd.it/i3wm-my-first-rice-on-arch-linux-v0-m20t6tl455ne1.jpg?width=1920&format=pjpg&auto=webp&s=fde5030e84b82e4eb30be4c13820cbee0453fe9e',
				'https://preview.redd.it/i3wm-my-first-rice-on-arch-linux-v0-eqsuyxm455ne1.jpg?width=1920&format=pjpg&auto=webp&s=5cc742af1baa086b9d0c10ea9463b50dcf41f7e2',
				'https://preview.redd.it/i3wm-my-first-rice-on-arch-linux-v0-mqcsmtl455ne1.jpg?width=1920&format=pjpg&auto=webp&s=2bd0506f02c51b599d8d2c644b7bc87ee9c4e437',
			]),
			skills: JSON.stringify({
				上級: [{ name: 'Leadership', color: '#4285F4' }],
				中級: [{ name: 'Teamwork', color: '#FBBC05' }],
			}),
			it_skills: JSON.stringify({
				上級: [{ name: 'Python', color: '#34A853' }],
				初級: [{ name: 'Docker', color: '#EA4335' }],
			}),
			other_information: 'Other custom information.',
			semester: '4',
			partner_university: 'Example University',
			partner_university_credits: 60,
			deliverables: JSON.stringify([
				{
					title: 'Custom Project',
					link: 'https://preview.redd.it/hyprland-fighting-against-my-school-to-stay-on-arch-btw-v0-hpdvugqi1vme1.png?width=1920&format=png&auto=webp&s=d42c9ec49e7626b261c89feac077f1f2ac8ac0fb',
					description: 'Description here.',
				},
			]),
			jlpt: JSON.stringify({ highest: 'N2', jlptlist: [] }),
			ielts: JSON.stringify({ highest: '7.5', ieltslist: [] }),
			jdu_japanese_certification: JSON.stringify({ highest: 'N2' }),
			japanese_speech_contest: 'First Place',
			it_contest: 'Champion',
			active: true,
			kintone_id: 12345,
			createdAt: new Date(),
			updatedAt: new Date(),
		})

		for (let i = 0; i < 10; i++) {
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash('password123', salt)

			// Example it_skills and skills data format
			const itSkills = {
				上級: [
					{ name: 'React', color: '#039be5' },
					{ name: 'Vue', color: '#2e7d32' },
				],
				中級: [{ name: 'MySQL', color: '#00838f' }],
				初級: [{ name: 'Redis', color: '#d32f2f' }],
			}

			const skills = {
				上級: [{ name: 'Public Speaking', color: '#ff5722' }],
				中級: [{ name: 'Project Management', color: '#673ab7' }],
				初級: [{ name: 'Graphic Design', color: '#ff9800' }],
			}

			const deliverables = [
				{
					title: 'title1',
					link: 'link1',
					codeLink: 'link1',
					imageLink: 'link1',
					description: 'description1',
					role: ['role1', 'role2'],
				},
				{
					title: 'title1',
					link: 'link2',
					codeLink: 'link2',
					imageLink: 'link2',
					description: 'description2',
					role: ['role1', 'role2'],
				},
			]

			const jlptLevels = ['N1', 'N2', 'N3', 'N4', 'N5']
			const jlpt = jlptLevels[Math.floor(Math.random() * jlptLevels.length)]

			let jlptString = {
				highest: jlpt,
				jlptlist: [
					{ level: 'n5', date: '2022-12' },
					{ level: 'n5', date: '2020-12' },
				],
			}

			let ieltsString = {
				highest: (faker.datatype.number({ min: 12, max: 16 }) / 2).toString(),
				ieltslist: [
					{ level: '6.5', date: '2022-12' },
					{ level: '6.0', date: '2020-12' },
				],
			}
			// Generate an array of image links for the gallery
			const gallery = Array.from(
				{ length: 5 },
				() =>
					`https://picsum.photos/300/200?random=${Math.floor(Math.random() * 101)}`
			)

			studentsData.push({
				email: faker.internet.email(),
				password: hashedPassword,
				student_id: faker.datatype
					.number({ min: 10000000, max: 99999999 })
					.toString(),
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				date_of_birth: faker.date.past(),
				photo:
					'https://randomuser.me/api/portraits/med/men/' +
					parseInt(Math.random() * 100) +
					'.jpg',
				self_introduction: faker.lorem.paragraph(),
				hobbies: faker.random.words(),
				gallery: JSON.stringify(gallery), // Store as JSON string in seed
				skills: JSON.stringify(skills), // Store as JSON string in seed
				it_skills: JSON.stringify(itSkills), // Store as JSON string in seed
				other_information: faker.lorem.paragraph(),
				semester: faker.datatype.number({ min: 1, max: 9 }).toString(),
				partner_university: faker.company.companyName(),
				partner_university_credits: faker.datatype.number({ min: 0, max: 124 }),
				deliverables: JSON.stringify(deliverables),
				jlpt: JSON.stringify(jlptString),
				ielts: JSON.stringify(ieltsString),
				jdu_japanese_certification: JSON.stringify(jlptString),
				japanese_speech_contest: faker.random.word(),
				it_contest: faker.random.word(),
				active: true,
				kintone_id: faker.datatype.number(),
				createdAt: new Date(),
				updatedAt: new Date(),
			})
		}

		await queryInterface.bulkInsert('Students', studentsData, {})
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Students', null, {})
	},
}
