export const getTwitterSentiment = async () => {
	await new Promise(resolve => setTimeout(resolve, 500))

	const randomNum = Math.floor(Math.random() * 100)
	const description = randomNum < 25 ? 'Extreme Fear' : randomNum < 50 ? 'Fear' : randomNum < 75 ? 'Greed' : 'Extreme Greed'
	const timestamp = new Date().toISOString()
	const timeUntilUpdate = '1h'

	return {
		score: randomNum,
		description: description,
		timestamp: timestamp,
		timeUntilUpdate: timeUntilUpdate,
	}
}