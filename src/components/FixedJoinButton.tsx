import React, { useState, useEffect } from 'react';
import { Box, Button, useTheme, useMediaQuery, Fade } from '@mui/material';
import Link from 'next/link';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const FixedJoinButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Si on est en bas de page, cacher le bouton
      if (currentScrollY + windowHeight >= documentHeight - 100) {
        setShowButton(false);
      } 
      // Si on remonte, afficher le bouton
      else if (currentScrollY < lastScrollY) {
        setShowButton(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <Fade in={showButton}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          sx={{
            bgcolor: '#8B4513',
            color: 'white',
            '&:hover': { bgcolor: '#654321' },
            maxWidth: isMobile ? '90vw' : '300px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
          component={Link}
          href="/join"
        >
          Devenir membre
        </Button>
      </Box>
    </Fade>
  );
};

export default FixedJoinButton; 