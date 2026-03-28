import fs from 'node:fs/promises';
import path from 'node:path';

const DB_PATH = path.resolve('data.json');

// Читаем ДБ:
export const readDb = async () => {
	try {
		const rawData = await fs.readFile(DB_PATH, 'utf-8');
		return JSON.parse(rawData); // Парсим JSON
	} catch (error) {
		// Если файл пустой или его нет, возвращаем пустой массив:
		return [];
	}
};

export const writeDb = async (data: any[]) => {
	const jsonString = JSON.stringify(data, null, 2);
	await fs.writeFile(DB_PATH, jsonString, 'utf-8');
};