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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BusinessIcon from '@mui/icons-material/Business';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',
  paddingBottom: theme.spacing(2),
  textAlign: 'center',
  color: '#8B4513',
  fontWeight: 700,
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 4,
    backgroundColor: '#8B4513',
    borderRadius: 2,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: '#8B4513',
  fontWeight: 600,
  borderLeft: `3px solid #8B4513`,
  paddingLeft: theme.spacing(2),
  fontSize: '1.25rem',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 32px rgba(139, 69, 19, 0.15)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
  },
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
}));

const programs = [
  {
    title: 'Éducation et Formation',
    description: 'Promotion de l\'éducation de qualité et de la formation professionnelle pour tous les Sénégalais.',
    icon: <SchoolIcon sx={{ fontSize: 40, color: '#8B4513' }} />,
    image: '/images/education.jpg',
    details: [
      'Construction d\'écoles modernes',
      'Formation des enseignants',
      'Programmes de bourses',
      'Formation professionnelle',
    ],
  },
  {
    title: 'Emploi et Entrepreneuriat',
    description: 'Création d\'emplois et soutien aux entrepreneurs pour stimuler la croissance économique.',
    icon: <WorkIcon sx={{ fontSize: 40, color: '#8B4513' }} />,
    image: '/images/employment.jpg',
    details: [
      'Programmes de formation professionnelle',
      'Soutien aux PME',
      'Création d\'emplois verts',
      'Incubateurs d\'entreprises',
    ],
  },
  {
    title: 'Santé et Protection Sociale',
    description: 'Amélioration de l\'accès aux soins de santé et renforcement de la protection sociale.',
    icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#8B4513' }} />,
    image: '/images/health.jpg',
    details: [
      'Construction d\'hôpitaux',
      'Programmes de vaccination',
      'Couverture maladie universelle',
      'Protection des personnes vulnérables',
    ],
  },
  {
    title: 'Agriculture et Développement Rural',
    description: 'Modernisation de l\'agriculture et développement des zones rurales.',
    icon: <AgricultureIcon sx={{ fontSize: 40, color: '#8B4513' }} />,
    image: '/images/agriculture.jpg',
    details: [
      'Mécanisation agricole',
      'Formation des agriculteurs',
      'Infrastructures rurales',
      'Marchés agricoles',
    ],
  },
  {
    title: 'Infrastructure et Développement Urbain',
    description: 'Développement des infrastructures et aménagement urbain durable.',
    icon: <BusinessIcon sx={{ fontSize: 40, color: '#8B4513' }} />,
    image: '/images/infrastructure.jpg',
    details: [
      'Routes et ponts',
      'Énergie renouvelable',
      'Eau potable',
      'Assainissement',
    ],
  },
  {
    title: 'Innovation et Numérique',
    description: 'Promotion de l\'innovation et du développement numérique.',
    icon: <EmojiObjectsIcon sx={{ fontSize: 40, color: '#8B4513' }} />,
    image: '/images/innovation.jpg',
    details: [
      'Formation au numérique',
      'Startups technologiques',
      'E-gouvernance',
      'Connectivité rurale',
    ],
  },
];

export default function ProgrammePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Fade in={true} timeout={800}>
        <Box>
          <PageTitle variant="h4" gutterBottom>
            Nos Programmes
          </PageTitle>
          
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
            Découvrez nos programmes phares pour le développement du Sénégal. Chaque initiative est conçue pour répondre aux besoins spécifiques de notre société et contribuer à la construction d'un avenir meilleur.
          </Typography>

          <Grid container spacing={4}>
            {programs.map((program, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <StyledCard>
                  <StyledCardMedia
                    image={program.image}
                    title={program.title}
                  />
                  <StyledCardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {program.icon}
                      <Typography variant="h6" component="h2" sx={{ ml: 1, color: '#8B4513' }}>
                        {program.title}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {program.description}
                    </Typography>

                    <Box sx={{ mt: 2 }}>
                      {program.details.map((detail, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 1,
                            color: '#666666',
                          }}
                        >
                          • {detail}
                        </Typography>
                      ))}
                    </Box>

                    <Button
                      variant="outlined"
                      sx={{
                        mt: 3,
                        color: '#8B4513',
                        borderColor: '#8B4513',
                        '&:hover': {
                          borderColor: '#5C2E0D',
                          backgroundColor: 'rgba(139, 69, 19, 0.04)',
                        },
                      }}
                    >
                      En savoir plus
                    </Button>
                  </StyledCardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography variant="h5" color="#8B4513" gutterBottom>
              Rejoignez-nous pour construire l'avenir du Sénégal
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Ensemble, nous pouvons faire la différence. Découvrez comment vous pouvez contribuer à nos programmes et initiatives.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#8B4513',
                color: '#FFFFFF',
                padding: '12px 32px',
                '&:hover': {
                  backgroundColor: '#5C2E0D',
                },
              }}
            >
              Devenir membre
            </Button>
          </Box>
        </Box>
      </Fade>
    </Container>
  );
} 