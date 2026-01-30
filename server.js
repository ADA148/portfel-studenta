const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const MY_SECRET_TOKEN = "student-projekt-2025";
const MONGO_URI = "mongodb+srv://admin:haslo@cluster0.im6osns.mongodb.net/?appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Połączono z MongoDB! 🚀"))
    .catch(err => console.error(err));

const ExpenseSchema = new mongoose.Schema({
    title: String,
    amount: Number,
    date: String
});
const Expense = mongoose.model('Expense', ExpenseSchema);

app.use((req, res, next) => {
    const userToken = req.headers['authorization'];
    if (userToken === MY_SECRET_TOKEN) {
        next();
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
});

app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.post('/api/expenses', async (req, res) => {
    try {
        const newExpense = new Expense(req.body);
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (err) {
        res.status(400).json(err);
    }
});

app.put('/api/expenses/:id', async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedExpense);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.delete('/api/expenses/:id', async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));