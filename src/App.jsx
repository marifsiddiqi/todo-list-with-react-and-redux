import { useState } from 'react'
import AddTodo from './components/addTodo'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AddTodo/>
    </>
  )
}

export default App
