import React from "react";

import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { Grid } from "@material-ui/core";

import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { db } from "../firebase";

import FormMain from "./FormMain";
import CompList from "./CompList";

const useStyles = makeStyles((theme) =>
  createStyles({
    stylePeper: {
      margin: "0.5rem",
      padding: "0.5rem",
    },
    titulo2: {
      margin: "1rem",
      padding: "1rem",
      color: "brown",
    },
    contenedorListPers: {
      maxHeight: "80vh",
      overflowY: "scroll",
      // border:'1px solid black',
    },
    contenedorListPer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      // border:'1px solid black',
    },
  })
);

const FormHook2 = () => {
  
  const classes = useStyles();
  const [listPerson, setListPerson] = useState([]);
  const [emailPersonSelect, setEmailPersonSelect] = useState("");
  const [idPersona, setIdPersona] = useState("");
  const [botonEditarId, setBotonEditarId] = useState(null)
  const [open, setOpen] = useState(false);
  const handleClickOpen = (email, id) => {
    setOpen(true);
    setEmailPersonSelect(email);
    setIdPersona(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = async (id) => {
    setOpen(false);
    await db.collection("personas").doc(id).delete();
  };

  return (
    <Paper className={classes.stylePeper}>
      <Grid container spacing={2}>


      {/* FORMULARIO--------------------------------------- */}
        
        <Grid item md={6}>
          <FormMain setListPerson={setListPerson} botonEditarId={botonEditarId} setBotonEditarId={setBotonEditarId}/>
        </Grid>

      {/* FORMULARIO--------------------------------------- */}


        <Grid item md={6}>
          <div>
            <Paper style={{ textAlign: "center" }} elevation={3}>
              <h2 className={classes.titulo2}>Lista de personas :</h2>
            </Paper>
            <div className={classes.contenedorListPers}>
              {listPerson.map((persona) => {
                return (
                  <Paper elevation={1} className={classes.stylePeper}>
                    <div className={classes.contenedorListPer}>
                      <CompList
                        email={persona.email}
                        celular={persona.celular}
                        cedula={persona.cedula}
                        zonas={persona.zonas}
                        sexo={persona.sexo}
                        tiempo={persona.tiempo}
                      />
                      <div>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() =>
                            handleClickOpen(persona.email, persona.id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>

                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Desea eliminar el registro de persona?"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              {emailPersonSelect}
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Denegar
                            </Button>
                            <Button
                              onClick={() => handleClose2(idPersona)}
                              color="primary"
                              autoFocus
                            >
                              Aceptar
                            </Button>
                          </DialogActions>
                        </Dialog>

                        <IconButton
                          aria-label="editar"
                          color="primary"
                          onClick={() => setBotonEditarId(persona.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                    </div>
                  </Paper>
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormHook2;
