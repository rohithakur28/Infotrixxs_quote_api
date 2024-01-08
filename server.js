const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const quotes = require('./quotes.json');
let quotesLen = quotes.length;
// GET : get quote of the day
app.get('/', (req, res) => {
    const quoteIndex = Math.floor(Math.random()*quotesLen);
    res.send(quotes[quoteIndex]);
});
// POST : add new quote
app.post('/add', (req, res) => {
    const newQuote = req.body;
    quotes.push(newQuote);
    quotesLen = quotes.length;
    res.send({ message: 'Quote added successfully', quote: newQuote });
});
// PUT : update existing quote by index
app.put('/update/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const updatedQuote = req.body;
    if (index >= 0 && index < quotesLen) {
        quotes[index] = updatedQuote;
        res.send({ message: 'Quote updated successfully', quote: updatedQuote });
    } else {
        res.status(404).send({ message: 'Quote not found' });
    }
});
// DELETE : remove quote by index
app.delete('/del/:index', (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < quotesLen) {
        const deletedQuote = quotes.splice(index, 1)[0];
        quotesLen = quotes.length;
        res.send({ message: 'Quote deleted successfully', quote: deletedQuote });
    } else {
        res.status(404).send({ message: 'Quote not found' });
    }
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});