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
  Stack,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import Link from 'next/link';

// Données fictives pour les programmes
const programsData = [
  {
    id: '1',
    title: 'Programme de développement agricole',
    description: 'Soutien aux agriculteurs et modernisation des techniques agricoles',
    image: '/images/agriculture.jpg',
    category: 'Agriculture',
    status: 'Actif',
    published: true,
    priority: 'Haute',
  },
  {
    id: '2',
    title: 'Plan d\'accès à l\'eau potable',
    description: 'Construction de puits et systèmes d\'adduction d\'eau dans les zones rurales',
    image: '/images/water.jpg',
    category: 'Infrastructure',
    status: 'Actif',
    published: true,
    priority: 'Haute',
  },
  {
    id: '3',
    title: 'Programme d\'alphabétisation',
    description: 'Cours d\'alphabétisation pour adultes dans les zones rurales',
    image: '/images/education.jpg',
    category: 'Éducation',
    status: 'Actif',
    published: true,
    priority: 'Moyenne',
  },
  {
    id: '4',
    title: 'Projet de construction de routes',
    description: 'Amélioration du réseau routier dans les régions isolées',
    image: '/images/roads.jpg',
    category: 'Infrastructure',
    status: 'En préparation',
    published: false,
    priority: 'Moyenne',
  },
  {
    id: '5',
    title: 'Initiative de santé maternelle',
    description: 'Amélioration des soins prénataux et postnataux',
    image: '/images/health.jpg',
    category: 'Santé',
    status: 'Actif',
    published: true,
    priority: 'Haute',
  },
  {
    id: '6',
    title: 'Programme d\'énergies renouvelables',
    description: 'Développement de l\'énergie solaire dans les communautés rurales',
    image: '/images/solar.jpg',
    category: 'Énergie',
    status: 'En pause',
    published: false,
    priority: 'Basse',
  },
];

export default function AdminPrograms() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');

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
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'list' ? 'grid' : 'list');
  };

  // Filtrer les données en fonction de l'onglet et des filtres
  const filteredData = programsData.filter((item) => {
    // Filtre par onglet (Tout, Publié, Non publié)
    if (tabValue === 1 && !item.published) return false;
    if (tabValue === 2 && item.published) return false;
    
    // Filtre par recherche (titre)
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    return true;
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link href="/admin" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Dashboard
          </Link>
          <Typography color="text.primary">Programmes</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Gestion des programmes
          </Typography>
          <Link href="/admin/programmes/new" passHref>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Ajouter un programme
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
          <TextField
            placeholder="Rechercher un programme..."
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, maxWidth: '500px' }}
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

          <Box>
            <IconButton 
              onClick={toggleViewMode} 
              color="primary"
              sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 1 }}
            >
              {viewMode === 'list' ? <ViewModuleIcon /> : <ViewListIcon />}
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Onglets */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="programs tabs">
          <Tab label="Tous" />
          <Tab label="Publiés" />
          <Tab label="Non publiés" />
        </Tabs>
      </Box>

      {/* Affichage en grille */}
      {viewMode === 'grid' && (
        <Grid container spacing={3}>
          {filteredData.map((program) => (
            <Grid item xs={12} sm={6} md={4} key={program.id}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.1)',
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={program.image}
                  alt={program.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Chip
                      label={program.category}
                      size="small"
                      sx={{
                        borderRadius: '4px',
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        color: 'primary.main',
                      }}
                    />
                    <Chip
                      label={program.status}
                      size="small"
                      color={program.status === 'Actif' ? 'success' : program.status === 'En pause' ? 'error' : 'warning'}
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {program.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {program.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <FormControlLabel 
                    control={
                      <Switch 
                        checked={program.published} 
                        size="small" 
                        color="primary"
                      />
                    } 
                    label={program.published ? "Publié" : "Non publié"} 
                    sx={{ mr: 1 }}
                  />
                  <Box>
                    <IconButton size="small" component={Link} href={`/admin/programmes/${program.id}/edit`}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={(e) => handleMoreClick(e, program.id)}>
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Affichage en liste */}
      {viewMode === 'list' && (
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            borderRadius: 2,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
            mb: 3,
            overflow: 'hidden',
          }}
        >
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: 'rgba(139, 69, 19, 0.04)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Titre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Catégorie</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Priorité</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Publication</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' },
                  }}
                >
                  <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight={500}>
                      {row.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.category}
                      size="small"
                      sx={{
                        borderRadius: '4px',
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        color: 'primary.main',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.status}
                      size="small"
                      color={row.status === 'Actif' ? 'success' : row.status === 'En pause' ? 'error' : 'warning'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{row.priority}</TableCell>
                  <TableCell>
                    <Switch 
                      checked={row.published}
                      size="small"
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <IconButton size="small" component={Link} href={`/admin/programmes/${row.id}`}>
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" component={Link} href={`/admin/programmes/${row.id}/edit`}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" onClick={(e) => handleMoreClick(e, row.id)}>
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <Pagination count={2} color="primary" shape="rounded" />
      </Box>

      {/* Menu d'actions pour chaque élément */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} href={`/admin/programmes/${selectedItem}/duplicate`}>
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
            Êtes-vous sûr de vouloir supprimer ce programme ? Cette action est irréversible.
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