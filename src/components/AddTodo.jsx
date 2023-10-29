import { useState } from "react"
import { useDispatch } from "react-redux"
import { addTodo } from "../redux/reducers/todo-reducers"

function AddTodo() {
    const dispatch = useDispatch()
    const [input, setInput] = useState("")

    const handleAdd = (event) => {
        event.preventDefault()
        let newTodo = {
            value: input,
            completed: false
        }
        setInput("")
        dispatch(addTodo(newTodo))
    }

    return (
        <div className="mb-6">
            <form onSubmit={handleAdd} className="flex justify-center items-center space-x-6">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} required className="w-full h-10 border-2 border-gray-600 px-2 outline-none rounded-md" />
                <button type="submit" className="h-10 px-4 text-white font-semibold border-2 border-gray-600 bg-purple-500 rounded-md">Add</button>
            </form>
        </div>
    )
}

export default AddTodo