// import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
// import React, { useState } from 'react'
// import { addActivities } from '../services/api'



// const ActivityForm = ({onActivityAdded}) => {

//     const [activity, setActivity] = useState({
//         type: "RUNNING", 
//         duration: '', 
//         caloriesBurned: '',
//         additionalMetrics: {}
//     })


//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         try {
//             await addActivities(activity);
//             onActivityAdded();
//             setActivity({type: "RUNNING", duration: '', caloriesBurned: ''});
            
//         } catch (error) {
            
//         }
//     }

//   return (
//     <Box component="section" sx={{ mb: 4 }}>
//   <form onSubmit={handleSubmit}>
//     <FormControl fullWidth sx={{ mb: 2 }}>
//       <InputLabel>Activity Type</InputLabel>
//       <Select
//         value={activity.type}
//         onChange={(e) => setActivity({ ...activity, type: e.target.value })}
//       >
//         <MenuItem value="RUNNING">RUNNING</MenuItem>
//         <MenuItem value="WALKING">WALKING</MenuItem>
//         <MenuItem value="CYCLING">CYCLING</MenuItem>
//       </Select>
//     </FormControl>

//     <TextField
//       fullWidth
//       label="Duration (Minutes)"
//       type="number"
//       sx={{ mb: 2 }}
//       value={activity.duration}
//       onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
//     />

//     <TextField
//       fullWidth
//       label="Calories Burned"
//       type="number"
//       sx={{ mb: 2 }}
//       value={activity.caloriesBurned}
//       onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
//     />

//     <Button type="submit" variant="contained">
//       ADD ACTIVITY
//     </Button>
//   </form>
// </Box>
//   )
// }

// export default ActivityForm


