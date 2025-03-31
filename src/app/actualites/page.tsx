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
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CategoryIcon from '@mui/icons-material/Category';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FixedJoinButton from '@/components/FixedJoinButton';
import Navigation from '@/components/Navigation';
import HomeIcon from '@mui/icons-material/Home';

// Définition du thème personnalisé avec les couleurs marron originales
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
          overflow: 'hidden',
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 15px 35px rgba(139, 69, 19, 0.1)',
          },
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
    MuiTab: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s',
          '&.Mui-selected': {
            backgroundColor: 'rgba(139, 69, 19, 0.08)',
          },
        },
      },
    },
  },
});

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.95)), url('https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Actualités') no-repeat center center`,
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
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const CategoryBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: 'rgba(139, 69, 19, 0.85)',
  color: 'white',
  padding: '4px 12px',
  borderRadius: 20,
  fontSize: '0.75rem',
  fontWeight: 600,
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 4,
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.25rem',
  lineHeight: 1.4,
  marginBottom: theme.spacing(1),
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  height: '2.8em',
}));

const DateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const SocialButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(139, 69, 19, 0.08)',
  transition: 'all 0.2s',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    transform: 'translateY(-3px)',
  },
}));

const CategoryTabsContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
}));

interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
}

// Données des actualités
const newsData: NewsItem[] = [
  {
    id: '1',
    title: 'Lancement du nouveau programme de formation professionnelle',
    subtitle: 'Une initiative majeure pour l\'emploi des jeunes',
    content: 'Le gouvernement a lancé un nouveau programme ambitieux de formation professionnelle visant à former 10 000 jeunes dans les métiers porteurs...',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Formation',
    date: '15 septembre 2023',
    category: 'Éducation',
    tags: ['Formation', 'Emploi', 'Jeunesse']
  },
  {
    id: '2',
    title: 'Inauguration du nouveau centre de santé à Thiès',
    subtitle: 'Un pas en avant pour l\'accès aux soins',
    content: 'Le nouveau centre de santé de Thiès a été inauguré ce matin en présence des autorités locales et des représentants du ministère de la Santé...',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Santé',
    date: '10 septembre 2023',
    category: 'Santé',
    tags: ['Santé', 'Infrastructure', 'Développement']
  },
  {
    id: '3',
    title: 'Nouveau programme d\'irrigation dans la vallée du fleuve',
    subtitle: 'Soutenir l\'agriculture locale',
    content: 'Un nouveau programme d\'irrigation a été mis en place dans la vallée du fleuve pour améliorer la productivité agricole...',
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Agriculture',
    date: '5 septembre 2023',
    category: 'Agriculture',
    tags: ['Agriculture', 'Développement rural', 'Innovation']
  }
];

const categories = ['Tout', 'Éducation', 'Santé', 'Agriculture', 'Infrastructure', 'Innovation'];

export default function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleCategoryChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedCategory(newValue);
  };

  const filteredNews = selectedCategory === 'Tout'
    ? newsData
    : newsData.filter(news => news.category === selectedCategory);

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
            <Typography color="text.primary">Actualités</Typography>
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
                      Actualités
                    </Typography>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'normal', opacity: 0.9 }}>
                      Restez informé des dernières nouvelles et développements de nos programmes
                    </Typography>
                    <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', width: '80px', height: '3px', borderRadius: '2px', mb: 3 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Chip 
                        label="Dernières nouvelles" 
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.2)', 
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.3)' }
                        }} 
                      />
                      <Chip 
                        label="Événements à venir" 
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

        {/* Catégories */}
        <Container maxWidth="lg">
          <CategoryTabsContainer>
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
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  mx: 0.5
                }
              }}
            >
              {categories.map((category) => (
                <Tab
                  key={category}
                  label={category}
                  value={category}
                />
              ))}
            </Tabs>
          </CategoryTabsContainer>
        </Container>

        {/* Liste des actualités */}
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {filteredNews.map((news) => (
              <Grid item xs={12} md={6} lg={4} key={news.id}>
                <Fade in={true} timeout={800} style={{ transitionDelay: '100ms' }}>
                  <StyledCard>
                    <CategoryBadge>
                      <CategoryIcon fontSize="small" />
                      {news.category}
                    </CategoryBadge>
                    <CardMedia
                      component="img"
                      height="220"
                      image={news.image}
                      alt={news.title}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <DateBox>
                        <CalendarTodayIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {news.date}
                        </Typography>
                      </DateBox>
                      <CardTitle>
                        {news.title}
                      </CardTitle>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {news.subtitle}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        paragraph 
                        sx={{ 
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          height: '4.5em',
                          mb: 3
                        }}
                      >
                        {news.content}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                        {news.tags.map((tag) => (
                          <Chip 
                            key={tag}
                            label={tag}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
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
                        href={`/actualites/${news.id}`}
                      >
                        Lire la suite
                      </Button>
                      <Box>
                        <SocialButton size="small" sx={{ mr: 1 }}>
                          <ShareIcon fontSize="small" />
                        </SocialButton>
                        <SocialButton size="small">
                          <BookmarkBorderIcon fontSize="small" />
                        </SocialButton>
                      </Box>
                    </Box>
                  </StyledCard>
                </Fade>
              </Grid>
            ))}
          </Grid>

          {/* Aucun résultat */}
          {filteredNews.length === 0 && (
            <Paper sx={{ p: 4, textAlign: 'center', mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Aucune actualité trouvée pour cette catégorie
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Essayez une autre catégorie ou revenez plus tard pour de nouvelles actualités.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setSelectedCategory('Tout')}
              >
                Voir toutes les actualités
              </Button>
            </Paper>
          )}

          {/* Bouton Voir plus */}
          {filteredNews.length > 0 && (
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                sx={{ px: 4, py: 1.5, borderWidth: 2 }}
              >
                Voir plus d'actualités
              </Button>
            </Box>
          )}
        </Container>
        <FixedJoinButton />
      </Box>
    </ThemeProvider>
  );
}