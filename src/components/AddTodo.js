import React from 'react'
import { useGlobalTodoContext } from '../store/TodoContext'
import {SiAddthis} from 'react-icons/si'
const AddTodo = () => {
    const {ref,content,setContent,addTodo,isEditing,err} = useGlobalTodoContext()
  return (
    <div className='mt-24 flex flex-col  justify-center items-center  '>
        <label className='text-sm text-gray-400 mb-1 ml-1' htmlFor="todos">Bir todo ekle</label>
       <div className='flex'>
       <input ref={ref} className='rounded px-4 py-2 shadow-md outline-none w-60 mr-2' placeholder='Todo gir...' type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} />
       <button onClick={addTodo} className='text-blue-900/90 hover:text-blue-900/70 cursor-pointer rounded-xl disabled:bg-gray-100 disabled:text-gray-600' disabled={`${isEditing}`}><SiAddthis   size={48}/></button>
       </div>
       {err && <div className='px-4 py-2 bg-red-800 text-red-100 rounded-md shadow-md my-2'>{err}</div> }
      </div>
  )
}

export default AddTodo