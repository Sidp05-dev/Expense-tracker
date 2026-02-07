import { useEffect, useState } from "react";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editAmount, setEditAmount] = useState("");
const [editCategory, setEditCategory] = useState("");
const [title, setTitle] = useState("");
const [amount, setAmount] = useState("");
const [category, setCategory] = useState("");
const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());




  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error(err));
  }, []);
  console.log("EXPENSES:", expenses);
  const deleteExpense = async (id) => {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
    });
    setExpenses(expenses.filter((expense) => expense._id !== id));
  };
  const updateExpense = async (id) => {
    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editTitle,
        amount: editAmount,
        category: editCategory,
      }),
    });
  
    setEditingId(null);
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };
  const addExpense = async (e) => {
    e.preventDefault();
  
    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount,
        category,
      }),
    });
  
    // clear inputs
    setTitle("");
    setAmount("");
    setCategory("");
  
    // refresh expenses
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  };
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );
  const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthlyTotal = expenses.reduce((sum, expense) => {
  const expenseDate = new Date(expense.date);

  if (
    expenseDate.getMonth() === currentMonth &&
    expenseDate.getFullYear() === currentYear
  ) {
    return sum + Number(expense.amount);
  }

  return sum;
}, 0);
const today = new Date();

const dailyTotal = expenses.reduce((sum, expense) => {
  const expenseDate = new Date(expense.date);

  const isSameDay =
    expenseDate.getDate() === today.getDate() &&
    expenseDate.getMonth() === today.getMonth() &&
    expenseDate.getFullYear() === today.getFullYear();

  return isSameDay ? sum + Number(expense.amount) : sum;
}, 0);

const selectedMonthTotal = expenses.reduce((sum, expense) => {
  const expenseDate = new Date(expense.date);

  if (
    expenseDate.getMonth() === selectedMonth &&
    expenseDate.getFullYear() === new Date().getFullYear()
  ) {
    return sum + Number(expense.amount);
  }

  return sum;
}, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Expense Tracker</h1>
      <label>
  Select Month:{" "}
  <select
    value={selectedMonth}
    onChange={(e) => setSelectedMonth(Number(e.target.value))}
  >
    <option value={0}>January</option>
    <option value={1}>February</option>
    <option value={2}>March</option>
    <option value={3}>April</option>
    <option value={4}>May</option>
    <option value={5}>June</option>
    <option value={6}>July</option>
    <option value={7}>August</option>
    <option value={8}>September</option>
    <option value={9}>October</option>
    <option value={10}>November</option>
    <option value={11}>December</option>
  </select>
</label>
<h3>Total Expense: ₹{totalExpense}</h3>
<h3>This Month: ₹{monthlyTotal}</h3>
<h3>Today: ₹{dailyTotal}</h3>
<h3>Selected Month Total: ₹{selectedMonthTotal}</h3>

<form onSubmit={addExpense} style={{ marginBottom: "20px" }}>

  <input
    placeholder="Title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    required
  />
  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
    required
  />
  <input
    placeholder="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    required
  />
  <button type="submit">➕ Add</button>
</form>

<h2>Expenses</h2>

  
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id} style={{ marginBottom: "8px" }}>
            {editingId === expense._id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
                <input
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />
          
                <button onClick={() => updateExpense(expense._id)}>💾</button>
                <button
  onClick={() => {
    setEditingId(null);
    setEditTitle("");
    setEditAmount("");
    setEditCategory("");
  }}
>
  ❌
</button>

              </>
            ) : (
              <>
                <strong>{expense.title}</strong> — ₹{expense.amount} ({expense.category})
                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    setEditingId(expense._id);
                    setEditTitle(expense.title);
                    setEditAmount(expense.amount);
                    setEditCategory(expense.category);
                  }}
                >
                  ✏️
                </button>
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => deleteExpense(expense._id)}
                >
                  ❌
                </button>
              </>
            )}
          </li>
          
          ))}
        </ul>
      )}
    </div>
  );
  
}

export default App;
