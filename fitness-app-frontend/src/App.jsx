// import { Box, Button } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "react-oauth2-code-pkce";
// import { useDispatch } from "react-redux";
// import { BrowserRouter as Router, Navigate, Route, Routes, useLocation} from "react-router";
// import { setCredentials } from "./store/authSlice";
// import ActivityForm from "./components/ActivityForm";
// import ActivityList from "./components/ActivityList";
// import ActivityDetail from "./components/ActivityDetail";


// const ActivityPage = () => {
//   return (<Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
//       <ActivityForm onActivitiesAdded= {() => window.location.reload()} />
//       <ActivityList />
//     </Box>);
// }


// function App() {

//   const{token, tokenData, logIn, logOut, isAuthenticated} = useContext(AuthContext);
//   const dispatch = useDispatch();
//   const [authReady,setAuthReady]= useState(false); 

//   useEffect(() => {
//     if (token) {
//       dispatch(setCredentials({token, user:tokenData}));
//       setAuthReady(true);
      
//     }
//   },[token, tokenData,dispatch]);

//   return (
//     <Router>
//       {!token ? (
//       <Button variant="contained" color="#dc004" onClick={() => {
//         logIn()
//       }}>LOGIN</Button>
//       ) : (
//         // <div>
//         //   <pre>{JSON.stringify(tokenData, null, 2)}</pre>
//         //   <pre>{JSON.stringify(token, null, 2)}</pre>
//         // </div>

//         <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
//           <Button variant="contained" color="secondary" onClick={logOut}>
//             LOGOUT
//           </Button>
//         <Routes>
//           <Route path="/activities" element={<ActivityPage />}/>
//           <Route path="/activities/:id" element={<ActivityDetail />}/>

//           <Route path="/" element={token ? <Navigate to="/activities" replace/> : <div>Welcome! Please Login</div>} />
//         </Routes>
//     </Box>



//       )}
//     </Router>
//   )
// }

// export default App


import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  AppBar,
  Toolbar,
  Fade,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  Avatar,
  Stack
} from "@mui/material";
// Import createTheme and ThemeProvider
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PeopleIcon from '@mui/icons-material/People';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';

const ActivityPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleActivityAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ActivityForm onActivityAdded={handleActivityAdded} />
      <ActivityList refreshTrigger={refreshTrigger} />
    </Container>
  );
}

