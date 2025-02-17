import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [numbers, setNumbers] = useState(['']);
  const [result, setResult] = useState(null);
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await res.json();
      setTodos(data.slice(0, 10));
    };
    fetchTodos();
  }, []);

  const handleIncrement = () => setCount(count + 1);
  const handleDecrement = () => count > 0 && setCount(count - 1);
  const handleReset = () => setCount(0);

  const handleCalculator = (operation) => {
    const parsedNumbers = numbers.map(num => parseFloat(num)).filter(num => !isNaN(num));
    if (parsedNumbers.length === 0) {
      alert("Please enter valid numbers.");
      return;
    }
    let calcResult;
    switch (operation) {
      case 'add':
        calcResult = parsedNumbers.reduce((acc, num) => acc + num, 0);
        break;
      case 'subtract':
        calcResult = parsedNumbers.reduce((acc, num) => acc - num);
        break;
      case 'multiply':
        calcResult = parsedNumbers.reduce((acc, num) => acc * num, 1);
        break;
      case 'divide':
        calcResult = parsedNumbers.reduce((acc, num) => (num === 0 ? NaN : acc / num));
        if (isNaN(calcResult)) {
          alert("Cannot divide by zero");
          return;
        }
        break;
      default:
        return;
    }
    setResult(calcResult);
  };

  const addNumberField = () => {
    setNumbers([...numbers, '']);
  };

  const removeNumberField = (index) => {
    const updatedNumbers = numbers.filter((_, i) => i !== index);
    setNumbers(updatedNumbers);
  };

  const handleNumberChange = (index, value) => {
    const updatedNumbers = [...numbers];
    updatedNumbers[index] = value;
    setNumbers(updatedNumbers);
  };

  const handleAddTodo = () => {
    if (todoInput.trim()) {
      const newTodo = { id: todos.length + 1, title: todoInput, completed: false };
      setTodos([newTodo, ...todos]);
      setTodoInput('');
    }
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <div className="glass-card">
        <div className="counter">
          <div className="counter-buttons" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button className="btn" onClick={handleIncrement}>Increment</button>
            <button className="btn" onClick={handleDecrement}>Decrement</button>
          </div>
          <button className="btn reset" style={{ marginTop: '10px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }} onClick={handleReset}>Reset</button>
          <p>Count: {count}</p>
        </div>
      </div>

      <div className="glass-card">
        <h2>Calculator</h2>
        <div className="calculator">
          {numbers.map((num, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="number"
                placeholder={`Enter number ${index + 1}`}
                value={num}
                onChange={(e) => handleNumberChange(index, e.target.value)}
              />
              <button className="delete-btn" onClick={() => removeNumberField(index)}>Remove</button>
            </div>
          ))}
          <button className="btn" onClick={addNumberField}>Add Input</button>
          <div className="calc-buttons">
            <button className="btn" onClick={() => handleCalculator('add')}>Add</button>
            <button className="btn" onClick={() => handleCalculator('subtract')}>Subtract</button>
            <button className="btn" onClick={() => handleCalculator('multiply')}>Multiply</button>
            <button className="btn" onClick={() => handleCalculator('divide')}>Divide</button>
          </div>
          <p>Result: {result}</p>
        </div>
      </div>

      <div className="glass-card">
        <h2>To-Do List</h2>
        <input
          type="text"
          placeholder="Add a new to-do"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button className="btn" onClick={handleAddTodo}>Add Todo</button>
        <div className="todo-list">
          {todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <span className={todo.completed ? 'completed' : ''}>{todo.title}</span>
              <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;