'use client';

import React, { ReactNode, useState } from 'react';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  ThemeProvider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  Event as EventIcon,
  Group as GroupIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  ContactMail as ContactMailIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import theme from '@/theme/theme';

// Largeur du drawer
const DRAWER_WIDTH = 240;

const menuItems = [
  { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Actualités', icon: <ArticleIcon />, path: '/admin/actualites' },
  { text: 'Événements', icon: <EventIcon />, path: '/admin/evenements' },
  { text: 'Programmes', icon: <GroupIcon />, path: '/admin/programmes' },
  { text: 'Adhésions', icon: <PersonAddIcon />, path: '/admin/adhesions' },
  { text: 'Contacts', icon: <ContactMailIcon />, path: '/admin/contacts' },
  { text: 'Paramètres', icon: <SettingsIcon />, path: '/admin/parametres' },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        
        {/* AppBar */}
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'white',
            color: 'primary.main',
            boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Administration APR
            </Typography>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>A</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Mon profil</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Déconnexion</ListItemText>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        
        {/* Drawer */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? drawerOpen : true}
          onClose={isMobile ? handleDrawerToggle : undefined}
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { 
              width: DRAWER_WIDTH, 
              boxSizing: 'border-box',
              backgroundColor: '#fcfcfc',
              borderRight: '1px solid rgba(0, 0, 0, 0.05)',
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.03)',
            },
          }}
        >
          <Toolbar sx={{ 
            borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.02)'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
              <Box sx={{ position: 'relative', width: 40, height: 40, mr: 1.5 }}>
                <Image 
                  src="/logo.svg" 
                  alt="APR Logo" 
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'primary.main',
                  fontFamily: 'serif'
                }}
              >
                APR Admin
              </Typography>
            </Box>
          </Toolbar>
          {isMobile && (
            <Box sx={{ textAlign: 'right', p: 1 }}>
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={{ overflow: 'auto', py: 2 }}>
            <List>
              {menuItems.map((item) => (
                <ListItem 
                  key={item.text} 
                  disablePadding
                  sx={{ mb: 0.5 }}
                >
                  <Link href={item.path} passHref style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}>
                    <ListItemButton 
                      selected={pathname === item.path || pathname?.startsWith(`${item.path}/`)}
                      sx={{
                        borderRadius: '0 20px 20px 0',
                        mr: 2,
                        backgroundColor: (pathname === item.path || pathname?.startsWith(`${item.path}/`)) 
                          ? 'rgba(139, 69, 19, 0.1)' 
                          : 'transparent',
                        borderLeft: (pathname === item.path || pathname?.startsWith(`${item.path}/`)) 
                          ? '4px solid' 
                          : '4px solid transparent',
                        borderColor: 'primary.main',
                        pl: (pathname === item.path || pathname?.startsWith(`${item.path}/`)) ? 2 : 3,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(139, 69, 19, 0.06)',
                          borderLeft: '4px solid',
                          borderLeftColor: 'primary.light',
                          pl: 2
                        }
                      }}
                    >
                      <ListItemIcon sx={{ 
                        color: (pathname === item.path || pathname?.startsWith(`${item.path}/`)) 
                          ? 'primary.main' 
                          : 'text.secondary',
                        minWidth: '40px',
                        '& .MuiSvgIcon-root': {
                          fontSize: '1.3rem',
                          transition: 'transform 0.2s ease',
                          transform: (pathname === item.path || pathname?.startsWith(`${item.path}/`)) 
                            ? 'scale(1.1)' 
                            : 'scale(1)'
                        }
                      }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                          fontWeight: (pathname === item.path || pathname?.startsWith(`${item.path}/`)) ? 600 : 400,
                          color: (pathname === item.path || pathname?.startsWith(`${item.path}/`)) 
                            ? 'primary.main' 
                            : 'text.primary'
                        }} 
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2, opacity: 0.4 }} />
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  opacity: 0.8
                }}
              >
                APR Sénégal © {new Date().getFullYear()}
              </Typography>
            </Box>
          </Box>
        </Drawer>
        
        {/* Main content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 8 }}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
} 