'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Breadcrumbs,
  Tabs,
  Tab,
  Divider,
  Grid,
  FormControl,
  FormControlLabel,
  Switch,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Collapse,
  Alert,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Save as SaveIcon,
  Upload as UploadIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import Link from 'next/link';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

// Exemple de données pour les utilisateurs
const users = [
  {
    id: 1,
    name: 'Admin Principal',
    email: 'admin@apr-senegal.com',
    role: 'Administrateur',
    lastLogin: '2023-11-20 14:30',
    avatar: '/images/users/admin.jpg',
  },
  {
    id: 2,
    name: 'Modérateur Contenu',
    email: 'moderateur@apr-senegal.com',
    role: 'Modérateur',
    lastLogin: '2023-11-19 09:15',
    avatar: '/images/users/mod.jpg',
  },
  {
    id: 3,
    name: 'Rédacteur Web',
    email: 'redacteur@apr-senegal.com',
    role: 'Rédacteur',
    lastLogin: '2023-11-18 16:45',
    avatar: '/images/users/writer.jpg',
  },
];

export default function AdminSettings() {
  const [tabValue, setTabValue] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  
  // États pour les paramètres généraux
  const [siteName, setSiteName] = useState('APR Sénégal');
  const [siteDescription, setSiteDescription] = useState('Site officiel de l\'Alliance Pour la République du Sénégal');
  const [contactEmail, setContactEmail] = useState('contact@apr-senegal.com');
  const [contactPhone, setContactPhone] = useState('+221 33 123 45 67');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [language, setLanguage] = useState('fr');
  
  // États pour les paramètres de sécurité
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [passwordPolicy, setPasswordPolicy] = useState('medium');
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  // État pour la gestion des utilisateurs
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  const showSuccessAlert = (message: string) => {
    setAlertType('success');
    setAlertMessage(message);
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  
  const showErrorAlert = (message: string) => {
    setAlertType('error');
    setAlertMessage(message);
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  
  const handleSaveGeneral = () => {
    // Logique pour sauvegarder les paramètres généraux
    showSuccessAlert('Les paramètres généraux ont été enregistrés avec succès.');
  };
  
  const handleSaveSecurity = () => {
    // Logique pour sauvegarder les paramètres de sécurité
    showSuccessAlert('Les paramètres de sécurité ont été enregistrés avec succès.');
  };
  
  const handleAddUser = () => {
    setUserDialogOpen(true);
  };
  
  const handleCloseUserDialog = () => {
    setUserDialogOpen(false);
  };
  
  const handleSubmitUser = () => {
    // Logique pour ajouter un utilisateur
    showSuccessAlert('L\'utilisateur a été ajouté avec succès.');
    setUserDialogOpen(false);
  };
  
  const handleDeleteUserRequest = (userId: number) => {
    setUserToDelete(userId);
    setDeleteUserDialogOpen(true);
  };
  
  const handleDeleteUserCancel = () => {
    setUserToDelete(null);
    setDeleteUserDialogOpen(false);
  };
  
  const handleDeleteUserConfirm = () => {
    // Logique pour supprimer l'utilisateur
    showSuccessAlert('L\'utilisateur a été supprimé avec succès.');
    setDeleteUserDialogOpen(false);
    setUserToDelete(null);
  };
  
  return (
    <Box>
      {/* Alerte de confirmation */}
      <Collapse in={showAlert}>
        <Alert 
          severity={alertType} 
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
          <Typography color="text.primary">Paramètres</Typography>
        </Breadcrumbs>
        <Typography variant="h4" fontWeight="bold">
          Paramètres du site
        </Typography>
      </Box>
      
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            sx={{ px: 2, pt: 2 }}
          >
            <Tab label="Général" {...a11yProps(0)} />
            <Tab label="Sécurité" {...a11yProps(1)} />
            <Tab label="Utilisateurs" {...a11yProps(2)} />
            <Tab label="API" {...a11yProps(3)} />
          </Tabs>
        </Box>
        
        {/* Onglet Général */}
        <TabPanel value={tabValue} index={0}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h6" gutterBottom>
              Informations du site
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Nom du site"
                  fullWidth
                  variant="outlined"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  margin="normal"
                />
                
                <TextField
                  label="Description du site"
                  fullWidth
                  variant="outlined"
                  value={siteDescription}
                  onChange={(e) => setSiteDescription(e.target.value)}
                  margin="normal"
                  multiline
                  rows={3}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email de contact"
                  fullWidth
                  variant="outlined"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  margin="normal"
                />
                
                <TextField
                  label="Téléphone de contact"
                  fullWidth
                  variant="outlined"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  margin="normal"
                />
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="language-label">Langue par défaut</InputLabel>
                  <Select
                    labelId="language-label"
                    value={language}
                    label="Langue par défaut"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="en">Anglais</MenuItem>
                    <MenuItem value="wo">Wolof</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Configuration avancée
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Activer le mode maintenance"
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Lorsque le mode maintenance est activé, seuls les administrateurs peuvent accéder au site.
                </Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveGeneral}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Enregistrer les modifications
              </Button>
            </Box>
          </Box>
        </TabPanel>
        
        {/* Onglet Sécurité */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h6" gutterBottom>
              Paramètres de sécurité
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={twoFactorAuth}
                      onChange={(e) => setTwoFactorAuth(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Authentification à deux facteurs"
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 3 }}>
                  Renforce la sécurité des comptes utilisateurs en exigeant une vérification supplémentaire lors de la connexion.
                </Typography>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Notifications de connexion par email"
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 3 }}>
                  Envoie un email à l'utilisateur chaque fois qu'une connexion est effectuée sur son compte.
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="session-timeout-label">Délai d'expiration de session</InputLabel>
                  <Select
                    labelId="session-timeout-label"
                    value={sessionTimeout}
                    label="Délai d'expiration de session"
                    onChange={(e) => setSessionTimeout(e.target.value)}
                  >
                    <MenuItem value="15">15 minutes</MenuItem>
                    <MenuItem value="30">30 minutes</MenuItem>
                    <MenuItem value="60">1 heure</MenuItem>
                    <MenuItem value="120">2 heures</MenuItem>
                  </Select>
                </FormControl>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Détermine le temps d'inactivité après lequel un utilisateur est automatiquement déconnecté.
                </Typography>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="password-policy-label">Politique de mot de passe</InputLabel>
                  <Select
                    labelId="password-policy-label"
                    value={passwordPolicy}
                    label="Politique de mot de passe"
                    onChange={(e) => setPasswordPolicy(e.target.value)}
                  >
                    <MenuItem value="low">Basique (min. 6 caractères)</MenuItem>
                    <MenuItem value="medium">Intermédiaire (min. 8 caractères, lettres et chiffres)</MenuItem>
                    <MenuItem value="high">Élevée (min. 10 caractères, lettres, chiffres et caractères spéciaux)</MenuItem>
                  </Select>
                </FormControl>
                
                <Typography variant="body2" color="text.secondary">
                  Définit les exigences minimales pour les mots de passe des utilisateurs.
                </Typography>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSaveSecurity}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Enregistrer les modifications
              </Button>
            </Box>
          </Box>
        </TabPanel>
        
        {/* Onglet Utilisateurs */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ px: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Gestion des utilisateurs
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddUser}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Ajouter un utilisateur
              </Button>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <List>
              {users.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{
                    mb: 2,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={user.avatar} alt={user.name} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2">
                          {user.email}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.secondary">
                          Dernière connexion: {user.lastLogin}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <Chip
                    label={user.role}
                    size="small"
                    color={user.role === 'Administrateur' ? 'primary' : user.role === 'Modérateur' ? 'secondary' : 'default'}
                    sx={{ mr: 2 }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="edit" href={`/admin/parametres/utilisateurs/${user.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteUserRequest(user.id)} sx={{ ml: 1 }}>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </TabPanel>
        
        {/* Onglet API */}
        <TabPanel value={tabValue} index={3}>
          <Box sx={{ px: 3 }}>
            <Typography variant="h6" gutterBottom>
              Configuration de l'API
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Clé API"
                  fullWidth
                  variant="outlined"
                  value="api_3f9a8w7e6r5t4y3u2i1o0p9o8i7u6y5t4r3e2w1q"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end">
                          <VisibilityIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  margin="normal"
                />
                
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    Régénérer la clé
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<SaveIcon />}
                    sx={{ borderRadius: 2, textTransform: 'none' }}
                  >
                    Copier la clé
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Limites d'accès
                </Typography>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="api-rate-limit-label">Limite de requêtes</InputLabel>
                  <Select
                    labelId="api-rate-limit-label"
                    value="1000"
                    label="Limite de requêtes"
                  >
                    <MenuItem value="100">100 requêtes / minute</MenuItem>
                    <MenuItem value="500">500 requêtes / minute</MenuItem>
                    <MenuItem value="1000">1000 requêtes / minute</MenuItem>
                    <MenuItem value="unlimited">Illimité</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControlLabel
                  control={<Switch defaultChecked color="primary" />}
                  label="Activer la journalisation des requêtes API"
                  sx={{ mt: 2 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                  Domaines autorisés
                </Typography>
                <TextField
                  label="Domaines autorisés (séparés par des virgules)"
                  fullWidth
                  variant="outlined"
                  defaultValue="apr-senegal.com, apr-senegal.org"
                  margin="normal"
                  helperText="Laissez vide pour autoriser tous les domaines"
                />
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => showSuccessAlert('Les paramètres API ont été enregistrés avec succès.')}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Enregistrer les modifications
              </Button>
            </Box>
          </Box>
        </TabPanel>
      </Paper>
      
      {/* Dialog pour ajouter un utilisateur */}
      <Dialog open={userDialogOpen} onClose={handleCloseUserDialog}>
        <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom complet"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="email"
            label="Adresse email"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            fullWidth
            variant="outlined"
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="user-role-label">Rôle</InputLabel>
            <Select
              labelId="user-role-label"
              id="user-role"
              label="Rôle"
              defaultValue="Rédacteur"
            >
              <MenuItem value="Administrateur">Administrateur</MenuItem>
              <MenuItem value="Modérateur">Modérateur</MenuItem>
              <MenuItem value="Rédacteur">Rédacteur</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUserDialog}>Annuler</Button>
          <Button onClick={handleSubmitUser} variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>
      
      {/* Dialog pour supprimer un utilisateur */}
      <Dialog
        open={deleteUserDialogOpen}
        onClose={handleDeleteUserCancel}
      >
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteUserCancel}>Annuler</Button>
          <Button onClick={handleDeleteUserConfirm} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 