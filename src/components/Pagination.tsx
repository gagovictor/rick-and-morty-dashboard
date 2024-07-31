"use client";

import React from 'react';
import { useDispatch } from 'react-redux';
import { setCharacters } from '../redux/reducers';
import { useQuery, gql } from '@apollo/client';
import { Button, Box } from '@mui/material';

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
      refetch({ page: page + 1 });
    }
  };

  const handlePrev = () => {
    if (data?.characters.info.prev) {
      setPage(page - 1);
      refetch({ page: page - 1 });
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrev}
        disabled={page === 1}
      >
        Previous
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNext}
        disabled={!data?.characters.info.next}
        style={{ marginLeft: '10px' }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
