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
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'contain',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#252525',
          width: '100%',
          height: '25vh',
        }}
      >
        <Container
            sx={{
              padding: '16px',
              height: '25vh',
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
        </Container>
      </Box>

      <Toolbar
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            padding: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginBottom: '32px',
            backgroundColor: '#fff'
          }}
        >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Search />
          <Pagination />
        </Container>
      </Toolbar>

      <Container>
        <Grid container spacing={2} sx={{ marginBottom: '32px' }}>
          {characters.map((character: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={character.id}>
              <Paper
                sx={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                  overflow: 'hidden'
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    padding: '12px',
                  }}
                >
                <Typography variant="h6">{character.name}</Typography>
                <Typography variant="body2">
                  {character.status} - {character.species}
                </Typography>
                </Box>
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
