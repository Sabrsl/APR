'use client';

import React, { useState } from 'react';
import { Formik, FormikHelpers, Form, Field, FieldProps } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  Grid,
  FormHelperText,
  Divider,
  CircularProgress,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
  Card,
  CardContent
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FlagIcon from '@mui/icons-material/Flag';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: 16,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
  backgroundColor: '#FFFFFF',
  border: '1px solid rgba(139, 69, 19, 0.1)',
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',
  paddingBottom: theme.spacing(2),
  textAlign: 'center',
  color: '#8B4513',
  fontWeight: 600,
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 60,
    height: 3,
    backgroundColor: '#8B4513',
    borderRadius: 1.5,
  },
}));

const StepNavigation = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: '#8B4513',
  fontWeight: 600,
  borderLeft: `3px solid #8B4513`,
  paddingLeft: theme.spacing(2),
  fontSize: '1.25rem',
}));

const FileInput = styled('input')({
  display: 'none',
});

const UploadButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  color: theme.palette.primary.main,
  borderColor: theme.palette.primary.main,
  backgroundColor: '#FFFFFF',
  '&:hover': {
    backgroundColor: 'rgba(139, 69, 19, 0.04)',
    borderColor: theme.palette.primary.dark,
  },
  '&.MuiButton-root': {
    display: 'block',
    width: '100%',
  }
}));

