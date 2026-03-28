import cron from "node-cron";
import { getSentimentSummary } from "./services/sentimentService";

export const initCron = () => {
	// запускаем каждые 2 минуты
	cron.schedule("*/2 * * * *", async () => {
		console.log('--- Running Scheduled Task: Syncing Sentiment Data ---');
		try {
			await getSentimentSummary();
			console.log('--- Task Completed Successfully ---');
		} catch (error) {
			console.error('--- Task Failed ---', error);
		}
	});
};