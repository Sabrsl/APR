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
  Collapse,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
  Label as LabelIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  FilterList as FilterListIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import fr from 'date-fns/locale/fr';

// Données fictives pour les contacts
const contactsData = [
  {
    id: '1',
    name: 'Abdou Diop',
    email: 'abdou.diop@example.com',
    subject: 'Demande d\'information sur les programmes',
    message: 'Bonjour, je souhaiterais avoir plus d\'informations sur les programmes actuels du parti, notamment concernant l\'éducation et la formation professionnelle. Merci d\'avance pour votre réponse.',
    date: '2023-11-10',
    status: 'Non traité',
    category: 'Information',
  },
  {
    id: '2',
    name: 'Marie Sène',
    email: 'marie.sene@example.com',
    subject: 'Suggestion pour la prochaine assemblée',
    message: 'Je souhaite partager quelques suggestions pour la prochaine assemblée générale concernant les problématiques environnementales auxquelles notre région fait face. Serait-il possible d\'inclure ce sujet à l\'ordre du jour ?',
    date: '2023-11-08',
    status: 'Traité',
    category: 'Suggestion',
  },
  {
    id: '3',
    name: 'Ibrahim Ndiaye',
    email: 'ibrahim.ndiaye@example.com',
    subject: 'Question sur l\'adhésion au parti',
    message: 'Je suis intéressé pour rejoindre le parti et contribuer activement. Quelles sont les démarches à suivre pour une adhésion ? Y a-t-il des conditions particulières ? Merci pour votre aide.',
    date: '2023-11-05',
    status: 'En cours',
    category: 'Adhésion',
  },
  {
    id: '4',
    name: 'Aminata Fall',
    email: 'aminata.fall@example.com',
    subject: 'Problème avec le formulaire d\'adhésion',
    message: 'Bonjour, j\'ai rencontré un problème technique avec le formulaire d\'adhésion en ligne. Après avoir soumis mes informations, je n\'ai reçu aucune confirmation. Pourriez-vous vérifier si ma demande a bien été enregistrée ?',
    date: '2023-11-01',
    status: 'Traité',
    category: 'Problème technique',
  },
  {
    id: '5',
    name: 'Omar Sarr',
    email: 'omar.sarr@example.com',
    subject: 'Demande de rendez-vous',
    message: 'Je souhaiterais rencontrer un représentant du parti pour discuter d\'une possible collaboration sur un projet communautaire dans la région de Thiès. Serait-il possible d\'organiser un rendez-vous dans les prochaines semaines ?',
    date: '2023-10-28',
    status: 'En cours',
    category: 'Rendez-vous',
  },
  {
    id: '6',
    name: 'Fatou Diagne',
    email: 'fatou.diagne@example.com',
    subject: 'Félicitations pour votre engagement',
    message: 'Je tiens à vous féliciter pour votre engagement concernant l\'amélioration des infrastructures scolaires dans les zones rurales. Ce projet aura un impact significatif sur l\'éducation des jeunes de notre pays.',
    date: '2023-10-25',
    status: 'Traité',
    category: 'Autre',
  },
];

