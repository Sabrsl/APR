'use client';

import { useState } from 'react';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, TextField, Button, useTheme, InputAdornment, Snackbar, Alert, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';
import Image from 'next/image';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';

// Styled components for enhanced visual appeal
const FooterSection = styled(Box)(({ theme }) => ({
  backgroundColor: '#8B4513', // Brown background
  color: theme.palette.common.white,
  width: '100vw',
  margin: 0,
  padding: 0,
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
}));

const MainFooter = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  borderBottom: `1px solid #DEB887`, // Beige border
  width: '100%',
  margin: 0,
}));

const CopyrightBar = styled(Box)(({ theme }) => ({
  backgroundColor: '#5C2E0D', // Darker brown
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  width: '100%',
  margin: 0,
}));

const FooterLink = styled(MuiLink)(({ theme }) => ({
  color: '#DEB887', // Beige text
  textDecoration: 'none',
  transition: 'color 0.2s, transform 0.2s',
  '&:hover': {
    color: theme.palette.common.white,
    transform: 'translateX(3px)',
  },
  display: 'inline-block',
}));

const FooterHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  position: 'relative',
  fontWeight: 600,
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: '#DEB887', // Beige underline
    borderRadius: 1.5,
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  marginRight: theme.spacing(1),
  transition: 'transform 0.2s, color 0.2s, box-shadow 0.2s',
  padding: theme.spacing(1),
  '&:hover': {
    color: '#DEB887', // Beige on hover
    transform: 'translateY(-3px)',
    backgroundColor: 'rgba(222, 184, 135, 0.1)', // Semi-transparent beige
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
}));

const ContactIcon = styled(Box)(({ theme }) => ({
  color: '#DEB887', // Beige icons
  marginRight: theme.spacing(2),
  marginTop: '4px',
}));

const NewsletterTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(['background-color', 'box-shadow', 'border-color']),
    '& fieldset': {
      borderColor: '#DEB887', // Beige border
    },
    '&:hover fieldset': {
      borderColor: '#FFFFFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#DEB887', // Beige border when focused
    },
    '& input': {
      color: theme.palette.common.white,
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)',
        opacity: 1,
      },
    },
  },
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: 'none',
  padding: '8px 16px',
  backgroundColor: '#DEB887', // Beige button
  color: '#8B4513', // Brown text
  transition: theme.transitions.create(['background-color', 'box-shadow']),
  '&:hover': {
    backgroundColor: '#FFFFFF', // White on hover
    color: '#8B4513', // Brown text on hover
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const LogoImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 48,
  height: 48,
  marginRight: theme.spacing(1.5),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  overflow: 'hidden',
  padding: 4,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
}));

