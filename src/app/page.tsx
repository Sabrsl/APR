'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ThemeProvider,
  Paper,
  Divider,
  useMediaQuery,
  Stack,
  IconButton,
  AppBar,
  Toolbar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GradeIcon from '@mui/icons-material/Grade';
import GroupsIcon from '@mui/icons-material/Groups';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FixedJoinButton from '@/components/FixedJoinButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import EventIcon from '@mui/icons-material/Event';
import GroupIcon from '@mui/icons-material/Group';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Navigation from '@/components/Navigation';
import theme from '@/theme/theme';

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.95)), url('/images/hero-bg.jpg') no-repeat center center`,
  backgroundSize: 'cover',
  color: 'white',
  padding: theme.spacing(15, 0),
  marginBottom: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
  animation: 'fadeIn 1s ease-in',
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(2),
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 60,
    height: 3,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 1.5,
  },
}));

const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 15px 35px rgba(139, 69, 19, 0.1)',
  },
}));

const NewsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 15px 35px rgba(139, 69, 19, 0.1)',
  },
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

const CounterBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  border: '1px solid rgba(139, 69, 19, 0.1)',
  height: '100%',
}));

const ProgramCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 15px 35px rgba(139, 69, 19, 0.1)',
  },
}));

const EventCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 15px 35px rgba(139, 69, 19, 0.1)',
  },
}));

const EventImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 200,
  objectFit: 'cover',
  borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
}));

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

// Contenu de la page
const homeContent = {
  hero: {
    title: "Alliance Pour la République",
    subtitle: "Ensemble, construisons un Sénégal fort, uni et prospère",
    description: "L'APR est un parti politique sénégalais engagé pour le développement durable et inclusif du pays. Rejoignez-nous pour participer à la construction d'un Sénégal meilleur.",
    cta: "Rejoignez-nous"
  },
  values: [
    {
      title: "Démocratie",
      icon: <PeopleIcon fontSize="large" />,
      description: "Nous défendons les valeurs démocratiques et les libertés fondamentales, garantissant la participation de tous les citoyens à la vie politique."
    },
    {
      title: "Solidarité",
      icon: <GroupsIcon fontSize="large" />,
      description: "Nous promouvons la solidarité entre tous les Sénégalais et nous engageons à ne laisser personne de côté dans notre marche vers le progrès."
    },
    {
      title: "Intégrité",
      icon: <GradeIcon fontSize="large" />,
      description: "Nous défendons une gestion transparente et responsable des affaires publiques, fondée sur l'éthique et la redevabilité."
    },
    {
      title: "Innovation",
      icon: <LightbulbIcon fontSize="large" />,
      description: "Nous encourageons l'innovation et la créativité comme moteurs du développement économique et social de notre pays."
    },
    {
      title: "Unité nationale",
      icon: <PublicIcon fontSize="large" />,
      description: "Nous œuvrons pour renforcer la cohésion nationale et l'harmonie entre toutes les composantes de la société sénégalaise."
    }
  ],
  news: [
    {
      title: "L'APR lance son nouveau programme de développement",
      date: "15 Mars 2024",
      description: "Le parti dévoile son plan d'action pour les prochaines années, axé sur l'éducation, l'emploi et l'innovation.",
      category: "Actualités"
    },
    {
      title: "Grand meeting à Dakar",
      date: "10 Mars 2024",
      description: "Plus de 10 000 militants se sont rassemblés pour soutenir les projets de l'APR pour le Sénégal.",
      category: "Événements"
    },
    {
      title: "Nouvelle initiative pour la jeunesse",
      date: "5 Mars 2024",
      description: "L'APR lance un programme de formation et d'accompagnement pour les jeunes entrepreneurs.",
      category: "Programmes"
    }
  ],
  programs: [
    {
      title: "Formation des jeunes leaders",
      description: "Programme de formation intensive pour développer les compétences de leadership des jeunes militants.",
      icon: <PeopleIcon fontSize="large" />,
      link: "/programmes/formation"
    },
    {
      title: "Initiative pour l'emploi",
      description: "Programme d'accompagnement et de formation professionnelle pour les jeunes entrepreneurs.",
      icon: <LightbulbIcon fontSize="large" />,
      link: "/programmes/emploi"
    },
    {
      title: "Développement communautaire",
      description: "Projets de développement local visant à améliorer les conditions de vie des communautés.",
      icon: <PublicIcon fontSize="large" />,
      link: "/programmes/communautaire"
    }
  ],
  events: [
    {
      title: "Grand meeting national",
      date: "30 Avril 2024",
      location: "Dakar",
      description: "Rassemblement national des militants pour discuter des enjeux actuels et des perspectives d'avenir.",
      image: "https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Meeting",
      link: "/evenements/grand-meeting"
    },
    {
      title: "Forum de la jeunesse",
      date: "15 Mai 2024",
      location: "Thiès",
      description: "Échange entre jeunes militants sur les défis et opportunités pour le développement du Sénégal.",
      image: "https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Forum",
      link: "/evenements/forum-jeunesse"
    },
    {
      title: "Conférence économique",
      date: "1 Juin 2024",
      location: "Saint-Louis",
      description: "Débat sur les politiques économiques pour un développement durable du Sénégal.",
      image: "https://via.placeholder.com/400x300/8B4513/FFFFFF?text=Conference",
      link: "/evenements/conference"
    }
  ],
  counters: [
    {
      number: "15+",
      label: "Années d'engagement"
    },
    {
      number: "45",
      label: "Départements couverts"
    },
    {
      number: "500K+",
      label: "Membres"
    },
    {
      number: "2000+",
      label: "Événements organisés"
    }
  ],
  socialMedia: [
    { name: "Facebook", icon: <FacebookIcon />, url: "https://facebook.com" },
    { name: "Twitter", icon: <TwitterIcon />, url: "https://twitter.com" },
    { name: "Instagram", icon: <InstagramIcon />, url: "https://instagram.com" },
    { name: "LinkedIn", icon: <LinkedInIcon />, url: "https://linkedin.com" },
    { name: "YouTube", icon: <YouTubeIcon />, url: "https://youtube.com" }
  ]
};

export default function HomePage() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pb: { xs: 8, sm: 6 } }}>
        <Navigation />

        {/* Section Héro */}
        <Box sx={{ pt: { xs: 8, sm: 10 } }}>
          <HeroSection>
            <Container>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant={isMobile ? 'h3' : 'h1'} gutterBottom>
                    {homeContent.hero.title}
                  </Typography>
                  <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ mb: 3, fontWeight: 'normal', opacity: 0.9 }}>
                    {homeContent.hero.subtitle}
                  </Typography>
                  <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', width: '80px', height: '3px', borderRadius: '2px', mb: 3 }} />
                  <Typography variant="h6" sx={{ maxWidth: 800, mb: 4, fontWeight: 'normal' }}>
                    {homeContent.hero.description}
                  </Typography>
                  <StyledLink href="/join">
                    <Button 
                      variant="contained" 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        bgcolor: 'white', 
                        color: 'primary.main',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                      }}
                    >
                      {homeContent.hero.cta}
                    </Button>
                  </StyledLink>
                </Grid>
              </Grid>
            </Container>
          </HeroSection>
        </Box>

        {/* Contenu principal */}
        <Container maxWidth="lg">
          {/* Programmes */}
          <StyledPaper>
            <SectionTitle variant="h4">
              Nos Programmes
            </SectionTitle>
            <Grid container spacing={3}>
              {homeContent.programs.map((program, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ProgramCard>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: 'rgba(139, 69, 19, 0.1)',
                        color: 'primary.main',
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        mb: 2,
                        mx: 'auto'
                      }}>
                        {program.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {program.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {program.description}
                      </Typography>
                      <StyledLink href={program.link}>
                        <Button
                          variant="outlined"
                          color="primary"
                          endIcon={<ArrowForwardIcon />}
                        >
                          En savoir plus
                        </Button>
                      </StyledLink>
                    </CardContent>
                  </ProgramCard>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>

          {/* Nos valeurs */}
          <StyledPaper>
            <SectionTitle variant="h4">
              Nos valeurs
            </SectionTitle>
            <Grid container spacing={3}>
              {homeContent.values.map((value, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ValueCard>
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: 'rgba(139, 69, 19, 0.1)',
                        color: 'primary.main',
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        mb: 2,
                        mx: 'auto'
                      }}>
                        {value.icon}
                      </Box>
                      <Typography variant="h6" gutterBottom>
                        {value.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </ValueCard>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>

          {/* Actualités */}
          <StyledPaper>
            <SectionTitle variant="h4">
              Actualités
            </SectionTitle>
            <Grid container spacing={3}>
              {homeContent.news.map((news, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <NewsCard>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        {news.category}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {news.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {news.date}
                      </Typography>
                      <Typography variant="body2">
                        {news.description}
                      </Typography>
                    </CardContent>
                  </NewsCard>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <StyledLink href="/actualites">
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                >
                  Voir toutes les actualités
                </Button>
              </StyledLink>
            </Box>
          </StyledPaper>

          {/* Événements */}
          <StyledPaper>
            <SectionTitle variant="h4">
              Prochains Événements
            </SectionTitle>
            <Grid container spacing={3}>
              {homeContent.events.map((event, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <EventCard>
                    <EventImage src={event.image} alt={event.title} />
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        {event.date} • {event.location}
                      </Typography>
                      <Typography variant="h6" gutterBottom>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {event.description}
                      </Typography>
                      <StyledLink href={event.link}>
                        <Button
                          variant="outlined"
                          color="primary"
                          endIcon={<ArrowForwardIcon />}
                        >
                          Détails
                        </Button>
                      </StyledLink>
                    </CardContent>
                  </EventCard>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <StyledLink href="/evenements">
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                >
                  Voir tous les événements
                </Button>
              </StyledLink>
            </Box>
          </StyledPaper>

          {/* Statistiques */}
          <StyledPaper>
            <SectionTitle variant="h4">
              L'APR en chiffres
            </SectionTitle>
            <Grid container spacing={3}>
              {homeContent.counters.map((counter, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <CounterBox>
                    <Typography variant="h3" color="primary.main" gutterBottom>
                      {counter.number}
                    </Typography>
                    <Typography variant="subtitle1" align="center">
                      {counter.label}
                    </Typography>
                  </CounterBox>
                </Grid>
              ))}
            </Grid>
          </StyledPaper>

          {/* Appel à l'action */}
          <StyledPaper sx={{ textAlign: 'center', bgcolor: 'rgba(139, 69, 19, 0.03)' }}>
            <Typography variant="h4" gutterBottom>
              Rejoignez le mouvement
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Ensemble, nous pouvons construire un Sénégal meilleur. Rejoignez l'APR et participez à la transformation de notre pays.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <StyledLink href="/join">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Adhérer à l'APR
                </Button>
              </StyledLink>
              <StyledLink href="/contact">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Nous contacter
                </Button>
              </StyledLink>
            </Stack>
          </StyledPaper>

          {/* Réseaux sociaux */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Suivez-nous sur les réseaux sociaux
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 2 }}>
              {homeContent.socialMedia.map((social, index) => (
                <SocialButton 
                  key={index}
                  onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                  aria-label={social.name}
                >
                  {social.icon}
                </SocialButton>
              ))}
            </Box>
          </Box>
        </Container>
        <FixedJoinButton />
      </Box>
    </ThemeProvider>
  );
} 