const FilePreview = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1),
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid rgba(139, 69, 19, 0.1)`,
}));

// Phone number validation for Senegal
const validatePhone = (phone: string): boolean => {
  // Valid formats: +221XXXXXXXXX, 00221XXXXXXXXX, 7XXXXXXXX, 76XXXXXXX, etc.
  const phoneRegex = /^(?:(?:\+|00)221|0)?[7][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

// Extended validation schema
const validationSchema = [
  // Step 1: Personal Information
  Yup.object().shape({
    civilite: Yup.string().required('La civilité est requise'),
    nom: Yup.string().required('Le nom est requis').max(50, 'Le nom est trop long'),
    prenom: Yup.string().required('Le prénom est requis').max(50, 'Le prénom est trop long'),
    dateNaissance: Yup.date()
      .required('La date de naissance est requise')
      .max(new Date(), 'La date ne peut pas être dans le futur')
      .test('age', 'Vous devez avoir au moins 18 ans', function(value) {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }),
    lieuNaissance: Yup.string().required('Le lieu de naissance est requis'),
    nationalite: Yup.string().required('La nationalité est requise'),
    motivation: Yup.string()
      .required('Veuillez expliquer votre motivation')
      .min(50, 'Veuillez fournir une explication plus détaillée (minimum 50 caractères)')
      .max(500, 'La motivation ne doit pas dépasser 500 caractères'),
  }),
  
  // Step 2: Contact Information
  Yup.object().shape({
    profession: Yup.string().required('La profession est requise'),
    adresse: Yup.string().required('L\'adresse est requise'),
    telephone: Yup.string()
      .required('Le numéro de téléphone est requis')
      .test('phone', 'Format de téléphone invalide', validatePhone),
    email: Yup.string().email('Email invalide').required('L\'email est requis'),
  }),
  
  // Step 3: Documents
  Yup.object().shape({
    photo: Yup.mixed()
      .required('La photo est requise')
      .test('fileType', 'Format non supporté. Utilisez JPG ou PNG', 
        (value: any) => value && ['image/jpeg', 'image/png'].includes(value.type))
      .test('fileSize', 'Image trop volumineuse (max 2MB)', 
        (value: any) => value && value.size <= 2 * 1024 * 1024),
    cni: Yup.mixed()
      .required('Une copie de la CNI est requise')
      .test('fileType', 'Format non supporté. Utilisez JPG, PNG ou PDF', 
        (value: any) => value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type))
      .test('fileSize', 'Fichier trop volumineux (max 5MB)', 
        (value: any) => value && value.size <= 5 * 1024 * 1024),
  }),
];

interface FormValues {
  civilite: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  nationalite: string;
  motivation: string;
  profession: string;
  adresse: string;
  telephone: string;
  email: string;
  photo: File | null;
  cni: File | null;
}

const initialValues: FormValues = {
  civilite: '',
  nom: '',
  prenom: '',
  dateNaissance: '',
  lieuNaissance: '',
  nationalite: 'Sénégalaise',
  motivation: '',
  profession: '',
  adresse: '',
  telephone: '',
  email: '',
  photo: null,
  cni: null,
};

const steps = ['Informations personnelles', 'Coordonnées', 'Documents'];

export default function JoinPage() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [cniName, setCniName] = useState<string | null>(null);
  const currentValidationSchema = validationSchema[activeStep];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      console.log('Form values:', values);
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSnackbarMessage('Votre demande d\'adhésion a été envoyée avec succès !');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
      // Redirection après quelques secondes
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Submission error:', error);
      setSnackbarMessage('Une erreur est survenue lors de l\'envoi de votre demande.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const file = event.currentTarget.files[0];
      setFieldValue("photo", file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCniChange = (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void) => {
    if (event.currentTarget.files && event.currentTarget.files.length > 0) {
      const file = event.currentTarget.files[0];
      setFieldValue("cni", file);
      setCniName(file.name);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PageTitle variant="h4" gutterBottom>
        Formulaire d'adhésion à l'Alliance Pour la République
      </PageTitle>
      
      <StyledPaper elevation={0}>
        <Stepper 
          activeStep={activeStep} 
          alternativeLabel={!isMobile}
          orientation={isMobile ? 'vertical' : 'horizontal'}
          sx={{ 
            mb: 4,
            '& .MuiStepLabel-root .Mui-active': {
              color: '#8B4513',
            },
            '& .MuiStepLabel-root .Mui-completed': {
              color: '#8B4513',
            },
            '& .MuiStepLabel-root .MuiStepIcon-root': {
              color: '#DEB887',
              '&.Mui-active': {
                color: '#8B4513',
              },
              '&.Mui-completed': {
                color: '#8B4513',
              },
            },
            '& .MuiStepLabel-label': {
              color: '#666666',
              '&.Mui-active': {
                color: '#8B4513',
                fontWeight: 600,
              },
              '&.Mui-completed': {
                color: '#8B4513',
              },
            },
            '& .MuiStepConnector-line': {
              borderColor: '#DEB887',
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
          onSubmit={handleSubmit}
          validateOnMount={false}
          validateOnChange={false}
          validateOnBlur={true}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue, validateForm }) => (
            <Form>
              {activeStep === 0 && (
                <Box>
                  <SectionTitle variant="h6">Informations personnelles</SectionTitle>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={touched.civilite && Boolean(errors.civilite)}>
                        <InputLabel id="civilite-label" sx={{ color: '#8B4513' }}>Civilité *</InputLabel>
                        <Select
                          labelId="civilite-label"
                          name="civilite"
                          value={values.civilite}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          label="Civilité *"
                          sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#DEB887',
                              borderWidth: 1,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#8B4513',
                              borderWidth: 1,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#8B4513',
                              borderWidth: 2,
                            },
                          }}
                          startAdornment={
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          }
                        >
                          <MenuItem value="M">Monsieur</MenuItem>
                          <MenuItem value="Mme">Madame</MenuItem>
                        </Select>
                        {touched.civilite && errors.civilite && (
                          <FormHelperText error>{errors.civilite}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="nationalite"
                        label="Nationalité *"
                        value={values.nationalite}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.nationalite && Boolean(errors.nationalite)}
                        helperText={touched.nationalite && errors.nationalite}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#DEB887',
                              borderWidth: 1,
                            },
                            '&:hover fieldset': {
                              borderColor: '#8B4513',
                              borderWidth: 1,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#8B4513',
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#666666',
                            '&.Mui-focused': {
                              color: '#8B4513',
                            },
                          },
                          '& .MuiInputAdornment-root': {
                            '& .MuiSvgIcon-root': {
                              color: '#8B4513',
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <FlagIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="nom"
                        label="Nom *"
                        placeholder="Ex: DIOP"
                        value={values.nom}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.nom && Boolean(errors.nom)}
                        helperText={touched.nom && errors.nom}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#DEB887',
                              borderWidth: 1,
                            },
                            '&:hover fieldset': {
                              borderColor: '#8B4513',
                              borderWidth: 1,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#8B4513',
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#666666',
                            '&.Mui-focused': {
                              color: '#8B4513',
                            },
                          },
                          '& .MuiInputAdornment-root': {
                            '& .MuiSvgIcon-root': {
                              color: '#8B4513',
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="prenom"
                        label="Prénom *"
                        placeholder="Ex: Abdou"
                        value={values.prenom}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.prenom && Boolean(errors.prenom)}
                        helperText={touched.prenom && errors.prenom}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#DEB887',
                              borderWidth: 1,
                            },
                            '&:hover fieldset': {
                              borderColor: '#8B4513',
                              borderWidth: 1,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#8B4513',
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#666666',
                            '&.Mui-focused': {
                              color: '#8B4513',
                            },
                          },
                          '& .MuiInputAdornment-root': {
                            '& .MuiSvgIcon-root': {
                              color: '#8B4513',
                            },
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircleIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="dateNaissance"
                        label="Date de naissance *"
                        type="date"
                        placeholder="JJ/MM/AAAA"
                        value={values.dateNaissance}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.dateNaissance && Boolean(errors.dateNaissance)}
                        helperText={touched.dateNaissance && errors.dateNaissance}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EventIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="lieuNaissance"
                        label="Lieu de naissance *"
                        placeholder="Ex: Dakar"
                        value={values.lieuNaissance}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.lieuNaissance && Boolean(errors.lieuNaissance)}
                        helperText={touched.lieuNaissance && errors.lieuNaissance}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="motivation"
                        label="Pourquoi souhaitez-vous adhérer à l'APR ? *"
                        placeholder="Expliquez vos motivations pour rejoindre l'APR, vos valeurs et votre vision pour le Sénégal..."
                        value={values.motivation}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.motivation && Boolean(errors.motivation)}
                        helperText={touched.motivation && errors.motivation}
                        multiline
                        rows={4}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#DEB887',
                              borderWidth: 1,
                            },
                            '&:hover fieldset': {
                              borderColor: '#8B4513',
                              borderWidth: 1,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#8B4513',
                              borderWidth: 2,
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: '#666666',
                            '&.Mui-focused': {
                              color: '#8B4513',
                            },
                          },
                        }}
                      />
                      <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                        Expliquez en quelques phrases vos motivations pour rejoindre l'Alliance Pour la République (50-500 caractères)
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeStep === 1 && (
                <Box>
                  <SectionTitle variant="h6">Coordonnées</SectionTitle>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="profession"
                        label="Profession *"
                        placeholder="Ex: Enseignant, Commerçant, Ingénieur..."
                        value={values.profession}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.profession && Boolean(errors.profession)}
                        helperText={touched.profession && errors.profession}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <WorkIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="adresse"
                        label="Adresse complète *"
                        placeholder="Ex: Rue 10, Villa N°123, Quartier Sacré-Cœur 3, Dakar"
                        value={values.adresse}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.adresse && Boolean(errors.adresse)}
                        helperText={touched.adresse && errors.adresse}
                        multiline
                        rows={3}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <HomeIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="telephone"
                        label="Téléphone *"
                        placeholder="+221 XX XXX XX XX"
                        value={values.telephone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.telephone && Boolean(errors.telephone)}
                        helperText={touched.telephone && errors.telephone}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="email"
                        label="Email *"
                        type="email"
                        placeholder="Ex: prenom.nom@email.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: '#8B4513' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeStep === 2 && (
                <Box>
                  <SectionTitle variant="h6">Documents requis</SectionTitle>
                  
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Photo d'identité *
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Format JPG ou PNG, max 2MB
                      </Typography>

                      <Box sx={{ textAlign: 'center', mt: 2 }}>
                        {photoPreview ? (
                          <Box sx={{ mb: 2 }}>
                            <img 
                              src={photoPreview} 
                              alt="Aperçu" 
                              style={{ 
                                width: 150, 
                                height: 150, 
                                objectFit: 'cover',
                                borderRadius: '50%',
                                border: `3px solid ${theme.palette.primary.main}`,
                              }} 
                            />
                          </Box>
                        ) : (
                          <Box 
                            sx={{ 
                              width: 150, 
                              height: 150, 
                              margin: '0 auto',
                              borderRadius: '50%', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              backgroundColor: '#F5F5F5',
                              border: '2px dashed #DEB887',
                              mb: 2,
                            }}
                          >
                            <AccountCircleIcon sx={{ fontSize: 80, color: theme.palette.grey[400] }} />
                          </Box>
                        )}

                        <label htmlFor="photo-upload">
                          <FileInput
                            id="photo-upload"
                            type="file"
                            accept="image/jpeg,image/png"
                            onChange={(e) => handlePhotoChange(e, setFieldValue)}
                          />
                          <UploadButton
                            variant="outlined"
                            sx={{
                              color: '#8B4513',
                              borderColor: '#DEB887',
                              backgroundColor: '#FFFFFF',
                              padding: '10px 16px',
                              textTransform: 'none',
                              fontSize: '0.9rem',
                              '&:hover': {
                                borderColor: '#8B4513',
                                backgroundColor: 'rgba(139, 69, 19, 0.04)',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#8B4513',
                              },
                            }}
                            startIcon={<CloudUploadIcon sx={{ color: '#8B4513' }} />}
                          >
                            {photoPreview ? "Changer la photo" : "Téléverser une photo"}
                          </UploadButton>
                        </label>

                        {touched.photo && errors.photo && (
                          <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {errors.photo as string}
                          </Typography>
                        )}
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle1" gutterBottom>
                        Copie de la CNI *
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Format JPG, PNG ou PDF, max 5MB
                      </Typography>

                      <Box sx={{ mt: 2 }}>
                        {cniName && (
                          <FilePreview
                            sx={{
                              backgroundColor: '#FFFFFF',
                              border: '1px solid #DEB887',
                              borderRadius: 1,
                              padding: 2,
                              '& .MuiTypography-root': {
                                color: '#666666',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#8B4513',
                              },
                            }}
                          >
                            <Typography variant="body2" noWrap sx={{ mr: 1 }}>
                              {cniName}
                            </Typography>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </FilePreview>
                        )}

                        <label htmlFor="cni-upload">
                          <FileInput
                            id="cni-upload"
                            type="file"
                            accept="image/jpeg,image/png,application/pdf"
                            onChange={(e) => handleCniChange(e, setFieldValue)}
                          />
                          <UploadButton
                            variant="outlined"
                            sx={{
                              color: '#8B4513',
                              borderColor: '#DEB887',
                              backgroundColor: '#FFFFFF',
                              padding: '10px 16px',
                              textTransform: 'none',
                              fontSize: '0.9rem',
                              '&:hover': {
                                borderColor: '#8B4513',
                                backgroundColor: 'rgba(139, 69, 19, 0.04)',
                              },
                              '& .MuiSvgIcon-root': {
                                color: '#8B4513',
                              },
                            }}
                            startIcon={<CloudUploadIcon sx={{ color: '#8B4513' }} />}
                          >
                            {cniName ? "Changer le document" : "Téléverser la CNI"}
                          </UploadButton>
                        </label>

                        {touched.cni && errors.cni && (
                          <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {errors.cni as string}
                          </Typography>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              )}

              <Divider 
                sx={{ 
                  my: 4,
                  borderColor: '#DEB887',
                }} 
              />

              <StepNavigation>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{
                    color: '#8B4513',
                    borderColor: '#8B4513',
                    padding: '10px 24px',
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 500,
                    backgroundColor: '#FFFFFF',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 69, 19, 0.04)',
                      borderColor: '#5C2E0D',
                    },
                  }}
                  startIcon={<ArrowBackIcon sx={{ color: '#8B4513' }} />}
                >
                  Précédent
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: '#8B4513',
                      color: '#FFFFFF',
                      padding: '10px 24px',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: '#5C2E0D',
                        boxShadow: 'none',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#DEB887',
                      },
                    }}
                    disabled={isSubmitting}
                    endIcon={isSubmitting ? <CircularProgress size={20} /> : <CheckCircleIcon sx={{ color: '#FFFFFF' }} />}
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Soumettre ma demande'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#8B4513',
                      color: '#FFFFFF',
                      padding: '10px 24px',
                      textTransform: 'none',
                      fontSize: '1rem',
                      fontWeight: 500,
                      boxShadow: 'none',
                      '&:hover': {
                        backgroundColor: '#5C2E0D',
                        boxShadow: 'none',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#DEB887',
                      },
                    }}
                    endIcon={<ArrowForwardIcon sx={{ color: '#FFFFFF' }} />}
                    onClick={async () => {
                      const errors = await validateForm();
                      const currentFields = Object.keys(validationSchema[activeStep].fields);
                      
                      const currentStepErrors = currentFields.some(
                        field => errors[field as keyof FormValues]
                      );
                      
                      if (!currentStepErrors) {
                        handleNext();
                      } else {
                        currentFields.forEach(field => {
                          handleBlur({ target: { name: field } } as React.FocusEvent<HTMLInputElement>);
                        });
                      }
                    }}
                  >
                    Suivant
                  </Button>
                )}
              </StepNavigation>
            </Form>
          )}
        </Formik>
      </StyledPaper>

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
          sx={{
            width: '100%',
            backgroundColor: snackbarSeverity === 'success' ? '#8B4513' : undefined,
            '& .MuiAlert-icon': {
              color: '#FFFFFF',
            },
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <style jsx global>{`
        .MuiTextField-root .MuiOutlinedInput-root {
          border-radius: 12px;
        }
        .MuiTextField-root .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
          border-color: #8B4513;
        }
        .MuiTextField-root .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
          border-color: #8B4513;
        }
        .MuiTextField-root .MuiInputLabel-root.Mui-focused {
          color: #8B4513;
        }
        .MuiFormControl-root .MuiOutlinedInput-root {
          border-radius: 12px;
        }
        .MuiFormControl-root .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
          border-color: #8B4513;
        }
        .MuiFormControl-root .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
          border-color: #8B4513;
        }
        .MuiFormControl-root .MuiInputLabel-root.Mui-focused {
          color: #8B4513;
        }
      `}</style>
    </Container>
  );
}