import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
  Fade,
  InputAdornment
} from '@mui/material'
import React, { useState } from 'react'
import { addActivities } from '../services/api'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import AddIcon from '@mui/icons-material/Add'

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: '',
    caloriesBurned: '',
    additionalMetrics: {}
  })

  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const activityIcons = {
    RUNNING: <DirectionsRunIcon />,
    WALKING: <DirectionsWalkIcon />,
    CYCLING: <DirectionsBikeIcon />
  }

  const activityColors = {
    RUNNING: '#FF6B35',
    WALKING: '#FF8E53',
    CYCLING: '#FFA366'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!activity.duration || !activity.caloriesBurned) {
      setSnackbar({
        open: true,
        message: 'Please fill in all fields',
        severity: 'error'
      })
      return
    }

    setLoading(true)
    try {
      await addActivities(activity)
      onActivityAdded()
      setActivity({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: {} })
      setSnackbar({
        open: true,
        message: 'Activity added successfully! 🎉',
        severity: 'success'
      })
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to add activity. Please try again.',
        severity: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  // Define common styles for TextField and Select inputs
  const inputSx = {
    mb: 3,
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)', // Nearly opaque white background
      borderRadius: '16px',
      border: '2px solid transparent', // Initial transparent border
      color: '#333', // Dark text color for input value
      fontWeight: '600',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 1)', // White on hover
        borderColor: 'rgba(255, 107, 53, 0.5)', // Orange border on hover
      },
      '&.Mui-focused': {
        borderColor: '#FF6B35', // Solid orange border when focused
        boxShadow: '0 0 0 4px rgba(255, 107, 53, 0.2)', // Orange glow
      },
      // Placeholder color
      '& input::placeholder': {
        color: 'rgba(0, 0, 0, 0.5)', // Lighter black for placeholder
        opacity: 1, // Ensure it's not faded
      },
      '& textarea::placeholder': { // For multiline textfields if used
        color: 'rgba(0, 0, 0, 0.5)',
        opacity: 1,
      },
      '& .MuiSelect-select': { // For select component specifically
        paddingRight: '32px !important', // Ensure space for dropdown icon
      }
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(0, 0, 0, 0.7)', // Dark label color when not shrunk
      fontWeight: '600',
      '&.Mui-focused': {
        color: '#FF6B35', // Orange when focused
      },
      '&.MuiInputLabel-shrink': { // When label moves up (input has value or is focused)
        // Position the shrunk label completely inside the input field
        transform: 'translate(14px, -9px) scale(0.75)', // Default Mui shrink transform
        top: '-12px', // Adjust vertical position to pull it down slightly into the border area
        left: '-8px', // Adjust horizontal position
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // Background color to cover the border
        padding: '0 4px', // Padding to give space around the text
        borderRadius: '4px', // Slightly rounded background
        color: '#FF6B35', // Make the shrunk label orange
        // Override default MuiInputLabel-shrink styles that might conflict
        '&.Mui-focused': {
          color: '#FF6B35', // Keep it orange when focused and shrunk
        }
      }
    },
    '& .MuiFormHelperText-root': { // Style for helper text if you add it later
      color: 'rgba(255, 255, 255, 0.8)',
    },
    // Style for the actual text input elements
    '& .MuiInputBase-input': {
      color: '#333', // Ensure input text is dark
    },
    // Ensure the adornments are visible and not blended
    '& .MuiInputAdornment-root': {
        color: '#FF6B35', // Ensure icons remain orange
    }
  };


  return (
    <Fade in timeout={800}>
      <Paper
        elevation={8}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255, 107, 53, 0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 107, 53, 0.05)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: '700',
              mb: 1,
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}
          >
            Track Your Fitness
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: '#FF6B35',
              fontWeight: '500',
              mb: 4,
              textAlign: 'center',
              opacity: 0.9
            }}
          >
            Healthy body, healthy soul
          </Typography>

          <form onSubmit={handleSubmit}>
            <FormControl
              fullWidth
              sx={{
                ...inputSx, // Apply common input styles
              }}
            >
              <InputLabel id="activity-type-label">Activity Type</InputLabel>
              <Select
                labelId="activity-type-label"
                id="activity-type-select"
                value={activity.type}
                label="Activity Type" // Important for OutlinedInput to work correctly
                onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                startAdornment={
                  <InputAdornment position="start">
                    <Box sx={{ color: '#FF6B35', mr: 1 }}>
                      {activityIcons[activity.type]}
                    </Box>
                  </InputAdornment>
                }
              >
                <MenuItem value="RUNNING">RUNNING</MenuItem>
                <MenuItem value="WALKING">WALKING</MenuItem>
                <MenuItem value="CYCLING">CYCLING</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Duration"
              type="number"
              placeholder="Enter duration in minutes"
              sx={{
                ...inputSx, // Apply common input styles
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon sx={{ color: '#FF6B35', mr: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="body2" sx={{ color: '#FF6B35', fontWeight: '500' }}>
                      min
                    </Typography>
                  </InputAdornment>
                )
              }}
              value={activity.duration}
              onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
            />

            <TextField
              fullWidth
              label="Calories Burned"
              type="number"
              placeholder="Enter calories burned"
              sx={{
                ...inputSx, // Apply common input styles
                mb: 4, // Override mb for the last TextField if needed, or set 0 in inputSx and apply mb specifically
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalFireDepartmentIcon sx={{ color: '#FF6B35', mr: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Typography variant="body2" sx={{ color: '#FF6B35', fontWeight: '500' }}>
                      kcal
                    </Typography>
                  </InputAdornment>
                )
              }}
              value={activity.caloriesBurned}
              onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              startIcon={<AddIcon />}
              sx={{
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: '700',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #FF6B35 0%, #FF8E53 100%)',
                boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
                textTransform: 'none',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #E55A2B 0%, #FF7A42 100%)',
                  boxShadow: '0 12px 40px rgba(255, 107, 53, 0.6)',
                  transform: 'translateY(-3px)'
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.3)',
                  color: 'rgba(255, 255, 255, 0.7)'
                },
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {loading ? 'Adding Activity...' : 'Add Activity'}
            </Button>
          </form>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            sx={{
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              '&.MuiAlert-standardSuccess': {
                backgroundColor: '#FF6B35',
                color: 'white'
              }
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Fade>
  )
}

export default ActivityForm;