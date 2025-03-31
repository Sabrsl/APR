'use client';

import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
  Breadcrumbs,
  Stack,
  Switch,
  FormControlLabel,
  Alert,
  Divider,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Group as GroupIcon,
  Folder as FolderIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from '@mui/icons-material';
import Link from 'next/link';

// Interface pour faciliter le typage
interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface Resource {
  title: string;
  type: string;
  url: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

export default function NewProgramPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Actif');
  const [priority, setPriority] = useState('Moyenne');
  const [isPublished, setIsPublished] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  
  // États pour les sections additionnelles
  const [about, setAbout] = useState('');
  const [objectives, setObjectives] = useState<string[]>([]);
  const [newObjective, setNewObjective] = useState('');
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [activeTab, setActiveTab] = useState(0);
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Gestion des onglets
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Gestion des objectifs
  const handleAddObjective = () => {
    if (newObjective.trim() !== '') {
      setObjectives([...objectives, newObjective.trim()]);
      setNewObjective('');
    }
  };

  const handleRemoveObjective = (index: number) => {
    const newObjectives = [...objectives];
    newObjectives.splice(index, 1);
    setObjectives(newObjectives);
  };

  // Gestion de l'équipe
  const handleAddTeamMember = () => {
    const newMember: TeamMember = {
      name: '',
      role: '',
      image: '/images/team/default.jpg'
    };
    setTeam([...team, newMember]);
  };

  const handleUpdateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    const newTeam = [...team];
    newTeam[index][field] = value;
    setTeam(newTeam);
  };

  const handleRemoveTeamMember = (index: number) => {
    const newTeam = [...team];
    newTeam.splice(index, 1);
    setTeam(newTeam);
  };

  // Gestion des ressources
  const handleAddResource = () => {
    const newResource: Resource = {
      title: '',
      type: 'Document',
      url: '#'
    };
    setResources([...resources, newResource]);
  };

  const handleUpdateResource = (index: number, field: keyof Resource, value: string) => {
    const newResources = [...resources];
    newResources[index][field] = value;
    setResources(newResources);
  };

  const handleRemoveResource = (index: number) => {
    const newResources = [...resources];
    newResources.splice(index, 1);
    setResources(newResources);
  };

  // Gestion de la FAQ
  const handleAddFaqItem = () => {
    const newFaqItem: FaqItem = {
      question: '',
      answer: ''
    };
    setFaq([...faq, newFaqItem]);
  };

  const handleUpdateFaqItem = (index: number, field: keyof FaqItem, value: string) => {
    const newFaq = [...faq];
    newFaq[index][field] = value;
    setFaq(newFaq);
  };

  const handleRemoveFaqItem = (index: number) => {
    const newFaq = [...faq];
    newFaq.splice(index, 1);
    setFaq(newFaq);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation du formulaire
    if (!title || !description || !category) {
      setAlertMessage('Veuillez remplir tous les champs obligatoires.');
      setAlertSeverity('error');
      setShowAlert(true);
      return;
    }
    
    // Dans une application réelle, vous enverriez les données à votre backend
    console.log({
      title,
      description,
      category,
      status,
      priority,
      isPublished,
      image,
      about,
      objectives,
      team,
      resources,
      faq
    });
    
    // Afficher un message de succès
    setAlertMessage('Programme créé avec succès !');
    setAlertSeverity('success');
    setShowAlert(true);
    
    // Réinitialiser le formulaire après soumission (dans une vraie application, vous pourriez rediriger vers la liste des programmes)
    setTimeout(() => {
      setShowAlert(false);
      // Vous pourriez utiliser router.push('/admin/programmes') ici
    }, 3000);
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
          <Link href="/admin" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Dashboard
          </Link>
          <Link href="/admin/programmes" style={{ textDecoration: 'none', color: 'text.secondary' }}>
            Programmes
          </Link>
          <Typography color="text.primary">Nouveau programme</Typography>
        </Breadcrumbs>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" fontWeight="bold">
            Créer un nouveau programme
          </Typography>
          <Link href="/admin/programmes" passHref>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              Retour
            </Button>
          </Link>
        </Box>
      </Box>

      {showAlert && (
        <Alert 
          severity={alertSeverity} 
          sx={{ mb: 3, borderRadius: 2 }}
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      )}

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
          mb: 4,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="program edit tabs">
            <Tab label="Informations générales" />
            <Tab label="À propos" />
            <Tab label="Objectifs" />
            <Tab label="Équipe" />
            <Tab label="Ressources" />
            <Tab label="FAQ" />
          </Tabs>
        </Box>

        <form onSubmit={handleSubmit}>
          {/* Onglet 1: Informations générales */}
          {activeTab === 0 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
                    Informations générales
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Titre du programme"
                    variant="outlined"
                    fullWidth
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    required
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="category-label">Catégorie</InputLabel>
                    <Select
                      labelId="category-label"
                      value={category}
                      label="Catégorie"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <MenuItem value="Agriculture">Agriculture</MenuItem>
                      <MenuItem value="Éducation">Éducation</MenuItem>
                      <MenuItem value="Santé">Santé</MenuItem>
                      <MenuItem value="Infrastructure">Infrastructure</MenuItem>
                      <MenuItem value="Énergie">Énergie</MenuItem>
                      <MenuItem value="Emploi">Emploi</MenuItem>
                      <MenuItem value="Environnement">Environnement</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Statut</InputLabel>
                    <Select
                      labelId="status-label"
                      value={status}
                      label="Statut"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="Actif">Actif</MenuItem>
                      <MenuItem value="En préparation">En préparation</MenuItem>
                      <MenuItem value="En pause">En pause</MenuItem>
                      <MenuItem value="Terminé">Terminé</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel id="priority-label">Priorité</InputLabel>
                    <Select
                      labelId="priority-label"
                      value={priority}
                      label="Priorité"
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <MenuItem value="Haute">Haute</MenuItem>
                      <MenuItem value="Moyenne">Moyenne</MenuItem>
                      <MenuItem value="Basse">Basse</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch 
                        checked={isPublished} 
                        onChange={(e) => setIsPublished(e.target.checked)} 
                        color="primary" 
                      />
                    }
                    label="Publier sur le site"
                  />
                  <FormHelperText>
                    Si activé, le programme sera visible sur le site public.
                  </FormHelperText>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="medium" sx={{ mt: 2, mb: 2 }}>
                    Image du programme
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                </Grid>
                
                <Grid item xs={12}>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  
                  {!imagePreview ? (
                    <Box
                      sx={{
                        border: '2px dashed',
                        borderColor: 'divider',
                        borderRadius: 2,
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: 'primary.main',
                          backgroundColor: 'rgba(139, 69, 19, 0.04)',
                        },
                      }}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <CloudUploadIcon fontSize="large" color="primary" />
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        Cliquez pour télécharger une image
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Format accepté : JPG, PNG, GIF (max. 5 MB)
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ position: 'relative', width: '100%', maxWidth: 400 }}>
                      <img
                        src={imagePreview}
                        alt="Prévisualisation"
                        style={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: 300,
                          objectFit: 'cover',
                          borderRadius: 8,
                        }}
                      />
                      <IconButton
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          },
                        }}
                        onClick={handleImageDelete}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Onglet 2: À propos */}
          {activeTab === 1 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
                    À propos du programme
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Décrivez en détail votre programme, ses objectifs, sa vision et son impact attendu.
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="À propos du programme"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={10}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    placeholder="Notre programme est axé sur..."
                  />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Onglet 3: Objectifs */}
          {activeTab === 2 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
                    Objectifs du programme
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Listez les objectifs principaux que votre programme vise à atteindre.
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <TextField
                      label="Nouvel objectif"
                      variant="outlined"
                      fullWidth
                      value={newObjective}
                      onChange={(e) => setNewObjective(e.target.value)}
                      placeholder="Exemple: Améliorer l'accès à l'éducation"
                    />
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddObjective}
                      sx={{ ml: 2, minWidth: '120px' }}
                    >
                      Ajouter
                    </Button>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <List>
                    {objectives.map((objective, index) => (
                      <ListItem
                        key={index}
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveObjective(index)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={objective} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Onglet 4: Équipe */}
          {activeTab === 3 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="medium">
                    Équipe du programme
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddTeamMember}
                  >
                    Ajouter un membre
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Ajoutez les membres clés de l'équipe responsable de ce programme.
                  </Typography>
                </Grid>
                
                {team.map((member, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        border: '1px solid',
                        borderColor: 'divider',
                        mb: 2 
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Nom et prénom"
                            variant="outlined"
                            fullWidth
                            value={member.name}
                            onChange={(e) => handleUpdateTeamMember(index, 'name', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Fonction"
                            variant="outlined"
                            fullWidth
                            value={member.role}
                            onChange={(e) => handleUpdateTeamMember(index, 'role', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="URL de la photo"
                            variant="outlined"
                            fullWidth
                            value={member.image}
                            onChange={(e) => handleUpdateTeamMember(index, 'image', e.target.value)}
                            helperText="Entrez l'URL de l'image ou laissez la valeur par défaut"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                          <Button 
                            variant="outlined" 
                            color="error" 
                            startIcon={<DeleteIcon />}
                            onClick={() => handleRemoveTeamMember(index)}
                          >
                            Supprimer
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
                
                {team.length === 0 && (
                  <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                    <GroupIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography color="text.secondary">
                      Aucun membre d'équipe ajouté. Cliquez sur "Ajouter un membre" pour commencer.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}

          {/* Onglet 5: Ressources */}
          {activeTab === 4 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="medium">
                    Ressources
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddResource}
                  >
                    Ajouter une ressource
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Ajoutez des ressources utiles liées au programme (documents, vidéos, liens, etc.).
                  </Typography>
                </Grid>
                
                {resources.map((resource, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        border: '1px solid',
                        borderColor: 'divider',
                        mb: 2 
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Titre de la ressource"
                            variant="outlined"
                            fullWidth
                            value={resource.title}
                            onChange={(e) => handleUpdateResource(index, 'title', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel>Type de ressource</InputLabel>
                            <Select
                              value={resource.type}
                              label="Type de ressource"
                              onChange={(e) => handleUpdateResource(index, 'type', e.target.value)}
                            >
                              <MenuItem value="PDF">PDF</MenuItem>
                              <MenuItem value="Vidéo">Vidéo</MenuItem>
                              <MenuItem value="Document">Document</MenuItem>
                              <MenuItem value="Lien">Lien externe</MenuItem>
                              <MenuItem value="Image">Image</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="URL de la ressource"
                            variant="outlined"
                            fullWidth
                            value={resource.url}
                            onChange={(e) => handleUpdateResource(index, 'url', e.target.value)}
                            helperText="Lien vers la ressource"
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                          <Button 
                            variant="outlined" 
                            color="error" 
                            startIcon={<DeleteIcon />}
                            onClick={() => handleRemoveResource(index)}
                          >
                            Supprimer
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
                
                {resources.length === 0 && (
                  <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                    <FolderIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography color="text.secondary">
                      Aucune ressource ajoutée. Cliquez sur "Ajouter une ressource" pour commencer.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}

          {/* Onglet 6: FAQ */}
          {activeTab === 5 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" fontWeight="medium">
                    Foire aux questions (FAQ)
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddFaqItem}
                  >
                    Ajouter une question
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mb: 3 }} />
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Ajoutez les questions fréquemment posées et leurs réponses à propos de ce programme.
                  </Typography>
                </Grid>
                
                {faq.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        borderRadius: 2, 
                        border: '1px solid',
                        borderColor: 'divider',
                        mb: 2 
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Question"
                            variant="outlined"
                            fullWidth
                            value={item.question}
                            onChange={(e) => handleUpdateFaqItem(index, 'question', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Réponse"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={item.answer}
                            onChange={(e) => handleUpdateFaqItem(index, 'answer', e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                          <Button 
                            variant="outlined" 
                            color="error" 
                            startIcon={<DeleteIcon />}
                            onClick={() => handleRemoveFaqItem(index)}
                          >
                            Supprimer
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
                
                {faq.length === 0 && (
                  <Grid item xs={12} sx={{ textAlign: 'center', py: 4 }}>
                    <QuestionAnswerIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography color="text.secondary">
                      Aucune question ajoutée. Cliquez sur "Ajouter une question" pour commencer.
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}

          {/* Boutons d'actions (présents dans tous les onglets) */}
          <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Link href="/admin/programmes" passHref>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: 2, textTransform: 'none' }}
                >
                  Annuler
                </Button>
              </Link>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Enregistrer
              </Button>
            </Stack>
          </Box>
        </form>
      </Paper>
    </Box>
  );
} 