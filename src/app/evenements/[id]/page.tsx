'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
  useMediaQuery,
  Fade,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  IconButton,
  Snackbar,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PeopleIcon from '@mui/icons-material/People';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import InfoIcon from '@mui/icons-material/Info';
import DownloadIcon from '@mui/icons-material/Download';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FixedJoinButton from '@/components/FixedJoinButton';

// Réutiliser le même thème que la page des événements
const theme = createTheme({
  palette: {
    primary: {
      light: '#A0522D',
      main: '#8B4513',
      dark: '#654321',
      contrastText: '#fff',
    },
    secondary: {
      light: '#D2691E',
      main: '#CD853F',
      dark: '#8B4513',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 16px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(139, 69, 19, 0.2)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#654321',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '24px 0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        outlinedPrimary: {
          borderWidth: '1.5px',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          padding: 8,
        },
      },
    },
  },
});

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.95)), url('https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Événement') no-repeat center center`,
  backgroundSize: 'cover',
  color: 'white',
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
}));

const BreadcrumbLink = styled(Link)({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const EventDate = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  backgroundColor: 'white',
  borderRadius: 8,
  padding: theme.spacing(1),
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: 60,
  zIndex: 1,
}));

const CategoryBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: 'rgba(139, 69, 19, 0.85)',
  color: 'white',
  fontWeight: 500,
  zIndex: 1,
}));

const EventInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

// Données de l'événement (à remplacer par des données dynamiques)
const eventData = {
  id: '1',
  title: 'Forum sur le développement économique au Sénégal',
  description: 'Un forum réunissant les acteurs économiques pour discuter des perspectives de développement économique au Sénégal.',
  content: `L'Alliance Pour la République organise un forum majeur sur le développement économique au Sénégal. Cet événement réunira les principaux acteurs économiques du pays pour discuter des défis et opportunités du développement économique.

Les thèmes principaux qui seront abordés incluent :
- La transformation numérique de l'économie
- L'entrepreneuriat et l'innovation
- L'emploi des jeunes
- Le développement des infrastructures
- La durabilité économique

