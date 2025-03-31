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
  Tab,
  Tabs,
  IconButton,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GradeIcon from '@mui/icons-material/Grade';
import HistoryIcon from '@mui/icons-material/History';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FixedJoinButton from '@/components/FixedJoinButton';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent
} from '@mui/lab';
import Navigation from '@/components/Navigation';
import HomeIcon from '@mui/icons-material/Home';

// Définition du thème personnalisé avec les couleurs marron
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
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.95)), url('https://via.placeholder.com/1920x800/8B4513/FFFFFF?text=APR') no-repeat center center`,
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

const TeamMemberCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0px 15px 35px rgba(139, 69, 19, 0.1)',
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  border: '1px solid rgba(139, 69, 19, 0.1)',
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(3),
}));

const ContactIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '50%',
  marginRight: theme.spacing(2),
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

// Contenu de la page
const aboutContent = {
  history: {
    title: "Notre histoire",
    content: `L'Alliance Pour la République (APR) est un parti politique sénégalais fondé sur des valeurs de progrès, 
    de solidarité et de démocratie. Depuis sa création, l'APR s'est engagée à œuvrer pour le développement du Sénégal 
    et l'amélioration des conditions de vie de ses citoyens.
    
    Fondée par des hommes et des femmes animés par une ambition commune pour leur pays, l'APR s'est rapidement 
    imposée comme une force politique majeure, porteuse d'une vision nouvelle pour le Sénégal.
    
    Au fil des années, l'APR a élaboré et mis en œuvre des politiques et des programmes qui ont contribué à 
    transformer positivement le paysage socio-économique du pays. Notre parti continue de travailler sans relâche 
    pour un Sénégal prospère, uni et solidaire.`
  },
  mission: {
    title: "Notre mission",
    content: `La mission de l'Alliance Pour la République est de promouvoir un développement inclusif et durable 
    du Sénégal, en plaçant les citoyens au cœur de son action politique.
    
    Nous œuvrons pour une société sénégalaise plus juste et équitable, où chaque citoyen, quelle que soit son origine 
    ou sa condition sociale, a la possibilité de s'épanouir et de contribuer à la construction nationale.
    
    Notre engagement s'articule autour de plusieurs axes prioritaires : l'éducation, la santé, l'emploi, 
    l'infrastructure, l'agriculture et la bonne gouvernance. Nous croyons fermement que ces secteurs constituent 
    les piliers d'un développement harmonieux et durable.`
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
  timeline: [
    {
      year: "2008",
      title: "Fondation de l'APR",
      description: "Création de l'Alliance Pour la République pour offrir une alternative politique au peuple sénégalais."
    },
    {
      year: "2012",
      title: "Victoire électorale",
      description: "L'APR remporte les élections présidentielles et entame un programme de transformation du pays."
    },
    {
      year: "2014",
      title: "Lancement du Plan Sénégal Émergent",
      description: "Mise en œuvre d'un plan stratégique de développement pour faire du Sénégal un pays émergent."
    },
    {
      year: "2016",
      title: "Réformes institutionnelles",
      description: "Adoption de réformes majeures pour moderniser le fonctionnement des institutions."
    },
    {
      year: "2019",
      title: "Réélection et renforcement",
      description: "Nouvelle victoire électorale et renforcement des programmes de développement."
    },
    {
      year: "2023",
      title: "Vers de nouveaux horizons",
      description: "Renforcement de la présence sur le terrain et élargissement de la base militante."
    }
  ],
  team: [
    {
      name: "Amadou Diallo",
      position: "Président",
      image: "https://via.placeholder.com/150",
      bio: "Homme politique expérimenté, engagé depuis plus de 20 ans pour le développement du Sénégal."
    },
    {
      name: "Fatou Ndiaye",
      position: "Secrétaire Générale",
      image: "https://via.placeholder.com/150",
      bio: "Économiste de formation, elle coordonne les activités du parti et supervise la mise en œuvre des programmes."
    },
    {
      name: "Ibrahim Sow",
      position: "Trésorier",
      image: "https://via.placeholder.com/150",
      bio: "Expert en finances publiques, il assure la gestion transparente des ressources du parti."
    },
    {
      name: "Aïssatou Diop",
      position: "Porte-parole",
      image: "https://via.placeholder.com/150",
      bio: "Ancienne journaliste, elle représente le parti dans les médias et communication."
    },
    {
      name: "Mamadou Seck",
      position: "Responsable des Jeunes",
      image: "https://via.placeholder.com/150",
      bio: "Il mobilise et forme la jeunesse pour assurer la relève du parti."
    },
    {
      name: "Mariama Bâ",
      position: "Responsable des Femmes",
      image: "https://via.placeholder.com/150",
      bio: "Elle œuvre pour la promotion des femmes dans la vie politique et leur émancipation."
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
  contact: {
    address: "Siège du parti APR, Avenue de la République, Dakar, Sénégal",
    phone: "+221 33 XXX XX XX",
    email: "contact@apr-senegal.com",
    socialMedia: [
      { name: "Facebook", icon: <FacebookIcon />, url: "https://facebook.com" },
      { name: "Twitter", icon: <TwitterIcon />, url: "https://twitter.com" },
      { name: "Instagram", icon: <InstagramIcon />, url: "https://instagram.com" },
      { name: "LinkedIn", icon: <LinkedInIcon />, url: "https://linkedin.com" },
      { name: "YouTube", icon: <YouTubeIcon />, url: "https://youtube.com" }
    ]
  }
};

export default function AboutPage() {
  const [tabValue, setTabValue] = React.useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pb: { xs: 8, sm: 6 } }}>
        <Navigation />

        {/* Fil d'Ariane */}
        <Container maxWidth="lg" sx={{ pt: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <BreadcrumbLink href="/" passHref legacyBehavior>
              <MuiLink color="inherit">Accueil</MuiLink>
            </BreadcrumbLink>
            <Typography color="text.primary">À propos</Typography>
          </Breadcrumbs>
        </Container>

        {/* Section Héro */}
        <Box sx={{ pt: { xs: 8, sm: 10 } }}>
          <HeroSection>
            <Container>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography variant={isMobile ? 'h4' : 'h3'} gutterBottom>
                    Alliance Pour la République
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 'normal', opacity: 0.9 }}>
                    Ensemble, construisons un Sénégal fort, uni et prospère
                  </Typography>
                  <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', width: '80px', height: '3px', borderRadius: '2px', mb: 3 }} />
                  <Typography variant="body1" sx={{ maxWidth: 800, mb: 4 }}>
                    L'Alliance Pour la République (APR) est un parti politique sénégalais engagé pour le développement durable et inclusif du pays. 
                    Découvrez notre histoire, nos valeurs et nos actions pour un Sénégal meilleur.
                  </Typography>
                  <Button 
                    variant="contained" 
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      bgcolor: 'white', 
                      color: 'primary.main',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                    }}
                    component={Link}
                    href="/join"
                  >
                    Rejoignez-nous
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </HeroSection>
        </Box>

        {/* Contenu principal */}
        <Container maxWidth="lg">
          {/* Présentation */}
          <StyledPaper>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <SectionTitle variant="h5">
                  {aboutContent.history.title}
                </SectionTitle>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {aboutContent.history.content}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <SectionTitle variant="h5">
                  {aboutContent.mission.title}
                </SectionTitle>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {aboutContent.mission.content}
                </Typography>
              </Grid>
            </Grid>
          </StyledPaper>

          {/* Nos valeurs */}
          <StyledPaper>
            <SectionTitle variant="h5">
              Nos valeurs
            </SectionTitle>
            <Grid container spacing={3}>
              {aboutContent.values.map((value, index) => (
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

          {/* Notre histoire */}
          <StyledPaper>
            <SectionTitle variant="h5">
              Notre parcours
            </SectionTitle>
            <Timeline position={isMobile ? "right" : "alternate"} sx={{ mb: 0 }}>
              {aboutContent.timeline.map((milestone, index) => (
                <TimelineItem key={index}>
                  {!isMobile && (
                    <TimelineOppositeContent color="text.secondary">
                      <Typography variant="h6" color="primary.main">
                        {milestone.year}
                      </Typography>
                    </TimelineOppositeContent>
                  )}
                  <TimelineSeparator>
                    <TimelineDot color="primary">
                      <HistoryIcon />
                    </TimelineDot>
                    {index < aboutContent.timeline.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper elevation={3} sx={{ p: 2, mb: 1 }}>
                      {isMobile && (
                        <Typography variant="h6" color="primary.main" gutterBottom>
                          {milestone.year}
                        </Typography>
                      )}
                      <Typography variant="subtitle1" fontWeight="medium">
                        {milestone.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {milestone.description}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </StyledPaper>

          {/* Statistiques */}
          <StyledPaper>
            <SectionTitle variant="h5">
              L'APR en chiffres
            </SectionTitle>
            <Grid container spacing={3}>
              {aboutContent.counters.map((counter, index) => (
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

          {/* Notre équipe */}
          <StyledPaper>
            <SectionTitle variant="h5">
              Notre équipe dirigeante
            </SectionTitle>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                TabIndicatorProps={{ style: { height: 3, borderRadius: '1.5px' } }}
              >
                <Tab label="Bureau exécutif" />
                <Tab label="Coordinateurs régionaux" />
              </Tabs>
            </Box>
            <Box hidden={tabValue !== 0}>
              <Grid container spacing={3}>
                {aboutContent.team.map((member, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <TeamMemberCard>
                      <CardContent sx={{ p: 3, textAlign: 'center' }}>
                        <Avatar
                          src={member.image}
                          alt={member.name}
                          sx={{ width: 120, height: 120, mx: 'auto', mb: 2, border: '3px solid', borderColor: 'primary.main' }}
                        />
                        <Typography variant="h6" gutterBottom>
                          {member.name}
                        </Typography>
                        <Typography variant="subtitle2" color="primary" gutterBottom>
                          {member.position}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {member.bio}
                        </Typography>
                      </CardContent>
                    </TeamMemberCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box hidden={tabValue !== 1}>
              <Alert severity="info" sx={{ mb: 3 }}>
                Les informations sur les coordinateurs régionaux seront bientôt disponibles.
              </Alert>
            </Box>
          </StyledPaper>

          {/* Contact */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <ContactCard>
                <CardContent sx={{ p: 3 }}>
                  <SectionTitle variant="h5">
                    Nous contacter
                  </SectionTitle>
                  <ContactItem>
                    <ContactIcon>
                      <LocationOnIcon />
                    </ContactIcon>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Adresse
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {aboutContent.contact.address}
                      </Typography>
                    </Box>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>
                      <PhoneIcon />
                    </ContactIcon>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Téléphone
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {aboutContent.contact.phone}
                      </Typography>
                    </Box>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>
                      <EmailIcon />
                    </ContactIcon>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        Email
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {aboutContent.contact.email}
                      </Typography>
                    </Box>
                  </ContactItem>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                    Suivez-nous
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    {aboutContent.contact.socialMedia.map((social, index) => (
                      <SocialButton 
                        key={index}
                        onClick={() => window.open(social.url, '_blank', 'noopener,noreferrer')}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </SocialButton>
                    ))}
                  </Box>
                </CardContent>
              </ContactCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledPaper>
                <SectionTitle variant="h5">
                  Nos bureaux
                </SectionTitle>
                <Box 
                  component="iframe" 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123857.04444930039!2d-17.56153542155073!3d14.716740429421552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec172f5b3c5bb71%3A0xb17c17d92d5db21f!2sDakar%2C%20Senegal!5e0!3m2!1sen!2sfr!4v1641920169887!5m2!1sen!2sfr" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0, borderRadius: theme.shape.borderRadius }} 
                  allowFullScreen 
                  loading="lazy"
                />
              </StyledPaper>
              <Box sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  component={Link}
                  href="/contact"
                  endIcon={<ArrowForwardIcon />}
                >
                  Formulaire de contact
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <FixedJoinButton />
      </Box>
    </ThemeProvider>
  );
} 