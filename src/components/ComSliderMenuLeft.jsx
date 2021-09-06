import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import BotonSliderLeft from '../components/BotonSliderLeft'
import ListBotones from '../components/ListBotones.js'

const useStyles = makeStyles((theme) => ({

    root: {
        display:'flex',
        flexDirection : 'column',
        textAlign : 'center',
        justifyContent : 'center',
        width : '200px',
        minHeight :'100%',
        background: 'rgb(255,77,137)',
                
          [theme.breakpoints.down(750)]: {
            paddingLeft : '5rem',    
            paddingRight : '5rem',
            width:'100vw',
            
           
          },
        },
  
  }));

const ComSliderMenuLeft = () => {
    const classes = useStyles();
    
    return (
        <>
           
                <div className={classes.root}>
                <div className="" >
                    {   ListBotones.map((e,item) => 
                        
                        <BotonSliderLeft
                            key = {item} 
                            Icono = {e.Icono} 
                            description = {e.description}
                            link = {e.link}
                        />
                    )   }
                </div>
          
        </div> 
            
            
        </>
    )
}

export default ComSliderMenuLeft
