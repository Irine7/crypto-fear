import path from 'path';
import { promises as fs } from 'fs';

const dbPath = path.join(process.cwd(), 'data.json');

// Читаем ДБ:
export const readDb = async () => {
	try {
		const rawData = await fs.readFile(dbPath, 'utf-8');
		return JSON.parse(rawData); // Парсим JSON
	} catch (error) {
		// Если файл пустой или его нет, возвращаем пустой массив:
		return [];
	}
};

export const writeDb = async (data: any[]) => {
	const jsonString = JSON.stringify(data, null, 2);
	await fs.writeFile(dbPath, jsonString, 'utf-8');
};