const LandingPage = ({ onLogin }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 142, 83, 0.1) 0%, transparent 50%)',
        }
      }}
    >
      {/* Navigation Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'transparent',
          backdropFilter: 'blur(20px)',
          borderBottom: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FitnessCenterIcon sx={{ color: '#FF6B35', fontSize: '2rem' }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: '800',
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              MaxFit
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
            {['Home', 'Programs', 'Blog', 'About Us'].map((item) => (
              <Typography
                key={item}
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  cursor: 'pointer',
                  fontWeight: '500',
                  '&:hover': {
                    color: '#FF6B35'
                  },
                  transition: 'color 0.3s ease'
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          <Button
            variant="text"
            sx={{
              color: 'white',
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <MenuIcon />
          </Button>

          <Typography
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              display: { xs: 'none', md: 'block' },
              cursor: 'pointer'
            }}
          >
            Menu
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 4, md: 8 } }}>
        <Grid container spacing={4} alignItems="center" sx={{ minHeight: '70vh' }}>
          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Box>
                <Box sx={{ mb: 4 }}>
                  <Box
                    sx={{
                      display: 'inline-block',
                      background: 'rgba(255, 107, 53, 0.1)',
                      px: 3,
                      py: 1,
                      borderRadius: '25px',
                      border: '1px solid rgba(255, 107, 53, 0.3)',
                      mb: 3
                    }}
                  >
                    <Typography
                      sx={{
                        color: '#FF6B35',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}
                    >
                      ——— TRANSFORM YOUR BODY
                    </Typography>
                  </Box>

                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: '3rem', md: '4.5rem' },
                      fontWeight: '800',
                      color: 'white',
                      lineHeight: 1.1,
                      mb: 2,
                      '& span': {
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }
                    }}
                  >
                    Healthy body, <br />
                    <span>healthy soul.</span>
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: '1.2rem',
                      lineHeight: 1.6,
                      mb: 4,
                      maxWidth: '500px'
                    }}
                  >
                    Track your workouts and get personalized fitness recommendations powered by AI. Transform your fitness journey with data-driven insights tailored just for you.
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 3, mb: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => onLogin()}
                    startIcon={<LoginIcon />}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      borderRadius: '15px',
                      background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                      boxShadow: '0 12px 40px rgba(255, 107, 53, 0.4)',
                      textTransform: 'none',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #E55A2B 0%, #FF7A42 100%)',
                        boxShadow: '0 16px 50px rgba(255, 107, 53, 0.6)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    Login to Start
                  </Button>

                  <Button
                    variant="text"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: 'white',
                      textTransform: 'none',
                      '&:hover': {
                        color: '#FF6B35'
                      },
                      transition: 'color 0.3s ease'
                    }}
                  >
                    View Demo
                  </Button>
                </Box>

                {/* Stats Section */}
                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                      }}
                    >
                      50+
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                      AI-Powered<br />Recommendations
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                      }}
                    >
                      500+
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                      Activity<br />Tracking
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: '800',
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                      }}
                    >
                      100+
                    </Typography>
                    <Typography sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
                      Custom<br />Workouts
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Fade>
          </Grid>

          {/* Right Side - Image/Visual Section */}
          <Grid item xs={12} md={6}>
            <Fade in timeout={1500}>
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '600px'
                }}
              >
                {/* Main circular background */}
                <Box
                  sx={{
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                    position: 'relative',
                    boxShadow: '0 20px 60px rgba(255, 107, 53, 0.3)'
                  }}
                >
                  {/* Fitness woman placeholder - can be replaced with actual image */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '320px',
                      height: '320px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      // Uncomment and replace 'your-image-url.jpg' with your actual image URL
                      backgroundImage: 'url("/fitness.jpg")',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  >
                    
                  </Box>
                </Box>

                {/* Floating elements */}
                <Paper
                  elevation={8}
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    p: 2,
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    minWidth: '150px'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: '#FF6B35' }}>1</Avatar>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: '#FF8E53' }}>2</Avatar>
                    <Avatar sx={{ width: 24, height: 24, bgcolor: '#34495E' }}>3</Avatar>
                    <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>+</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.8rem', color: '#666' }}>
                    100+ Joined Today
                  </Typography>
                </Paper>

                <Paper
                  elevation={8}
                  sx={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '10%',
                    p: 2,
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    minWidth: '140px'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <HealthAndSafetyIcon sx={{ fontSize: '1.2rem', color: 'white' }} />
                    </Box>
                    <Typography sx={{ fontSize: '0.9rem', fontWeight: '600', color: '#333' }}>
                      Health Body
                    </Typography>
                  </Box>
                </Paper>
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const LoginPage = ({ onLogin }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255, 142, 83, 0.1) 0%, transparent 50%)',
        }
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={1000}>
          <Paper
            elevation={12}
            sx={{
              p: 6,
              borderRadius: '32px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'linear-gradient(90deg, #FF6B35 0%, #FF8E53 100%)',
              }
            }}
          >
            <Box sx={{ mb: 4 }}>
              <FitnessCenterIcon
                sx={{
                  fontSize: '4rem',
                  color: '#FF6B35',
                  mb: 2,
                  filter: 'drop-shadow(0 4px 8px rgba(255, 107, 53, 0.3))'
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  letterSpacing: '-1px'
                }}
              >
                MaxFit
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: '#2C3E50',
                  fontWeight: '600',
                  mb: 2
                }}
              >
                Healthy body, healthy soul
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#666',
                  fontSize: '1.1rem',
                  lineHeight: 1.6
                }}
              >
                Transform your fitness journey with personalized tracking and insights
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="large"
              onClick={() => onLogin()} 
              startIcon={<LoginIcon />}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: '700',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                boxShadow: '0 12px 40px rgba(255, 107, 53, 0.4)',
                textTransform: 'none',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #E55A2B 0%, #FF7A42 100%)',
                  boxShadow: '0 16px 50px rgba(255, 107, 53, 0.6)',
                  transform: 'translateY(-3px)',
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              Start Your Journey
            </Button>

                            <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(255, 107, 53, 0.1)' }}>
              <Typography variant="body2" sx={{ color: '#888', fontSize: '0.9rem' }}>
                Get AI-powered recommendations based on your activity data
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

// Create a custom theme to override global styles
const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100vh; /* Use min-height here */
          // Removed overflow: hidden; from here
        }
        body {
          background-color: #2C3E50; /* Match your background gradient start color */
          overflow-y: auto; /* Allow vertical scrolling on the body */
          overflow-x: hidden; /* Prevent horizontal scrolling if not needed */
        }
      `,
    },
  },
});

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <ThemeProvider theme={theme}> {/* Wrap your app with ThemeProvider */}
      <CssBaseline /> {/* Add CssBaseline here */}
      <Router>
        {!token ? (
          <LandingPage onLogin={logIn} />
        ) : (
          <Box
            sx={{
              minHeight: '100vh',
              width: '100vw',
              margin: 0,
              padding: 0,
              background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)',
              position: 'relative',
              overflowX: 'hidden', // Keep overflowX hidden for this main container
              // No need for overflow-y: auto here, as body will handle it
              '&::before': {
                content: '""',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 30%, rgba(255, 107, 53, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 142, 83, 0.05) 0%, transparent 50%)',
                pointerEvents: 'none'
              }
            }}
          >
            {/* Header/Navigation */}
            <AppBar
              position="sticky"
              elevation={0}
              sx={{
                background: 'rgba(44, 62, 80, 0.95)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 107, 53, 0.2)'
              }}
            >
              <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FitnessCenterIcon sx={{ color: '#FF6B35', fontSize: '2rem' }} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: '800',
                      background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    MaxFit
                  </Typography>
                </Box>

                <Button
                  variant="outlined"
                  onClick={logOut}
                  startIcon={<LogoutIcon />}
                  sx={{
                    borderColor: '#FF6B35',
                    color: '#FF6B35',
                    fontWeight: '600',
                    borderRadius: '12px',
                    px: 3,
                    '&:hover': {
                      borderColor: '#FF8E53',
                      backgroundColor: 'rgba(255, 107, 53, 0.1)',
                      color: '#FF8E53'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Logout
                </Button>
              </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Routes>
                <Route path="/activities" element={<ActivityPage />} />
                <Route path="/activities/:id" element={<ActivityDetail />} />
                <Route
                  path="/"
                  element={token ? <Navigate to="/activities" replace /> : <LandingPage onLogin={logIn} />}
                />
              </Routes>
            </Box>
          </Box>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;