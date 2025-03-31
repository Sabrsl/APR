'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ThemeProvider,
  createTheme,
  Paper,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  Chip,
  useMediaQuery,
  Fade,
  IconButton,
  Stack,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FixedJoinButton from '@/components/FixedJoinButton';

// Définition du thème personnalisé avec les couleurs marron
const theme = createTheme({
  palette: {
    primary: {
      light: '#A0522D',
      main: '#8B4513',
      dark: '#654321',
      contrastText: '#fff',
    },
    secondary: {
      light: '#D2691E',
      main: '#CD853F',
      dark: '#8B4513',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff',
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 16px',
          textTransform: 'none',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(139, 69, 19, 0.2)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#654321',
          },
        },
        outlinedPrimary: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '24px 0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        outlinedPrimary: {
          borderWidth: '1.5px',
        },
      },
    },
  },
});

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(rgba(139, 69, 19, 0.85), rgba(139, 69, 19, 0.95)), url('https://via.placeholder.com/1920x600/8B4513/FFFFFF?text=Article') no-repeat center center`,
  backgroundSize: 'cover',
  color: 'white',
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(6),
  borderRadius: theme.shape.borderRadius,
  position: 'relative',
}));

const BreadcrumbLink = styled(Link)({
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.05)',
}));

const ContentImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
}));

const ArticleContent = styled(Box)(({ theme }) => ({
  '& p': {
    fontSize: '1.1rem',
    lineHeight: 1.7,
    marginBottom: theme.spacing(3),
  },
  '& h2': {
    fontSize: '1.75rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  '& h3': {
    fontSize: '1.4rem',
    fontWeight: 600,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  '& ul, & ol': {
    paddingLeft: theme.spacing(3),
    marginBottom: theme.spacing(3),
    '& li': {
      marginBottom: theme.spacing(1),
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
  },
  '& a': {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 500,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

const QuoteBlock = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(139, 69, 19, 0.05)',
  borderLeft: `4px solid ${theme.palette.primary.main}`,
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: `0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0`,
}));

const AuthorCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  border: '1px solid rgba(139, 69, 19, 0.1)',
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(139, 69, 19, 0.08)',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    transform: 'translateY(-3px)',
    boxShadow: '0 4px 8px rgba(139, 69, 19, 0.3)',
  },
}));

const RelatedArticleImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 140,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}));

const RelatedArticleTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 1.4,
  maxHeight: '2.8em',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  marginBottom: theme.spacing(1),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
}));

const ArticleTag = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  '&:hover': {
    borderColor: theme.palette.primary.dark,
  },
}));

const MetaInfoBox = styled(Box)(({ theme }) => ({
  display: 'flex', 
  alignItems: 'center', 
  backgroundColor: 'rgba(139, 69, 19, 0.03)',
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(3),
  marginRight: theme.spacing(2),
}));

interface ArticleItem {
  id: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
  image: string;
  date: string;
  readTime: string;
  author: string;
  authorTitle: string;
  authorImage: string;
  category: string;
  views: number;
  tags: string[];
  relatedArticles: {
    id: string;
    title: string;
    image: string;
    date: string;
  }[];
}

// Données d'exemple pour l'article
const articleData: ArticleItem = {
  id: '1',
  title: 'Les piliers du développement économique au Sénégal',
  subtitle: 'Une analyse des facteurs clés pour la croissance durable',
  image: 'https://via.placeholder.com/1200x600/8B4513/FFFFFF?text=Economie',
  date: '20 septembre 2023',
  readTime: '8 min',
  author: 'Dr. Mamadou Ndiaye',
  authorTitle: 'Économiste et Conseiller politique',
  authorImage: 'https://via.placeholder.com/150',
  category: 'Économie',
  views: 1240,
  tags: ['Économie', 'Développement', 'Croissance', 'Agriculture'],
  content: (
    <ArticleContent>
      <p>
        Le développement économique du Sénégal repose sur plusieurs piliers fondamentaux qui constituent le socle d'une croissance durable et inclusive. Comprendre ces piliers est essentiel pour élaborer des politiques économiques efficaces et adaptées aux réalités du pays.
      </p>
      
      <h2>L'agriculture : fondement de l'économie sénégalaise</h2>
      <p>
        L'agriculture demeure un secteur clé de l'économie sénégalaise, employant près de 60% de la population active et contribuant significativement au PIB. La diversification des cultures, l'irrigation moderne et la transformation locale des produits agricoles constituent des leviers essentiels pour accroître la productivité et la valeur ajoutée de ce secteur.
      </p>
      
      <ContentImage
        src="https://via.placeholder.com/1000x500/8B4513/FFFFFF?text=Agriculture+Senegalaise"
        alt="Agriculture sénégalaise"
      />
      
      <p>
        Les initiatives récentes de mécanisation et d'introduction de techniques agricoles innovantes ont permis d'augmenter les rendements dans plusieurs régions. Cependant, les défis liés au changement climatique et à l'accès aux financements restent des obstacles majeurs à surmonter.
      </p>
      
      <QuoteBlock>
        <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <FormatQuoteIcon sx={{ mr: 1, transform: 'rotate(180deg)', color: 'primary.main' }} />
          L'agriculture sénégalaise doit se réinventer pour faire face aux défis climatiques tout en garantissant la sécurité alimentaire nationale.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          — Rapport du Ministère de l'Agriculture, 2022
        </Typography>
      </QuoteBlock>
      
      <h2>Le secteur des services : un levier de croissance</h2>
      <p>
        Le secteur des services, particulièrement les technologies de l'information et de la communication (TIC), le tourisme et les services financiers, connaît une expansion rapide et contribue de manière croissante à l'économie nationale.
      </p>
      
      <p>
        Les innovations dans le domaine de la fintech ont révolutionné l'accès aux services financiers, notamment dans les zones rurales. La digitalisation des services administratifs et commerciaux a également permis de réduire les coûts de transaction et d'améliorer l'efficacité globale de l'économie.
      </p>
      
      <h3>Tableau : Contribution des différents secteurs au PIB (2022)</h3>
      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'rgba(139, 69, 19, 0.1)' }}>
            <TableRow>
              <TableCell><strong>Secteur</strong></TableCell>
              <TableCell align="right"><strong>Contribution au PIB (%)</strong></TableCell>
              <TableCell align="right"><strong>Croissance annuelle (%)</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Agriculture</TableCell>
              <TableCell align="right">15.8</TableCell>
              <TableCell align="right">3.2</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Industrie</TableCell>
              <TableCell align="right">23.5</TableCell>
              <TableCell align="right">5.1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Services</TableCell>
              <TableCell align="right">52.4</TableCell>
              <TableCell align="right">6.3</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Autres</TableCell>
              <TableCell align="right">8.3</TableCell>
              <TableCell align="right">2.7</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <h2>Le capital humain : investir dans l'avenir</h2>
      <p>
        Le développement du capital humain à travers l'éducation, la formation professionnelle et l'amélioration des conditions de santé constitue un pilier essentiel pour une croissance économique soutenue et inclusive.
      </p>
      
      <p>
        Les récentes réformes du système éducatif visent à mieux aligner les compétences des diplômés avec les besoins du marché du travail. L'accent mis sur l'enseignement technique et professionnel est une approche prometteuse pour réduire le chômage des jeunes et stimuler la productivité globale.
      </p>
      
      <h2>La gouvernance économique : un cadre propice aux affaires</h2>
      <p>
        L'amélioration de la gouvernance économique, notamment à travers la lutte contre la corruption, la simplification des procédures administratives et la protection des droits de propriété, est fondamentale pour attirer les investissements et stimuler l'entrepreneuriat local.
      </p>
      
      <p>
        Les efforts récents de digitalisation de l'administration publique et de renforcement de la transparence dans la gestion des ressources publiques ont contribué à améliorer l'environnement des affaires au Sénégal.
      </p>
      
      <h2>Conclusion : vers un modèle de développement intégré</h2>
      <p>
        Le développement économique du Sénégal nécessite une approche intégrée qui combine la modernisation de l'agriculture, l'expansion du secteur des services, l'investissement dans le capital humain et l'amélioration de la gouvernance économique.
      </p>
      
      <p>
        Les politiques publiques doivent viser à créer des synergies entre ces différents piliers et à promouvoir un modèle de croissance inclusif qui profite à l'ensemble de la population, particulièrement aux communautés rurales et aux jeunes qui constituent la majorité démographique du pays.
      </p>
    </ArticleContent>
  ),
  relatedArticles: [
    {
      id: '2',
      title: 'Innovation agricole au Sénégal : enjeux et perspectives',
      image: 'https://via.placeholder.com/400x200/8B4513/FFFFFF?text=Innovation',
      date: '15 septembre 2023'
    },
    {
      id: '3',
      title: 'Fintech et inclusion financière : la révolution silencieuse',
      image: 'https://via.placeholder.com/400x200/8B4513/FFFFFF?text=Fintech',
      date: '10 septembre 2023'
    },
    {
      id: '4',
      title: 'Formation professionnelle : adapter l\'éducation aux besoins du marché',
      image: 'https://via.placeholder.com/400x200/8B4513/FFFFFF?text=Formation',
      date: '5 septembre 2023'
    }
  ]
};

interface PageParams {
  params: {
    id: string;
  };
}

export default function ArticleDetailPage({ params }: PageParams) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const article = articleData; // Dans une vraie app, vous récupéreriez l'article par son ID

  if (!article) {
    return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography variant="h4" align="center" color="error">
            Article non trouvé
          </Typography>
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              href="/actualites"
            >
              Retour aux actualités
            </Button>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh', pb: { xs: 8, sm: 6 } }}>
        {/* Fil d'Ariane */}
        <Container maxWidth="lg" sx={{ pt: 3 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            <BreadcrumbLink href="/" passHref legacyBehavior>
              <MuiLink color="inherit">Accueil</MuiLink>
            </BreadcrumbLink>
            <BreadcrumbLink href="/actualites" passHref legacyBehavior>
              <MuiLink color="inherit">Actualités</MuiLink>
            </BreadcrumbLink>
            <Typography color="text.primary">{article.title}</Typography>
          </Breadcrumbs>
        </Container>

        {/* Section Héro */}
        <Container maxWidth="lg">
          <Fade in={true} timeout={800}>
            <HeroSection>
              <Container>
                <Grid container spacing={4} alignItems="center">
                  <Grid item xs={12} md={9} lg={8}>
                    <Box sx={{ position: 'relative' }}>
                      <Typography variant={isMobile ? 'h4' : 'h3'} gutterBottom>
                        {article.title}
                      </Typography>
                      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'normal', opacity: 0.9 }}>
                        {article.subtitle}
                      </Typography>
                      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.3)', width: '80px', height: '3px', borderRadius: '2px', mb: 3 }} />
                      <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mt: 4 }}>
                        <CategoryChip
                          label={article.category}
                          size="small"
                          icon={<CategoryIcon />}
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarTodayIcon sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{article.date}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <AccessTimeIcon sx={{ mr: 1, fontSize: 20 }} />
                          <Typography variant="body2">{article.readTime} de lecture</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3} lg={4} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                    <Box>
                      <Button
                        variant="outlined"
                        startIcon={<ShareIcon />}
                        sx={{ 
                          borderColor: 'white', 
                          color: 'white', 
                          mr: 2,
                          '&:hover': { 
                            borderColor: 'white', 
                            bgcolor: 'rgba(255,255,255,0.1)' 
                          } 
                        }}
                      >
                        Partager
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<BookmarkBorderIcon />}
                        sx={{ 
                          borderColor: 'white', 
                          color: 'white',
                          '&:hover': { 
                            borderColor: 'white', 
                            bgcolor: 'rgba(255,255,255,0.1)' 
                          } 
                        }}
                      >
                        Sauvegarder
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Container>
            </HeroSection>
          </Fade>
        </Container>

        {/* Contenu principal */}
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Article principal */}
            <Grid item xs={12} md={8}>
              <StyledPaper>
                <ContentImage
                  src={article.image}
                  alt={article.title}
                />
                
                {/* Méta-informations */}
                <Box 
                  sx={{ 
                    display: 'flex', 
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 4
                  }}
                >
                  <MetaInfoBox>
                    <VisibilityIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {article.views.toLocaleString()} lectures
                    </Typography>
                  </MetaInfoBox>
                  <MetaInfoBox>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {article.readTime} de lecture
                    </Typography>
                  </MetaInfoBox>
                </Box>
                
                {/* Contenu de l'article */}
                {article.content}
                
                <Divider sx={{ my: 4 }} />
                
                {/* Tags et partage */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {article.tags.map((tag) => (
                      <ArticleTag 
                        key={tag} 
                        label={tag} 
                        color="primary" 
                        variant="outlined"
                        clickable
                      />
                    ))}
                  </Stack>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                      Partager :
                    </Typography>
                    <SocialIconButton size="small" color="primary">
                      <FacebookIcon fontSize="small" />
                    </SocialIconButton>
                    <SocialIconButton size="small" color="primary">
                      <TwitterIcon fontSize="small" />
                    </SocialIconButton>
                    <SocialIconButton size="small" color="primary">
                      <LinkedInIcon fontSize="small" />
                    </SocialIconButton>
                    <SocialIconButton size="small" color="primary">
                      <WhatsAppIcon fontSize="small" />
                    </SocialIconButton>
                  </Box>
                </Box>
              </StyledPaper>
              
              {/* Auteur */}
              <AuthorCard elevation={0}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      src={article.authorImage}
                      alt={article.author}
                      sx={{ 
                        width: 70, 
                        height: 70, 
                        mr: 2,
                        border: '3px solid white',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Box>
                      <Typography variant="h6" color="primary">{article.author}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {article.authorTitle}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Expert en économie et développement, Dr. Ndiaye a travaillé sur de nombreux projets de recherche concernant les politiques économiques en Afrique de l'Ouest. Il est l'auteur de plusieurs publications académiques et conseille régulièrement les institutions gouvernementales.
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<PersonIcon />}
                    >
                      Voir tous ses articles
                    </Button>
                  </Box>
                </CardContent>
              </AuthorCard>
            </Grid>

            {/* Barre latérale */}
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: 24 }}>
                {/* Articles similaires */}
                <Card>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary" sx={{ 
                      pb: 1, 
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                      display: 'inline-block'
                    }}>
                      Articles similaires
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                      {article.relatedArticles.map((relatedArticle) => (
                        <Link 
                          key={relatedArticle.id} 
                          href={`/actualites/${relatedArticle.id}`} 
                          style={{ textDecoration: 'none' }}
                        >
                          <Box sx={{ mb: 3, '&:hover': { '& h6': { color: 'primary.main' } } }}>
                            <RelatedArticleImage
                              src={relatedArticle.image}
                              alt={relatedArticle.title}
                            />
                            <RelatedArticleTitle variant="subtitle1" color="text.primary">
                              {relatedArticle.title}
                            </RelatedArticleTitle>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarTodayIcon sx={{ fontSize: 14, mr: 1, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {relatedArticle.date}
                              </Typography>
                            </Box>
                          </Box>
                        </Link>
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ mt: 2 }}
                      component={Link}
                      href="/actualites"
                    >
                      Voir toutes les actualités
                    </Button>
                  </CardContent>
                </Card>
                
                {/* Tags populaires */}
                <Card sx={{ mt: 4 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom color="primary" sx={{ 
                      pb: 1, 
                      borderBottom: '2px solid',
                      borderColor: 'primary.main',
                      display: 'inline-block',
                      mb: 2
                    }}>
                      Tags populaires
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                      <Chip label="Économie" color="primary" variant="outlined" clickable />
                      <Chip label="Agriculture" color="primary" variant="outlined" clickable />
                      <Chip label="Éducation" color="primary" variant="outlined" clickable />
                      <Chip label="Développement" color="primary" variant="outlined" clickable />
                      <Chip label="Jeunesse" color="primary" variant="outlined" clickable />
                      <Chip label="Innovation" color="primary" variant="outlined" clickable />
                      <Chip label="Emploi" color="primary" variant="outlined" clickable />
                      <Chip label="Technologie" color="primary" variant="outlined" clickable />
                      <Chip label="Finance" color="primary" variant="outlined" clickable />
                    </Box>
                  </CardContent>
                </Card>
                
                {/* Appel à l'action */}
                <Card sx={{ mt: 4, bgcolor: 'primary.main', color: 'white' }}>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Vous souhaitez en savoir plus ?
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      Rejoignez-nous pour contribuer aux discussions sur le développement économique du Sénégal.
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Button 
                          variant="contained" 
                          fullWidth 
                          sx={{ 
                            bgcolor: 'white', 
                            color: 'primary.main',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                          }}
                          component={Link}
                          href="/contact"
                        >
                          Nous contacter
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          sx={{ 
                            color: 'white', 
                            borderColor: 'white',
                            '&:hover': { 
                              borderColor: 'white',
                              bgcolor: 'rgba(255,255,255,0.1)'
                            }
                          }}
                          component={Link}
                          href="/join"
                        >
                          Devenir membre
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>

          {/* Bouton retour */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              component={Link}
              href="/actualites"
            >
              Retour aux actualités
            </Button>
          </Box>
        </Container>
        <FixedJoinButton />
      </Box>
    </ThemeProvider>
  );
} 