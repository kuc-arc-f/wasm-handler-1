import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import  Head from "../components/Head";
import ApiUtil from './lib/ApiUtil'

const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  content_type: z.string().min(1, { message: "Content Type is required" }),
  public_type: z.string().min(1, { message: "Public Type is required" }),
  food_orange: z.boolean().optional(),
  food_apple: z.boolean().optional(),
  food_banana: z.boolean().optional(),
  food_melon: z.boolean().optional(),
  food_grape: z.boolean().optional(),
  category_food: z.boolean().optional(),
  category_drink: z.boolean().optional(),
  category_gadget: z.boolean().optional(),
  category_sport: z.boolean().optional(),
  category_government: z.boolean().optional(),
  category_internet: z.boolean().optional(),
  category_smartphone: z.boolean().optional(),
  country_jp: z.string().optional(),
  country_en: z.string().optional(),
  prefecture_jp: z.string().optional(),
  prefecture_en: z.string().optional(),
  post_no_jp: z.string().optional(),
  post_no_en: z.string().optional(),
  address_1_jp: z.string().optional(),
  address_1_en: z.string().optional(),
  address_2_jp: z.string().optional(),
  address_2_en: z.string().optional(),
  address_other_jp: z.string().optional(),
  address_other_en: z.string().optional(),
  pub_date1: z.string().optional(),
  pub_date2: z.string().optional(),
  pub_date3: z.string().optional(),
  pub_date4: z.string().optional(),
  pub_date5: z.string().optional(),
  pub_date6: z.string().optional(),
  qty1: z.string().optional(),
  qty2: z.string().optional(),
  qty3: z.string().optional(),
  qty4: z.string().optional(),
  qty5: z.string().optional(),
  qty6: z.string().optional(),
});

