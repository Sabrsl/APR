'use client';

import React, { useState } from 'react';
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
  Divider,
  Stack,
  Alert,
  Collapse,
  Tooltip,
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

interface ProgramItem {
  title: string;
  startTime: string;
  endTime: string;
}

export default function NewEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [programItems, setProgramItems] = useState<ProgramItem[]>([
    { title: '', startTime: '', endTime: '' }
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
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
      title,
      description,
      date,
      startTime,
      endTime,
      location,
      category,
      program: formattedProgram,
      image
    });
    
    // Show success message
    setAlertMessage('Événement créé avec succès !');
    setAlertSeverity('success');
    setShowAlert(true);
    
    // Reset form after submission (in a real app, you might redirect to the events list)
    setTimeout(() => {
      setShowAlert(false);
      // You might want to use router.push('/admin/evenements') here
    }, 3000);
  };

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
          <Typography color="text.primary">Nouvel événement</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Créer un nouvel événement
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
              <Grid item xs={12} md={8}>
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