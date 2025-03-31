'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs,
  Divider,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Collapse,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  LocationOn as LocationIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Block as BlockIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';

// Données fictives pour les événements
const eventsData = [
  {
    id: '1',
    title: 'Forum Économique du Sénégal',
    description: 'Forum annuel réunissant les acteurs économiques du pays pour discuter des perspectives et défis',
    date: '2023-11-15',
    time: '09:00 - 17:00',
    location: 'Centre International de Conférences Abdou Diouf, Diamniadio',
    image: '/images/events/forum.jpg',
    status: 'À venir',
    category: 'Économie',
  },
  {
    id: '2',
    title: 'Inauguration du Centre de Formation Professionnelle',
    description: 'Cérémonie d\'inauguration du nouveau centre de formation professionnelle pour les jeunes',
    date: '2023-10-25',
    time: '10:30 - 12:30',
    location: 'Dakar, Parcelles Assainies',
    image: '/images/events/inauguration.jpg',
    status: 'À venir',
    category: 'Éducation',
  },
  {
    id: '3',
    title: 'Campagne de Vaccination Nationale',
    description: 'Lancement de la campagne nationale de vaccination contre plusieurs maladies infantiles',
    date: '2023-09-10',
    time: '08:00 - 18:00',
    location: 'Plusieurs centres de santé à travers le pays',
    image: '/images/events/vaccination.jpg',
    status: 'Terminé',
    category: 'Santé',
  },
  {
    id: '4',
    title: 'Tournée Agricole Présidentielle',
    description: 'Visite du président dans les régions agricoles pour évaluer la campagne agricole',
    date: '2023-08-05',
    time: 'Toute la journée',
    location: 'Régions de Kaolack, Fatick et Kaffrine',
    image: '/images/events/agriculture.jpg',
    status: 'Terminé',
    category: 'Agriculture',
  },
  {
    id: '5',
    title: 'Sommet sur le Changement Climatique',
    description: 'Conférence internationale sur les défis climatiques en Afrique de l\'Ouest',
    date: '2023-12-05',
    time: '09:00 - 18:00',
    location: 'Hôtel King Fahd Palace, Dakar',
    image: '/images/events/climate.jpg',
    status: 'À venir',
    category: 'Environnement',
  },
  {
    id: '6',
    title: 'Festival Culturel de Saint-Louis',
    description: 'Festival annuel célébrant la diversité culturelle et le patrimoine de Saint-Louis',
    date: '2023-12-15',
    time: '16:00 - 23:00',
    location: 'Place Faidherbe, Saint-Louis',
    image: '/images/events/festival.jpg',
    status: 'À venir',
    category: 'Culture',
  },
];

