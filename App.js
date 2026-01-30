import { useState, useEffect } from 'react';
import { fetchExpenses, createExpense, deleteExpense, updateExpense } from './api';

function App() {
    const [expenses, setExpenses] = useState([]);
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);

    // Stan dla wybranego roku i miesiąca
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
    const [selectedMonth, setSelectedMonth] = useState((new Date().getMonth() + 1).toString().padStart(2, '0'));

    const [budget, setBudget] = useState(() => {
        const saved = localStorage.getItem('user_budget');
        return saved ? Number(saved) : 2500;
    });

    const getEmoji = (text) => {
        const t = text.toLowerCase();
        if (t.includes('paliwo') || t.includes('auto') || t.includes('benzyna')) return '🚗';
        if (t.includes('jedzenie') || t.includes('obiad') || t.includes('pizza') || t.includes('zakupy')) return '🍕';
        if (t.includes('piwo') || t.includes('impreza') || t.includes('alko') || t.includes('drinki')) return '🍻';
        if (t.includes('studia') || t.includes('książki') || t.includes('ksero') || t.includes('uczelnia')) return '📚';
        if (t.includes('czynsz') || t.includes('mieszkanie') || t.includes('pokój') || t.includes('opłaty')) return '🏠';
        return '💸';
    };

    useEffect(() => {
        localStorage.setItem('user_budget', budget);
    }, [budget]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchExpenses();
                setExpenses(data);
            } catch (err) {
                console.error("Błąd pobierania danych:", err);
            }
        };
        loadData();
    }, []);

    // Filtrowanie połączone: Rok + Miesiąc
    const filteredExpenses = expenses.filter(exp => {
        if (!exp.date) return false;
        return exp.date.startsWith(`${selectedYear}-${selectedMonth}`);
    });

    const totalSpent = filteredExpenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const remaining = budget - totalSpent;
    const progress = Math.min((totalSpent / budget) * 100, 100);

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        if (!title || !amount || !expenseDate) return;

        try {
            if (editingId) {
                const updated = await updateExpense(editingId, title, Number(amount), expenseDate);
                setExpenses(expenses.map(ex => ex._id === editingId ? updated : ex));
                setEditingId(null);
            } else {
                const newItem = await createExpense(title, Number(amount), expenseDate);
                setExpenses([...expenses, newItem]);
            }
            setTitle('');
            setAmount('');
        } catch (error) {
            alert("Błąd zapisu! Sprawdź połączenie z serwerem.");
        }
    };

    const startEdit = (item) => {
        setEditingId(item._id);
        setTitle(item.title);
        setAmount(item.amount);
        setExpenseDate(item.date);
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            setExpenses(expenses.filter(item => item._id !== id));
        } catch (error) {
            console.error("Błąd usuwania:", error);
        }
    };

    return (
        <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6 font-sans text-slate-800">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/10">

                {/* NAGŁÓWEK */}
                <div className="bg-emerald-900 p-8 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Portfel Studenta</h1>

                            {/* NOWY WYBÓR OKRESU */}
                            <div className="flex items-center gap-3 mt-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] opacity-60 font-bold uppercase mb-1">Rok:</span>
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="bg-emerald-800 text-white text-sm p-2 rounded-xl outline-none border border-emerald-700 cursor-pointer hover:bg-emerald-700 transition-colors"
                                    >
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-[10px] opacity-60 font-bold uppercase mb-1">Miesiąc:</span>
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => setSelectedMonth(e.target.value)}
                                        className="bg-emerald-800 text-white text-sm p-2 rounded-xl outline-none border border-emerald-700 cursor-pointer hover:bg-emerald-700 transition-colors"
                                    >
                                        <option value="01">Styczeń</option>
                                        <option value="02">Luty</option>
                                        <option value="03">Marzec</option>
                                        <option value="04">Kwiecień</option>
                                        <option value="05">Maj</option>
                                        <option value="06">Czerwiec</option>
                                        <option value="07">Lipiec</option>
                                        <option value="08">Sierpień</option>
                                        <option value="09">Wrzesień</option>
                                        <option value="10">Październik</option>
                                        <option value="11">Listopad</option>
                                        <option value="12">Grudzień</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-xs opacity-70 uppercase tracking-widest mb-1 font-bold">Dostępne środki:</p>
                            <p className={`text-4xl font-black ${remaining < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                {remaining.toFixed(2)} zł
                            </p>
                        </div>
                    </div>

                    <div className="bg-emerald-950 rounded-full h-4 w-full p-1 border border-emerald-800 shadow-inner overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${remaining < 0 ? 'bg-red-500' : 'bg-emerald-400'}`}
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-[11px] mt-3 opacity-60 font-bold uppercase tracking-tighter">
                        <span>Wydano: {totalSpent.toFixed(2)} zł</span>
                        <span>Limit miesięczny: {budget} zł</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2">

                    {/* FORMULARZ */}
                    <div className="p-10 bg-slate-50/50 border-r border-gray-100">
                        <h2 className="text-emerald-900 font-black mb-6 text-lg uppercase tracking-tight">
                            {editingId ? "Edytuj wpis" : "Nowy wpis"}
                        </h2>

                        <div className="mb-8 flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border border-emerald-100">
                            <span className="text-xs font-bold text-emerald-800 uppercase">Twój limit (zł):</span>
                            <input
                                type="number"
                                className="bg-transparent text-right font-black text-emerald-900 text-xl outline-none w-32 border-b-2 border-emerald-100 focus:border-emerald-600 transition-all"
                                value={budget}
                                onChange={(e) => setBudget(Number(e.target.value))}
                            />
                        </div>

                        <form onSubmit={handleAddOrUpdate} className="space-y-4">
                            <input
                                className="w-full bg-white border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm transition-all font-medium"
                                placeholder="Co kupiłaś?"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    className="bg-white border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm font-medium"
                                    type="number"
                                    placeholder="Kwota"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="bg-white border border-gray-200 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-emerald-600 shadow-sm text-sm font-medium"
                                    value={expenseDate}
                                    onChange={e => setExpenseDate(e.target.value)}
                                />
                            </div>
                            <button className={`w-full ${editingId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-700 hover:bg-emerald-800'} text-white font-black py-5 rounded-2xl shadow-xl transition-all active:scale-95 text-sm uppercase tracking-widest`}>
                                {editingId ? "Zapisz zmiany" : "Zatwierdź wydatek"}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditingId(null); setTitle(''); setAmount(''); }}
                                    className="w-full text-gray-400 text-xs uppercase tracking-widest mt-2 font-bold hover:text-gray-600 underline"
                                >
                                    Anuluj edycję
                                </button>
                            )}
                        </form>
                    </div>

                    {/* LISTA WYDATKÓW */}
                    <div className="p-10 bg-white">
                        <h2 className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            Operacje: {selectedMonth}/{selectedYear}
                        </h2>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {filteredExpenses.length === 0 ? (
                                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100 text-gray-400 italic text-sm">
                                    Brak wpisów dla wybranego okresu 🍃
                                </div>
                            ) : (
                                filteredExpenses.map(item => (
                                    <div key={item._id} className="flex justify-between items-center p-5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-emerald-200 hover:bg-white transition-all group shadow-sm hover:shadow-md">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
                                                {getEmoji(item.title)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-700 text-sm tracking-tight">{item.title}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">{item.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-5">
                                            <span className="font-black text-emerald-900 text-base">-{item.amount} zł</span>
                                            <div className="flex gap-2">
                                                <button onClick={() => startEdit(item)} className="opacity-0 group-hover:opacity-100 text-blue-300 hover:text-blue-500 transition-all p-1 font-bold">✏️</button>
                                                <button onClick={() => handleDelete(item._id)} className="opacity-0 group-hover:opacity-100 text-red-300 hover:text-red-500 transition-all p-1 font-bold">🗑️</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;