import React from 'react'
import { useGlobalTodoContext } from '../store/TodoContext'
import {MdOutlineDarkMode,MdOutlineWbSunny} from 'react-icons/md'
const Navbar = () => {
    const {user,theme,removeUser,changeTheme} = useGlobalTodoContext()
  return (
    <nav className='flex justify-between mt-12'>
        <h1 className={`${theme ? 'font-bold text-2xl' : 'font-bold text-2xl text-gray-200'}`}>{user.toUpperCase()} Hoşgeldin...</h1>
        <div className='flex items-center gap-x-4'>
        <button onClick={removeUser} className='px-4 py-2 bg-blue-900/90 hover:bg-blue-200 hover:text-blue-900 transition-all text-blue-400 rounded-md shadow-md'>Çıkış yap!</button>
        {theme ? <button onClick={changeTheme}><MdOutlineDarkMode fontSize={32}/></button> : <button onClick={changeTheme}><MdOutlineWbSunny className='text-gray-200' fontSize={32}/></button>}
        </div>
      </nav>
  )
}

export default Navbar