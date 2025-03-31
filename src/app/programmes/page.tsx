'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  useMediaQuery,
  Fade,
  Divider,
  ThemeProvider,
  createTheme,
  Paper,
  Avatar,
  CardActions,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BuildIcon from '@mui/icons-material/Build';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FixedJoinButton from '@/components/FixedJoinButton';

// Définition du thème personnalisé
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
            boxShadow: '0px 15px 35px rgba(46, 125, 50, 0.1)',
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
  },
});

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
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

const CardTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

const ProgramAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 60,
  height: 60,
  boxShadow: '0 4px 10px rgba(46, 125, 50, 0.2)',
  margin: '0 auto',
  transform: 'translateY(-30px)',
  marginBottom: '-10px',
}));

const DetailsBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

const DetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const programs = [
  {
    id: 'education',
    title: 'Éducation et Formation',
    description: 'Promotion de l\'éducation de qualité et de la formation professionnelle pour tous les Sénégalais.',
    icon: <SchoolIcon sx={{ fontSize: 30 }} />,
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Éducation',
    details: [
      'Construction d\'écoles modernes',
      'Formation des enseignants',
      'Programmes de bourses',
      'Formation professionnelle',
    ],
  },
  {
    id: 'emploi',
    title: 'Emploi et Entrepreneuriat',
    description: 'Création d\'emplois et soutien aux entrepreneurs pour stimuler la croissance économique.',
    icon: <WorkIcon sx={{ fontSize: 30 }} />,
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Emploi',
    details: [
      'Programmes de formation professionnelle',
      'Soutien aux PME',
      'Création d\'emplois verts',
      'Incubateurs d\'entreprises',
    ],
  },
  {
    id: 'sante',
    title: 'Santé et Protection Sociale',
    description: 'Amélioration de l\'accès aux soins de santé et renforcement de la protection sociale.',
    icon: <LocalHospitalIcon sx={{ fontSize: 30 }} />,
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Santé',
    details: [
      'Construction d\'hôpitaux',
      'Programmes de vaccination',
      'Couverture maladie universelle',
      'Protection des personnes vulnérables',
    ],
  },
  {
    id: 'agriculture',
    title: 'Agriculture et Développement Rural',
    description: 'Modernisation de l\'agriculture et développement des zones rurales.',
    icon: <AgricultureIcon sx={{ fontSize: 30 }} />,
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Agriculture',
    details: [
      'Mécanisation agricole',
      'Formation des agriculteurs',
      'Infrastructures rurales',
      'Marchés agricoles',
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure et Développement Urbain',
    description: 'Développement des infrastructures et aménagement urbain durable.',
    icon: <BuildIcon sx={{ fontSize: 30 }} />,
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Infrastructure',
    details: [
      'Routes et ponts',
      'Énergie renouvelable',
      'Eau potable',
      'Assainissement',
    ],
  },
  {
    id: 'innovation',
    title: 'Innovation et Numérique',
    description: 'Promotion de l\'innovation et du développement numérique.',
    icon: <LightbulbIcon sx={{ fontSize: 30 }} />,
    image: 'https://via.placeholder.com/800x400/8B4513/FFFFFF?text=Innovation',
    details: [
      'Formation au numérique',
      'Startups technologiques',
      'E-gouvernance',
      'Connectivité rurale',
    ],
  },
];

export default function ProgrammesPage() {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ py: 6, backgroundColor: 'background.default', pb: { xs: 8, sm: 6 } }}>
        <Container maxWidth="lg">
          <Fade in={true} timeout={800}>
            <Box>
              <PageTitle variant="h4" gutterBottom>
                Nos Programmes
              </PageTitle>
              
              <Box sx={{ mb: 5, maxWidth: '700px', mx: 'auto', textAlign: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  L'Alliance Pour la République s'engage à mettre en œuvre des programmes innovants pour le développement du Sénégal. Découvrez nos principales initiatives pour un Sénégal fort, uni et prospère.
                </Typography>
              </Box>

              <Grid container spacing={4}>
                {programs.map((program) => (
                  <Grid item xs={12} md={6} lg={4} key={program.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={program.image}
                        alt={program.title}
                      />
                      <ProgramAvatar>
                        {program.icon}
                      </ProgramAvatar>
                      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                        <CardTitle align="center">
                          {program.title}
                        </CardTitle>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          paragraph
                          align="center"
                          sx={{ mb: 3 }}
                        >
                          {program.description}
                        </Typography>
                        
                        <DetailsBox>
                          <Typography variant="subtitle2" color="primary" gutterBottom>
                            Points clés :
                          </Typography>
                          {program.details.map((detail, index) => (
                            <DetailItem key={index}>
                              <CheckCircleOutlineIcon color="primary" sx={{ mr: 1, fontSize: 18 }} />
                              <Typography variant="body2" color="text.secondary">
                                {detail}
                              </Typography>
                            </DetailItem>
                          ))}
                        </DetailsBox>
                      </CardContent>
                      
                      <CardActions sx={{ p: 2, pt: 0, justifyContent: 'center' }}>
                        <Button
                          component={Link}
                          href={`/programmes/${program.id}`}
                          variant="outlined"
                          color="primary"
                          endIcon={<ArrowForwardIcon />}
                        >
                          En savoir plus
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 8, textAlign: 'center' }}>
                <Chip 
                  label="Explorez tous nos programmes" 
                  color="primary" 
                  variant="outlined" 
                  sx={{ mb: 2 }} 
                />
                <Typography variant="h6" color="primary.dark" gutterBottom>
                  Ensemble, construisons un Sénégal meilleur
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Nos programmes sont constamment mis à jour pour répondre aux besoins changeants de notre société.
                  <br />Contactez-nous pour en savoir plus ou pour contribuer à nos initiatives.
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ mt: 3 }}
                  component={Link}
                  href="/contact"
                >
                  Nous contacter
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
        <FixedJoinButton />
      </Box>
    </ThemeProvider>
  );
}