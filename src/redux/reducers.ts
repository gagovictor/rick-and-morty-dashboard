import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Character {
  id: string;
  name: string;
  image: string;
  status: string;
  species: string;
}

interface CharactersState {
  characters: Character[];
}

const initialState: CharactersState = {
  characters: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload;
    },
  },
});

export const { setCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
