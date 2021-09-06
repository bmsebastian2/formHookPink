import React from 'react'
import Button from '@material-ui/core/Button';
import {
    
    Link
  } from "react-router-dom";


const BotonSliderLeft = ({Icono, description, link}) => {

   
   
    return (
        <Link to={link} style={{textDecoration: 'none'}}>
                <Button
                    variant = 'contained'
                    color = 'secondary'
                    disabled = {false}
                    endIcon = {<Icono style = {{fontSize : '2rem'}}/>}
                    size = 'small'
                    style = {{marginBottom : '1rem'}}
                >
                {description}
                </Button>
        </Link> 
    )
}

export default BotonSliderLeft
