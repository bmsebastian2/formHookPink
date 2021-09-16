import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import AppsTwoToneIcon from '@material-ui/icons/AppsTwoTone';
import AccessibilityNewTwoToneIcon from '@material-ui/icons/AccessibilityNewTwoTone';
import AccessTimeTwoToneIcon from '@material-ui/icons/AccessTimeTwoTone';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList({email, celular, cedula, zonas, sexo, tiempo}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" style={{textAlign:'left' , color:'green'}}>
          
          {'N°. de Cedula:  ' + ' ( ' + cedula + ' ) '}
         
        </ListSubheader>
       
      }
      className={classes.root}
      
    >
     <Divider variant="inset" component="li" />
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Más Información" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <EmailTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={'Email : ' + email} />
          </ListItem>
          
          <Divider variant="inset" component="li" />

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PhoneAndroidTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={'Teléfono : ' + celular} />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AppsTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={'Zonas  : ' + zonas} />
          </ListItem>

          <Divider variant="inset" component="li" />

          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AccessibilityNewTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={'Genero  : ' + sexo} />
          </ListItem>

          <Divider variant="inset" component="li" />
          
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AccessTimeTwoToneIcon />
            </ListItemIcon>
            <ListItemText primary={'Tiempo de espera  : ' + tiempo} />
          </ListItem>

        </List>
      </Collapse>
    </List>
  );
}