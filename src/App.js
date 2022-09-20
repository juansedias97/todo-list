import { useState, useEffect } from 'react';
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from './components/Todo';

import {db} from './firebase.js'
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from 'firebase/firestore'

const style ={
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2f80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-600 text-slate-100`,
  count: `text-center p-2`
}

function App() {
  const [todos, setTodos] =useState([])
  const [input, setInput] =useState('')

  //create todo
  const createTodo = async (e)=>{
    e.preventDefault(e)

    if(input===''){
      alert('Please enter a valid todo')
      return
    }

    await addDoc(collection(db, 'todo'), {
      text: input,
      completed: false,
    }); 

    setInput('');
  }


  //read todo
  useEffect(()=>{
    const q = query(collection(db, 'todo'))

    const unsubscribe = onSnapshot(q, (querySnapShot)=>{
       let todosArr = []

       querySnapShot.forEach((doc)=>{
        todosArr.push({...doc.data(), id: doc.id})
       });

       setTodos(todosArr)
    })
  }, [])
  //update todo
  const toggle = async (todo)=>{
    await updateDoc(doc(db, 'todo', todo.id), {
      completed: !todo.completed
    })
  }
  //delete todo
  const deleteTodo = async (id) =>{
    await deleteDoc(doc(db, 'todo', id))
  } 

  return (
    <div className={style.bg}>
      <div className={style.container}>
      <h3 className={style.heading}>Todo App</h3>
      <form onSubmit = {createTodo} className={style.form}>
        <input 
          value= {input} 
          onChange= {(e)=> setInput(e.target.value)} 
          className ={style.input} 
          type="text" 
          placeholder="Add Todo"
        />
        <button className={style.button}><AiOutlinePlus size={30}/></button>    
      </form>
      <ul>
        {
          todos.map((todo) => (
            <Todo 
              key= {todo.id} 
              todo = {todo} 
              toggle = {toggle} 
              deleteTodo = {deleteTodo}
            />
          ))
        }
      </ul>
      {
        todos.length>0 ? <p className={style.count}>You have {todos.length} todos</p> : ''
      }
      </div>
    </div>
  );
}

export default App;
