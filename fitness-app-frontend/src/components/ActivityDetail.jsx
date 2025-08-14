

// import React, { useEffect, useState } from 'react';
// import { getActivityDetail } from '../services/api';
// import {
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Divider
// } from '@mui/material';
// import { useParams } from 'react-router';

// const ActivityDetail = () => {
//   const { id } = useParams();
//   const [activity, setActivity] = useState(null);

//   useEffect(() => {
//     const fetchActivityDetail = async () => {
//       try {
//         const response = await getActivityDetail(id);
//         setActivity(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchActivityDetail();
//   }, [id]);

//   if (!activity) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
//       <Card sx={{ mb: 2 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>Activity Details</Typography>
//           <Typography>Type: {activity.type}</Typography>
//           <Typography>Duration: {activity.duration} minutes</Typography>
//           <Typography>Calories Burned: {activity.caloriesBurned}</Typography>
//           <Typography>Date: {new Date(activity.createdAt).toLocaleString()}</Typography>
//         </CardContent>
//       </Card>

//       {activity?.recommendation && (
//         <Card>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>AI Recommendation</Typography>

//             <Typography variant="h6">Analysis</Typography>
//             <Typography paragraph>{activity.recommendation}</Typography>

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="h6">Improvements</Typography>
//             {activity.improvements?.map((improvement, index) => (
//               <Typography key={index} paragraph>{improvement}</Typography>
//             ))}

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="h6">Suggestions</Typography>
//             {activity.suggestions?.map((suggestion, index) => (
//               <Typography key={index} paragraph>{suggestion}</Typography>
//             ))}

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="h6">Safety Guidelines</Typography>
//             {activity.safety?.map((safety, index) => (
//               <Typography key={index} paragraph>{safety}</Typography>
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// };

// export default ActivityDetail;


import {
  Box,
  Paper,
  Typography,
  Container,
  Fade,
  Button,
  Divider,
  Chip,
  CircularProgress,
  Skeleton
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getActivityDetail } from '../services/api'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PsychologyIcon from '@mui/icons-material/Psychology'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SecurityIcon from '@mui/icons-material/Security'
import LightbulbIcon from '@mui/icons-material/Lightbulb'

// Cool Running Man Loading Animation Component
const RunningManLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        position: 'relative'
      }}
    >
      {/* Running Track */}
      <Box
        sx={{
          width: '300px',
          height: '4px',
          background: 'linear-gradient(90deg, #FF6B35 0%, transparent 50%, #FF6B35 100%)',
          borderRadius: '2px',
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '-100px',
            width: '100px',
            height: '100%',
            background: 'linear-gradient(90deg, transparent 0%, #FF8E53 50%, transparent 100%)',
            animation: 'trackGlow 2s ease-in-out infinite'
          },
          '@keyframes trackGlow': {
            '0%': { left: '-100px' },
            '100%': { left: '300px' }
          }
        }}
      />
      
      {/* Running Man */}
      <Box
        sx={{
          fontSize: '4rem',
          color: '#FF6B35',
          animation: 'runningMan 1.5s ease-in-out infinite',
          filter: 'drop-shadow(0 4px 12px rgba(255, 107, 53, 0.3))',
          '@keyframes runningMan': {
            '0%, 100%': { 
              transform: 'translateY(0) scale(1)',
            },
            '25%': { 
              transform: 'translateY(-8px) scale(1.05)',
            },
            '50%': { 
              transform: 'translateY(-4px) scale(0.98)',
            },
            '75%': { 
              transform: 'translateY(-8px) scale(1.05)',
            }
          }
        }}
      >
        🏃‍♂️
      </Box>

      {/* Loading Text */}
      <Typography
        variant="h5"
        sx={{
          color: '#FF6B35',
          fontWeight: '600',
          mt: 3,
          animation: 'pulse 2s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1 },
            '50%': { opacity: 0.6 }
          }
        }}
      >
        Loading Activity Details...
      </Typography>
      
      {/* Dots Animation */}
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FF8E53',
              animation: `dotBounce 1.5s ease-in-out infinite ${index * 0.2}s`,
              '@keyframes dotBounce': {
                '0%, 80%, 100%': { transform: 'scale(0.8)' },
                '40%': { transform: 'scale(1.2)' }
              }
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

const ActivityDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activity, setActivity] = useState(null)

  const activityIcons = {
    RUNNING: <DirectionsRunIcon sx={{ fontSize: '2rem' }} />,
    WALKING: <DirectionsWalkIcon sx={{ fontSize: '2rem' }} />,
    CYCLING: <DirectionsBikeIcon sx={{ fontSize: '2rem' }} />
  }

  const activityColors = {
    RUNNING: {
      primary: '#FF6B35',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)'
    },
    WALKING: {
      primary: '#FF8E53',
      gradient: 'linear-gradient(135deg, #FF8E53 0%, #FFA366 100%)'
    },
    CYCLING: {
      primary: '#FFA366',
      gradient: 'linear-gradient(135deg, #FFA366 0%, #FFB07A 100%)'
    }
  }

  // Helper function to get activity type safely
  const getActivityType = () => {
    return activity?.type?.toUpperCase() || 'RUNNING'
  }

  // Helper function to get display name safely
  const getDisplayName = () => {
    if (!activity?.type) return 'Activity'
    return activity.type.charAt(0).toUpperCase() + activity.type.slice(1).toLowerCase()
  }

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id)
        setActivity(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchActivityDetail()
  }, [id])

  if (!activity) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <RunningManLoader />
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        onClick={() => navigate('/activities')}
        startIcon={<ArrowBackIcon />}
        sx={{
          mb: 3,
          color: '#FF6B35',
          fontWeight: '600',
          '&:hover': {
            backgroundColor: 'rgba(255, 107, 53, 0.1)'
          }
        }}
      >
        Back to Activities
      </Button>

      {/* Activity Details Card */}
      <Fade in timeout={800}>
        <Paper
          elevation={8}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)',
            color: 'white',
            border: '1px solid rgba(255, 107, 53, 0.2)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 107, 53, 0.05)',
            }
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: '16px',
                  background: activityColors[getActivityType()]?.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(255, 107, 53, 0.3)'
                }}
              >
                {activityIcons[getActivityType()]}
              </Box>
              <Box>
                <Typography variant="h3" sx={{ fontWeight: '700', mb: 1 }}>
                  Activity Details
                </Typography>
                <Typography variant="h5" sx={{ color: '#FF6B35', fontWeight: '600' }}>
                  {getDisplayName()} Session
                </Typography>
              </Box>
            </Box>

            {/* Stats Grid */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 3,
              mb: 4
            }}>
              <Box sx={{
                p: 3,
                borderRadius: '16px',
                background: 'rgba(255, 107, 53, 0.1)',
                border: '1px solid rgba(255, 107, 53, 0.2)',
                textAlign: 'center'
              }}>
                <AccessTimeIcon sx={{ fontSize: '2.5rem', color: '#FF6B35', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: '700', color: '#FF6B35' }}>
                  {activity?.duration || 0}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  minutes
                </Typography>
              </Box>

              <Box sx={{
                p: 3,
                borderRadius: '16px',
                background: 'rgba(255, 142, 83, 0.1)',
                border: '1px solid rgba(255, 142, 83, 0.2)',
                textAlign: 'center'
              }}>
                <LocalFireDepartmentIcon sx={{ fontSize: '2.5rem', color: '#FF8E53', mb: 1 }} />
                <Typography variant="h4" sx={{ fontWeight: '700', color: '#FF8E53' }}>
                  {activity?.caloriesBurned || 0}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  calories
                </Typography>
              </Box>

              <Box sx={{
                p: 3,
                borderRadius: '16px',
                background: 'rgba(255, 163, 102, 0.1)',
                border: '1px solid rgba(255, 163, 102, 0.2)',
                textAlign: 'center'
              }}>
                <CalendarTodayIcon sx={{ fontSize: '2.5rem', color: '#FFA366', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: '600', color: '#FFA366' }}>
                  {activity?.createdAt ? new Date(activity.createdAt).toLocaleDateString() : 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  {activity?.createdAt ? new Date(activity.createdAt).toLocaleTimeString() : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Fade>

      {/* AI Recommendation Card */}
      {activity?.recommendation && (
        <Fade in timeout={1200}>
          <Paper
            elevation={8}
            sx={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)',
              color: 'white',
              border: '1px solid rgba(255, 107, 53, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 107, 53, 0.05)',
              }
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* AI Header */}
              <Box sx={{ 
                p: 4, 
                pb: 2,
                display: 'flex', 
                alignItems: 'center', 
                gap: 2 
              }}>
                <PsychologyIcon sx={{ fontSize: '2.5rem', color: '#FF6B35' }} />
                <Typography variant="h4" sx={{ fontWeight: '700' }}>
                  AI Recommendation
                </Typography>
                <Chip 
                  label="AI Powered" 
                  sx={{ 
                    backgroundColor: '#FF6B35',
                    color: 'white',
                    fontWeight: '600',
                    fontSize: '0.8rem'
                  }} 
                />
              </Box>

              <Divider sx={{ borderColor: 'rgba(255, 107, 53, 0.2)', mx: 4 }} />

              <Box sx={{ p: 4 }}>
                {/* Analysis Section */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <TrendingUpIcon sx={{ color: '#FF6B35', fontSize: '1.8rem' }} />
                    <Typography variant="h5" sx={{ fontWeight: '700', color: '#FF6B35' }}>
                      Analysis
                    </Typography>
                  </Box>
                  <Paper sx={{
                    p: 3,
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    border: '1px solid rgba(255, 107, 53, 0.2)',
                    borderRadius: '16px'
                  }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        lineHeight: 1.8,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '1.1rem'
                      }}
                    >
                      {activity.recommendation}
                    </Typography>
                  </Paper>
                </Box>

                {/* Improvements Section */}
                {activity.improvements && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                      <TrendingUpIcon sx={{ color: '#FF8E53', fontSize: '1.8rem' }} />
                      <Typography variant="h5" sx={{ fontWeight: '700', color: '#FF8E53' }}>
                        Improvements
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {activity.improvements.map((improvement, index) => (
                        <Paper 
                          key={index}
                          sx={{
                            p: 3,
                            backgroundColor: 'rgba(255, 142, 83, 0.1)',
                            border: '1px solid rgba(255, 142, 83, 0.2)',
                            borderRadius: '16px'
                          }}
                        >
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              lineHeight: 1.8,
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontSize: '1.1rem'
                            }}
                          >
                            {improvement}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Suggestions Section */}
                {activity.suggestions && (
                  <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                      <LightbulbIcon sx={{ color: '#FFA366', fontSize: '1.8rem' }} />
                      <Typography variant="h5" sx={{ fontWeight: '700', color: '#FFA366' }}>
                        Suggestions
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {activity.suggestions.map((suggestion, index) => (
                        <Paper 
                          key={index}
                          sx={{
                            p: 3,
                            backgroundColor: 'rgba(255, 163, 102, 0.1)',
                            border: '1px solid rgba(255, 163, 102, 0.2)',
                            borderRadius: '16px'
                          }}
                        >
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              lineHeight: 1.8,
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontSize: '1.1rem'
                            }}
                          >
                            {suggestion}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                )}

                {/* Safety Guidelines Section */}
                {activity.safety && (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                      <SecurityIcon sx={{ color: '#FFB07A', fontSize: '1.8rem' }} />
                      <Typography variant="h5" sx={{ fontWeight: '700', color: '#FFB07A' }}>
                        Safety Guidelines
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {activity.safety.map((safety, index) => (
                        <Paper 
                          key={index}
                          sx={{
                            p: 3,
                            backgroundColor: 'rgba(255, 176, 122, 0.1)',
                            border: '1px solid rgba(255, 176, 122, 0.2)',
                            borderRadius: '16px'
                          }}
                        >
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              lineHeight: 1.8,
                              color: 'rgba(255, 255, 255, 0.9)',
                              fontSize: '1.1rem'
                            }}
                          >
                            {safety}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Paper>
        </Fade>
      )}
    </Container>
  )
}

export default ActivityDetail