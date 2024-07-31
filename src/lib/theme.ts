import { ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: '#08C952',
    },
    secondary: {
      main: '#160440',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#f5f5f5',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#000000',
    },
  },
  typography: {
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export { getTheme };
export default getTheme;
