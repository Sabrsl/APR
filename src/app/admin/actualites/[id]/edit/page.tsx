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
  Switch,
  FormControlLabel,
  CircularProgress
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

// Données fictives pour les actualités
const newsData = [
  {
    id: '1',
    title: 'Lancement du nouveau programme de formation professionnelle',
    content: 'Le ministre de l\'Éducation a inauguré aujourd\'hui le nouveau programme de formation professionnelle qui vise à former plus de 5000 jeunes aux métiers d\'avenir.\n\nCe programme, d\'une durée de 2 ans, couvrira des domaines tels que le numérique, les énergies renouvelables et l\'agriculture moderne.\n\nPlusieurs partenaires internationaux soutiennent cette initiative qui s\'inscrit dans la vision de développement à long terme du pays.',
    excerpt: 'Un nouveau programme de formation pour 5000 jeunes dans les secteurs d\'avenir',
    author: 'Admin',
    publishDate: '2023-09-15',
    category: 'Éducation',
    featured: true,
    status: 'Publié',
    image: '/images/education.jpg'
  },
  {
    id: '2',
    title: 'Inauguration du nouveau centre de santé à Thiès',
    content: 'Le Premier Ministre a inauguré ce matin le nouveau centre de santé de Thiès, un établissement moderne qui permettra d\'améliorer l\'accès aux soins de santé pour plus de 50 000 habitants de la région.\n\nCe centre, financé par la coopération internationale, dispose d\'équipements de dernière génération et d\'une équipe de professionnels qualifiés.\n\nLa cérémonie s\'est déroulée en présence des autorités locales et des partenaires du projet.',
    excerpt: 'Un nouvel établissement de santé moderne au service de la population',
    author: 'Admin',
    publishDate: '2023-09-10',
    category: 'Santé',
    featured: false,
    status: 'Publié',
    image: '/images/sante.jpg'
  },
  {
    id: '3',
    title: 'Nouveau programme d\'irrigation dans la vallée du fleuve',
    content: 'Le ministère de l\'Agriculture a lancé un vaste programme d\'irrigation dans la vallée du fleuve Sénégal, visant à augmenter la production agricole et à sécuriser les revenus des agriculteurs locaux.\n\nCe projet, d\'un coût total de 5 milliards de francs CFA, permettra d\'irriguer plus de 10 000 hectares de terres supplémentaires.\n\nLes travaux devraient s\'achever d\'ici la fin de l\'année prochaine, permettant ainsi deux cycles complets de culture par an.',
    excerpt: 'Un investissement majeur dans l\'agriculture de la vallée du fleuve',
    author: 'Rédacteur',
    publishDate: '2023-09-05',
    category: 'Agriculture',
    featured: true,
    status: 'Publié',
    image: '/images/agriculture.jpg'
  },
  {
    id: '4',
    title: 'Forum sur l\'entrepreneuriat des jeunes',
    content: 'Le forum sur l\'entrepreneuriat des jeunes se tiendra la semaine prochaine à Dakar, réunissant plus de 200 jeunes entrepreneurs et de nombreux investisseurs potentiels.\n\nCet événement, organisé par le ministère de la Jeunesse en collaboration avec la Chambre de Commerce, vise à stimuler l\'esprit d\'entreprise et à faciliter l\'accès au financement pour les projets innovants.\n\nPlusieurs ateliers pratiques et sessions de mentorat sont au programme.',
    excerpt: 'Un événement majeur pour les jeunes entrepreneurs sénégalais',
    author: 'Admin',
    publishDate: '2023-09-01',
    category: 'Économie',
    featured: false,
    status: 'Brouillon',
    image: '/images/entreprenariat.jpg'
  },
  {
    id: '5',
    title: 'Visite officielle du président dans la région de Ziguinchor',
    content: 'Le président de la République entamera demain une visite officielle de trois jours dans la région de Ziguinchor, dans le cadre de sa tournée nationale.\n\nAu programme figurent l\'inauguration de plusieurs infrastructures, dont un pont, un hôpital et une université, ainsi que des rencontres avec les populations locales.\n\nCette visite s\'inscrit dans la politique de développement équilibré du territoire national.',
    excerpt: 'Le chef de l\'État attendu à Ziguinchor pour une visite de travail',
    author: 'Rédacteur',
    publishDate: '2023-08-25',
    category: 'Politique',
    featured: false,
    status: 'Brouillon',
    image: '/images/politique.jpg'
  },
];

interface EditArticleProps {
  params: {
    id: string;
  };
}

export default function EditArticle({ params }: EditArticleProps) {
  const { id } = params;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [publishDate, setPublishDate] = useState<Date | null>(null);
  const [featured, setFeatured] = useState(false);
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    // In a real app, fetch the article data from your API
    // For this example, we'll use our mock data
    const article = newsData.find(item => item.id === id);
    
    if (article) {
      setTitle(article.title);
      setContent(article.content);
      setExcerpt(article.excerpt || '');
      setPublishDate(new Date(article.publishDate));
      setFeatured(article.featured);
      setCategory(article.category);
      setAuthor(article.author);
      setStatus(article.status);
      
      // Set image preview from existing image URL
      setImagePreview(article.image);
    }
    
    // In a real app, handle the case where article not found
    
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!title || !content || !category || !author || !status) {
      setAlertMessage('Veuillez remplir tous les champs obligatoires.');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }
    
    // In a real app, you would send data to your backend
    console.log({
      id,
      title,
      content,
      excerpt,
      publishDate,
      featured,
      category,
      author,
      status,
      image
    });
    
    // Show success message
    setAlertMessage('Actualité mise à jour avec succès !');
    setAlertSeverity('success');
    setShowAlert(true);
    
    // Reset alert after some time
    setTimeout(() => {
      setShowAlert(false);
      // You might want to use router.push('/admin/actualites') here
    }, 3000);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
          <Link href="/admin/actualites" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Actualités
          </Link>
          <Typography color="text.primary">Modifier l&apos;actualité</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Modifier l&apos;actualité
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
                <FormControl fullWidth required>
                  <InputLabel id="status-label">Statut</InputLabel>
                  <Select
                    labelId="status-label"
                    value={status}
                    label="Statut"
                    onChange={handleStatusChange}
                  >
                    <MenuItem value="Brouillon">Brouillon</MenuItem>
                    <MenuItem value="Publié">Publié</MenuItem>
                    <MenuItem value="Archivé">Archivé</MenuItem>
                  </Select>
                </FormControl>
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
              Enregistrer
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
} 