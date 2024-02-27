import React, { useState } from 'react';

type Todo = {
  id: number;
  name: string;
  completed: boolean;
}

const AddTodo: React.FC<{ onAdd: (name: string) => void }> = ({ onAdd }) => {
  const [todoName, setTodoName] = useState('');

  const handleAddTodo = (event: React.FormEvent) => {
    event.preventDefault();
    onAdd(todoName);
    setTodoName('');
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input type="text" value={todoName} onChange={(e) => setTodoName(e.target.value)} />
      <button className='botao'>Adicionar</button>
    </form>
  );
}

const TodoItem: React.FC<{ todo: Todo; onToggle: (id: number) => void; onDelete: (id: number) => void }> = ({ todo, onToggle, onDelete }) => {
  return (
    <div key={todo.id} className='item'>
      <input type="checkbox" checked={todo.completed} onChange={() => { onToggle(todo.id) }} />
      <span className={todo.completed ? 'completed' : ''}>{todo.name}</span>
      <button onClick={() => { onDelete(todo.id) }}>❌</button>
    </div>
  );
}

const TodoList: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const handleAddTodo = (name: string) => {
    setTodoList([...todoList, { id: todoList.length + 1, name, completed: false }]);
  }

  const handleToggleCompleted = (id: number) => {
    setTodoList(todoList.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  const handleDeleteItem = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <div className='App'>
        <h1>Monte sua Lista</h1>
        <div>
          <AddTodo onAdd={handleAddTodo} />
        </div>
      </div>

      {todoList.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggleCompleted}
          onDelete={handleDeleteItem}
        />
      ))}
    </>
  )
}

export default TodoList