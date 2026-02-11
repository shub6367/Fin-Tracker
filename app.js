// server

require('dotenv').config();
const express = require('express');
const http = require('http');
const ioFactory = require('socket.io');
const { fetchStockData } = require('./stockData_poll');


const app = express();
const Server = http.createServer(app);
const io =  ioFactory( Server, { cors: { origin: "*" } });


app.use(express.static('public'));

const POLL_INTERVAL = 60 * 1000; // 1 minute

// HTTP API to fetch a single quote on demand
app.get('/api/quote', async (req, res) => {
    try {
        const symbol = (req.query.symbol || '').toUpperCase().trim();
        if (!symbol) {
            return res.status(400).json({ error: 'Query param "symbol" is required' });
        }
        const quote = await fetchStockData(symbol);
        return res.json(quote);
    } catch (err) {
        return res.status(500).json({ error: err.message || 'Failed to fetch quote' });
    }
});

const symbols = new Map();

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('subscribe', (symbol) => {
        symbol = symbol.toUpperCase();
        socket.join(symbol);
        console.log(`Socket ${socket.id} subscribed to ${symbol}`);


        if (!symbols.has(symbol)) {
            symbols.set(symbol, { subscribers: new Set([socket.id]), intervalId: null });
            // Start polling for this symbol
            const intervalId = setInterval(async () => {
                try {
                    const quote = await fetchStockData(symbol);
                    io.to(symbol).emit('price', quote);
                } catch (err) {
                    console.error('Error fetching data ', symbol, err.message);

                }

            }, POLL_INTERVAL);
            symbols.get(symbol).intervalId = intervalId;

        } else {
            symbols.get(symbol).subscribers.add(socket.id);

        }

    });


    socket.on('unsubscribe', (symbol) => {
        symbol = symbol.toUpperCase();
        socket.leave(symbol);
        if (symbols.has(symbol)) {
            const meta = symbols.get(symbol);
            meta.subscribers.delete(socket.id);
            if (meta.subscribers.size === 0) {

                clearInterval(meta.intervalId);
                symbols.delete(symbol);
            }

        }
    });

    socket.on('disconnect', () => {
        console.log('cleint disconnected;', socket.id);
        for (const [symbol, meta] of symbols.entries()) {
            meta.subscribers.delete(socket.id);
            if (meta.subscribers.size === 0) {
                clearInterval(meta.intervalId);
                symbols.delete(symbol);


            }

        }

    });

});
const PORT = process.env.PORT || 3000;
Server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});





