import { createSlice } from "@reduxjs/toolkit";
import { CHAT_COUNT } from "./config";



const chatSlice = createSlice(
    {
        name : "chat",
        initialState: {
            messages: []
        },
        reducers: {
            addMessages : (state,action) =>{
                state.messages.splice(CHAT_COUNT,1)  // with the help of splice method we are showing just number of messages on screen to avoid the overflow of messages on dom
                state.messages.unshift(action.payload)  // we do here unshift instead of push because in live chat we want to appear our new chat from bottom and push method push on top of it but unshift method push on bottom of stack
            }
        }
    }
)

export  const {addMessages}  = chatSlice.actions;
export  default chatSlice.reducer