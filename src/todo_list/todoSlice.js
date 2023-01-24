import { createSlice } from "@reduxjs/toolkit";

export const todoSlice=createSlice({
    name: 'todo',
    initialState:{
        all:[
                {id:'#dkjgljl',todo:'task 1.',completed:true},
                {id:'#dkjglj2',todo:'task 2',completed:false},
                {id:'#dkjglj3',todo:'task 3',completed:true},
                {id:'#dkjglj4',todo:'task 4',completed:true},
            ],
        show:'all'
    },
    reducers: {

        addToDo:(state,action)=>{
            state.all.unshift({id:String(Date.now()),todo:action.payload,completed:false});
        },
        
        setDone:(state,action)=>{
            let item=state.all.findIndex(item=>item.id===action.payload);
            state.all[item].completed=true;
        },
        setUnDone:(state,action)=>{
            let item=state.all.findIndex(item=>item.id===action.payload);
            state.all[item].completed=false;
        },

        deleteToDo:(state,action)=>{
            switch (action.payload){
                case 'all':
                    state.all.splice(0,state.all.length);
                    break;
                default:
                    let item=state.all.findIndex(item=>item.id===action.payload);
                    state.all.splice(item,1);
                    break;
            }
            
        },

        setShow:(state,action)=>{
            state.show=action.payload;
        }

    }
})

export const {addToDo,setDone,setUnDone,deleteToDo,setShow}=todoSlice.actions;
export default todoSlice.reducer;