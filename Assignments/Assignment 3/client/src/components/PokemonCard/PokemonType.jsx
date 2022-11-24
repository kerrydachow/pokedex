import React from 'react'
import { Typography } from '@mui/material'

const PokemonType = ({ type }) => {
  return (
    <div className={type + " type-detail"}>{<Typography> {type} </Typography>}</div>
  )
}

export default PokemonType