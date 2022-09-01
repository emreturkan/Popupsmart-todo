import React from 'react'
import { useGlobalTodoContext } from '../store/TodoContext'
import {MdDelete,MdTaskAlt} from 'react-icons/md'
import {HiOutlinePencilAlt} from 'react-icons/hi'
const Todos = ({todo}) => {
    const {ref,setContent,isEditing,completedToggle,setIsEditing,updateTodo,deleteTodo} = useGlobalTodoContext()
  return (
    <div className="todo w-60 h-12 items-center px-2 flex justify-between bg-blue-400 text-blue-900 rounded-md shadow-md " key={todo.id}>
              <div onClick={()=>completedToggle(todo.id)} className={`${todo.isCompleted && 'line-through'}`}>{todo.content}</div>
             <div className='flex gap-x-2'>
              {isEditing === todo.id ? ( <MdTaskAlt onClick={()=>{updateTodo(todo.id)}} className='cursor-pointer' size={32}/>) : (<HiOutlinePencilAlt onClick={()=>{return setIsEditing(todo.id),setContent(todo.content),ref.current.focus()}} className='cursor-pointer hover:text-green-200 transition-all hover:scale-110' size={32}/>)}
              
             <MdDelete onClick={()=>deleteTodo(todo.id)} className='cursor-pointer transition-all hover:text-blue-900/40 hover:scale-105' size={32}/>
             </div>
    </div>
  )
}

export default Todos