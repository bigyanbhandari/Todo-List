 import React, { useState } from 'react'
 import {Form,Container,Button,Alert,Row, Col} from "react-bootstrap"
 import "bootstrap/dist/css/bootstrap.css"
 import {FaPlus, FaTrash} from "react-icons/fa"
 
 const TodoList = () => {
    const initialData= JSON.parse(localStorage.getItem("todos"))

    
    const[todoList,setTodoList]=useState([...initialData]);
    const[text,setText]=useState(""); 

    const addTodo=()=>{
         const newTodo=[
            ...todoList,
             {
                data:text, 
                date:new Date().toLocaleString().split(",")[0],
                isCompleted: false
            },
        ]
        setText("");
        setTodoList(newTodo)
        localStorage.setItem("todos",JSON.stringify(newTodo))
    };
    const toggleTodoCompletion=(idx)=>{
      const newTodo=  todoList.map((todo,index)=>
         index===idx ? {...todo, isCompleted: !todo.isCompleted}
           :todo

        );
        setTodoList(newTodo);
        localStorage.setItem("todos",JSON.stringify(newTodo));

    }
    const deleteTodo=(idx)=>{
      const response=  window.confirm("do you want to delete?");
      if(response){
     const newTodo=todoList.filter((todo,index)=>{
            if(index===idx)return false
            else  return true;
        })
        setTodoList(newTodo);
        localStorage.setItem("todos",JSON.stringify(newTodo))
   
    }
    }




   return (
     <Container className="mt-2 text-center" >
        <Form.Control
         type ="text"
         value={text}
          onChange={(e)=>setText(e.target.value)}
          onKeyPress={(e)=>(e.key==="Enter"?addTodo():null)}
          />
        <h3>TodoList</h3>

        <br/>
        <Button onClick={addTodo}>
            <FaPlus/>
            <label className='ms-3'>Add</label>
        </Button>
        <br/>
        <br/>
        
        {todoList.length>0 ?
        todoList.map((todo,index)=>{
            return (
                <Row>
                 <Col>   
            <Alert 
            variant={todo.isCompleted?"danger":"primary"}
            className="text-start"
            
             onClick={()=>toggleTodoCompletion(index)}
             style={{
                cursor:"pointer",
                textDecoration: todo.isCompleted?"line-through":"none"}}>
                <h2>{todo.data}</h2>
            <br/>
           <small>{todo.date}</small> 
            </Alert>
            </Col>
            <Col className='mt-4'>
            <FaTrash  size="40" color="red" onClick={()=>deleteTodo(index)}/>
            </Col>
            </Row>
        )
        })
        :"No todos"}
     </Container>
   )
 }
 
 export default TodoList