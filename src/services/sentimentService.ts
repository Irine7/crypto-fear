import { getFearAndGreedIndex } from "../clients/alternativeMeClient";
import { getRedditSentiment } from "../clients/redditClient";
import { getTwitterSentiment } from "../clients/twitterClient";
import { readDb, writeDb } from "../db";

export const getSentimentSummary = async () => {
	const updatedHistory = await readDb();

	const [alternativeMe, reddit, twitter] = await Promise.allSettled([
		getFearAndGreedIndex(),
		getRedditSentiment(),
		getTwitterSentiment(),
	]);

	// 1. Фильтруем только успешные результаты
	const successfulResults = [alternativeMe, reddit, twitter].filter((result) => {
		return result.status === 'fulfilled';
	}) as PromiseFulfilledResult<any>[];

	// 2. Если ни один запрос не удался, возвращаем 0
	if (successfulResults.length === 0) return 0;

	// 3. Вычисляем сумму баллов
	const totalScore = successfulResults.reduce((sum, current) => {
		return sum + current.value.score;
	}, 0);

	// 4. Вычисляем средний балл
	const averageScore = Math.round(totalScore / successfulResults.length);

	// 5. Определяем описание на основе среднего балла
	let description = '';
	if (averageScore < 25) {
		description = 'Extreme Fear';
	} else if (averageScore < 50) {
		description = 'Fear';
	} else if (averageScore < 75) {
		description = 'Greed';
	} else {
		description = 'Extreme Greed';
	}

	updatedHistory.push({
		score: averageScore,
		description: description,
		timestamp: new Date().toISOString(),
	});

	await writeDb(updatedHistory);
	return {
		score: averageScore,
		description: description,
		timestamp: new Date().toISOString(),
	};
};