const axios = require('axios');
const ALPHA = process.env.ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";


async function  fetchStockData(symbol) {
    if (!ALPHA) {
        throw new Error('Missing ALPHA_VANTAGE_API_KEY');
    }
    const url = `${BASE_URL}${encodeURIComponent(symbol)}&apikey=${ALPHA}`;
    const response = await axios.get(url).catch((e) => {
        throw new Error(e.response?.data?.Note || e.message || 'Request failed');
    });

    const g = response.data&& response.data['Global Quote'];
    
    if(!g) throw new Error('Invalid data format from API');
    else return{
        symbol: g['01. symbol'],
        price: parseFloat(g['05. price']),
        raw: g,
        timestamp: new Date().toISOString()
    };


}


module.exports = {fetchStockData};