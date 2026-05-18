// Importujemy tylko podstawowe biblioteki (bez mongoose)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const MY_SECRET_TOKEN = "student-projekt-2025";

// Nasza "sztuczna" baza danych (zwykła pusta tablica w pamięci RAM)
let fakeDatabase = [];

app.use((req, res, next) => {
    const userToken = req.headers['authorization'];
    if (userToken === MY_SECRET_TOKEN) {
        next();
    } else {
        res.status(403).json({ message: "Forbidden" });
    }
});

app.get('/api/expenses', (req, res) => {
    // Zwracamy naszą sztuczną listę
    res.json(fakeDatabase);
});

app.post('/api/expenses', (req, res) => {
    // Tworzymy unikalne ID na podstawie aktualnego czasu i dodajemy wydatek do listy
    const newExpense = { _id: Date.now().toString(), ...req.body };
    fakeDatabase.push(newExpense);
    res.status(201).json(newExpense);
});

app.put('/api/expenses/:id', (req, res) => {
    // Odsyłamy potwierdzenie aktualizacji
    res.json({ _id: req.params.id, ...req.body });
});

app.delete('/api/expenses/:id', (req, res) => {
    // Usuwamy dany wydatek ze sztucznej listy odfiltrowując go
    fakeDatabase = fakeDatabase.filter(exp => exp._id !== req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(5000, () => console.log("Serwer działa na porcie 5000 (Baza w pamięci RAM) 🚀"));
