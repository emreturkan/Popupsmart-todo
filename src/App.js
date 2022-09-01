import React, { useEffect, useState ,useRef} from 'react'
import {SiAddthis} from 'react-icons/si'
import {MdDelete,MdTaskAlt,MdOutlineDarkMode,MdOutlineWbSunny} from 'react-icons/md'
import {HiOutlinePencilAlt} from 'react-icons/hi'
import axios from 'axios';
const App = () => {

  const url = `https://${process.env.REACT_APP_API_KEY}.mockapi.io/todos`


  const [name,setName] = useState("")
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || "")
  const [content,setContent] = useState("")
  const [todos,setTodos] = useState([])
  const [err,setErr] = useState('')
  const [isEditing,setIsEditing] = useState("")
  const [theme,setTheme] = useState(JSON.parse(localStorage.getItem('theme')) || false)  
  const ref = useRef(null)


  const handleClick = ()=>{
    setUser(name)
    localStorage.setItem('user',JSON.stringify(name))
  }

  const removeUser = ()=>{
    localStorage.removeItem('user')
    setUser('')
  }

  const getTodos = async()=>{
      try {
        const response = await axios.get(url)
      const data = await response.data
      setTodos(data)
      } catch (error) {
        console.log(error);
      }
   
  }


  const addTodo = async()=>{
    if(content.trim().length <= 3){
        setErr('Lütfen 3 harften fazla giriniz...')
        setTimeout(() => {
          setErr('')
        }, 3000);
    }
    else{
     const todos = {isCompleted:false,content:content.trim()}
     try {
     await axios.post(url,todos)
      getTodos()
     } catch (error) {
      
     }
    }
    setContent('')
  }

  const updateTodo = async(id)=>{
     todos?.filter(todo=>{
      if(todo.id === id){
        if(content){
          todo.content = content
        }
        
        try {
          axios.put(`${url}/${id}`,todo)
         setContent('')
         setIsEditing("")
       } catch (error) {
         console.log(error);
       }
      }
      return todo
    })
    
    
    
    
   

  }

  const deleteTodo = async(todo)=>{
    try {
      await axios.delete(`${url}/${todo}`)
      getTodos()
    } catch (error) {
      
    }
  }

  const completedToggle = (id)=>{
     todos?.filter(todo=>{
      if(todo.id === id){
        todo.isCompleted=!todo.isCompleted        
      if(todo){
        getTodos()
        try {
          axios.put(`${url}/${id}`,todo)
         
          
         
        } catch (error) {
          console.log(error);
        }
      }
      }
      
    })
    
    
   
  }

  const changeTheme = ()=>{
    setTheme(!theme)
  }

  useEffect(()=>{
    getTodos()
    if(theme){
      document.body.style.backgroundColor = 'rgb(240, 231, 219)'
    }
    else{
      document.body.style.backgroundColor = 'rgb(0 0 0 / 0.9)'
    }
    localStorage.setItem('theme',JSON.stringify(theme))
    
  },[theme])

  


  if(!user){
    return(
      <div className='container h-screen mx-auto flex justify-center items-center '>
          <div className='bg-blue-400 w-96 h-72 rounded-md shadow-md flex gap-y-4 flex-col items-center justify-center'>
              <label className='font-bold text-gray-100 text-sm ' htmlFor="name">Lütfen isminizi giriniz!</label>
              <input className='px-4 py-2 w-60 outline-none rounded-lg' type="text" id='name' placeholder='Lütfen bir isim giriniz...' value={name} onChange={(e)=>setName(e.target.value)} />
              <button onClick={handleClick} className='px-5 py-2 bg-blue-900/90 rounded-md shadow-md text-blue-200'>Devam Et!</button>
          </div>
      </div>
    )
  }


  return (
    <div className='container mx-auto'>
      <nav className='flex justify-between mt-12'>
        <h1 className={`${theme ? 'font-bold text-2xl' : 'font-bold text-2xl text-gray-200'}`}>{user.toUpperCase()} Hoşgeldin...</h1>
        <div className='flex items-center gap-x-4'>
        <button onClick={removeUser} className='px-4 py-2 bg-blue-900/90 text-blue-400 rounded-md shadow-md'>Çıkış yap!</button>
        {theme ? <button onClick={changeTheme}><MdOutlineDarkMode fontSize={32}/></button> : <button onClick={changeTheme}><MdOutlineWbSunny className='text-gray-200' fontSize={32}/></button>}
        </div>
      </nav>
      <div className='mt-24 flex flex-col  justify-center items-center  '>
        <label className='text-sm text-gray-400 mb-1 ml-1' htmlFor="todos">Bir todo ekle</label>
       <div className='flex'>
       <input ref={ref} className='rounded px-4 py-2 shadow-md outline-none w-60 mr-2' placeholder='Todo gir...' type="text" value={content} onChange={(e)=>{setContent(e.target.value)}} />
       <button onClick={addTodo} className='text-blue-900/90 cursor-pointer rounded-xl disabled:bg-gray-100 disabled:text-gray-600' disabled={`${isEditing}`}><SiAddthis   size={48}/></button>
       </div>
       {err && <div className='px-4 py-2 bg-red-800 text-red-100 rounded-md shadow-md my-2'>{err}</div> }
      </div>
      <div className='flex flex-col mt-12  justify-center items-center gap-y-4'>
          {todos?.map((todo)=>(
            <div className="todo w-60 h-12 items-center px-2 flex justify-between bg-blue-400 text-blue-900 rounded-md shadow-md " key={todo.id}>
              <div onClick={()=>completedToggle(todo.id)} className={`${todo.isCompleted && 'line-through'}`}>{todo.content}</div>
             <div className='flex gap-x-2'>
              {isEditing === todo.id ? ( <MdTaskAlt onClick={()=>{updateTodo(todo.id)}} className='cursor-pointer' size={32}/>) : (<HiOutlinePencilAlt onClick={()=>{return setIsEditing(todo.id),setContent(todo.content),ref.current.focus()}} className='cursor-pointer' size={32}/>)}
              
             <MdDelete onClick={()=>deleteTodo(todo.id)} className='cursor-pointer' size={32}/>
             </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default App