export default function AdminContacts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<typeof contactsData[0] | null>(null);
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

  const handleViewContact = (id: string) => {
    const contact = contactsData.find(c => c.id === id);
    if (contact) {
      setSelectedContact(contact);
      setViewDialogOpen(true);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = () => {
    // Logique de suppression à implémenter
    setDeleteDialogOpen(false);
    setAlertMessage('Le message a été supprimé avec succès.');
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
    setAlertMessage(`Le statut du message a été changé en "${newStatus}".`);
    setAlertSeverity('success');
    setShowAlert(true);
    
    // Fermer l'alerte après 5 secondes
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
    handleMenuClose();
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleCategoryFilterChange = (event: SelectChangeEvent) => {
    setCategoryFilter(event.target.value);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCategoryFilter('');
    setStartDate(null);
    setEndDate(null);
  };

  // Filtrer les données en fonction des filtres
  const filteredData = contactsData.filter((item) => {
    // Filtre par recherche (nom, email, sujet)
    if (searchTerm && 
        !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !item.email.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !item.subject.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtre par statut
    if (statusFilter && item.status !== statusFilter) return false;
    
    // Filtre par catégorie
    if (categoryFilter && item.category !== categoryFilter) return false;
    
    // Filtre par date de début
    if (startDate) {
      const contactDate = new Date(item.date);
      if (contactDate < startDate) return false;
    }
    
    // Filtre par date de fin
    if (endDate) {
      const contactDate = new Date(item.date);
      if (contactDate > endDate) return false;
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
          <Typography color="text.primary">Contacts</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Messages de contact
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
              placeholder="Rechercher un message..."
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

            {(searchTerm || statusFilter || categoryFilter || startDate || endDate) && (
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
                <MenuItem value="Non traité">Non traité</MenuItem>
                <MenuItem value="En cours">En cours</MenuItem>
                <MenuItem value="Traité">Traité</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: '150px' }}>
              <InputLabel id="category-filter-label">Catégorie</InputLabel>
              <Select
                labelId="category-filter-label"
                value={categoryFilter}
                label="Catégorie"
                onChange={handleCategoryFilterChange}
              >
                <MenuItem value="">Toutes</MenuItem>
                <MenuItem value="Information">Information</MenuItem>
                <MenuItem value="Suggestion">Suggestion</MenuItem>
                <MenuItem value="Adhésion">Adhésion</MenuItem>
                <MenuItem value="Problème technique">Problème technique</MenuItem>
                <MenuItem value="Rendez-vous">Rendez-vous</MenuItem>
                <MenuItem value="Autre">Autre</MenuItem>
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

      {/* Tableau des contacts */}
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
              <TableCell>Expéditeur</TableCell>
              <TableCell>Sujet</TableCell>
              <TableCell>Catégorie</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Statut</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Typography variant="body1" fontWeight={500}>
                    {row.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <EmailIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {row.email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ 
                    maxWidth: '300px', 
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {row.subject}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={row.category}
                    size="small"
                    icon={<LabelIcon fontSize="small" />}
                    variant="outlined"
                    sx={{ borderRadius: '4px' }}
                  />
                </TableCell>
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
                      row.status === 'Traité' 
                        ? 'success' 
                        : row.status === 'En cours' 
                          ? 'warning' 
                          : 'error'
                    }
                    sx={{
                      backgroundColor: row.status === 'Traité' 
                        ? 'rgba(46, 125, 50, 0.1)'
                        : row.status === 'En cours'
                          ? 'rgba(237, 108, 2, 0.1)'
                          : 'rgba(211, 47, 47, 0.1)',
                      color: row.status === 'Traité' 
                        ? 'success.main'
                        : row.status === 'En cours'
                          ? 'warning.main'
                          : 'error.main',
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <IconButton 
                    size="small" 
                    onClick={() => handleViewContact(row.id)}
                  >
                    <VisibilityIcon fontSize="small" />
                  </IconButton>
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
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1" color="text.secondary">
                    Aucun message ne correspond à vos critères de recherche.
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
        <MenuItem onClick={() => handleViewContact(selectedItem || '')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" />
          </ListItemIcon>
          Voir le message
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedItem || '', 'Traité')}>
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" color="success" />
          </ListItemIcon>
          Marquer comme traité
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange(selectedItem || '', 'En cours')}>
          <ListItemIcon>
            <VisibilityIcon fontSize="small" color="warning" />
          </ListItemIcon>
          Marquer en cours
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
            Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Annuler</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour afficher le message complet */}
      <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Message de {selectedContact?.name}
          <IconButton
            aria-label="close"
            onClick={() => setViewDialogOpen(false)}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" display="block" color="text.secondary">
              Expéditeur
            </Typography>
            <Typography variant="body1">
              {selectedContact?.name} ({selectedContact?.email})
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" display="block" color="text.secondary">
              Sujet
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              {selectedContact?.subject}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" display="block" color="text.secondary">
              Catégorie
            </Typography>
            <Chip
              label={selectedContact?.category}
              size="small"
              icon={<LabelIcon fontSize="small" />}
              variant="outlined"
            />
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" display="block" color="text.secondary">
              Date
            </Typography>
            <Typography variant="body1">
              {selectedContact && new Date(selectedContact.date).toLocaleDateString('fr-FR', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="overline" display="block" color="text.secondary">
              Message
            </Typography>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                backgroundColor: '#f9f9f9',
                borderRadius: 1,
                whiteSpace: 'pre-wrap'
              }}
            >
              <Typography variant="body1">
                {selectedContact?.message}
              </Typography>
            </Paper>
          </Box>
          
          <Box>
            <Typography variant="overline" display="block" color="text.secondary">
              Statut
            </Typography>
            <Chip
              label={selectedContact?.status}
              size="small"
              color={
                selectedContact?.status === 'Traité' 
                  ? 'success' 
                  : selectedContact?.status === 'En cours' 
                    ? 'warning' 
                    : 'error'
              }
              sx={{
                backgroundColor: selectedContact?.status === 'Traité' 
                  ? 'rgba(46, 125, 50, 0.1)'
                  : selectedContact?.status === 'En cours'
                    ? 'rgba(237, 108, 2, 0.1)'
                    : 'rgba(211, 47, 47, 0.1)',
                color: selectedContact?.status === 'Traité' 
                  ? 'success.main'
                  : selectedContact?.status === 'En cours'
                    ? 'warning.main'
                    : 'error.main',
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => {
              if (selectedContact) {
                handleStatusChange(selectedContact.id, 'Traité');
              }
              setViewDialogOpen(false);
            }} 
            color="primary"
          >
            Marquer comme traité
          </Button>
          <Button onClick={() => setViewDialogOpen(false)}>
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 