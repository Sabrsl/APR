'use client';

import React, { useState } from 'react';
import { Formik, FormikHelpers, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  Snackbar,
  Grid,
  CircularProgress,
  InputAdornment,
  useTheme,
  Link,
  Card,
  CardContent,
  Fade,
  Avatar,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SendIcon from '@mui/icons-material/Send';

// Définition du thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      light: '#DEB887',
      main: '#8B4513',
      dark: '#5C2E0D',
      contrastText: '#fff',
    },
    secondary: {
      light: '#DEB887',
      main: '#8B4513',
      dark: '#5C2E0D',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7fa',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(139, 69, 19, 0.1)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#5C2E0D',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0px 5px 15px rgba(139, 69, 19, 0.05)',
        },
        elevation3: {
          boxShadow: '0px 10px 30px rgba(139, 69, 19, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover fieldset': {
              borderColor: '#8B4513',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 5px 15px rgba(139, 69, 19, 0.05)',
        },
      },
    },
  },
});

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',
  paddingBottom: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.primary.main,
  fontWeight: 700,
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 4,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 2,
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  border: '1px solid rgba(139, 69, 19, 0.1)',
  overflow: 'visible',
  position: 'relative',
}));

const ContactIconWrapper = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  width: 56,
  height: 56,
  position: 'absolute',
  top: -28,
  left: 'calc(50% - 28px)',
  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
}));

const ContactInfoCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  border: '1px solid rgba(139, 69, 19, 0.1)',
  position: 'relative',
  overflow: 'visible',
}));

const ContactInfoAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  width: 64,
  height: 64,
  position: 'absolute',
  top: -32,
  left: 'calc(50% - 32px)',
  boxShadow: '0 4px 12px rgba(46, 125, 50, 0.2)',
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(3),
}));

const SocialButton = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  backgroundColor: 'rgba(139, 69, 19, 0.1)',
  borderRadius: '50%',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 8px rgba(139, 69, 19, 0.3)',
  },
}));

const ContactInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}));

const ContactIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

interface FormValues {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

const validationSchema = Yup.object().shape({
  nom: Yup.string()
    .required('Le nom est requis')
    .max(50, 'Le nom est trop long'),
  email: Yup.string()
    .email('Email invalide')
    .required('L\'email est requis'),
  sujet: Yup.string()
    .required('Le sujet est requis')
    .max(100, 'Le sujet est trop long'),
  message: Yup.string()
    .required('Le message est requis')
    .min(10, 'Le message est trop court (minimum 10 caractères)')
    .max(1000, 'Le message est trop long (maximum 1000 caractères)'),
});

const initialValues: FormValues = {
  nom: '',
  email: '',
  sujet: '',
  message: '',
};

export default function ContactPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      console.log('Form values:', values);
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbarMessage('Votre message a été envoyé avec succès !');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      resetForm();
    } catch (error) {
      console.error('Submission error:', error);
      setSnackbarMessage('Une erreur est survenue lors de l\'envoi de votre message.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Fade in={true} timeout={800}>
          <Box>
            <PageTitle variant="h4" gutterBottom>
              Contactez-nous
            </PageTitle>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ position: 'relative', mb: 8 }}>
                  <ContactInfoCard>
                    <ContactInfoAvatar>
                      <EmailIcon fontSize="large" />
                    </ContactInfoAvatar>
                    <CardContent sx={{ pt: 5, mt: 2, textAlign: 'center' }}>
                      <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
                        Informations de contact
                      </Typography>
                      
                      <ContactInfoItem>
                        <ContactIcon>
                          <LocationOnIcon />
                        </ContactIcon>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Adresse
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            Dakar, Sénégal
                          </Typography>
                        </Box>
                      </ContactInfoItem>

                      <ContactInfoItem>
                        <ContactIcon>
                          <PhoneIcon />
                        </ContactIcon>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Téléphone
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            +221 33 123 45 67
                          </Typography>
                        </Box>
                      </ContactInfoItem>

                      <ContactInfoItem>
                        <ContactIcon>
                          <EmailIcon />
                        </ContactIcon>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1" fontWeight={500}>
                            contact@apr-senegal.com
                          </Typography>
                        </Box>
                      </ContactInfoItem>

                      <Typography variant="subtitle1" sx={{ mt: 4, mb: 1, color: 'primary.main', fontWeight: 600 }}>
                        Suivez-nous
                      </Typography>

                      <SocialLinks>
                        <SocialButton
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          underline="none"
                        >
                          <FacebookIcon />
                        </SocialButton>
                        <SocialButton
                          href="https://twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                          underline="none"
                        >
                          <TwitterIcon />
                        </SocialButton>
                        <SocialButton
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          underline="none"
                        >
                          <InstagramIcon />
                        </SocialButton>
                        <SocialButton
                          href="https://linkedin.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          underline="none"
                        >
                          <LinkedInIcon />
                        </SocialButton>
                      </SocialLinks>
                    </CardContent>
                  </ContactInfoCard>
                </Box>

                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
                  Nous sommes disponibles du lundi au vendredi de 8h à 17h.
                  <br />
                  N'hésitez pas à nous contacter pour toute question.
                </Typography>
              </Grid>

              <Grid item xs={12} md={8}>
                <StyledPaper elevation={0}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
                    Envoyez-nous un message
                  </Typography>
                  
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                      <Form>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name="nom"
                              label="Nom complet"
                              value={values.nom}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.nom && Boolean(errors.nom)}
                              helperText={touched.nom && errors.nom}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              name="email"
                              label="Email"
                              type="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.email && Boolean(errors.email)}
                              helperText={touched.email && errors.email}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="sujet"
                              label="Sujet"
                              value={values.sujet}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.sujet && Boolean(errors.sujet)}
                              helperText={touched.sujet && errors.sujet}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SubjectIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              name="message"
                              label="Message"
                              multiline
                              rows={6}
                              value={values.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={touched.message && Boolean(errors.message)}
                              helperText={touched.message && errors.message}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                    <MessageIcon color="primary" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              fullWidth
                              disabled={isSubmitting}
                              endIcon={isSubmitting ? 
                                <CircularProgress size={20} color="inherit" /> : 
                                <SendIcon />
                              }
                            >
                              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    )}
                  </Formik>
                </StyledPaper>
              </Grid>
            </Grid>
          </Box>
        </Fade>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}