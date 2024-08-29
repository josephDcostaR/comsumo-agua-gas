import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = 'https://api.google.com/gemini/vision';  // Atualize com o URL correto

const extractMeasure = async (image: string) => {
  try {
    const response = await axios.post(GEMINI_URL, { image }, {
      headers: { 'Authorization': `Bearer ${GEMINI_API_KEY}` }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to communicate with Gemini API');
  }
};

export default { extractMeasure };
