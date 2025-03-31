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
  Pagination,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Avatar,
  Collapse,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  FilterList as FilterListIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';

// Données fictives pour les adhésions
const adhesionsData = [
  {
    id: '1',
    nom: 'Diallo',
    prenom: 'Amadou',
    email: 'amadou.diallo@example.com',
    telephone: '+221 77 123 45 67',
    region: 'Dakar',
    departement: 'Dakar',
    commune: 'Médina',
    profession: 'Enseignant',
    date: '2023-09-15',
    status: 'Validée',
    photo: '/images/avatars/avatar1.jpg',
  },
  {
    id: '2',
    nom: 'Sow',
    prenom: 'Fatou',
    email: 'fatou.sow@example.com',
    telephone: '+221 76 987 65 43',
    region: 'Thiès',
    departement: 'Thiès',
    commune: 'Thiès Ville',
    profession: 'Commerçante',
    date: '2023-10-02',
    status: 'En attente',
    photo: '/images/avatars/avatar2.jpg',
  },
  {
    id: '3',
    nom: 'Ndiaye',
    prenom: 'Ibrahima',
    email: 'ibrahima.ndiaye@example.com',
    telephone: '+221 70 456 78 90',
    region: 'Saint-Louis',
    departement: 'Saint-Louis',
    commune: 'Saint-Louis',
    profession: 'Ingénieur',
    date: '2023-08-20',
    status: 'Validée',
    photo: '/images/avatars/avatar3.jpg',
  },
  {
    id: '4',
    nom: 'Sarr',
    prenom: 'Aïssatou',
    email: 'aissatou.sarr@example.com',
    telephone: '+221 78 234 56 78',
    region: 'Kaolack',
    departement: 'Kaolack',
    commune: 'Kaolack',
    profession: 'Médecin',
    date: '2023-11-05',
    status: 'Validée',
    photo: '/images/avatars/avatar4.jpg',
  },
  {
    id: '5',
    nom: 'Faye',
    prenom: 'Ousmane',
    email: 'ousmane.faye@example.com',
    telephone: '+221 77 567 89 01',
    region: 'Ziguinchor',
    departement: 'Ziguinchor',
    commune: 'Ziguinchor',
    profession: 'Avocat',
    date: '2023-10-18',
    status: 'Rejetée',
    photo: '/images/avatars/avatar5.jpg',
  },
  {
    id: '6',
    nom: 'Gueye',
    prenom: 'Mariama',
    email: 'mariama.gueye@example.com',
    telephone: '+221 76 345 67 89',
    region: 'Louga',
    departement: 'Louga',
    commune: 'Louga',
    profession: 'Entrepreneur',
    date: '2023-11-12',
    status: 'En attente',
    photo: '/images/avatars/avatar6.jpg',
  },
];

