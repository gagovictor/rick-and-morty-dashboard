"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { setCharacters } from '../redux/reducers';
import { useQuery, gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
        status
        species
      }
      info {
        next
        prev
      }
    }
  }
`;

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);

  const { data, refetch } = useQuery(GET_CHARACTERS, {
    variables: { page },
  });

  React.useEffect(() => {
    if (data) {
      dispatch(setCharacters(data.characters.results));
    }
  }, [data, dispatch]);

  const handleNext = () => {
    if (data?.characters.info.next) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (data?.characters.info.prev) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrev} disabled={page === 1}>Previous</button>
      <button onClick={handleNext} disabled={!data?.characters.info.next}>Next</button>
    </div>
  );
};

export default Pagination;
