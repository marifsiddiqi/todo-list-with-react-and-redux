import axios from "axios"

const initialState = {
    todos: [],
    isLoading: false
}

function todoReducer(state = initialState, action) {
    switch (action.type) {
        case "START_FETCHING":
            return {
                ...state,
                isLoading: true
            }
        case "SUCCESS_GET_TODO":
            return {
                ...state,
                isLoading: false,
                todos: action.payload,
            }
        default:
            return state
    }
}



function startFetching() {
    return {
        type: "START_FETCHING"
    }
}

function successGetTodo(data) {
    return {
        type: "SUCCESS_GET_TODO",
        payload: data
    }
}

export function getTodo() {
    return async function (dispatch) {
        dispatch(startFetching())

        const { data } = await axios("https://653e59f5f52310ee6a9add32.mockapi.io/todo")

        dispatch(successGetTodo(data))
    }
}


export function addTodo(newTodo) {
    return async function (dispatch) {
        dispatch(startFetching())
        await axios.post("https://653e59f5f52310ee6a9add32.mockapi.io/todo", newTodo)
        const { data } = await axios("https://653e59f5f52310ee6a9add32.mockapi.io/todo")
        dispatch(successGetTodo(data))
    }
}

export function centangTodo(id, completed) {
    return async function (dispatch) {
        dispatch(startFetching())
        await axios.put(`https://653e59f5f52310ee6a9add32.mockapi.io/todo/${id}`, { completed })

        const { data } = await axios("https://653e59f5f52310ee6a9add32.mockapi.io/todo")
        dispatch(successGetTodo(data))
    }
}

export function editTodo(id, value){
    return async function(dispatch){
        dispatch(startFetching())
        await axios.put(`https://653e59f5f52310ee6a9add32.mockapi.io/todo/${id}`, { value })

        const { data } = await axios("https://653e59f5f52310ee6a9add32.mockapi.io/todo")
        dispatch(successGetTodo(data))
    }
}

export function deleteTodo(id){
    return async function(dispatch){
        dispatch(startFetching())
        await axios.delete(`https://653e59f5f52310ee6a9add32.mockapi.io/todo/${id}`)

        const { data } = await axios("https://653e59f5f52310ee6a9add32.mockapi.io/todo")
        dispatch(successGetTodo(data))
    }
}

export default todoReducer