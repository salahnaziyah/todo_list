import {addToDo,setDone,setUnDone,deleteToDo,setShow} from './todoSlice';
import {useSelector,useDispatch} from 'react-redux';
import {useRef,useEffect,useState} from 'react'
import {Form} from 'components/form/form'
import './todo.css'


const Todo=(props)=>{
    document.title='Todo List';
    const todoList = useSelector(state => state.todo.all);
    const show = useSelector(state =>state.todo.show);
    const disPatch=useDispatch();
    const [todo,setTodo]=useState("");
    const input=useRef(null);

    const todoFilter=(what)=>{
        switch(what){
            case 'completed':
                return todoList.filter(item=>item.completed===true);
            case 'uncompleted':
                return todoList.filter(item=>item.completed===false);
            default:
                return todoList;;
        }
    }

    const inputHandel=(e)=>{
        setTodo(e.target.value)
    }

    const formSubmit=(e)=>{
        e.preventDefault();
        let value=todo.trim();
        if(value){
            disPatch(addToDo(value));
            setTodo("");
        }
        input.current.focus();
    }

    useEffect(()=>{
        input.current.focus();
    })


    return(
        <div className="todo">
            <Form onSubmit={formSubmit} inputValue={todo} inputHandel={inputHandel} inputRef={input} placeHolder={'add some todos'} buttonValue={"Add"}/>
                <select title='filter' onChange={(e)=>{disPatch(setShow(e.target.value.toLowerCase()))}}>
                    <option>All</option>
                    <option>Completed</option>
                    <option>UnCompleted</option>
                </select>
            <div className="items-container">
                {todoFilter(show).map(item=>
                    <div className={item.completed?'item done':'item'} key={item.id}>
                        <h3>{item.todo}</h3>
                        <div className='actions'>
                            <button type='button' onClick={()=>{disPatch(setDone(item.id))}}>Done</button>
                            <button type='button' onClick={()=>{disPatch(setUnDone(item.id))}}>Undone</button>
                            <button type='button' onClick={()=>{disPatch(deleteToDo(item.id))}}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
            {todoFilter(show).length>0?<button type='button' onClick={()=>{disPatch(deleteToDo('all'))}}>Clear List</button>:null} 
        </div>
    )
}

export default Todo;