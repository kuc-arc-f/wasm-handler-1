import React, { useState, useEffect } from 'react';
//import axios from 'axios';
import { z } from 'zod';
import  Head from "../components/Head";
import ApiUtil from './lib/ApiUtil'

// Zod バリデーションスキーマ
const todoSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
});

let API_URL=""
async function getSysApiUrl(){
  try{
    let ret = "";
    const response = await fetch(`/api/common/get_sys_items`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }
    );
    if (!response.ok) throw new Error("error, getSystemParam");
    const data = await response.json();
    //console.log(data.data);
    ret = data.data.api_url;
    return ret;
  } catch (err) {
    console.error(err);
  }
}

function App() {
  const [todos, setTodos] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [errors, setErrors] = useState({});

  const fetchTodos = async () => {
    try {
      const data = await ApiUtil.get("/api/todo11" , {})
      console.log(data);
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };
  // TODOの取得
  useEffect(() => {
    fetchTodos();
  }, [searchQuery]);

  // TODOの追加
  const handleAddTodo = async (newTodo) => {
    try {
      // バリデーション
      todoSchema.parse(newTodo);
      setErrors({});
      const data = await ApiUtil.post("/api/todo11" , newTodo)
      setIsAddModalOpen(false);
      await fetchTodos()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Error adding todo:', error);
      }
    }
  };

  // TODOの更新
  const handleUpdateTodo = async (updatedTodo) => {
    try {
      // バリデーション
      todoSchema.parse(updatedTodo);
      setErrors({});
      const data = await ApiUtil.post("/api/todo11/update" , updatedTodo)
      await fetchTodos()
      setIsEditModalOpen(false);
      setEditingTodo(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error('Error updating todo:', error);
      }
    }
  };

  // TODOの削除
  const handleDeleteTodo = async (id) => {
    try {
      const data = await ApiUtil.post("/api/todo11/delete" , {id: id})
      await fetchTodos()
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // ダイアログを開く（追加）
  const openAddModal = () => {
    setIsAddModalOpen(true);
    setErrors({});
  };

  // ダイアログを閉じる（追加）
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setErrors({});
  };

  // ダイアログを開く（編集）
  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
    setErrors({});
  };

  // ダイアログを閉じる（編集）
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
    setErrors({});
  };

  return (
  <>
    <Head />
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo11</h1>

      {/* 検索バー */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="TODOを検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-full"
        />
      </div>

      {/* 追加ボタン */}
      <button onClick={openAddModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
        TODOを追加
      </button>

      {/* TODOリスト */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between border-b border-gray-300 py-2">
            <span className={todo.completed ? 'line-through text-gray-500' : ''}>
              {todo.title}
            </span>
            <div>
              <button onClick={() => openEditModal(todo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">
                編集
              </button>
              <button onClick={() => handleDeleteTodo(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* 追加ダイアログ */}
      {isAddModalOpen && (
        <div id="dialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">TODOを追加</h2>
            <AddTodoForm onAddTodo={handleAddTodo} onClose={closeAddModal} errors={errors} />
          </div>
        </div>
      )}

      {/* 編集ダイアログ */}
      {isEditModalOpen && editingTodo && (
        <div id="dialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">TODOを編集</h2>
            <EditTodoForm todo={editingTodo} onUpdateTodo={handleUpdateTodo} onClose={closeEditModal} errors={errors} />
          </div>
        </div>
      )}
    </div>  
  </>

  );
}

// 追加フォームコンポーネント
function AddTodoForm({ onAddTodo, onClose, errors }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTodo({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border border-gray-300 px-3 py-2 rounded w-full ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          追加
        </button>
        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          キャンセル
        </button>
      </div>
    </form>
  );
}

// 編集フォームコンポーネント
function EditTodoForm({ todo, onUpdateTodo, onClose, errors }) {
  const [title, setTitle] = useState(todo.title);
  const [completed, setCompleted] = useState(todo.completed);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTodo({ ...todo, title, completed });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">タイトル</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`border border-gray-300 px-3 py-2 rounded w-full ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="completed" className="block mb-2">
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="mr-2"
          />
          完了
        </label>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          更新
        </button>
        <button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          キャンセル
        </button>
      </div>
    </form>
  );
}

export default App;
