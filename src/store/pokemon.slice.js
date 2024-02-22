import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
    name: "pokemonSlice",
    initialState: {
        data: [],
        types: []
    },
    reducers: {
        moveData: (state, action) => {
            state.data.push(action.payload);
        },
        giveType: (state, action) => {
            state.types.push(action.payload);
        }
    }
})


const pokemonReducer = pokemonSlice.reducer;
export const { moveData, giveType } = pokemonSlice.actions;
export { pokemonReducer };