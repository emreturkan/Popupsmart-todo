import React from 'react'
import { useGlobalTodoContext } from '../store/TodoContext'
const UserLogin = () => {

    const {name,setName,handleClick} = useGlobalTodoContext()

  return (
    <div className='container h-screen mx-auto flex justify-center items-center '>
          <div className='bg-blue-400 w-96 h-72 rounded-md shadow-md flex gap-y-4 flex-col items-center justify-center'>
              <label className='font-bold text-gray-100 text-sm ' htmlFor="name">Lütfen isminizi giriniz!</label>
              <input className='px-4 py-2 w-60 outline-none rounded-lg' type="text" id='name' placeholder='Lütfen bir isim giriniz...' value={name} onChange={(e)=>setName(e.target.value)} />
              <button onClick={handleClick} className='px-5 py-2 bg-blue-900/90 rounded-md shadow-md text-blue-200'>Devam Et!</button>
          </div>
      </div>
  )
}

export default UserLogin