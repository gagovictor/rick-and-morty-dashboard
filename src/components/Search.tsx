"use client";

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCharacters } from '../redux/reducers';
import { useQuery, gql } from '@apollo/client';

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
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search characters..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
