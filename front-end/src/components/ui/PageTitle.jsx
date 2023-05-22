import React from 'react'
import Typography from '@mui/material/Typography'

export default function PageTitle({title}){
    return(
        <Typography variant="h3" component="h1" sx={{ textAlign: 'center', mb: '30px',color: '#8e44ad', fontFamily: 'Raleway, sans-serif' }} >
           {title}
        </Typography>
    )
}