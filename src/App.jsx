import ListTodo from './components/ListTodo'
// import AddTodo from './components/AddTodo'
// import './App.css'

function App() {

  return (
    <div className='flex flex-col w-screen h-screen bg-red-200 items-center'>
      <div className='flex w-full h-auto bg-red-200 justify-center'>
        <div className='flex w-80 py-24'>
          {/* <AddTodo /> */}
          <ListTodo />
        </div>
      </div>
    </div>
  )
}

export default App