export default function AdminEvents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    // Logique de suppression à implémenter
    setDeleteDialogOpen(false);
    setShowAlert(true);
    
    // Fermer l'alerte après 5 secondes
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setStatusFilter('');
    setStartDate(null);
    setEndDate(null);
  };

  // Filtrer les données en fonction des filtres
  const filteredData = eventsData.filter((item) => {
    // Filtre par recherche (titre, description, lieu)
    if (searchTerm && 
        !item.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtre par catégorie
    if (categoryFilter && item.category !== categoryFilter) return false;
    
    // Filtre par statut
    if (statusFilter && item.status !== statusFilter) return false;
    
    // Filtre par date de début
    if (startDate) {
      const eventDate = new Date(item.date);
      if (eventDate < startDate) return false;
    }
    
    // Filtre par date de fin
    if (endDate) {
      const eventDate = new Date(item.date);
      if (eventDate > endDate) return false;
    }
    
    return true;
  });

  return (
    <Box>
      {/* Alerte de confirmation de suppression */}
      <Collapse in={showAlert}>
        <Alert 
          severity="success" 
          sx={{ mb: 2 }}
          onClose={() => setShowAlert(false)}
        >
          L'événement a été supprimé avec succès.
        </Alert>
      </Collapse>
      
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link href="/admin" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Dashboard
          </Link>
          <Typography color="text.primary">Événements</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Gestion des événements
          </Typography>
          <Link href="/admin/evenements/new" passHref>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Ajouter un événement
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Filtres et recherche */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          mb: 3,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
            <TextField
              placeholder="Rechercher un événement..."
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <Button 
              startIcon={<FilterListIcon />} 
              variant="outlined" 
              onClick={() => document.getElementById('filterSection')?.scrollIntoView({ behavior: 'smooth' })}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Filtres
            </Button>

            {(searchTerm || categoryFilter || statusFilter || startDate || endDate) && (
              <Button 
                variant="text" 
                onClick={clearFilters}
                sx={{ textTransform: 'none' }}
              >
                Effacer les filtres
              </Button>
            )}
          </Box>

          <Box id="filterSection" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start' }}>
            <FormControl size="small" sx={{ minWidth: '150px' }}>
              <InputLabel id="category-filter-label">Catégorie</InputLabel>
              <Select
                labelId="category-filter-label"
                value={categoryFilter}
                label="Catégorie"
                onChange={handleCategoryFilterChange}
              >
                <MenuItem value="">Toutes</MenuItem>
                <MenuItem value="Économie">Économie</MenuItem>
                <MenuItem value="Éducation">Éducation</MenuItem>
                <MenuItem value="Santé">Santé</MenuItem>
                <MenuItem value="Agriculture">Agriculture</MenuItem>
                <MenuItem value="Environnement">Environnement</MenuItem>
                <MenuItem value="Culture">Culture</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: '150px' }}>
              <InputLabel id="status-filter-label">Statut</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Statut"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="À venir">À venir</MenuItem>
                <MenuItem value="Terminé">Terminé</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
              <DatePicker
                label="Date de début"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                slotProps={{ textField: { size: 'small', sx: { minWidth: '180px' } } }}
              />
              
              <DatePicker
                label="Date de fin"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                slotProps={{ textField: { size: 'small', sx: { minWidth: '180px' } } }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
      </Paper>

      {/* Liste des événements */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3}>
          {filteredData.map((event) => (
            <Grid item xs={12} md={6} key={event.id}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  height: '100%',
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ 
                    width: { xs: '100%', sm: '200px' },
                    height: { xs: '200px', sm: 'auto' },
                    objectFit: 'cover',
                  }}
                  image={event.image}
                  alt={event.title}
                />
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  width: '100%',
                }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Chip
                        label={event.category}
                        size="small"
                        sx={{
                          borderRadius: '4px',
                          backgroundColor: 'rgba(139, 69, 19, 0.1)',
                          color: 'primary.main',
                        }}
                      />
                      <Chip
                        label={event.status}
                        size="small"
                        icon={event.status === 'À venir' ? <CheckCircleIcon fontSize="small" /> : <BlockIcon fontSize="small" />}
                        color={event.status === 'À venir' ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </Box>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                      {event.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <EventIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {new Date(event.date).toLocaleDateString('fr-FR', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <ScheduleIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {event.time}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                      <LocationIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {event.location}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                    <IconButton size="small" component={Link} href={`/admin/evenements/${event.id}`}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" component={Link} href={`/admin/evenements/${event.id}/edit`}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={(e) => handleMoreClick(e, event.id)}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredData.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="body1" color="text.secondary">
              Aucun événement ne correspond à vos critères de recherche.
            </Typography>
          </Box>
        )}
      </Box>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Pagination count={Math.ceil(filteredData.length / 6)} color="primary" shape="rounded" />
        </Box>
      )}

      {/* Menu d'actions pour chaque ligne */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} href={`/admin/evenements/${selectedItem}/duplicate`}>
          <ListItemIcon>
            <AssignmentIcon fontSize="small" />
          </ListItemIcon>
          Dupliquer
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          Supprimer
        </MenuItem>
      </Menu>

      {/* Dialog de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cet événement ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Annuler</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 