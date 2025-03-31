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
  Stack,
  Alert,
  Collapse,
  Tooltip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { 
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';

const categories = [
  'Politique',
  'Économie',
  'Éducation',
  'Santé',
  'Agriculture',
  'Environnement',
  'Culture',
  'Social',
  'International',
  'Autre'
];

export default function NewArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [publishDate, setPublishDate] = useState<Date | null>(new Date());
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title || !content || !category || !author) {
      setAlertMessage('Veuillez remplir tous les champs obligatoires.');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }
    
    // In a real app, you would send data to your backend
    console.log({
      title,
      content,
      excerpt,
      publishDate,
      featured,
      category,
      author,
      image
    });
    
    // Show success message
    setAlertMessage('Actualité créée avec succès !');
    setAlertSeverity('success');
    setShowAlert(true);
    
    // Reset form after submission (in a real app, you might redirect to the articles list)
    setTimeout(() => {
      setShowAlert(false);
      // You might want to use router.push('/admin/actualites') here
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
          <Link href="/admin/actualites" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Actualités
          </Link>
          <Typography color="text.primary">Nouvelle actualité</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Créer une nouvelle actualité
          </Typography>
          <Tooltip title="Retour à la liste">
            <Link href="/admin/actualites" passHref>
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
              Contenu de l&apos;actualité
            </Typography>
            
            <TextField
              label="Titre de l'actualité"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 3 }}
            />
            
            <TextField
              label="Résumé (extrait)"
              fullWidth
              multiline
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              sx={{ mb: 3 }}
              helperText="Un court résumé qui apparaîtra dans les listes d'actualités (facultatif)."
            />
            
            <TextField
              label="Contenu de l'actualité"
              fullWidth
              required
              multiline
              rows={10}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              sx={{ mb: 3 }}
              helperText="Le contenu complet de l'actualité. Vous pouvez utiliser du texte simple ou du HTML basique."
            />
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
              Paramètres de publication
            </Typography>
            
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12}>
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
              <Grid item xs={12}>
                <TextField
                  label="Auteur"
                  fullWidth
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
                  <DatePicker
                    label="Date de publication"
                    value={publishDate}
                    onChange={(newValue) => setPublishDate(newValue)}
                    slotProps={{ 
                      textField: { 
                        fullWidth: true,
                        InputProps: {
                          startAdornment: <CalendarTodayIcon color="action" sx={{ mr: 1 }} />,
                        }
                      } 
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Article à la une"
                />
              </Grid>
            </Grid>
          </Paper>
          
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
              Image principale
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
              href="/admin/actualites"
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSubmit}
              sx={{ px: 4 }}
            >
              Publier
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
} 