//let API_URL = "http://localhost:8787";
let API_URL = "";
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
//
const App = () => {
  const [todos, setTodos] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [formData, setFormData] = useState({
      title: "",
      content: "",
      content_type: "",
      public_type: "",
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
      country_jp: "",
      country_en: "",
      prefecture_jp: "",
      prefecture_en: "",
      post_no_jp: "",
      post_no_en: "",
      address_1_jp: "",
      address_1_en: "",
      address_2_jp: "",
      address_2_en: "",
      address_other_jp: "",
      address_other_en: "",
      pub_date1: "",
      pub_date2: "",
      pub_date3: "",
      pub_date4: "",
      pub_date5: "",
      pub_date6: "",
      qty1: "",
      qty2: "",
      qty3: "",
      qty4: "",
      qty5: "",
      qty6: "",
  });

    const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await ApiUtil.get("/api/todo16" , {})
      console.log(data);
      /*
      let url = API_URL + '/api/todo16';
      console.log("url=" , url);
      if(searchQuery){
          url = `${API_URL}/api/todo16?query=${searchQuery}`
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      */
      setTodos(data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    useEffect(() => {
        fetchTodos()
    },[searchQuery])


  const openDialog = (todo = null) => {
      setFormData({
        title: todo?.title || "",
        content: todo?.content || "",
        content_type: todo?.content_type || "",
        public_type: todo?.public_type || "public",
        food_orange: todo?.food_orange || false,
        food_apple: todo?.food_apple || false,
        food_banana: todo?.food_banana || false,
        food_melon: todo?.food_melon || false,
        food_grape: todo?.food_grape || false,
        category_food: todo?.category_food || false,
        category_drink: todo?.category_drink || false,
        category_gadget: todo?.category_gadget || false,
        category_sport: todo?.category_sport || false,
        category_government: todo?.category_government || false,
        category_internet: todo?.category_internet || false,
        category_smartphone: todo?.category_smartphone || false,
        country_jp: todo?.country_jp || "",
        country_en: todo?.country_en || "",
        prefecture_jp: todo?.prefecture_jp || "",
        prefecture_en: todo?.prefecture_en || "",
        post_no_jp: todo?.post_no_jp || "",
        post_no_en: todo?.post_no_en || "",
        address_1_jp: todo?.address_1_jp || "",
        address_1_en: todo?.address_1_en || "",
        address_2_jp: todo?.address_2_jp || "",
        address_2_en: todo?.address_2_en || "",
        address_other_jp: todo?.address_other_jp || "",
        address_other_en: todo?.address_other_en || "",
        pub_date1: todo?.pub_date1 || "",
        pub_date2: todo?.pub_date2 || "",
        pub_date3: todo?.pub_date3 || "",
        pub_date4: todo?.pub_date4 || "",
        pub_date5: todo?.pub_date5 || "",
        pub_date6: todo?.pub_date6 || "",
        qty1: todo?.qty1 || "",
        qty2: todo?.qty2 || "",
        qty3: todo?.qty3 || "",
        qty4: todo?.qty4 || "",
        qty5: todo?.qty5 || "",
        qty6: todo?.qty6 || "",
    });
    setEditTodoId(todo ? todo.id : null);
    //console.log(formData);
    setIsDialogOpen(true);
    setErrors({});
  };


  const closeDialog = () => {
    setIsDialogOpen(false);
      setErrors({});
  };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const result = todoSchema.safeParse(formData);
      if (!result.success) {
          const formattedErrors = result.error.flatten().fieldErrors;
          setErrors(formattedErrors);
          console.error(formattedErrors);
          return;
      } else {
        setErrors({});
      }


    try {
      let response;
      console.log("editTodoId=", editTodoId);
      if (editTodoId) {
        formData.id = editTodoId;
        const data = await ApiUtil.post("/api/todo16/update" , formData)
        /*
        response = await fetch(`${API_URL}/api/todo16/${editTodoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        */
      } else {
        const data = await ApiUtil.post("/api/todo16" , formData)
        /*
        response = await fetch(API_URL + '/api/todo16', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        */
      }
      /*
        if (!response.ok) {
            const errorData = await response.json();
             if(errorData && errorData.error){
                  throw new Error(errorData.error);
                } else {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
        }
      */

        fetchTodos();
        closeDialog();


    } catch (error) {
      console.error('Failed to save todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await ApiUtil.post("/api/todo16/delete" , {id: id})
      await fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };


    const renderForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} 
            className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.title ? 'border-red-500' : '' }`} />
              {errors.title && <p className="mt-2 text-sm text-red-500">{errors.title[0]}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <textarea name="content" value={formData.content} onChange={handleInputChange} className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.content ? 'border-red-500' : '' }`} />
             {errors.content && <p className="mt-2 text-sm text-red-500">{errors.content[0]}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Content Type</label>
            <input type="text" name="content_type" value={formData.content_type} onChange={handleInputChange} 
            className={`mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${errors.content_type ? 'border-red-500' : '' }`} />
            {errors.content_type && <p className="mt-2 text-sm text-red-500">{errors.content_type[0]}</p>}
        </div>
        <div>
            <label className="block text-sm font-medium text-gray-700">Public Type</label>
            <div className="mt-1 flex items-center">
                <input type="radio" name="public_type" value="public" checked={formData.public_type === 'public'} onChange={handleInputChange} className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label className="text-sm text-gray-700">公開</label>
                <input type="radio" name="public_type" value="private" checked={formData.public_type === 'private'} onChange={handleInputChange} className="ml-4 mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label className="text-sm text-gray-700">非公開</label>
            </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Food</label>
            <div>
              <label className="inline-flex items-center">
                <input type="checkbox" name="food_orange" checked={formData.food_orange} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700">Orange</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input type="checkbox" name="food_apple" checked={formData.food_apple} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700">Apple</span>
              </label>
              <label className="inline-flex items-center ml-4">
                <input type="checkbox" name="food_banana" checked={formData.food_banana} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700">Banana</span>
              </label>
               <label className="inline-flex items-center ml-4">
                <input type="checkbox" name="food_melon" checked={formData.food_melon} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700">Melon</span>
              </label>
               <label className="inline-flex items-center ml-4">
                <input type="checkbox" name="food_grape" checked={formData.food_grape} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                <span className="ml-2 text-gray-700">Grape</span>
              </label>
            </div>
          </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <div>
                    <label className="inline-flex items-center">
                        <input type="checkbox" name="category_food" checked={formData.category_food} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-gray-700">Food</span>
                    </label>
                     <label className="inline-flex items-center ml-4">
                        <input type="checkbox" name="category_drink" checked={formData.category_drink} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-gray-700">Drink</span>
                    </label>
                     <label className="inline-flex items-center ml-4">
                        <input type="checkbox" name="category_gadget" checked={formData.category_gadget} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-gray-700">Gadget</span>
                    </label>
                    <label className="inline-flex items-center ml-4">
                        <input type="checkbox" name="category_sport" checked={formData.category_sport} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-gray-700">Sport</span>
                    </label>
                      <label className="inline-flex items-center ml-4">
                        <input type="checkbox" name="category_government" checked={formData.category_government} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-gray-700">Government</span>
                    </label>
                     <label className="inline-flex items-center ml-4">
                        <input type="checkbox" name="category_internet" checked={formData.category_internet} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-gray-700">Internet</span>
                    </label>
                      <label className="inline-flex items-center ml-4">
                        <input type="checkbox" name="category_smartphone" checked={formData.category_smartphone} onChange={handleInputChange} className="form-checkbox h-4 w-4 text-indigo-600" />
                        <span className="ml-2 text-gray-700">Smartphone</span>
                    </label>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country JP</label>
              <input type="text" name="country_jp" value={formData.country_jp} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
             <div>
             <label className="block text-sm font-medium text-gray-700">Country EN</label>
            <input type="text" name="country_en" value={formData.country_en} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>
      <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Prefecture JP</label>
            <input type="text" name="prefecture_jp" value={formData.prefecture_jp} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
             <div>
             <label className="block text-sm font-medium text-gray-700">Prefecture EN</label>
            <input type="text" name="prefecture_en" value={formData.prefecture_en} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
      </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Post No JP</label>
            <input type="text" name="post_no_jp" value={formData.post_no_jp} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
             <div>
             <label className="block text-sm font-medium text-gray-700">Post No EN</label>
             <input type="text" name="post_no_en" value={formData.post_no_en} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>

     <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address 1 JP</label>
            <input type="text" name="address_1_jp" value={formData.address_1_jp} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
             <div>
             <label className="block text-sm font-medium text-gray-700">Address 1 EN</label>
            <input type="text" name="address_1_en" value={formData.address_1_en} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>
    <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Address 2 JP</label>
            <input type="text" name="address_2_jp" value={formData.address_2_jp} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
             <div>
             <label className="block text-sm font-medium text-gray-700">Address 2 EN</label>
            <input type="text" name="address_2_en" value={formData.address_2_en} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
        </div>
     <div className="grid grid-cols-2 gap-4">
          <div>
             <label className="block text-sm font-medium text-gray-700">Address Other JP</label>
            <input type="text" name="address_other_jp" value={formData.address_other_jp} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
             <div>
             <label className="block text-sm font-medium text-gray-700">Address Other EN</label>
             <input type="text" name="address_other_en" value={formData.address_other_en} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
     </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pub Date 1</label>
            <input type="date" name="pub_date1" value={formData.pub_date1} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700">Pub Date 2</label>
              <input type="date" name="pub_date2" value={formData.pub_date2} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700">Pub Date 3</label>
              <input type="date" name="pub_date3" value={formData.pub_date3} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700">Pub Date 4</label>
             <input type="date" name="pub_date4" value={formData.pub_date4} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700">Pub Date 5</label>
              <input type="date" name="pub_date5" value={formData.pub_date5} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
             <label className="block text-sm font-medium text-gray-700">Pub Date 6</label>
            <input type="date" name="pub_date6" value={formData.pub_date6} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
       </div>

    <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">qty1</label>
           <input type="text" name="qty1" value={formData.qty1} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">qty2</label>
              <input type="text" name="qty2" value={formData.qty2} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700">qty3</label>
              <input type="text" name="qty3" value={formData.qty3} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
               <label className="block text-sm font-medium text-gray-700">qty4</label>
              <input type="text" name="qty4" value={formData.qty4} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
              <label className="block text-sm font-medium text-gray-700">qty5</label>
             <input type="text" name="qty5" value={formData.qty5} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
           <div>
            <label className="block text-sm font-medium text-gray-700">qty6</label>
              <input type="text" name="qty6" value={formData.qty6} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
           </div>
       </div>


        <div className="flex justify-end">
            <button type="button" onClick={closeDialog} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Save</button>
        </div>
    </form>
);


    return (
      <>
        <Head />
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">TODO App</h1>
            <div className="mb-4 flex justify-between items-center">
                <input
                    type="text"
                    placeholder="Search todos..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border p-2 rounded"
                />
                <button onClick={() => openDialog()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Todo</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Content</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo) => (
                            <tr key={todo.id} className="border-b">
                                <td className="px-4 py-2">{todo.title}</td>
                                <td className="px-4 py-2">{todo.content}</td>
                                <td className="px-4 py-2">
                                    <button onClick={() => openDialog(todo)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                                    <button onClick={() => handleDelete(todo.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-xl font-bold mb-4">{editTodoId ? 'Edit Todo' : 'Add Todo'}</h2>
                       {renderForm()}
                    </div>
                </div>
            )}
        </div>
      </>
    );
};

export default App;