'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Breadcrumbs,
  IconButton,
  Stack,
  Alert,
  Collapse,
  Tooltip,
  CircularProgress,
  List,
  ListItem,
} from '@mui/material';
import { 
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon,
  EventNote as EventNoteIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  Add as AddIcon,
  RemoveCircleOutline as RemoveIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';

const categories = [
  'Économie',
  'Éducation',
  'Santé',
  'Agriculture',
  'Environnement',
  'Culture',
  'Politique',
  'Social',
  'Sport',
  'Autre'
];

// Données fictives pour les événements
const eventsData = [
  {
    id: '1',
    title: 'Forum Économique du Sénégal',
    description: 'Forum annuel réunissant les acteurs économiques du pays pour discuter des perspectives et défis',
    date: '2023-11-15',
    time: '09:00 - 17:00',
    startTime: '09:00',
    endTime: '17:00',
    location: 'Centre International de Conférences Abdou Diouf, Diamniadio',
    image: '/images/events/forum.jpg',
    status: 'À venir',
    category: 'Économie',
    program: 'Accueil des participants\n09:00 - 09:30\n\nDiscours d\'ouverture\n09:30 - 10:00\n\nTable ronde: Perspectives économiques\n10:00 - 12:00\n\nDéjeuner\n12:00 - 13:30\n\nAteliers thématiques\n13:30 - 16:00\n\nClôture\n16:00 - 17:00',
  },
  {
    id: '2',
    title: 'Inauguration du Centre de Formation Professionnelle',
    description: 'Cérémonie d\'inauguration du nouveau centre de formation professionnelle pour les jeunes',
    date: '2023-10-25',
    time: '10:30 - 12:30',
    startTime: '10:30',
    endTime: '12:30',
    location: 'Dakar, Parcelles Assainies',
    image: '/images/events/inauguration.jpg',
    status: 'À venir',
    category: 'Éducation',
    program: 'Arrivée des officiels\n10:30 - 10:45\n\nCoupure du ruban\n10:45 - 11:00\n\nVisite guidée\n11:00 - 11:30\n\nDiscours\n11:30 - 12:15\n\nCocktail\n12:15 - 12:30',
  },
];

interface EditEventProps {
  params: {
    id: string;
  }
}

interface ProgramItem {
  title: string;
  startTime: string;
  endTime: string;
}

export default function EditEvent({ params }: EditEventProps) {
  const { id } = params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [programItems, setProgramItems] = useState<ProgramItem[]>([
    { title: '', startTime: '', endTime: '' }
  ]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // In a real app, fetch the event data from your API
    // For this example, we'll use our mock data
    const event = eventsData.find(evt => evt.id === id);
    
    if (event) {
      setTitle(event.title);
      setDescription(event.description);
      setDate(new Date(event.date));
      
      // Parse times for time pickers
      const currentDate = new Date();
      const [startHours, startMinutes] = event.startTime.split(':').map(Number);
      const startTimeDate = new Date(currentDate);
      startTimeDate.setHours(startHours, startMinutes);
      setStartTime(startTimeDate);
      
      if (event.endTime) {
        const [endHours, endMinutes] = event.endTime.split(':').map(Number);
        const endTimeDate = new Date(currentDate);
        endTimeDate.setHours(endHours, endMinutes);
        setEndTime(endTimeDate);
      }
      
      setLocation(event.location);
      setCategory(event.category);
      setStatus(event.status);
      
      // Parse program to program items
      if (event.program) {
        const programSections = event.program.split('\n\n');
        const parsedItems = programSections.map(section => {
          const lines = section.split('\n');
          if (lines.length >= 2) {
            const title = lines[0];
            const timeRange = lines[1];
            const [startTime, endTime] = timeRange.split(' - ');
            return { title, startTime, endTime: endTime || '' };
          }
          return { title: section, startTime: '', endTime: '' };
        });
        
        if (parsedItems.length > 0) {
          setProgramItems(parsedItems);
        }
      }
      
      // Set image preview from existing image URL
      setImagePreview(event.image);
    }
    
    // In a real app, handle the case where event not found
    
    setLoading(false);
  }, [id]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleAddProgramItem = () => {
    setProgramItems([...programItems, { title: '', startTime: '', endTime: '' }]);
  };

  const handleRemoveProgramItem = (index: number) => {
    const newProgramItems = [...programItems];
    newProgramItems.splice(index, 1);
    setProgramItems(newProgramItems);
  };

  const handleProgramItemChange = (index: number, field: keyof ProgramItem, value: string) => {
    const newProgramItems = [...programItems];
    newProgramItems[index][field] = value;
    setProgramItems(newProgramItems);
  };

  const formatProgramForSave = (): string => {
    return programItems
      .filter(item => item.title.trim() !== '')
      .map(item => {
        const timeRange = `${item.startTime}${item.endTime ? ' - ' + item.endTime : ''}`;
        return `${item.title}\n${timeRange}`;
      })
      .join('\n\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title || !description || !date || !startTime || !location || !category) {
      setAlertMessage('Veuillez remplir tous les champs obligatoires.');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }
    
    // Format the program into the expected format
    const formattedProgram = formatProgramForSave();
    
    // In a real app, you would send data to your backend
    console.log({
      id,
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      category,
      status,
      program: formattedProgram,
      image
    });
    
    // Show success message
    setAlertMessage('Événement mis à jour avec succès !');
    setAlertSeverity('success');
    setShowAlert(true);
    
    // Reset alert after some time
    setTimeout(() => {
      setShowAlert(false);
      // You might want to use router.push('/admin/evenements') here
    }, 3000);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Collapse in={showAlert}>
        <Alert 
          severity={alertSeverity} 
          sx={{ mb: 2 }}
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      </Collapse>
      
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link href="/admin" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Dashboard
          </Link>
          <Link href="/admin/evenements" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Événements
          </Link>
          <Typography color="text.primary">Modifier l'événement</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Modifier l'événement
          </Typography>
          <Tooltip title="Retour à la liste">
            <Link href="/admin/evenements" passHref>
              <IconButton 
                size="large" 
                sx={{ 
                  backgroundColor: 'background.paper',
                  boxShadow: 1,
                  borderRadius: 2,
                }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Link>
          </Tooltip>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              mb: 3,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Informations générales
            </Typography>
            
            <TextField
              label="Titre de l'événement"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <TextField
              label="Description de l'événement"
              fullWidth
              required
              multiline
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 3 }}
              helperText="Décrivez en détail l'événement, son objectif et les informations importantes."
            />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                Programme de l'événement
              </Typography>
              
              <List sx={{ width: '100%', bgcolor: 'background.paper', py: 0 }}>
                {programItems.map((item, index) => (
                  <ListItem 
                    key={index} 
                    sx={{ 
                      px: 0, 
                      py: 1, 
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: { xs: 'flex-start', md: 'center' },
                      gap: 2
                    }}
                  >
                    <TextField
                      label="Titre de l'activité"
                      fullWidth
                      value={item.title}
                      onChange={(e) => handleProgramItemChange(index, 'title', e.target.value)}
                      placeholder="Ex: Cérémonie d'ouverture"
                      size="small"
                    />
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', md: '60%' } }}>
                      <TextField
                        label="Heure de début"
                        value={item.startTime}
                        onChange={(e) => handleProgramItemChange(index, 'startTime', e.target.value)}
                        placeholder="Ex: 09:30"
                        size="small"
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                      />
                      <TextField
                        label="Heure de fin"
                        value={item.endTime}
                        onChange={(e) => handleProgramItemChange(index, 'endTime', e.target.value)}
                        placeholder="Ex: 10:00"
                        size="small"
                        sx={{ width: { xs: '100%', sm: '50%' } }}
                      />
                    </Stack>
                    <IconButton 
                      onClick={() => handleRemoveProgramItem(index)}
                      disabled={programItems.length === 1}
                      size="small"
                      color="error"
                      sx={{ mt: { xs: 1, md: 0 } }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
              
              <Button
                startIcon={<AddIcon />}
                onClick={handleAddProgramItem}
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              >
                Ajouter une activité
              </Button>
              
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Ajoutez chaque activité du programme avec ses horaires.
              </Typography>
            </Box>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel id="category-label">Catégorie</InputLabel>
                  <Select
                    labelId="category-label"
                    value={category}
                    label="Catégorie"
                    onChange={handleCategoryChange}
                  >
                    {categories.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth required>
                  <InputLabel id="status-label">Statut</InputLabel>
                  <Select
                    labelId="status-label"
                    value={status}
                    label="Statut"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="À venir">À venir</MenuItem>
                    <MenuItem value="En cours">En cours</MenuItem>
                    <MenuItem value="Terminé">Terminé</MenuItem>
                    <MenuItem value="Annulé">Annulé</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  label="Lieu de l'événement"
                  fullWidth
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  InputProps={{
                    startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
                  }}
                />
              </Grid>
            </Grid>
            
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <DatePicker
                    label="Date de l'événement"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    slotProps={{ 
                      textField: { 
                        fullWidth: true,
                        required: true,
                        InputProps: {
                          startAdornment: <EventNoteIcon color="action" sx={{ mr: 1 }} />,
                        }
                      } 
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TimePicker
                    label="Heure de début"
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    slotProps={{ 
                      textField: { 
                        fullWidth: true,
                        required: true,
                        InputProps: {
                          startAdornment: <AccessTimeIcon color="action" sx={{ mr: 1 }} />,
                        }
                      } 
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TimePicker
                    label="Heure de fin"
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    slotProps={{ 
                      textField: { 
                        fullWidth: true,
                        InputProps: {
                          startAdornment: <AccessTimeIcon color="action" sx={{ mr: 1 }} />,
                        }
                      } 
                    }}
                  />
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              mb: 3
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
              Image de l'événement
            </Typography>
            
            <Box 
              sx={{ 
                border: '2px dashed rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                mb: 2,
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.02)',
                backgroundImage: imagePreview ? `url(${imagePreview})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              {!imagePreview && (
                <>
                  <PhotoCameraIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Cliquez pour ajouter une image
                  </Typography>
                </>
              )}
              
              {imagePreview && (
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10
                  }}
                >
                  <IconButton 
                    onClick={removeImage}
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
              
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                  cursor: 'pointer',
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
            
            <Typography variant="caption" color="text.secondary">
              Image au format .jpg ou .png. Taille recommandée : 1200 x 630 pixels.
            </Typography>
          </Paper>
          
          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center' }}>
            <Button
              variant="outlined"
              component={Link}
              href="/admin/evenements"
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              sx={{ px: 4 }}
            >
              Enregistrer
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
} 