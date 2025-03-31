import { createTheme } from '@mui/material/styles';
import { TimelineProps, TimelineItemProps, TimelineDotProps, TimelineConnectorProps } from '@mui/lab';

// Ajouter une déclaration de module pour étendre les composants
declare module '@mui/material/styles' {
  interface Components {
    MuiTimeline?: {
      defaultProps?: Partial<TimelineProps>;
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };
    MuiTimelineItem?: {
      defaultProps?: Partial<TimelineItemProps>;
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };
    MuiTimelineDot?: {
      defaultProps?: Partial<TimelineDotProps>;
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };
    MuiTimelineConnector?: {
      defaultProps?: Partial<TimelineConnectorProps>;
      styleOverrides?: {
        root?: React.CSSProperties;
      };
    };
  }
}

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
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
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
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0px 15px 35px rgba(139, 69, 19, 0.1)',
          },
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
    MuiTab: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s',
          '&.Mui-selected': {
            backgroundColor: 'rgba(139, 69, 19, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiTimeline: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          minHeight: 'auto',
          paddingBottom: '24px',
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          backgroundColor: '#8B4513',
        },
      },
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          backgroundColor: '#8B4513',
        },
      },
    },
  },
});

export default theme; 