import express from 'express'

const server = express()
const PORT = process.env.PORT || 3000

server.all('/', (_, res) => {
	try {
		res.status(200).send('Сервер работает')
		res.end()
	} catch (e) {
		console.log(e)
	}
})

function keepAlive() {
	server.listen(PORT, () => {
		console.log("Сервер работает'")
	})
}

export { keepAlive }
