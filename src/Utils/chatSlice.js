import { createSlice } from "@reduxjs/toolkit";



const chatSlice = createSlice(
    {
        name : "chat",
        initialState: {
            messages: []
        },
        reducers: {
            addMessages : (state,action) =>{
                state.messages.unshift(action.payload)  // we do here unshift instead of push because in live chat we want to appear our new chat from bottom and push method push on top of it but unshift method push on bottom of stack
            }
        }
    }
)

export  const {addMessages}  = chatSlice.actions;
export  default chatSlice.reducer