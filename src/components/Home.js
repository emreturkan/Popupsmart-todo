import React from 'react'
import { useGlobalTodoContext } from '../store/TodoContext'


import Navbar from './Navbar'
import AddTodo from './AddTodo'
import Todos from './Todos'
const Home = () => {
    const {todos} = useGlobalTodoContext()

  return (
    <div className='container mx-auto'>
     <Navbar/>
      <AddTodo/>
      <div className='flex flex-col mt-12  justify-center items-center gap-y-4'>
          {todos?.map((todo)=>(
            <Todos key={todo.id} todo={todo}/>
          ))}
      </div>
    </div>
  )
}

export default Home