export const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSnackbarMessage('Veuillez entrer une adresse email valide');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    
    // In a real app, you would send this to your backend
    console.log('Email submitted:', email);
    
    // Show success message
    setSnackbarMessage('Merci ! Vous êtes maintenant inscrit à notre newsletter');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    setEmail('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <FooterSection>
      {/* Main footer content */}
      <MainFooter>
        <Container maxWidth={false} sx={{ px: 0 }}>
          <Grid container spacing={4} sx={{ px: { xs: 2, sm: 4, md: 8 } }}>
            <Grid item xs={12} md={6} lg={3}>
              <Logo>
                <LogoImage>
                  <Image
                    src="/logo.svg"
                    alt="APR Sénégal Logo"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </LogoImage>
                <Box>
                  <Typography variant="h6" component="span" fontWeight="bold" fontFamily="serif">
                    APR Sénégal
                  </Typography>
                  <Typography 
                    variant="caption" 
                    component="span" 
                    sx={{ 
                      display: 'block', 
                      color: 'grey.300',
                      fontSize: '0.75rem',
                    }}
                  >
                    Alliance Pour la République
                  </Typography>
                </Box>
              </Logo>
              
              <Typography variant="body2" sx={{ mb: 3, color: 'grey.300', lineHeight: 1.6 }}>
                Alliance Pour la République - Un parti engagé pour l'avenir du Sénégal et le bien-être de tous ses citoyens.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Link 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  sx={{ color: 'inherit' }}
                >
                  <SocialIconButton>
                    <FacebookIcon />
                  </SocialIconButton>
                </Link>
                <Link 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Twitter"
                  sx={{ color: 'inherit' }}
                >
                  <SocialIconButton>
                    <TwitterIcon />
                  </SocialIconButton>
                </Link>
                <Link 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  sx={{ color: 'inherit' }}
                >
                  <SocialIconButton>
                    <InstagramIcon />
                  </SocialIconButton>
                </Link>
                <Link 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                  sx={{ color: 'inherit' }}
                >
                  <SocialIconButton>
                    <YouTubeIcon />
                  </SocialIconButton>
                </Link>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <FooterHeading variant="h6">Liens Rapides</FooterHeading>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <FooterLink as={NextLink} href="/">
                  Accueil
                </FooterLink>
                <FooterLink as={NextLink} href="/about">
                  À propos
                </FooterLink>
                <FooterLink as={NextLink} href="/news">
                  Actualités
                </FooterLink>
                <FooterLink as={NextLink} href="/programmes">
                  Programmes
                </FooterLink>
                <FooterLink as={NextLink} href="/join">
                  Adhésion
                </FooterLink>
                <FooterLink as={NextLink} href="/contact">
                  Contact
                </FooterLink>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <FooterHeading variant="h6">Contact</FooterHeading>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ContactItem>
                  <ContactIcon>
                    <LocationOnIcon />
                  </ContactIcon>
                  <Typography variant="body2" sx={{ color: 'grey.300', lineHeight: 1.6 }}>
                    Siège du parti APR<br />
                    Avenue de la République<br />
                    Dakar, Sénégal
                  </Typography>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <PhoneIcon />
                  </ContactIcon>
                  <Typography variant="body2" sx={{ color: 'grey.300' }}>
                    +221 33 123 45 67
                  </Typography>
                </ContactItem>
                <ContactItem>
                  <ContactIcon>
                    <EmailIcon />
                  </ContactIcon>
                  <Typography variant="body2" sx={{ color: 'grey.300' }}>
                    contact@apr-senegal.com
                  </Typography>
                </ContactItem>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={3}>
              <FooterHeading variant="h6">Newsletter</FooterHeading>
              <Typography variant="body2" sx={{ mb: 2, color: 'grey.300', lineHeight: 1.6 }}>
                Restez informé de nos dernières actualités et événements
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <NewsletterTextField
                  size="small"
                  placeholder="Votre email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon sx={{ color: 'rgba(255, 255, 255, 0.4)' }} />
                      </InputAdornment>
                    ),
                  }}
                />
                <SubscribeButton
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<SendIcon />}
                >
                  S'abonner
                </SubscribeButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </MainFooter>

      {/* Copyright bar */}
      <CopyrightBar>
        <Container maxWidth={false} sx={{ px: 0 }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 2, md: 0 },
            px: { xs: 2, sm: 4, md: 8 }
          }}>
            <Typography variant="body2" sx={{ color: 'grey.400' }}>
              © {currentYear} APR Sénégal. Tous droits réservés.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <FooterLink as={NextLink} href="/privacy" sx={{ color: 'grey.400' }}>
                Politique de confidentialité
              </FooterLink>
              <FooterLink as={NextLink} href="/terms" sx={{ color: 'grey.400' }}>
                Conditions d'utilisation
              </FooterLink>
              <FooterLink as={NextLink} href="/cookies" sx={{ color: 'grey.400' }}>
                Cookies
              </FooterLink>
            </Box>
          </Box>
        </Container>
      </CopyrightBar>

      {/* Snackbar for newsletter subscription */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity} 
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </FooterSection>
  );
};