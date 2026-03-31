import express from 'express';
import 'dotenv/config';
import { getSentimentSummary } from './services/sentimentService';
import { readDb } from './db';
import { initCron } from './cron';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware для JSON:
app.use(express.json());

// простой роут:
app.get("/", (req, res) => {
	res.send("Hello from Backend!");
});

// GET с возвратом JSON:
app.get("/sentiment/summary", async (req, res) => {
	try {
		const summary = await getSentimentSummary();

		// Если сервис вернул какой-то флаг ошибки (например, null)
		if (!summary) {
			return res.status(503).json({
				error: "Failed to calculate sentiment summary",
				code: 503
			});
		}
		res.json(summary);
	} catch (error) {
		res.status(500).json({
			error: "Internal server error",
			code: 500
		});

	}
});

// Получаем историю запросов из ДБ:
app.get("/sentiment/history", async (req, res) => {
	const currentHistory = await readDb();
	// Проверяем, что limit - это положительное число:
	const limit = req.query.limit ? Number(req.query.limit) : null;

	// Если лимит передали, но это не число или оно <= 0
	if (limit !== null && (isNaN(limit) || limit <= 0)) {
		return res.status(400).json({
			error: "Invalid limit parameter. It must be a positive number.",
			code: 400
		});
	}

	// Если лимит не передан, берем всю историю
	const result = limit ? currentHistory.slice(-limit) : currentHistory;
	res.json(result);
});

// запуск сервера:
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
	initCron();
});