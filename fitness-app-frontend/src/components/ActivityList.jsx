// import { Card, CardContent, Grid, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router';
// import { getActivities } from '../services/api';

// const ActivityList = () => {
//   const[activities, setActivity] = useState([]);
//   const navigate = useNavigate();

//   const fetchActivities = async () => {
//     try {
//       const response = await getActivities();
//       setActivity(response.data);

//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     fetchActivities();
//   },[])

//   return (

//     <div>
//       <Grid container spacing={2}>
//         {activities.map((activity) => (
//           <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//             <Card sx={{cursor: 'pointer'}}
//             onClick = {() => navigate(`/activities/${activity.id}`)}>
//               <CardContent>
//                 <Typography variant='h6'>{activity.type}</Typography>
//                 <Typography>Duration: {activity.duration}</Typography>
//                 <Typography>Calories: {activity.caloriesBurned}</Typography>
//               </CardContent>
                
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   )
// }

// export default ActivityList


import { 
  Card, 
  CardContent, 
  Grid, 
  Typography, 
  Box,
  IconButton,
  Tooltip,
  Chip,
  CircularProgress,
  Fade,
  Paper,
  Button
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { getActivities } from '../services/api'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import RefreshIcon from '@mui/icons-material/Refresh'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const ActivityList = ({ refreshTrigger }) => {
  const [activities, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const navigate = useNavigate()

  const activityIcons = {
    RUNNING: <DirectionsRunIcon />,
    WALKING: <DirectionsWalkIcon />,
    CYCLING: <DirectionsBikeIcon />
  }

  const activityColors = {
    RUNNING: { 
      primary: '#FF6B35', 
      secondary: '#FF8E53',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
      shadow: 'rgba(255, 107, 53, 0.4)'
    },
    WALKING: { 
      primary: '#FF6B35', 
      secondary: '#FF8E53',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
      shadow: 'rgba(255, 107, 53, 0.4)'
    },
    CYCLING: { 
       primary: '#FF6B35', 
      secondary: '#FF8E53',
      gradient: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
      shadow: 'rgba(255, 107, 53, 0.4)'
    }
  }

  const fetchActivities = async (showRefreshLoader = false) => {
    if (showRefreshLoader) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    
    try {
      const response = await getActivities()
      setActivity(response.data)
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = () => {
    fetchActivities(true)
  }

  useEffect(() => {
    fetchActivities()
  }, [refreshTrigger])

  const totalCalories = activities.reduce((sum, activity) => sum + parseInt(activity.caloriesBurned || 0), 0)
  const totalDuration = activities.reduce((sum, activity) => sum + parseInt(activity.duration || 0), 0)

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 300,
        background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 107, 53, 0.2)'
      }}>
        <CircularProgress size={60} sx={{ color: '#FF6B35' }} />
      </Box>
    )
  }

  return (
    <Box>
      {/* Header Section with Stats and Refresh */}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: '700', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              <FitnessCenterIcon sx={{ fontSize: '2.5rem', color: '#FF6B35' }} />
              Your Activities
            </Typography>
            <Tooltip title="Refresh Activities" arrow>
              <IconButton 
                onClick={handleRefresh}
                disabled={refreshing}
                sx={{ 
                  color: 'white',
                  backgroundColor: 'rgba(255, 107, 53, 0.2)',
                  border: '2px solid rgba(255, 107, 53, 0.3)',
                  width: 56,
                  height: 56,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 53, 0.3)',
                    transform: refreshing ? 'none' : 'rotate(180deg)',
                    border: '2px solid #FF6B35'
                  },
                  '&:disabled': {
                    color: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)'
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {refreshing ? (
                  <CircularProgress size={24} sx={{ color: '#FF6B35' }} />
                ) : (
                  <RefreshIcon sx={{ fontSize: '1.5rem' }} />
                )}
              </IconButton>
            </Tooltip>
          </Box>

          {activities.length > 0 && (
            <Box sx={{ 
              display: 'flex', 
              gap: 4, 
              flexWrap: 'wrap',
              justifyContent: 'center',
              p: 3,
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              borderRadius: '16px',
              border: '1px solid rgba(255, 107, 53, 0.2)'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
                <LocalFireDepartmentIcon sx={{ color: '#FF6B35', fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: '700', color: '#FF6B35' }}>
                    {totalCalories}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    calories burned
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
                <AccessTimeIcon sx={{ color: '#FF8E53', fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: '700', color: '#FF8E53' }}>
                    {totalDuration}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    minutes
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, textAlign: 'center' }}>
                <TrendingUpIcon sx={{ color: '#FFA366', fontSize: '2rem' }} />
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: '700', color: '#FFA366' }}>
                    {activities.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    activities
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Activities Grid */}
      {activities.length === 0 ? (
        <Paper 
          elevation={4}
          sx={{ 
            p: 8, 
            textAlign: 'center', 
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
            border: '1px solid rgba(255, 107, 53, 0.2)',
            color: 'white'
          }}
        >
          <FitnessCenterIcon sx={{ fontSize: '5rem', color: '#FF6B35', mb: 3, opacity: 0.7 }} />
          <Typography variant="h4" sx={{ color: 'white', mb: 2, fontWeight: '600' }}>
            No activities yet
          </Typography>
          <Typography variant="h6" sx={{ color: '#FF6B35', fontWeight: '500' }}>
            Start tracking your fitness journey!
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mt: 2 }}>
            Add your first activity above to begin building healthy habits
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {activities.map((activity, index) => (
            <Grid item xs={12} sm={6} md={4} key={activity.id || index}>
              <Fade in timeout={600 + index * 100}>
                <Card 
                  sx={{
                    cursor: 'pointer',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    background: activityColors[activity.type]?.gradient || activityColors.RUNNING.gradient,
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.03)',
                      boxShadow: `0 25px 50px ${activityColors[activity.type]?.shadow || 'rgba(255, 107, 53, 0.4)'}`
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(255, 255, 255, 0.1)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover::before': {
                      opacity: 1
                    }
                  }}
                  onClick={() => navigate(`/activities/${activity.id}`)}
                >
                  <CardContent sx={{ p: 3, position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ 
                          p: 1, 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {activityIcons[activity.type]}
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: '700', textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                          {activity.type.charAt(0) + activity.type.slice(1).toLowerCase()}
                        </Typography>
                      </Box>
                      <Chip 
                        label="Active"
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.25)',
                          color: 'white',
                          fontWeight: '600',
                          border: '1px solid rgba(255, 255, 255, 0.3)'
                        }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
                        p: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px'
                      }}>
                        <AccessTimeIcon sx={{ fontSize: '1.5rem' }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: '700', lineHeight: 1 }}>
                            {activity.duration}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            minutes
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5,
                        p: 2,
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '12px'
                      }}>
                        <LocalFireDepartmentIcon sx={{ fontSize: '1.5rem' }} />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: '700', lineHeight: 1 }}>
                            {activity.caloriesBurned}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.9 }}>
                            calories
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ 
                      mt: 3, 
                      pt: 2, 
                      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      justifyContent: 'center'
                    }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.9)',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        View Details →
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  )
}

export default ActivityList