export default function AdminAdhesions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');

  const rowsPerPage = 10;

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
    setAlertMessage('L\'adhésion a été supprimée avec succès.');
    setAlertSeverity('success');
    setShowAlert(true);
    
    // Fermer l'alerte après 5 secondes
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    // Logique de changement de statut à implémenter
    setAlertMessage(`Le statut de l'adhésion a été changé en "${newStatus}".`);
    setAlertSeverity('success');
    setShowAlert(true);
    
    // Fermer l'alerte après 5 secondes
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleRegionFilterChange = (event: SelectChangeEvent) => {
    setRegionFilter(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setRegionFilter('');
    setStartDate(null);
    setEndDate(null);
  };

  // Filtrer les données en fonction des filtres
  const filteredData = adhesionsData.filter((item) => {
    // Filtre par recherche (nom, prénom, email, téléphone)
    if (searchTerm && 
        !`${item.nom} ${item.prenom}`.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.telephone.includes(searchTerm)) {
      return false;
    }
    
    // Filtre par statut
    if (statusFilter && item.status !== statusFilter) return false;
    
    // Filtre par région
    if (regionFilter && item.region !== regionFilter) return false;
    
    // Filtre par date de début
    if (startDate) {
      const adhesionDate = new Date(item.date);
      if (adhesionDate < startDate) return false;
    }
    
    // Filtre par date de fin
    if (endDate) {
      const adhesionDate = new Date(item.date);
      if (adhesionDate > endDate) return false;
    }
    
    return true;
  });

  // Calculer les éléments pour la page actuelle
  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box>
      {/* Alerte de confirmation */}
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
          <Typography color="text.primary">Adhésions</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Gestion des adhésions
          </Typography>
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
              placeholder="Rechercher un membre..."
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

            {(searchTerm || statusFilter || regionFilter || startDate || endDate) && (
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
              <InputLabel id="status-filter-label">Statut</InputLabel>
              <Select
                labelId="status-filter-label"
                value={statusFilter}
                label="Statut"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="">Tous</MenuItem>
                <MenuItem value="Validée">Validée</MenuItem>
                <MenuItem value="En attente">En attente</MenuItem>
                <MenuItem value="Rejetée">Rejetée</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: '150px' }}>
              <InputLabel id="region-filter-label">Région</InputLabel>
              <Select
                labelId="region-filter-label"
                value={regionFilter}
                label="Région"
                onChange={handleRegionFilterChange}
              >
                <MenuItem value="">Toutes</MenuItem>
                <MenuItem value="Dakar">Dakar</MenuItem>
                <MenuItem value="Thiès">Thiès</MenuItem>
                <MenuItem value="Saint-Louis">Saint-Louis</MenuItem>
                <MenuItem value="Kaolack">Kaolack</MenuItem>
                <MenuItem value="Ziguinchor">Ziguinchor</MenuItem>
                <MenuItem value="Louga">Louga</MenuItem>
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

      {/* Tableau des adhésions */}
      <TableContainer 
        component={Paper} 
        elevation={0}
        sx={{ 
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          mb: 3
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Membre</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Localité</TableCell>
              <TableCell>Profession</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar src={row.photo} alt={`${row.prenom} ${row.nom}`} />
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {row.prenom} {row.nom}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography variant="body2">{row.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2">{row.telephone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{row.commune}</Typography>
                  <Typography variant="caption" color="text.secondary">{row.region}</Typography>
                </TableCell>
                <TableCell>{row.profession}</TableCell>
                <TableCell>
                  {new Date(row.date).toLocaleDateString('fr-FR', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.status}
                    size="small"
                    color={
                      row.status === 'Validée' 
                        ? 'success' 
                        : row.status === 'En attente' 
                          ? 'warning' 
                          : 'error'
                    }
                    icon={
                      row.status === 'Validée' 
                        ? <CheckCircleIcon fontSize="small" /> 
                        : row.status === 'En attente' 
                          ? <VisibilityIcon fontSize="small" /> 
                          : <CancelIcon fontSize="small" />
                    }
                    variant={row.status === 'En attente' ? 'outlined' : 'filled'}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMoreClick(e, row.id)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Aucune adhésion ne correspond à vos critères de recherche.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <Pagination 
            count={Math.ceil(filteredData.length / rowsPerPage)} 
            page={page}
            onChange={handleChangePage}
            color="primary" 
            shape="rounded" 
          />
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
        <MenuItem onClick={() => {
          handleStatusChange(selectedItem || '', 'Validée');
          handleMenuClose();
        }}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" color="success" />
          </ListItemIcon>
          Valider l'adhésion
        </MenuItem>
        <MenuItem onClick={() => {
          handleStatusChange(selectedItem || '', 'Rejetée');
          handleMenuClose();
        }}>
          <ListItemIcon>
            <CancelIcon fontSize="small" color="error" />
          </ListItemIcon>
          Rejeter l'adhésion
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
            Êtes-vous sûr de vouloir supprimer cette adhésion ? Cette action est irréversible.
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