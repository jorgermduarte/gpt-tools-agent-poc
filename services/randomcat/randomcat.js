// generate a random cat service calling the endpoint https://cataas.com/cat
import axios from 'axios';

export class RandomCatService {
    static async getRandomCat() {
        try {
            const response = await axios.get('https://cataas.com/cat', {
                responseType: 'arraybuffer'
            });
            return Buffer.from(response.data, 'binary').toString('base64');
        } catch (error) {
            console.error('Error fetching random cat:', error);
            throw new Error('Failed to fetch random cat image');
        }
    }
}
