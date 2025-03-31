'use client';

import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Event as EventIcon,
  Article as ArticleIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import Link from 'next/link';

// Données de démonstration pour le tableau de bord
const dashboardData = {
  stats: [
    { title: 'Visiteurs', value: '12,543', change: '+15%', icon: <TrendingUpIcon color="primary" fontSize="large" /> },
    { title: 'Membres', value: '5,782', change: '+8%', icon: <PeopleIcon color="primary" fontSize="large" /> },
    { title: 'Événements', value: '24', change: '+3', icon: <EventIcon color="primary" fontSize="large" /> },
    { title: 'Actualités', value: '127', change: '+12', icon: <ArticleIcon color="primary" fontSize="large" /> },
  ],
  recentActivities: [
    { type: 'news', title: 'Nouvelle actualité publiée', time: 'Il y a 2 heures' },
    { type: 'event', title: 'Événement mis à jour', time: 'Il y a 5 heures' },
    { type: 'member', title: 'Nouvel administrateur ajouté', time: 'Hier' },
    { type: 'news', title: 'Actualité supprimée', time: 'Il y a 2 jours' },
  ],
  upcomingEvents: [
    { title: 'Réunion du bureau politique', date: '15 Avril 2023', location: 'Dakar' },
    { title: 'Conférence de presse', date: '18 Avril 2023', location: 'Thiès' },
    { title: 'Visite de terrain', date: '25 Avril 2023', location: 'Saint-Louis' },
  ]
};

export default function AdminDashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Tableau de bord
      </Typography>

      {/* Statistiques */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {dashboardData.stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '4px',
                  width: '100%',
                  backgroundColor: 'primary.main',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                    {stat.change}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'rgba(139, 69, 19, 0.08)',
                    borderRadius: '50%',
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {stat.icon}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Activités récentes */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">
                Activités récentes
              </Typography>
              <Button variant="text" size="small">
                Voir tout
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List sx={{ width: '100%' }}>
              {dashboardData.recentActivities.map((activity, index) => (
                <ListItem
                  key={index}
                  alignItems="flex-start"
                  sx={{ px: 0, py: 1.5, borderBottom: index !== dashboardData.recentActivities.length - 1 ? '1px solid rgba(0, 0, 0, 0.06)' : 'none' }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor:
                          activity.type === 'news'
                            ? 'primary.main'
                            : activity.type === 'event'
                            ? 'secondary.main'
                            : 'success.main',
                      }}
                    >
                      {activity.type === 'news' ? (
                        <ArticleIcon />
                      ) : activity.type === 'event' ? (
                        <EventIcon />
                      ) : (
                        <PeopleIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={activity.title}
                    secondary={activity.time}
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ variant: 'caption' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Événements à venir */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
              height: '100%',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="medium">
                Événements à venir
              </Typography>
              <Link href="/admin/evenements" passHref style={{ textDecoration: 'none' }}>
                <Button variant="text" size="small">
                  Gérer les événements
                </Button>
              </Link>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              {dashboardData.upcomingEvents.map((event, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    },
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                      {event.title}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <EventIcon fontSize="small" color="primary" />
                        <Typography variant="body2" color="text.secondary">
                          {event.date}
                        </Typography>
                      </Stack>
                      <Chip label={event.location} size="small" />
                    </Box>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button size="small">Voir les détails</Button>
                    <Button size="small" color="primary">
                      Modifier
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 