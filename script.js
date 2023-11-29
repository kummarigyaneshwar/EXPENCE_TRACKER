
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/EXPENCETRACKER', { useNewUrlParser: true, useUnifiedTopology: true });


const transactionSchema = new mongoose.Schema({
    name: String,
    amount: Number,
});


const Transaction = mongoose.model('transactions', transactionSchema);


app.post('/api/transactions', async (req, res) => {
    const { name, amount } = req.body;

    try {
        // Insert the transaction into MongoDB
        const newTransaction = await Transaction.create({ name, amount });
        console.log('transactions added:', newTransaction);
        res.json(newTransaction);
    } catch (error) {
        console.error('Error adding transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
