import axios from 'axios';


const api = axios.create({
    baseURL: 'http://localhost:5000/api/expenses',
    headers: {
        'Authorization': 'student-projekt-2025' 
    }
});


export const fetchExpenses = async () => {
    const response = await api.get('/');
    return response.data;
};


export const createExpense = async (title, amount, date) => {
    const response = await api.post('/', { title, amount, date });
    return response.data;
};


export const deleteExpense = async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
};


export const updateExpense = async (id, title, amount, date) => {
    const response = await api.put(`/${id}`, { title, amount, date });
    return response.data;
};