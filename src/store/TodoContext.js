import { useContext,useEffect, useState ,useRef } from "react";
import { createContext } from "react";
import axios from 'axios';
const TodoContext = createContext()


export const TodoContextProvider = ({children})=>{


const url = `https://${process.env.REACT_APP_API_KEY}.mockapi.io/todos`


  const [name,setName] = useState("")
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')) || "")
  const [content,setContent] = useState("")
  const [todos,setTodos] = useState([])
  const [err,setErr] = useState("")
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


//delete

  const deleteTodo = async(todo)=>{
    try {
      await axios.delete(`${url}/${todo}`)
      getTodos()
    } catch (error) {
      
    }
  }


//completed
  const completedToggle = (id)=>{
     todos?.filter(todo=>{
      if(todo.id === id){
        todo.isCompleted=!todo.isCompleted        
      if(todo){
          try {
              axios.put(`${url}/${id}`,todo)
            } catch (error) {
                console.log(error);
            }
        }
    }
    getTodos()
    })

  }

  //themechange
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
    
  },[theme,])





    return <TodoContext.Provider value={{user,name,setName,handleClick,theme,removeUser,changeTheme,ref,content,setContent,addTodo,isEditing,err,todos,completedToggle,setIsEditing,updateTodo,deleteTodo}}>{children}</TodoContext.Provider>
}

export const useGlobalTodoContext = ()=>{
    return useContext(TodoContext)
}
