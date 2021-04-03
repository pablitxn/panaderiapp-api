var fs = require('fs')
const rootDir = 'sql'
const outputFile = 'bundle.sql'

let files = [`${rootDir}/db_init.sql`]
const dirs = fs.readdirSync(rootDir)

dirs.forEach((dir) => {
	const dirPath = `${rootDir}/${dir}`
	if (fs.lstatSync(dirPath).isDirectory()) {
		fs.readdirSync(dirPath).forEach((f) => {
			const fPath = `${dirPath}/${f}`
			if (!fs.lstatSync(fPath).isDirectory()) files.push(fPath)
		})
	}
})

let output = ''
files.forEach((f) => {
	if (f.endsWith('.sql')) {
		let data = fs.readFileSync(f, 'utf8')
		if (data.substring(0, 1).charCodeAt(0) === 65279) {
			data = data.substring(1, data.length - 1)
		}

		output += `${data}\n\n\n`
	}
})

const outputPath = `${rootDir}/${outputFile}`
if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath)
fs.writeFileSync(`${outputPath}`, output, 'utf8')

console.log('Successfully Packaged SQL')
