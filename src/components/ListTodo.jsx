import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { centangTodo, deleteTodo, getTodo, addTodo, editTodo } from "../redux/reducers/todo-reducers"

function ListTodo() {
    const { todos, isLoading } = useSelector((state) => state.todo)
    const dispatch = useDispatch()
    const [input, setInput] = useState("")
    const [filter, setFilter] = useState('ALL'); // State untuk melacak filter
    const [isEditMode, setIsEditMode] = useState(false);
    const [editTodoId, setEditTodoId] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleAdd = (event) => {
        event.preventDefault()
        let newTodo = {
            value: input,
            completed: false
        }
        setInput("")
        dispatch(addTodo(newTodo))
    }

    useEffect(() => {
        dispatch(getTodo())
    }, [])

    const handleChecked = (e) => {
        const id = e.target.id;
        const isChecked = e.target.checked;
        dispatch(centangTodo(id, isChecked))
    };


    const filteredTodos = todos.filter((todo) => {
        if (filter === 'ALL') {
            return true; // Tampilkan semua data
        } else if (filter === 'ACTIVE') {
            return todo.completed == false; // Tampilkan yang belum selesai (completed: false)
        } else if (filter === 'COMPLETED') {
            return todo.completed == true; // Tampilkan yang sudah selesai (completed: true)
        }
        return false;
    });

    function modeEdit(id, value) {
        // console.log(id, value);
        setIsEditMode(true);
        setEditTodoId(id);
        setEditValue(value)
    };

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(editTodo(editTodoId, editValue))
        setIsEditMode(false);
        setEditTodoId(null);
        setEditValue("")
    }


    return (
        <div>
            <div className="mb-6">
                {isEditMode ?
                    <form onSubmit={handleEdit} className="flex justify-center items-center space-x-6">
                        <input type="text" value={editValue} onChange={(e) => setEditValue(e.target.value)} required className="w-full h-10 border-2 border-gray-600 px-2 outline-none rounded-md" />
                        <button type="submit" className="h-10 px-4 text-white font-semibold border-2 border-gray-600 bg-purple-500 rounded-md">Edit</button>
                    </form> :
                    <form onSubmit={handleAdd} className="flex justify-center items-center space-x-6">
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} required className="w-full h-10 border-2 border-gray-600 px-2 outline-none rounded-md" />
                        <button type="submit" className="h-10 px-4 text-white font-semibold border-2 border-gray-600 bg-purple-500 rounded-md">Add</button>
                    </form>
                }
            </div>
            <div className="space-y-3">
                <div className="flex space-x-6 text-sm text-white font-semibold">
                    <button className={`rounded-md px-3 py-0.5 ${filter === 'ALL' ? 'bg-green-500' : 'bg-gray-400'}`} onClick={() => setFilter('ALL')}>ALL</button>
                    <button className={`rounded-md px-3 py-0.5 ${filter === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'}`} onClick={() => setFilter('ACTIVE')}>ACTIVE</button>
                    <button className={`rounded-md px-3 py-0.5 ${filter === 'COMPLETED' ? 'bg-green-500' : 'bg-gray-400'}`} onClick={() => setFilter('COMPLETED')}>COMPLETED</button>
                </div>
                <div className="space-y-3">
                    {isLoading ? (
                        <div className="flex justify-center items-center space-x-3">
                            <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><defs><linearGradient id="mingcuteLoadingLine0" x1="50%" x2="50%" y1="5.271%" y2="91.793%"><stop offset="0%" stopColor="currentColor" /><stop offset="100%" stopColor="currentColor" stopOpacity=".55" /></linearGradient><linearGradient id="mingcuteLoadingLine1" x1="50%" x2="50%" y1="8.877%" y2="90.415%"><stop offset="0%" stopColor="currentColor" stopOpacity="0" /><stop offset="100%" stopColor="currentColor" stopOpacity=".55" /></linearGradient></defs><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="url(#mingcuteLoadingLine0)" d="M8.886.006a1 1 0 0 1 .22 1.988A8.001 8.001 0 0 0 10 17.944v2c-5.523 0-10-4.476-10-10C0 4.838 3.848.566 8.886.007Z" transform="translate(2 2.055)" /><path fill="url(#mingcuteLoadingLine1)" d="M14.322 1.985a1 1 0 0 1 1.392-.248A9.988 9.988 0 0 1 20 9.945c0 5.523-4.477 10-10 10v-2a8 8 0 0 0 4.57-14.567a1 1 0 0 1-.248-1.393Z" transform="translate(2 2.055)" /></g></svg>
                            <span>Processing...</span>
                        </div>
                    ) : (
                        filteredTodos.map(todo => (
                            <div key={todo.id} className="flex w-full items-center justify-between bg-white border border-gray-800 rounded-md px-2 py-1">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox"
                                        id={todo.id} // Mengatur ID dari checkbox
                                        checked={todo.completed}
                                        onChange={handleChecked}
                                        name=""
                                        className="w-6 h-6 checked:bg-green-400" />
                                    {todo.completed ? <span className="line-through">{todo.value}</span> : <span>{todo.value}</span>}
                                </div>
                                <div className="flex items-center text-gray-800 space-x-1">
                                    <button onClick={(e) => (e.preventDefault(), modeEdit(todo.id, todo.value))}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z" /></svg></button>
                                    <button onClick={(e) => dispatch(deleteTodo(todo.id))}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M0 0h24v24H0z" /><path fill="currentColor" d="M20 6a1 1 0 0 1 .117 1.993L20 8h-.081L19 19a3 3 0 0 1-2.824 2.995L16 22H8c-1.598 0-2.904-1.249-2.992-2.75l-.005-.167L4.08 8H4a1 1 0 0 1-.117-1.993L4 6h16zm-9.489 5.14a1 1 0 0 0-1.218 1.567L10.585 14l-1.292 1.293l-.083.094a1 1 0 0 0 1.497 1.32L12 15.415l1.293 1.292l.094.083a1 1 0 0 0 1.32-1.497L13.415 14l1.292-1.293l.083-.094a1 1 0 0 0-1.497-1.32L12 12.585l-1.293-1.292l-.094-.083zM14 2a2 2 0 0 1 2 2a1 1 0 0 1-1.993.117L14 4h-4l-.007.117A1 1 0 0 1 8 4a2 2 0 0 1 1.85-1.995L10 2h4z" /></g></svg></button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ListTodo