"use client";

import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setCharacters } from '../redux/reducers';
import { Container, Grid, Typography, Box, Paper, Toolbar } from '@mui/material';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';

// GraphQL query
const GET_CHARACTERS = gql`
  query {
    characters(page: 1) {
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

const HomePage = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state: any) => state.characters);
  const { data, loading, error } = useQuery(GET_CHARACTERS);

  useEffect(() => {
    if (data) {
      dispatch(setCharacters(data.characters.results));
    }
  }, [data, dispatch]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error.message}</Typography>;

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: 'url(/path/to/rick-and-morty-background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#111111',
          width: '100%',
          height: '25vh',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: '#fff',
            fontSize: '2rem',
            textAlign: 'left',
            width: '100%'
          }}
        >
          Rick and Morty Characters
        </Typography>
      </Box>

      <Toolbar
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: '32px',
          backgroundColor: '#fff'
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Search />
        </Box>
        <Box>
          <Pagination />
        </Box>
      </Toolbar>

      <Container>
        <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
          {characters.map((character: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <Paper
                sx={{
                  padding: '16px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img src={character.image} alt={character.name} width="100%" />
                <Typography variant="h6">{character.name}</Typography>
                <Typography variant="body2">
                  {character.status} - {character.species}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            marginBottom: '32px'
          }}
        >
          <Pagination />
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
