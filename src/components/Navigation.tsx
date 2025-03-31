'use client';

import React from 'react';
import {
  Box,
  Container,
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Button,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0px 2px 20px rgba(0, 0, 0, 0.05)',
  borderBottom: '1px solid rgba(139, 69, 19, 0.1)',
  color: theme.palette.primary.main,
  '& .MuiToolbar-root': {
    padding: theme.spacing(1, 2),
    minHeight: '70px',
  },
}));

const NavButton = styled(Button)<{ component?: React.ElementType }>(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: theme.spacing(0, 1),
  padding: theme.spacing(1, 2),
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(139, 69, 19, 0.05)',
    transform: 'translateY(-1px)',
  },
}));

const Logo = styled('img')(({ theme }) => ({
  height: 45,
  marginRight: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'none',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(1, 3),
  borderRadius: '8px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-1px)',
    boxShadow: '0px 4px 12px rgba(139, 69, 19, 0.2)',
  },
}));

const menuItems = [
  { text: 'Accueil', icon: <HomeIcon />, href: '/' },
  { text: 'Programmes', icon: <AssignmentIcon />, href: '/programmes' },
  { text: 'Actualités', icon: <ArticleIcon />, href: '/actualites' },
  { text: 'Événements', icon: <EventIcon />, href: '/evenements' },
  { text: 'À propos', icon: <GroupIcon />, href: '/about' },
  { text: 'Contact', icon: <ContactMailIcon />, href: '/contact' },
];

export default function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="fixed" color="default" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Logo src="/logo.png" alt="APR Logo" />
          
          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                size="large"
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={handleMenu}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(139, 69, 19, 0.05)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    borderRadius: 2,
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    minWidth: 200,
                  },
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem 
                    key={item.text} 
                    onClick={handleClose}
                    component={Link}
                    href={item.href}
                    sx={{
                      py: 1.5,
                      '&:hover': {
                        backgroundColor: 'rgba(139, 69, 19, 0.05)',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </MenuItem>
                ))}
                <Box sx={{ px: 2, py: 1 }}>
                  <StyledLink href="/join">
                    <StyledButton fullWidth startIcon={<PersonAddIcon />}>
                      Rejoignez-nous
                    </StyledButton>
                  </StyledLink>
                </Box>
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                {menuItems.map((item) => (
                  <NavButton
                    key={item.text}
                    component={Link}
                    href={item.href}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </NavButton>
                ))}
              </Box>
              <StyledLink href="/join">
                <StyledButton startIcon={<PersonAddIcon />}>
                  Rejoignez-nous
                </StyledButton>
              </StyledLink>
            </>
          )}
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
} 