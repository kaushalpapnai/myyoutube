import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice(
    {
        name: "search",
        initialState: {

        },
        reducers: {
            cacheResults: (state,action)=>{
               return state = {...state,...action.payload} // here we are spreading the values of objects that we get from payload and also merging them with existing state values so we do not loose previous values 
            }
        }
    }
)

export const {cacheResults} = searchSlice.actions;
export default searchSlice.reducer;