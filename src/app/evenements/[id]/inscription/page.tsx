'use client';

import React, { useState } from 'react';
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
  TextField,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CategoryIcon from '@mui/icons-material/Category';
import FixedJoinButton from '@/components/FixedJoinButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GroupIcon from '@mui/icons-material/Group';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

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
  },
});

// Styled components
const PageTitleSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.95)), url('https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Inscription') no-repeat center center`,
  backgroundSize: 'cover',
  color: 'white',
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
}));

const EventImageSection = styled(Box)(({ theme }) => ({
  height: 200,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  position: 'relative',
  marginBottom: theme.spacing(3),
  backgroundImage: 'url(https://via.placeholder.com/1200x600/8B4513/FFFFFF?text=Forum+Economique)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
}));

const StepContentWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'rgba(139, 69, 19, 0.02)',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(3),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
}));

const EventDetailItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const EventDetailIcon = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(139, 69, 19, 0.02)',
}));

// Données d'événement pour l'inscription
const eventData = {
  id: '1',
  title: 'Forum sur le développement économique au Sénégal',
  subtitle: 'Perspectives et stratégies pour une croissance inclusive',
  image: 'https://via.placeholder.com/1200x600/8B4513/FFFFFF?text=Forum+Economique',
  date: '15 octobre 2023',
  startTime: '09:00',
  endTime: '17:00',
  location: 'Centre International de Conférences Abdou Diouf',
  address: 'Diamniadio, Sénégal',
  category: 'Économie',
  registrationDeadline: '10 octobre 2023',
  maxParticipants: 500,
  remainingSpots: 180,
  ticketOptions: [
    {
      id: 'standard',
      name: 'Inscription standard',
      description: 'Accès à toutes les sessions et au déjeuner',
      price: '0',
      available: true
    },
    {
      id: 'vip',
      name: 'Inscription VIP',
      description: 'Accès à toutes les sessions, déjeuner et cocktail de réseautage',
      price: '25000',
      available: true
    },
    {
      id: 'virtual',
      name: 'Participation virtuelle',
      description: 'Accès en ligne à toutes les sessions via un lien dédié',
      price: '0',
      available: true
    }
  ],
  formSections: [
    {
      id: 'personal',
      title: 'Informations personnelles',
      fields: [
        { name: 'firstName', label: 'Prénom', type: 'text', required: true },
        { name: 'lastName', label: 'Nom', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Téléphone', type: 'tel', required: true }
      ]
    },
    {
      id: 'professional',
      title: 'Informations professionnelles',
      fields: [
        { name: 'organization', label: 'Organisation / Institution', type: 'text', required: true },
        { name: 'position', label: 'Fonction / Poste', type: 'text', required: true },
        { 
          name: 'sector', 
          label: 'Secteur d\'activité', 
          type: 'select', 
          required: true,
          options: [
            { value: 'public', label: 'Secteur public' },
            { value: 'private', label: 'Secteur privé' },
            { value: 'ngo', label: 'ONG / Association' },
            { value: 'academic', label: 'Académique / Recherche' },
            { value: 'student', label: 'Étudiant' },
            { value: 'other', label: 'Autre' }
          ]
        }
      ]
    },
    {
      id: 'preferences',
      title: 'Préférences pour l\'événement',
      fields: [
        { 
          name: 'mealPreference', 
          label: 'Préférence alimentaire', 
          type: 'select',
          required: false,
          options: [
            { value: 'standard', label: 'Standard' },
            { value: 'vegetarian', label: 'Végétarien' },
            { value: 'vegan', label: 'Végétalien' },
            { value: 'gluten-free', label: 'Sans gluten' },
            { value: 'halal', label: 'Halal' }
          ]
        },
        { 
          name: 'panels', 
          label: 'Panels auxquels vous souhaitez participer', 
          type: 'multiselect',
          required: true,
          options: [
            { value: 'panel1', label: 'Panel 1: État des lieux de l\'économie sénégalaise' },
            { value: 'panel2', label: 'Panel 2: Opportunités d\'investissement' },
            { value: 'panel3', label: 'Panel 3: Stratégies pour une croissance inclusive' }
          ]
        },
        { 
          name: 'specialNeeds', 
          label: 'Besoins spécifiques ou commentaires', 
          type: 'textarea',
          required: false
        }
      ]
    }
  ]
};

interface FormData {
  ticketType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  position: string;
  sector: string;
  mealPreference: string;
  panels: string[];
  specialNeeds: string;
  agreeTerms: boolean;
}

interface FormErrors {
  [key: string]: string | undefined;
}

interface PageParams {
  params: {
    id: string;
  };
}

export default function EventRegistrationPage({ params }: PageParams) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    ticketType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    position: '',
    sector: '',
    mealPreference: '',
    panels: [],
    specialNeeds: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleNext = () => {
    if (activeStep === eventData.formSections.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const currentSection = eventData.formSections[step];
    const newErrors: FormErrors = {};

    currentSection.fields.forEach((field) => {
      if (field.required && !formData[field.name as keyof FormData]) {
        newErrors[field.name] = 'Ce champ est requis';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step: number) => {
    const section = eventData.formSections[step];

    return (
      <StepContentWrapper>
        <Typography variant="h6" gutterBottom>
          {section.title}
        </Typography>
        <Grid container spacing={3}>
          {section.fields.map((field) => (
            <Grid item xs={12} sm={6} key={field.name}>
              {field.type === 'select' ? (
                <FormControl fullWidth error={!!errors[field.name as keyof FormData]}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    value={formData[field.name as keyof FormData]}
                    onChange={(e) => handleChange(field.name as keyof FormData, e.target.value)}
                    label={field.label}
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors[field.name as keyof FormData] && (
                    <FormHelperText>{errors[field.name as keyof FormData]}</FormHelperText>
                  )}
                </FormControl>
              ) : field.type === 'multiselect' ? (
                <FormControl fullWidth error={!!errors[field.name as keyof FormData]}>
                  <InputLabel>{field.label}</InputLabel>
                  <Select
                    multiple
                    value={formData[field.name as keyof FormData] as string[]}
                    onChange={(e) => handleChange(field.name as keyof FormData, e.target.value)}
                    label={field.label}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={field.options?.find(opt => opt.value === value)?.label} />
                        ))}
                      </Box>
                    )}
                  >
                    {field.options?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors[field.name as keyof FormData] && (
                    <FormHelperText>{errors[field.name as keyof FormData]}</FormHelperText>
                  )}
                </FormControl>
              ) : field.type === 'textarea' ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={field.label}
                  value={formData[field.name as keyof FormData]}
                  onChange={(e) => handleChange(field.name as keyof FormData, e.target.value)}
                  error={!!errors[field.name as keyof FormData]}
                  helperText={errors[field.name as keyof FormData]}
                />
              ) : (
                <TextField
                  fullWidth
                  type={field.type}
                  label={field.label}
                  value={formData[field.name as keyof FormData]}
                  onChange={(e) => handleChange(field.name as keyof FormData, e.target.value)}
                  error={!!errors[field.name as keyof FormData]}
                  helperText={errors[field.name as keyof FormData]}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </StepContentWrapper>
    );
  };

  if (submitSuccess) {
    return (
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pb: { xs: 8, sm: 6 } }}>
          <Container maxWidth="lg" sx={{ pt: 3 }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
              <MuiLink
                component={Link}
                href="/"
                sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Accueil
              </MuiLink>
              <MuiLink
                component={Link}
                href="/evenements"
                sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Événements
              </MuiLink>
              <MuiLink
                component={Link}
                href={`/evenements/${params.id}`}
                sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                {eventData.title}
              </MuiLink>
              <Typography color="inherit">Inscription réussie</Typography>
            </Breadcrumbs>
          </Container>

          <PageTitleSection>
            <Container maxWidth="lg">
              <Typography variant="h4" component="h1" gutterBottom>
                Inscription réussie !
              </Typography>
              <Typography variant="subtitle1">
                {eventData.title}
              </Typography>
            </Container>
          </PageTitleSection>

          <Container maxWidth="md">
            <StyledPaper>
              <Box textAlign="center" py={4}>
                <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
                <Typography variant="h5" gutterBottom>
                  Votre inscription a été enregistrée avec succès
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  Nous vous avons envoyé un email de confirmation avec les détails de votre inscription.
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    href={`/evenements/${params.id}`}
                    startIcon={<ArrowBackIcon />}
                  >
                    Retour à l'événement
                  </Button>
                </Box>
              </Box>
            </StyledPaper>
          </Container>
          <FixedJoinButton />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pb: { xs: 8, sm: 6 } }}>
        <Container maxWidth="lg" sx={{ pt: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <MuiLink
              component={Link}
              href="/"
              sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Accueil
            </MuiLink>
            <MuiLink
              component={Link}
              href="/evenements"
              sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              Événements
            </MuiLink>
            <MuiLink
              component={Link}
              href={`/evenements/${params.id}`}
              sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              {eventData.title}
            </MuiLink>
            <Typography color="inherit">Inscription</Typography>
          </Breadcrumbs>
        </Container>

        <PageTitleSection>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom>
              Inscription à l'événement
            </Typography>
            <Typography variant="subtitle1">
              {eventData.title}
            </Typography>
          </Container>
        </PageTitleSection>

        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <StyledPaper>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {eventData.formSections.map((section) => (
                    <Step key={section.id}>
                      <StepLabel>{section.title}</StepLabel>
                    </Step>
                  ))}
                </Stepper>

                <Box mt={4}>
                  {renderStepContent(activeStep)}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    startIcon={<ArrowBackIcon />}
                  >
                    Retour
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? <CircularProgress size={20} /> : <ArrowForwardIcon />}
                  >
                    {activeStep === eventData.formSections.length - 1 ? 'S\'inscrire' : 'Suivant'}
                  </Button>
                </Box>
              </StyledPaper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                <StyledPaper>
                  <Typography variant="h6" gutterBottom>
                    Détails de l'événement
                  </Typography>
                  <EventImageSection />
                  
                  <EventDetailItem>
                    <EventDetailIcon>
                      <CalendarTodayIcon />
                    </EventDetailIcon>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Date
                      </Typography>
                      <Typography variant="body1">
                        {eventData.date}
                      </Typography>
                    </Box>
                  </EventDetailItem>

                  <EventDetailItem>
                    <EventDetailIcon>
                      <AccessTimeIcon />
                    </EventDetailIcon>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Horaires
                      </Typography>
                      <Typography variant="body1">
                        {eventData.startTime} - {eventData.endTime}
                      </Typography>
                    </Box>
                  </EventDetailItem>

                  <EventDetailItem>
                    <EventDetailIcon>
                      <LocationOnIcon />
                    </EventDetailIcon>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Lieu
                      </Typography>
                      <Typography variant="body1">
                        {eventData.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {eventData.address}
                      </Typography>
                    </Box>
                  </EventDetailItem>

                  <EventDetailItem>
                    <EventDetailIcon>
                      <CategoryIcon />
                    </EventDetailIcon>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Catégorie
                      </Typography>
                      <CategoryChip label={eventData.category} size="small" />
                    </Box>
                  </EventDetailItem>

                  <EventDetailItem>
                    <EventDetailIcon>
                      <GroupIcon />
                    </EventDetailIcon>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Places disponibles
                      </Typography>
                      <Typography variant="body1">
                        {eventData.remainingSpots} / {eventData.maxParticipants}
                      </Typography>
                    </Box>
                  </EventDetailItem>

                  <EventDetailItem>
                    <EventDetailIcon>
                      <EventAvailableIcon />
                    </EventDetailIcon>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Date limite d'inscription
                      </Typography>
                      <Typography variant="body1">
                        {eventData.registrationDeadline}
                      </Typography>
                    </Box>
                  </EventDetailItem>
                </StyledPaper>

                <StyledPaper sx={{ mt: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Options d'inscription
                  </Typography>
                  <List>
                    {eventData.ticketOptions.map((option) => (
                      <ListItem key={option.id} disablePadding>
                        <ListItemButton
                          selected={formData.ticketType === option.id}
                          onClick={() => handleChange('ticketType', option.id)}
                          disabled={!option.available}
                        >
                          <ListItemText
                            primary={option.name}
                            secondary={option.description}
                          />
                          {option.price !== '0' && (
                            <Typography variant="body1" color="primary">
                              {option.price} FCFA
                            </Typography>
                          )}
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </StyledPaper>
              </Box>
            </Grid>
          </Grid>
        </Container>
        <FixedJoinButton />
      </Box>
    </ThemeProvider>
  );
} 