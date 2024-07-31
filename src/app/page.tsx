"use client";

import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setCharacters } from '../redux/reducers';
import styles from './page.module.css';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rick and Morty Characters</h1>
      <Search />
      <ul className={styles.characterList}>
        {characters.map((character: any) => (
          <li key={character.id} className={styles.characterCard}>
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>{character.status} - {character.species}</p>
          </li>
        ))}
      <Pagination />
      </ul>
    </div>
  );
};

export default HomePage;
