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
  Tabs,
  Tab,
  Chip,
  useMediaQuery,
  Fade,
  IconButton,
  Stack,
  Breadcrumbs,
  Link as MuiLink,
  Paper,
  Divider,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GroupsIcon from '@mui/icons-material/Groups';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FixedJoinButton from '@/components/FixedJoinButton';
import Navigation from '@/components/Navigation';
import HomeIcon from '@mui/icons-material/Home';
import theme from '@/theme/theme';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.95)), url('https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Événements') no-repeat center center`,
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

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
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

const EventTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.25rem',
  lineHeight: 1.4,
  marginBottom: theme.spacing(2),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  height: '2.8em',
}));

const EventInfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const SearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const FiltersContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
}));

const CalendarCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  border: '1px solid rgba(139, 69, 19, 0.1)',
}));

interface EventItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  isFeatured: boolean;
  registrationRequired: boolean;
}

// Données des événements
const eventsData: EventItem[] = [
  {
    id: '1',
    title: 'Forum sur le développement économique au Sénégal',
    description: 'Un forum réunissant les acteurs économiques pour discuter des perspectives de développement économique au Sénégal.',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Forum+Economique',
    date: '15 octobre 2023',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Centre International de Conférences Abdou Diouf, Diamniadio',
    category: 'Économie',
    isFeatured: true,
    registrationRequired: true
  },
  {
    id: '2',
    title: 'Journée de sensibilisation sur la santé maternelle',
    description: 'Une journée dédiée à la sensibilisation sur l\'importance de la santé maternelle et infantile dans les communautés rurales.',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Santé+Maternelle',
    date: '20 octobre 2023',
    startTime: '10:00',
    endTime: '15:00',
    location: 'Centre de Santé de Thiès',
    category: 'Santé',
    isFeatured: false,
    registrationRequired: false
  },
  {
    id: '3',
    title: 'Atelier sur les techniques agricoles innovantes',
    description: 'Un atelier pratique pour former les agriculteurs aux techniques modernes et durables pour améliorer les rendements.',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Agriculture',
    date: '25 octobre 2023',
    startTime: '08:30',
    endTime: '16:30',
    location: 'Centre Agricole de Kaolack',
    category: 'Agriculture',
    isFeatured: true,
    registrationRequired: true
  },
  {
    id: '4',
    title: 'Conférence sur l\'éducation et l\'emploi des jeunes',
    description: 'Une conférence pour discuter des défis et opportunités en matière d\'éducation et d\'insertion professionnelle des jeunes.',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Education',
    date: '30 octobre 2023',
    startTime: '14:00',
    endTime: '18:00',
    location: 'Université Cheikh Anta Diop, Dakar',
    category: 'Éducation',
    isFeatured: false,
    registrationRequired: true
  },
  {
    id: '5',
    title: 'Séminaire sur le développement des infrastructures',
    description: 'Un séminaire pour présenter les projets d\'infrastructures et leur impact sur le développement économique et social.',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Infrastructure',
    date: '5 novembre 2023',
    startTime: '09:30',
    endTime: '16:00',
    location: 'Hôtel Radisson Blu, Dakar',
    category: 'Infrastructure',
    isFeatured: false,
    registrationRequired: true
  },
  {
    id: '6',
    title: 'Formation en entrepreneuriat et innovation',
    description: 'Une formation pour outiller les jeunes entrepreneurs avec les compétences nécessaires pour innover et réussir dans le monde des affaires.',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Entrepreneuriat',
    date: '10 novembre 2023',
    startTime: '10:00',
    endTime: '17:00',
    location: 'Centre d\'Innovation, Dakar',
    category: 'Entrepreneuriat',
    isFeatured: true,
    registrationRequired: true
  }
];

// Prochains événements pour la barre latérale
const upcomingEvents = [
  {
    id: '1',
    title: 'Forum sur le développement économique au Sénégal',
    date: '15 octobre 2023',
    category: 'Économie'
  },
  {
    id: '2',
    title: 'Journée de sensibilisation sur la santé maternelle',
    date: '20 octobre 2023',
    category: 'Santé'
  },
  {
    id: '3',
    title: 'Atelier sur les techniques agricoles innovantes',
    date: '25 octobre 2023',
    category: 'Agriculture'
  }
];

const eventCategories = ['Tout', 'Économie', 'Santé', 'Agriculture', 'Éducation', 'Infrastructure', 'Entrepreneuriat'];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [searchTerm, setSearchTerm] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Filtrer les événements par catégorie et recherche
  const filteredEvents = eventsData
    .filter(event => selectedCategory === 'Tout' || event.category === selectedCategory)
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <Navigation />

        {/* Fil d'Ariane */}
        <Container maxWidth="lg" sx={{ pt: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
            <Link href="/" passHref>
              <MuiLink underline="hover" color="inherit" sx={{ display: 'flex', alignItems: 'center' }}>
                <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                Accueil
              </MuiLink>
            </Link>
            <Typography color="text.primary">Événements</Typography>
          </Breadcrumbs>
        </Container>

        {/* Section Héro */}
        <Container maxWidth="lg">
          <Fade in={true} timeout={800}>
            <HeroSection>
              <Container>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant={isMobile ? 'h4' : 'h3'} gutterBottom>
                      Nos Événements
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'normal', opacity: 0.9 }}>
                      Retrouvez tous les événements et activités organisés par l'Alliance Pour la République
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', width: '80px', height: '3px', borderRadius: '2px', mb: 3 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Chip 
                        label="Événements à venir" 
                        icon={<TodayIcon />}
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.2)', 
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
                        }} 
                      />
                      <Chip 
                        label="Événements passés" 
                        icon={<EventAvailableIcon />}
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.2)', 
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
                        }} 
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </HeroSection>
          </Fade>
        </Container>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {/* Filtres et recherche */}
              <FiltersContainer>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <SearchBar
                      fullWidth
                      variant="outlined"
                      placeholder="Rechercher un événement..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Tabs
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      TabIndicatorProps={{ sx: { height: 3, borderRadius: '2px' } }}
                      sx={{ 
                        '& .MuiTab-root': { 
                          textTransform: 'none',
                          fontWeight: 500,
                          minWidth: 'auto',
                          px: 2,
                          py: 1,
                          borderRadius: '8px',
                          mx: 0.5
                        }
                      }}
                    >
                      {eventCategories.map((category) => (
                        <Tab
                          key={category}
                          label={category}
                          value={category}
                        />
                      ))}
                    </Tabs>
                  </Grid>
                </Grid>
              </FiltersContainer>

              {/* Liste des événements */}
              <Grid container spacing={4}>
                {filteredEvents.map((event) => (
                  <Grid item xs={12} sm={6} key={event.id}>
                    <Fade in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
                      <StyledCard>
                        <Box sx={{ position: 'relative' }}>
                          <EventDate>
                            {formatDateForCard(event.date)}
                          </EventDate>
                          <CategoryBadge
                            label={event.category}
                            size="small"
                          />
                          <CardMedia
                            component="img"
                            height="200"
                            image={event.image}
                            alt={event.title}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <EventTitle>
                            {event.title}
                            {event.isFeatured && (
                              <Tooltip title="Événement majeur">
                                <Chip 
                                  label="À la une" 
                                  size="small" 
                                  color="secondary" 
                                  sx={{ ml: 1, verticalAlign: 'middle' }} 
                                />
                              </Tooltip>
                            )}
                          </EventTitle>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              mb: 3,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              height: '4.5em'
                            }}
                          >
                            {event.description}
                          </Typography>
                          <Stack spacing={1}>
                            <EventInfoItem>
                              <CalendarTodayIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                              <Typography variant="body2">
                                {event.date}
                              </Typography>
                            </EventInfoItem>
                            <EventInfoItem>
                              <AccessTimeIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                              <Typography variant="body2">
                                {event.startTime} - {event.endTime}
                              </Typography>
                            </EventInfoItem>
                            <EventInfoItem>
                              <LocationOnIcon fontSize="small" sx={{ color: 'primary.main', mr: 1 }} />
                              <Typography 
                                variant="body2"
                                sx={{
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis'
                                }}
                              >
                                {event.location}
                              </Typography>
                            </EventInfoItem>
                          </Stack>
                        </CardContent>
                        <Divider />
                        <Box sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          px: 3,
                          py: 2
                        }}>
                          <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            href={`/evenements/${event.id}`}
                            endIcon={<ArrowForwardIcon />}
                          >
                            Détails
                          </Button>
                          {event.registrationRequired && (
                            <Chip 
                              label="Inscription requise" 
                              variant="outlined" 
                              color="primary" 
                              size="small"
                            />
                          )}
                        </Box>
                      </StyledCard>
                    </Fade>
                  </Grid>
                ))}
              </Grid>

              {/* Aucun résultat */}
              {filteredEvents.length === 0 && (
                <Paper sx={{ p: 4, textAlign: 'center', mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Aucun événement trouvé
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Essayez de modifier vos critères de recherche ou sélectionnez une autre catégorie.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setSelectedCategory('Tout');
                      setSearchTerm('');
                    }}
                  >
                    Voir tous les événements
                  </Button>
                </Paper>
              )}

              {/* Pagination */}
              {filteredEvents.length > 0 && (
                <Box sx={{ mt: 6, textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ px: 4, py: 1.5, borderWidth: 2 }}
                  >
                    Voir plus d'événements
                  </Button>
                </Box>
              )}
            </Grid>

            {/* Barre latérale */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                {/* Calendrier des événements */}
                <CalendarCard>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary" sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3
                    }}>
                      <CalendarMonthIcon sx={{ mr: 1 }} />
                      Calendrier des événements
                    </Typography>
                    <List sx={{ p: 0 }}>
                      {upcomingEvents.map((event) => (
                        <ListItem 
                          key={event.id} 
                          component={Link} 
                          href={`/evenements/${event.id}`}
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
                                  {event.title}
                                </Typography>
                              }
                              secondary={
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                                  <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5, fontSize: 14 }} />
                                  <Typography variant="caption" color="text.secondary">
                                    {event.date}
                                  </Typography>
                                  <Chip 
                                    label={event.category} 
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
                    <Button 
                      variant="contained" 
                      color="primary" 
                      fullWidth 
                      sx={{ mt: 2 }}
                      startIcon={<CalendarMonthIcon />}
                      component={Link}
                      href="/calendrier"
                    >
                      Voir le calendrier complet
                    </Button>
                  </CardContent>
                </CalendarCard>

                {/* Organiser un événement */}
                <Card sx={{ bgcolor: 'primary.main', color: 'white' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Organiser un événement
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      Vous souhaitez organiser un événement avec l'APR dans votre localité ? Contactez-nous pour discuter de votre projet.
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Button 
                          variant="contained" 
                          fullWidth 
                          sx={{ 
                            bgcolor: 'white', 
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                          }}
                          component={Link}
                          href="/contact"
                        >
                          Nous contacter
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          sx={{ 
                            color: 'white', 
                            borderColor: 'white',
                            '&:hover': { 
                              borderColor: 'white',
                              bgcolor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                          component={Link}
                          href="/proposer-evenement"
                        >
                          Proposer un événement
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                {/* Catégories populaires */}
                <Card sx={{ mt: 4 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary" sx={{ mb: 3 }}>
                      Catégories populaires
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {eventCategories.filter(cat => cat !== 'Tout').map((category) => (
                        <Chip 
                          key={category}
                          label={category}
                          color="primary"
                          variant="outlined"
                          onClick={() => setSelectedCategory(category)}
                          sx={{ mb: 1 }}
                        />
                      ))}
                    </Box>
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