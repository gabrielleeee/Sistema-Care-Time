import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function Notification({
    show = false,
    duration = 4000,
    onClose,
    severity,
    children
}) {
    return (
        <Snackbar open={show} autoHideDuration={duration} onClose={onClose}>
          <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
            {children}
          </Alert>
        </Snackbar>
    )
}