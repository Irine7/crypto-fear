import axios from "axios";

interface AlternativeMeData {
	data: {
		value: string,
		value_classification: string,
		timestamp: string,
		time_until_update: string,
	}[];
}

export const getFearAndGreedIndex = async () => {
	const url = 'https://api.alternative.me/fng/';

	try {
		const response = await axios.get<AlternativeMeData>(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
				'Accept': 'application/json',
			},
			timeout: 5000,
		});

		const data = response.data.data[0];
		if (!data) {
			throw new Error('No data received from Alternative.me API');
		}

		const score = Number(data.value);
		if (isNaN(score)) {
			throw new Error('Invalid score received from Alternative.me API');
		}

		const description = data.value_classification;
		if (!description) {
			throw new Error('Invalid description received from Alternative.me API');
		}

		const timestamp = data.timestamp;
		if (!timestamp) {
			throw new Error('Invalid timestamp received from Alternative.me API');
		}

		const timeUntilUpdate = data.time_until_update;
		if (!timeUntilUpdate) {
			throw new Error('Invalid time_until_update received from Alternative.me API');
		}

		return {
			score: score,
			description: description,
			timestamp: timestamp,
			timeUntilUpdate: timeUntilUpdate,
		};

	} catch (error) {
		console.error('Alternative.me API Error:', error);
		throw error;
	}
};