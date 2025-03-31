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
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
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
} from '@mui/icons-material';
import Link from 'next/link';

// Données fictives pour les actualités
const newsData = [
  {
    id: '1',
    title: 'Lancement du nouveau programme de formation professionnelle',
    category: 'Éducation',
    author: 'Admin',
    date: '15 Sep 2023',
    status: 'Publié',
  },
  {
    id: '2',
    title: 'Inauguration du nouveau centre de santé à Thiès',
    category: 'Santé',
    author: 'Admin',
    date: '10 Sep 2023',
    status: 'Publié',
  },
  {
    id: '3',
    title: 'Nouveau programme d\'irrigation dans la vallée du fleuve',
    category: 'Agriculture',
    author: 'Rédacteur',
    date: '05 Sep 2023',
    status: 'Publié',
  },
  {
    id: '4',
    title: 'Forum sur l\'entrepreneuriat des jeunes',
    category: 'Économie',
    author: 'Admin',
    date: '01 Sep 2023',
    status: 'Brouillon',
  },
  {
    id: '5',
    title: 'Visite officielle du président dans la région de Ziguinchor',
    category: 'Politique',
    author: 'Rédacteur',
    date: '25 Août 2023',
    status: 'Brouillon',
  },
];

export default function AdminNews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [categoryFilter, setCategoryFilter] = useState('');

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

  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };

  // Filtrer les données en fonction de l'onglet et des filtres
  const filteredData = newsData.filter((item) => {
    // Filtre par onglet (Tout, Publié, Brouillon)
    if (tabValue === 1 && item.status !== 'Publié') return false;
    if (tabValue === 2 && item.status !== 'Brouillon') return false;
    
    // Filtre par recherche (titre)
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    // Filtre par catégorie
    if (categoryFilter && item.category !== categoryFilter) return false;
    
    return true;
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link href="/admin" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Dashboard
          </Link>
          <Typography color="text.primary">Actualités</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Gestion des actualités
          </Typography>
          <Link href="/admin/actualites/new" passHref>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Ajouter une actualité
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Rechercher une actualité..."
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1, minWidth: '250px' }}
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

          <FormControl size="small" sx={{ minWidth: '150px' }}>
            <InputLabel id="category-filter-label">Catégorie</InputLabel>
            <Select
              labelId="category-filter-label"
              value={categoryFilter}
              label="Catégorie"
              onChange={handleCategoryFilterChange}
            >
              <MenuItem value="">Toutes</MenuItem>
              <MenuItem value="Éducation">Éducation</MenuItem>
              <MenuItem value="Santé">Santé</MenuItem>
              <MenuItem value="Agriculture">Agriculture</MenuItem>
              <MenuItem value="Économie">Économie</MenuItem>
              <MenuItem value="Politique">Politique</MenuItem>
            </Select>
          </FormControl>

          <Button 
            startIcon={<FilterListIcon />} 
            variant="outlined" 
            size="medium"
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Plus de filtres
          </Button>
        </Box>
      </Paper>

      {/* Onglets */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="news tabs">
          <Tab label="Tout" />
          <Tab label="Publiés" />
          <Tab label="Brouillons" />
        </Tabs>
      </Box>

      {/* Tableau des actualités */}
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
              <TableCell sx={{ fontWeight: 'bold' }}>Auteur</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Statut</TableCell>
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
                <TableCell>{row.author}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    color={row.status === 'Publié' ? 'success' : 'default'}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton size="small" component={Link} href={`/admin/actualites/${row.id}`}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" component={Link} href={`/admin/actualites/${row.id}/edit`}>
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

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <Pagination count={3} color="primary" shape="rounded" />
      </Box>

      {/* Menu d'actions pour chaque ligne */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} href={`/admin/actualites/${selectedItem}/duplicate`}>
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
            Êtes-vous sûr de vouloir supprimer cette actualité ? Cette action est irréversible.
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