import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness7, Brightness4 } from '@mui/icons-material';

interface ThemeToggleProps {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ mode, toggleTheme }) => {
  const tooltipTitle = mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
  
  const icon = mode === 'light' ? <Brightness4 /> : <Brightness7 />;

  return (
    <Tooltip title={tooltipTitle}>
      <IconButton color="inherit" onClick={toggleTheme}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
