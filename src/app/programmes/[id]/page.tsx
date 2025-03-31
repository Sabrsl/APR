'use client';

import React, { useState, SyntheticEvent } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Tabs,
  Tab,
  useMediaQuery,
  Avatar,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import Image from 'next/image';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import TimelineIcon from '@mui/icons-material/Timeline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BuildIcon from '@mui/icons-material/Build';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
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
  },
});

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.95)), url('https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Programme') no-repeat center center`,
  backgroundSize: 'cover',
  color: 'white',
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(2),
  '&:after': {
    content: '""',
    display: 'block',
    width: 80,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
    marginTop: theme.spacing(2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  '&:after': {
    content: '""',
    display: 'block',
    width: 60,
    height: 3,
    backgroundColor: theme.palette.primary.main,
    borderRadius: 1.5,
    marginTop: theme.spacing(1),
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Project {
  title: string;
  description: string;
  progress: number;
  location: string;
  timeline: string;
}

interface TeamMember {
  name: string;
  title: string;
  image: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Resource {
  title: string;
  type: string;
  url: string;
}

interface Event {
  title: string;
  date: string;
  location: string;
}

interface ProgramData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  image: string;
  description: string;
  objectives: string[];
  projects: Project[];
  team: TeamMember[];
  faq: FAQItem[];
  resources: Resource[];
  nextEvents: Event[];
}

type ProgramId = 'education' | 'emploi' | 'sante' | 'agriculture' | 'infrastructure' | 'innovation';

interface ProgramsData {
  [key: string]: ProgramData;
}

interface PageParams {
  params: {
    id: string;
  };
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const BreadcrumbLink = styled(Link)({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

// Données pour tous les programmes
const programsData: ProgramsData = {
  education: {
    id: 'education',
    title: 'Éducation et Formation',
    subtitle: 'Promotion de l\'éducation de qualité et de la formation professionnelle',
    icon: <SchoolIcon />,
    image: 'https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Éducation',
    description: `
      Notre programme d'éducation et de formation est axé sur l'amélioration de la qualité de l'enseignement, 
      l'accès à l'éducation pour tous et la formation professionnelle adaptée aux besoins du marché du travail.
      
      Nous croyons que l'éducation est le pilier fondamental du développement durable et de la prospérité 
      économique de notre pays. C'est pourquoi nous avons élaboré une stratégie complète visant à réformer 
      le système éducatif sénégalais et à renforcer les compétences de notre jeunesse.
    `,
    objectives: [
      'Améliorer la qualité de l\'enseignement à tous les niveaux',
      'Garantir l\'accès universel à l\'éducation de base',
      'Moderniser les infrastructures scolaires',
      'Renforcer la formation des enseignants',
      'Développer des programmes de formation professionnelle adaptés aux besoins du marché',
      'Promouvoir l\'enseignement des sciences, de la technologie et des langues',
      'Réduire les inégalités dans l\'accès à l\'éducation'
    ],
    projects: [
      {
        title: 'Construction d\'écoles modernes',
        description: 'Construction de 100 écoles équipées de technologies modernes dans les zones rurales.',
        progress: 40,
        location: 'Régions de Fatick, Kaolack, Thiès et Diourbel',
        timeline: '2023-2025'
      },
      {
        title: 'Programme de formation des enseignants',
        description: 'Formation continue pour 5000 enseignants dans les méthodes pédagogiques innovantes.',
        progress: 65,
        location: 'Tout le territoire',
        timeline: '2022-2024'
      },
      {
        title: 'Bourses d\'excellence',
        description: 'Attribution de 1000 bourses aux étudiants méritants pour des études supérieures.',
        progress: 80,
        location: 'National',
        timeline: '2021-2025'
      },
      {
        title: 'Centres de formation professionnelle',
        description: 'Création de 20 centres spécialisés dans les métiers techniques et numériques.',
        progress: 30,
        location: 'Dakar, Saint-Louis, Thiès, Ziguinchor',
        timeline: '2023-2026'
      }
    ],
    team: [
      {
        name: 'Dr. Amadou Diop',
        title: 'Directeur du programme',
        image: 'https://via.placeholder.com/150'
      },
      {
        name: 'Mme Fatou Ndiaye',
        title: 'Responsable des projets d\'infrastructures',
        image: 'https://via.placeholder.com/150'
      },
      {
        name: 'M. Ibrahim Sall',
        title: 'Coordinateur de la formation professionnelle',
        image: 'https://via.placeholder.com/150'
      }
    ],
    faq: [
      {
        question: 'Comment les écoles sont-elles sélectionnées pour la modernisation ?',
        answer: 'Les écoles sont sélectionnées selon des critères objectifs incluant la vétusté des infrastructures, le nombre d\'élèves, l\'éloignement géographique et les besoins spécifiques des communautés.'
      },
      {
        question: 'Comment postuler pour une bourse d\'excellence ?',
        answer: 'Les candidatures pour les bourses d\'excellence sont ouvertes chaque année en septembre. Les étudiants doivent soumettre leurs résultats académiques, une lettre de motivation et les recommandations de leurs enseignants.'
      },
      {
        question: 'Quels sont les métiers ciblés par les centres de formation professionnelle ?',
        answer: 'Les centres de formation professionnelle se concentrent sur les secteurs à forte demande: technologies numériques, énergie renouvelable, agriculture moderne, tourisme, artisanat, et maintenance industrielle.'
      }
    ],
    resources: [
      {
        title: 'Plan stratégique éducation 2023-2028',
        type: 'PDF',
        url: '#'
      },
      {
        title: 'Rapport d\'impact 2022',
        type: 'PDF',
        url: '#'
      },
      {
        title: 'Guide des bourses d\'excellence',
        type: 'PDF',
        url: '#'
      }
    ],
    nextEvents: [
      {
        title: 'Inauguration École Moderne de Fatick',
        date: '15 septembre 2023',
        location: 'Fatick'
      },
      {
        title: 'Séminaire sur les méthodes pédagogiques innovantes',
        date: '10-12 octobre 2023',
        location: 'Dakar, Université Cheikh Anta Diop'
      }
    ]
  },
  emploi: {
    id: 'emploi',
    title: 'Emploi et Entrepreneuriat',
    subtitle: 'Création d\'emplois et soutien aux entrepreneurs',
    icon: <WorkIcon />,
    image: 'https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Emploi',
    description: `
      Notre programme d'emploi et d'entrepreneuriat vise à stimuler la création d'emplois et à soutenir 
      les entrepreneurs sénégalais. Nous croyons en la force de l'initiative privée et de l'innovation 
      pour créer de la richesse et des opportunités pour tous.
    `,
    objectives: [
      'Créer des emplois durables',
      'Soutenir les PME',
      'Développer l\'entrepreneuriat',
      'Former aux métiers d\'avenir',
      'Faciliter l\'accès au financement',
      'Promouvoir l\'innovation',
      'Renforcer les compétences professionnelles'
    ],
    projects: [
      {
        title: 'Programme de formation professionnelle',
        description: 'Formation de 5000 jeunes dans les métiers porteurs.',
        progress: 60,
        location: 'Tout le territoire',
        timeline: '2023-2025'
      },
      {
        title: 'Incubateur d\'entreprises',
        description: 'Création de 5 incubateurs pour startups.',
        progress: 45,
        location: 'Dakar, Thiès, Saint-Louis',
        timeline: '2023-2024'
      }
    ],
    team: [
      {
        name: 'M. Abdoulaye Sow',
        title: 'Directeur du programme',
        image: 'https://via.placeholder.com/150'
      }
    ],
    faq: [
      {
        question: 'Comment bénéficier du programme de formation professionnelle ?',
        answer: 'Les inscriptions sont ouvertes chaque trimestre. Les candidats doivent avoir entre 18 et 35 ans et être sans emploi.'
      }
    ],
    resources: [
      {
        title: 'Guide de l\'entrepreneur',
        type: 'PDF',
        url: '#'
      }
    ],
    nextEvents: [
      {
        title: 'Forum de l\'emploi',
        date: '20 novembre 2023',
        location: 'Dakar'
      }
    ]
  },
  sante: {
    id: 'sante',
    title: 'Santé et Protection Sociale',
    subtitle: 'Amélioration de l\'accès aux soins de santé',
    icon: <LocalHospitalIcon />,
    image: 'https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Santé',
    description: `
      Notre programme de santé vise à garantir l'accès aux soins de santé de qualité pour tous les Sénégalais.
      Nous nous engageons à moderniser le système de santé et à renforcer la protection sociale.
    `,
    objectives: [
      'Améliorer l\'accès aux soins',
      'Moderniser les infrastructures',
      'Renforcer la protection sociale',
      'Former les professionnels de santé',
      'Promouvoir la prévention',
      'Développer la médecine rurale',
      'Faciliter l\'accès aux médicaments'
    ],
    projects: [
      {
        title: 'Construction d\'hôpitaux',
        description: 'Construction de 10 hôpitaux modernes.',
        progress: 35,
        location: 'Régions prioritaires',
        timeline: '2023-2026'
      }
    ],
    team: [
      {
        name: 'Dr. Marie Diop',
        title: 'Directrice du programme',
        image: 'https://via.placeholder.com/150'
      }
    ],
    faq: [
      {
        question: 'Comment bénéficier de la couverture maladie ?',
        answer: 'La couverture maladie est accessible à tous les Sénégalais via une inscription simple dans les centres de santé.'
      }
    ],
    resources: [
      {
        title: 'Guide de la santé',
        type: 'PDF',
        url: '#'
      }
    ],
    nextEvents: [
      {
        title: 'Inauguration Hôpital de Thiès',
        date: '5 décembre 2023',
        location: 'Thiès'
      }
    ]
  },
  agriculture: {
    id: 'agriculture',
    title: 'Agriculture et Développement Rural',
    subtitle: 'Modernisation de l\'agriculture',
    icon: <AgricultureIcon />,
    image: 'https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Agriculture',
    description: `
      Notre programme agricole vise à moderniser l'agriculture sénégalaise et à développer les zones rurales.
      Nous croyons en une agriculture durable et rentable qui nourrit le Sénégal.
    `,
    objectives: [
      'Moderniser l\'agriculture',
      'Former les agriculteurs',
      'Développer les infrastructures',
      'Faciliter l\'accès au marché',
      'Promouvoir l\'irrigation',
      'Soutenir les coopératives',
      'Développer l\'agro-industrie'
    ],
    projects: [
      {
        title: 'Programme d\'irrigation',
        description: 'Développement de 1000 hectares irrigués.',
        progress: 50,
        location: 'Vallée du Fleuve',
        timeline: '2023-2025'
      }
    ],
    team: [
      {
        name: 'M. Mamadou Diallo',
        title: 'Directeur du programme',
        image: 'https://via.placeholder.com/150'
      }
    ],
    faq: [
      {
        question: 'Comment bénéficier du programme d\'irrigation ?',
        answer: 'Les agriculteurs peuvent s\'inscrire auprès des services agricoles locaux.'
      }
    ],
    resources: [
      {
        title: 'Guide de l\'agriculture moderne',
        type: 'PDF',
        url: '#'
      }
    ],
    nextEvents: [
      {
        title: 'Formation des agriculteurs',
        date: '15 décembre 2023',
        location: 'Saint-Louis'
      }
    ]
  },
  infrastructure: {
    id: 'infrastructure',
    title: 'Infrastructure et Développement Urbain',
    subtitle: 'Développement des infrastructures',
    icon: <BuildIcon />,
    image: 'https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Infrastructure',
    description: `
      Notre programme d'infrastructure vise à développer les infrastructures essentielles pour le développement
      du Sénégal. Nous nous engageons à construire un pays moderne et connecté.
    `,
    objectives: [
      'Construire des routes',
      'Développer l\'énergie',
      'Améliorer l\'eau potable',
      'Moderniser les villes',
      'Faciliter les transports',
      'Promouvoir l\'énergie verte',
      'Développer les ports'
    ],
    projects: [
      {
        title: 'Routes nationales',
        description: 'Construction de 500 km de routes.',
        progress: 40,
        location: 'Tout le territoire',
        timeline: '2023-2026'
      }
    ],
    team: [
      {
        name: 'M. Ousmane Fall',
        title: 'Directeur du programme',
        image: 'https://via.placeholder.com/150'
      }
    ],
    faq: [
      {
        question: 'Comment sont sélectionnés les projets ?',
        answer: 'Les projets sont sélectionnés selon les besoins prioritaires des populations.'
      }
    ],
    resources: [
      {
        title: 'Plan d\'infrastructure 2023-2028',
        type: 'PDF',
        url: '#'
      }
    ],
    nextEvents: [
      {
        title: 'Inauguration Route Dakar-Thiès',
        date: '20 décembre 2023',
        location: 'Thiès'
      }
    ]
  },
  innovation: {
    id: 'innovation',
    title: 'Innovation et Numérique',
    subtitle: 'Promotion de l\'innovation',
    icon: <LightbulbIcon />,
    image: 'https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Innovation',
    description: `
      Notre programme d'innovation vise à positionner le Sénégal comme leader dans le domaine du numérique
      et de l'innovation. Nous croyons en la force de la technologie pour transformer notre société.
    `,
    objectives: [
      'Développer le numérique',
      'Former aux nouvelles technologies',
      'Soutenir les startups',
      'Promouvoir l\'e-gouvernance',
      'Connecter les zones rurales',
      'Faciliter l\'accès au numérique',
      'Encourager l\'innovation'
    ],
    projects: [
      {
        title: 'Formation au numérique',
        description: 'Formation de 10000 jeunes aux métiers du numérique.',
        progress: 55,
        location: 'Tout le territoire',
        timeline: '2023-2025'
      }
    ],
    team: [
      {
        name: 'M. Cheikh Diop',
        title: 'Directeur du programme',
        image: 'https://via.placeholder.com/150'
      }
    ],
    faq: [
      {
        question: 'Comment participer aux formations ?',
        answer: 'Les inscriptions sont ouvertes en ligne sur notre plateforme.'
      }
    ],
    resources: [
      {
        title: 'Guide du numérique',
        type: 'PDF',
        url: '#'
      }
    ],
    nextEvents: [
      {
        title: 'Hackathon Innovation',
        date: '25 décembre 2023',
        location: 'Dakar'
      }
    ]
  }
};

// Composant principal pour la page détaillée du programme
export default function ProgrammeDetailPage({ params }: PageParams) {
  const [tabValue, setTabValue] = useState(0);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const programData = programsData[params.id];

  if (!programData) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" color="error">
          Programme non trouvé
        </Typography>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href="/programmes"
          >
            Retour aux programmes
          </Button>
        </Box>
      </Container>
    );
  }

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
            <BreadcrumbLink href="/programmes" passHref legacyBehavior>
              <MuiLink color="inherit">Programmes</MuiLink>
            </BreadcrumbLink>
            <Typography color="text.primary">{programData.title}</Typography>
          </Breadcrumbs>
        </Container>

        {/* Section Héro */}
        <Container maxWidth="lg">
          <Fade in={true} timeout={800}>
            <HeroSection>
              <Container>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Avatar
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          width: 60,
                          height: 60,
                          mr: 2,
                        }}
                      >
                        {programData.icon}
                      </Avatar>
                      <PageTitle variant={isMobile ? 'h4' : 'h3'}>
                        {programData.title}
                      </PageTitle>
                    </Box>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'normal' }}>
                      {programData.subtitle}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DownloadIcon />}
                        sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}
                      >
                        Télécharger la brochure
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                      >
                        Partager
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </HeroSection>
          </Fade>
        </Container>

        {/* Contenu principal */}
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Colonne principale */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ mb: 4, p: 3 }}>
                <SectionTitle variant="h5">
                  À propos du programme
                </SectionTitle>
                <Typography paragraph>
                  {programData.description}
                </Typography>

                <Divider />
                
                <SectionTitle variant="h5">
                  Nos objectifs
                </SectionTitle>
                <List>
                  {programData.objectives.map((objective: string, index: number) => (
                    <ListItem key={index} sx={{ pl: 0 }}>
                      <ListItemIcon>
                        <CheckCircleIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={objective} />
                    </ListItem>
                  ))}
                </List>

                <Divider />

                <SectionTitle variant="h5">
                  Projets en cours
                </SectionTitle>
                <Grid container spacing={3}>
                  {programData.projects.map((project: Project, index: number) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h6" color="primary" gutterBottom>
                            {project.title}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            {project.description}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOnIcon color="action" fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {project.location}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon color="action" fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="text.secondary">
                              {project.timeline}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                              Progression:
                            </Typography>
                            <Box sx={{ 
                              flexGrow: 1, 
                              bgcolor: 'rgba(139, 69, 19, 0.1)', 
                              height: 8, 
                              borderRadius: 4 
                            }}>
                              <Box sx={{ 
                                width: `${project.progress}%`, 
                                bgcolor: 'primary.main', 
                                height: '100%', 
                                borderRadius: 4 
                              }} />
                            </Box>
                            <Typography variant="body2" color="primary" sx={{ ml: 1, fontWeight: 'bold' }}>
                              {project.progress}%
                            </Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Section Onglets */}
              <Paper sx={{ mb: 4 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant={isMobile ? "scrollable" : "fullWidth"}
                  scrollButtons={isMobile ? "auto" : false}
                  aria-label="programme tabs"
                  sx={{
                    '& .MuiTab-root': { textTransform: 'none' },
                    borderBottom: 1,
                    borderColor: 'divider',
                  }}
                >
                  <Tab 
                    icon={<PeopleIcon />} 
                    iconPosition="start" 
                    label="Équipe" 
                    id="tab-0" 
                    aria-controls="tabpanel-0" 
                  />
                  <Tab 
                    icon={<HelpOutlineIcon />} 
                    iconPosition="start" 
                    label="FAQ" 
                    id="tab-1" 
                    aria-controls="tabpanel-1" 
                  />
                  <Tab 
                    icon={<DescriptionIcon />} 
                    iconPosition="start" 
                    label="Ressources" 
                    id="tab-2" 
                    aria-controls="tabpanel-2" 
                  />
                  <Tab 
                    icon={<TimelineIcon />} 
                    iconPosition="start" 
                    label="Événements" 
                    id="tab-3" 
                    aria-controls="tabpanel-3" 
                  />
                </Tabs>

                {/* Contenu des onglets */}
                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={3}>
                    {programData.team.map((member: TeamMember, index: number) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Avatar
                            src={member.image}
                            alt={member.name}
                            sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                          />
                          <Typography variant="h6" gutterBottom>
                            {member.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {member.title}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  {programData.faq.map((item: FAQItem, index: number) => (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom color="primary">
                        {item.question}
                      </Typography>
                      <Typography variant="body2">
                        {item.answer}
                      </Typography>
                      {index < programData.faq.length - 1 && (
                        <Divider sx={{ my: 2 }} />
                      )}
                    </Box>
                  ))}
                </TabPanel>

                <TabPanel value={tabValue} index={2}>
                  <List>
                    {programData.resources.map((resource: Resource, index: number) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <DescriptionIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={resource.title} 
                          secondary={resource.type} 
                        />
                        <Button 
                          variant="outlined" 
                          size="small" 
                          startIcon={<DownloadIcon />}
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          Télécharger
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>

                <TabPanel value={tabValue} index={3}>
                  <List>
                    {programData.nextEvents.map((event: Event, index: number) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon>
                          <CalendarTodayIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={event.title} 
                          secondary={
                            <React.Fragment>
                              <Typography component="span" variant="body2" color="text.primary">
                                {event.date}
                              </Typography>
                              {" — "}{event.location}
                            </React.Fragment>
                          } 
                        />
                      </ListItem>
                    ))}
                  </List>
                </TabPanel>
              </Paper>
            </Grid>

            {/* Barre latérale */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                {/* Carte des prochains événements */}
                <Card sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Prochains événements
                    </Typography>
                    <List dense>
                      {programData.nextEvents.map((event: Event, index: number) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <CalendarTodayIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={event.title} 
                            secondary={`${event.date} - ${event.location}`} 
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      fullWidth 
                      sx={{ mt: 2 }}
                      component={Link}
                      href="/evenements"
                    >
                      Voir tous les événements
                    </Button>
                  </CardContent>
                </Card>

                {/* Carte des ressources */}
                <Card sx={{ mb: 4 }}>
                  <CardContent>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Ressources à télécharger
                    </Typography>
                    <List dense>
                      {programData.resources.map((resource: Resource, index: number) => (
                        <ListItem key={index} sx={{ px: 0 }}>
                          <ListItemIcon>
                            <DescriptionIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText 
                            primary={resource.title}
                          />
                          <Button 
                            size="small" 
                            color="primary"
                            onClick={() => window.open(resource.url, '_blank')}
                          >
                            <DownloadIcon fontSize="small" />
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>

                {/* Appel à l'action */}
                <Card sx={{ backgroundColor: 'primary.main', color: 'white' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Vous souhaitez participer ?
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      Rejoignez notre programme et contribuez à façonner l'avenir du Sénégal.
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
                          href="/join"
                        >
                          Devenir membre
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Bouton retour */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              component={Link}
              href="/programmes"
            >
              Retour aux programmes
            </Button>
          </Box>
        </Container>
        <FixedJoinButton />
      </Box>
    </ThemeProvider>
  );
} 