Le forum sera l'occasion d'échanger sur les meilleures pratiques et de proposer des solutions concrètes pour accélérer le développement économique du Sénégal.`,
  image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Forum+Economique',
  date: '15 octobre 2023',
  startTime: '09:00',
  endTime: '17:00',
  location: 'Centre International de Conférences Abdou Diouf, Diamniadio',
  category: 'Économie',
  isFeatured: true,
  registrationRequired: true,
  capacity: 200,
  registered: 150,
  tags: ['Économie', 'Développement', 'Innovation', 'Entrepreneuriat'],
  agenda: [
    { time: '09:00 - 09:30', title: 'Accueil et enregistrement' },
    { time: '09:30 - 10:00', title: 'Cérémonie d\'ouverture' },
    { time: '10:00 - 12:00', title: 'Panel 1 : Transformation numérique' },
    { time: '12:00 - 13:30', title: 'Pause déjeuner' },
    { time: '13:30 - 15:30', title: 'Panel 2 : Entrepreneuriat et innovation' },
    { time: '15:30 - 16:30', title: 'Table ronde : Perspectives d\'avenir' },
    { time: '16:30 - 17:00', title: 'Clôture et cocktail' }
  ]
};

interface EventDetail {
  id: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  category: string;
  isFeatured: boolean;
  registrationRequired: boolean;
  registrationDeadline: string;
  maxParticipants: number;
  currentParticipants: number;
  organizers: {
    name: string;
    title: string;
    image: string;
    contact: string;
  }[];
  schedule: {
    time: string;
    activity: string;
    description?: string;
  }[];
  speakers: {
    name: string;
    title: string;
    image: string;
    bio?: string;
  }[];
  relatedEvents: {
    id: string;
    title: string;
    date: string;
    image: string;
    location: string;
  }[];
  documents: {
    title: string;
    type: string;
    url: string;
  }[];
}

interface PageParams {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: PageParams) {
  const [openDialog, setOpenDialog] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: ''
  });
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const event = eventData; // Dans une vraie app, vous récupéreriez l'événement par son ID

  // Convertir une date en format jour/mois
  const formatDateForCard = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleString('fr-FR', { day: 'numeric' });
    const month = date.toLocaleString('fr-FR', { month: 'short' });
    return (
      <>
        <Typography variant="h6" component="span" color="primary">{day}</Typography>
        <Typography variant="caption" display="block" color="text.secondary">{month}</Typography>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pb: { xs: 8, sm: 6 } }}>
        {/* Fil d'Ariane */}
        <Container maxWidth="lg" sx={{ pt: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <BreadcrumbLink href="/" passHref legacyBehavior>
              <MuiLink color="inherit">Accueil</MuiLink>
            </BreadcrumbLink>
            <BreadcrumbLink href="/evenements" passHref legacyBehavior>
              <MuiLink color="inherit">Événements</MuiLink>
            </BreadcrumbLink>
            <Typography color="text.primary">{eventData.title}</Typography>
          </Breadcrumbs>
        </Container>

        {/* Section Héro */}
        <Container maxWidth="lg">
          <Fade in={true} timeout={800}>
            <HeroSection>
              <Container>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <IconButton
                        component={Link}
                        href="/evenements"
                        sx={{ 
                          color: 'white',
                          mr: 2,
                          '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                        }}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                      <Typography variant={isMobile ? 'h4' : 'h3'}>
                        {eventData.title}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'normal', opacity: 0.9 }}>
                      {eventData.description}
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', width: '80px', height: '3px', borderRadius: '2px', mb: 3 }} />
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                      <Chip 
                        label={eventData.category}
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.2)', 
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
                        }} 
                      />
                      {eventData.isFeatured && (
                        <Chip 
                          label="À la une"
                          sx={{ 
                            bgcolor: 'rgba(255, 255, 255, 0.2)', 
                            color: 'white',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
                          }} 
                        />
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </HeroSection>
          </Fade>
        </Container>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Contenu principal */}
            <Grid item xs={12} md={8}>
              <Card>
                <Box sx={{ position: 'relative' }}>
                  <EventDate>
                    {formatDateForCard(eventData.date)}
                  </EventDate>
                  <CategoryBadge
                    label={eventData.category}
                    size="small"
                  />
                  <CardMedia
                    component="img"
                    height="400"
                    image={eventData.image}
                    alt={eventData.title}
                  />
                </Box>
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="h5" gutterBottom>
                        À propos de l'événement
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                        {eventData.content}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Programme
                      </Typography>
                      <List>
                        {eventData.agenda.map((item, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon sx={{ minWidth: 40 }}>
                              <EventIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                                  {item.title}
                                </Typography>
                              }
                              secondary={
                                <Typography variant="body2" color="text.secondary">
                                  {item.time}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Informations pratiques
                      </Typography>
                      <Stack spacing={2}>
                        <EventInfoItem>
                          <CalendarTodayIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography variant="body2">
                            {eventData.date}
                          </Typography>
                        </EventInfoItem>
                        <EventInfoItem>
                          <AccessTimeIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography variant="body2">
                            {eventData.startTime} - {eventData.endTime}
                          </Typography>
                        </EventInfoItem>
                        <EventInfoItem>
                          <LocationOnIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                          <Typography variant="body2">
                            {eventData.location}
                          </Typography>
                        </EventInfoItem>
                      </Stack>
                    </Box>

                    <Box>
                      <Typography variant="h6" gutterBottom>
                        Tags
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {eventData.tags.map((tag) => (
                          <Chip 
                            key={tag}
                            label={tag}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
                <Divider />
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  px: 4,
                  py: 3
                }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Places disponibles: {eventData.capacity - eventData.registered}/{eventData.capacity}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Tooltip title="Partager">
                      <IconButton>
                        <ShareIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Enregistrer">
                      <IconButton>
                        <BookmarkBorderIcon />
                      </IconButton>
                    </Tooltip>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={eventData.registered >= eventData.capacity}
                      component={Link}
                      href={`/evenements/${params.id}/inscription`}
                    >
                      S'inscrire
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>

            {/* Barre latérale */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                {/* Carte d'inscription */}
                <Card sx={{ mb: 4 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Inscription
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {eventData.registrationRequired 
                        ? 'L\'inscription est requise pour participer à cet événement.'
                        : 'L\'inscription est gratuite et ouverte à tous.'}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={eventData.registered >= eventData.capacity}
                      component={Link}
                      href={`/evenements/${params.id}/inscription`}
                    >
                      {eventData.registered >= eventData.capacity ? 'Complet' : 'S\'inscrire'}
                    </Button>
                    {eventData.registered >= eventData.capacity && (
                      <Typography variant="body2" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                        Désolé, l'événement est complet
                      </Typography>
                    )}
                  </CardContent>
                </Card>

                {/* Organisateur */}
                <Card sx={{ mb: 4 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Organisateur
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Alliance Pour la République
                    </Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      component={Link}
                      href="/contact"
                    >
                      Contacter l'organisateur
                    </Button>
                  </CardContent>
                </Card>

                {/* Événements similaires */}
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary">
                      Événements similaires
                    </Typography>
                    <List sx={{ p: 0 }}>
                      {[1, 2, 3].map((id) => (
                        <ListItem 
                          key={id} 
                          component={Link} 
                          href={`/evenements/${id}`}
                          disablePadding
                          sx={{ 
                            mb: 2, 
                            textDecoration: 'none', 
                            color: 'inherit',
                            '&:hover': {
                              '& .MuiTypography-root': { color: 'primary.main' }
                            }
                          }}
                        >
                          <ListItemButton sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(139, 69, 19, 0.03)' }}>
                            <ListItemIcon sx={{ minWidth: 42 }}>
                              <EventIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                                  Événement similaire {id}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                                  <Typography variant="caption" color="text.secondary">
                                    15 novembre 2023
                                  </Typography>
                                  <Chip 
                                    label="Économie" 
                                    size="small" 
                                    sx={{ 
                                      ml: 1, 
                                      height: 20, 
                                      fontSize: '0.625rem',
                                      bgcolor: 'rgba(139, 69, 19, 0.08)'
                                    }} 
                                  />
                                </Box>
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <FixedJoinButton />
      </Box>
    </ThemeProvider>
  );
} 