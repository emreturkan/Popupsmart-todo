import React from 'react'
import { useGlobalTodoContext } from './store/TodoContext'
import UserLogin from './components/UserLogin'
import Home from './components/Home'

const App = () => {

  const {user} = useGlobalTodoContext()


  if(!user){
    return <UserLogin/>
  }

  return <Home/>
}

export default App