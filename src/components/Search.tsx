"use client";

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCharacters } from '../redux/reducers';
import { useQuery, gql } from '@apollo/client';
import { TextField, Button, Box } from '@mui/material';

const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`;

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const { data, refetch } = useQuery(SEARCH_CHARACTERS, {
    variables: { name: query },
    skip: !query,
  });

  const handleSearch = () => {
    refetch();
    if (data) {
      dispatch(setCharacters(data.characters.results));
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <TextField
        label="Search characters..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default Search;
