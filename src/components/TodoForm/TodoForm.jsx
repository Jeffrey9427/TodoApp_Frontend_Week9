import { useState } from 'react'  
import './TodoForm.css'
import { Cookies } from 'react-cookie';

export function TodoForm({addTodo}) {
    const [newItem, setNewItem] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();    // prevent website from refreshing
    
        if (!newItem.trim()) {
            alert("Todo cannot be empty");
            return;
        }

        try {
            // Get userId from cookies session
            const cookies = new Cookies();
            const user_id = cookies.get('user_id');

            addTodo(user_id, newItem);

            setNewItem("");
        } catch (error) {
            alert(error);
        }
    }
    
    return (
        <form className="new-item-form px-12 py-6 bg-white rounded-lg shadow-xl">
            <div className="form-row">
                <label htmlFor="item" className="text-black ml-2 tracking-[.025em] font-semibold">New Item</label>
                <input type="text" id="item" value={newItem} onChange={e => setNewItem(e.target.value)} placeholder="Create a new todo..." 
                    className='border-b border-violet-700 w-50 bg-black text-slate-700 focus:outline-none'>
                </input>
            </div>  

            <div className="flex justify-center mb-2">
                <button className="btn w-60 shadow-lg" onClick={handleSubmit}>Add</button>
            </div>
        </form>
    )
}