import React, { useState , useEffect } from 'react';
//import { Plus, Edit, Trash2, X } from 'lucide-react';

import Head from '../components/Head'
import { sheetGetItems } from './SheetTodo/dataUtil';
let appSheetURL = "";
let sysParams = {};

const CrudApp = () => {
  const [items, setItems] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    content_type: '',
    public_type: 'public',
    food_orange: false,
    food_apple: false,
    food_banana: false,
    food_melon: false,
    food_grape: false,
    category_food: false,
    category_drink: false,
    category_gadget: false,
    category_sport: false,
    category_government: false,
    category_internet: false,
    category_smartphone: false,
    country_jp: '',
    country_en: '',
    prefecture_jp: '',
    prefecture_en: ''
  });

  useEffect(() => {
    const fetchTodos = async () => {
      try{
        const response = await fetch("/get_sheet_list"); 
        if(response.ok === false){
          throw new Error("Error, response <> OK:");
        }
        const json = await response.json();
        //console.log(json.data);
        const values = json.data.values
        const data = sheetGetItems(values)
        console.log(data);
        setItems(data);
      }catch(e){
        console.error(e);
      }
    };
    fetchTodos();
  }, []);

  const resetFormData = () => {
    setFormData({
      title: '',
      content: '',
      content_type: '',
      public_type: 'public',
      food_orange: false,
      food_apple: false,
      food_banana: false,
      food_melon: false,
      food_grape: false,
      category_food: false,
      category_drink: false,
      category_gadget: false,
      category_sport: false,
      category_government: false,
      category_internet: false,
      category_smartphone: false,
      country_jp: '',
      country_en: '',
      prefecture_jp: '',
      prefecture_en: ''
    });
  };

  const openCreateDialog = () => {
    resetFormData();
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item) => {
    setFormData({ ...item });
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingItem(null);
    resetFormData();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert('タイトルを入力してください');
      return;
    }
    
    if (editingItem) {
      // 編集
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
      ));
    } else {
      // 新規作成
      const newItem = {
        ...formData,
        id: Date.now() // 簡単なID生成
      };
      setItems([...items, newItem]);
    }
    
    closeDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('削除してもよろしいですか？')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const getFoodItems = (item) => {
    const foods = [];
    if (item.food_orange) foods.push('オレンジ');
    if (item.food_apple) foods.push('りんご');
    if (item.food_banana) foods.push('バナナ');
    if (item.food_melon) foods.push('メロン');
    if (item.food_grape) foods.push('ぶどう');
    return foods.join(', ');
  };

  const getCategoryItems = (item) => {
    const categories = [];
    if (item.category_food) categories.push('食べ物');
    if (item.category_drink) categories.push('飲み物');
    if (item.category_gadget) categories.push('ガジェット');
    if (item.category_sport) categories.push('スポーツ');
    if (item.category_government) categories.push('政府');
    if (item.category_internet) categories.push('インターネット');
    if (item.category_smartphone) categories.push('スマートフォン');
    return categories.join(', ');
  };

  return (
  <>
    <Head />
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">SheetApp TODO</h1>
            <button
              onClick={openCreateDialog}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              新規作成
            </button>
          </div>
          <div className="mx-2 mb-2">
            <a href={appSheetURL}
            >[ Edit ]</a> 
          </div>

          {/* アイテム一覧 */}
          <div className="grid gap-4">
            {items.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">データがありません</p>
                <p className="text-sm">「新規作成」ボタンからアイテムを追加してください</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">ID:</span>
                          <p className="text-gray-800">{item.id}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => openEditDialog(item)}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition-colors"
                      > Show
                      </button>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ダイアログ */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingItem ? 'アイテム表示' : '新規作成'}
              </h2>
              <button
                onClick={closeDialog}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
            <div className="py-2 px-4">
              <span>ID: {formData.id}</span>
            </div>

            <div className="p-6 space-y-6">
              {/* 基本情報 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">基本情報</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">タイトル</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">作成日</label>
                  <span>ID: {formData.date}</span>
                </div>
              </div>

              {/* ボタン */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>  
  </>

  );
};

export default CrudApp;