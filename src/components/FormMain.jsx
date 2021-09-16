import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Slider from '@material-ui/core/Slider';
import {agregarPersona, db} from '../firebase';


const useStyles = makeStyles((theme) =>

createStyles({
    
  styleForm : {
        margin   : '0.2rem' ,
        
     },
    
  formControl : {
        display :'flex',
        justifyContent: 'space-between',
        marginTop: '1rem',
        
        [theme.breakpoints.down(750)]: {
          display : 'flex',
          flexDirection : 'column'
        },
    },
  cajaBoton : {
    textAlign:'center',
  
  }
    
  
  })
);

const FormMain = ({setListPerson, botonEditarId,setBotonEditarId}) => {

  
  const classes = useStyles();
  
  const expresiones = {
       email : /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
       celular : /^\d*$/,       
   }
    
  const {minLength, maxLength, control, register, handleSubmit, reset, setFocus, formState: { errors }, } = useForm();

  // const onChange = (event,funcion)=>{
  //           funcion({
  //               ...[event.target.name],[event.target.name] : event.target.value
  //           })           
  //   }
  const resetForm = () => {
        setSexo('femenino')
        setZonas('');
        setNota({nota: '', estado : null});
        setZonas({zona: '', estado : null})
        setState({covid: true, manual: false, herramienta: false,})
        setTiempo(10);
        
        reset()
     }

  const onSubmit =  (data) => {
        data.covid = covid
        data.manual = manual
        data.herramienta = herramienta
        data.sexo = sexo
        data.tiempo = tiempo       
        agregarPersona(data);
        resetForm()       
        setFocus("email");
    }
 
  
 
  const [email, setEmail] = useState({email : '', estado : null })
  const [celular, setCelular] = useState({celular: '', estado : null})
  const [cedula, setCedula] = useState({cedula: '', estado : null})
  const [nota, setNota] = useState({nota: '', estado : null})
  const [zonas, setZonas] = useState({zona: '', estado : null})
  const [state, setState] = useState({
    covid: true,
    manual: false,
    herramienta: false,
  });
  const {covid, manual, herramienta} = state;
  const error = [covid, manual, herramienta].filter((v) => v).length !== 2;
  const [sexo, setSexo] = useState('femenino');
  const [tiempo, setTiempo] = useState(10)
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const handleChangesexo = (event) => {
    setSexo(event.target.value);
  };
  const  valuetext = (event,newValue) => {    
    setTiempo(newValue)        
  }
  const getPers = () => {   
    db.collection('personas').onSnapshot((querySnapshoty)=>{
      const arr = [];
      querySnapshoty.forEach((doc) => {
        arr.push( {...doc.data(), id : doc.id } )  
      })
      setListPerson(arr);
    })
    
  }
  
   useEffect(() => {
        
        setFocus("email");
        getPers();
      }, []);
      
    useEffect(() => {
      let objeto = {}
      if (botonEditarId!=null){
        objeto = db.collection('personas').doc(botonEditarId).get();
        objeto.then((e)=>console.log(e.data()))
      }else{

      }

    }, [botonEditarId])

  return (
  <div className = {classes.styleForm}>
    <form onSubmit={handleSubmit(onSubmit)} >
        
          <TextField
                    fullWidth
                    autoComplete = 'off'                               
                    name = 'email' 
                    id="standard-basic" 
                    label= 'Email'
                    style={ { margin: 6 } }
                    placeholder = 'ejemplo@correo.com'
                    value = { email.value }
                    {...register("email", {required : true, pattern : expresiones.email})}
                    // onChange = {(event)=>onChange(event,setEmail)}
                    helperText= {
                       (errors.email?.type === 'required')?'El correo es requerido'
                      :(errors.email?.type === 'pattern')?'El correo no tiene el formato adecuado'
                      :''                      
                    }                    
                       error={errors.email && true}
                />                       
        
          <TextField
                    fullWidth
                    autoComplete = 'off'
                    name = 'celular'                               
                    id="standard-basic" 
                    label="Celular"
                    style={ { margin: 6 } } 
                    placeholder = '066555666'
                    value = { celular.value }
                    {...register("celular",{required : true, maxLength : 14, minLength : 9, pattern : expresiones.celular})}
                    helperText= {
                       (errors.celular?.type === 'required')?'El celular es requerido'
                      :(errors.celular?.type === 'pattern')?'El celular no tiene el formato adecuado'
                      :(errors.celular?.type === 'maxLength')?'Celular maximo 14 caracteres'
                      :(errors.celular?.type === 'minLength')?'Celular minimo 9 caracteres'                      
                      :''                      
                    } 
                       error={errors.celular && true}
                />
           
          <TextField
                    fullWidth
                    autoComplete = 'off'
                    name = 'cedula'
                    id="standard-basic"
                    label='Cedula'
                    style={ { margin: 6 } }
                    placeholder = '12345678'
                    value = { cedula.value } 
                  {...register("cedula",{required : true, minLength: 7, maxLength: 8, pattern : expresiones.celular})}
                  helperText= {
                     (errors.cedula?.type === 'required')?'La cedula es requerida'
                    :(errors.cedula?.type === 'pattern')?'La cedula no tiene el formato adecuado'
                    :(errors.cedula?.type === 'maxLength')?'Cedula maximo 7 caracteres'
                    :(errors.cedula?.type === 'minLength')?'Cedula minimo 7 caracteres'
                    :''                      
                } 
                     error={errors.cedula && true} 
               />
          <TextField  
                    fullWidth
                    autoComplete = 'off'
                    name = 'nota'
                    id="outlined-multiline-static"
                    label="Nota"
                    style={ { margin: 6 } }
                    placeholder = 'Nota'
                    value = { nota.value }
                    multiline
                    rows={5}
                    {...register("nota",{required : true, maxLength: 100})}
                    helperText= {
                      (errors.nota?.type === 'required')?'La nota es requerida'
                     :(errors.nota?.type === 'maxLength')?'Nota maximo 100 caracteres'                     
                     :''                      
                    } 
                    error={errors.nota && true}
                    variant="outlined"
               />
                
                <InputLabel shrink id="demo-simple-select-placeholder-label-label" style={{ marginTop: 8 }}>
                  Zonas
                </InputLabel>
                <Select {...register("zonas",{required : true})}
                      fullWidth
                      name = 'zonas'
                      labelId="demo-simple-select-placeholder-label-label"
                      id="demo-simple-select-placeholder-label"
                      value={zonas.value}
                      displayEmpty
                      className={classes.selectEmpty}
                      helperText= {
                        (errors.zonas?.type === 'required')?'La zona es requerida'                                      
                       :''                      
                      } 
                      error={errors.zonas && true}
                    >
                      <MenuItem value={'A1'}><em>Zona A1</em></MenuItem>
                      <MenuItem value={'A2'}>Zona A2</MenuItem>
                      <MenuItem value={'A3'}>Zona A3</MenuItem>
                      <MenuItem value={'B'}>Zona B</MenuItem>
                </Select>
                              
                    <div className={classes.formControl}>
                          <FormControl component="fieldset" >
                            <FormLabel component="legend">Estatus control:</FormLabel>
                            <FormGroup>
                              <FormControlLabel
                                control={<Checkbox checked={covid} onChange={handleChange} name="covid" value={covid.value}/>}
                                label="Certificado Vacuna Covid"
                              />
                              <FormControlLabel
                                control={<Checkbox checked={manual} onChange={handleChange} name="manual" value={covid.manual}/>}
                                label="Manual COV-02C"
                              />
                              <FormControlLabel
                                control={<Checkbox checked={herramienta} onChange={handleChange} name="herramienta" value={covid.herramienta} />}
                                label="Herramienta/Uniforme"
                              />
                            </FormGroup>
                           
                          </FormControl>
                   
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Genero</FormLabel>
                            <RadioGroup 
                                {...register("sexo")}
                                aria-label="gender" 
                                name="sexo" 
                                value={sexo} 
                                onChange={handleChangesexo}                                
                                >                              
                              <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                              <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
                              <FormControlLabel value="otro" control={<Radio />} label="Otro" />
                              
                            </RadioGroup>
                          </FormControl>
                   </div>

                    <hr style={{marginTop:'1rem',marginBottom:'1rem'}}/> 
                   
                    <div style= {{textAlign:'center'}}>
                        <Typography id="discrete-slider-small-steps" gutterBottom>
                           Tiempo de espera
                        </Typography>
                        <Slider                                              
                          value={tiempo} 
                          onChange={valuetext}                        
                          aria-labelledby="continuous-slider"
                          valueLabelDisplay="auto"
                          min={0}
                          step={1}
                          max={20}
                          marks
                          name = 'tiempo'                     
                          />                        
                    </div>
            
        <div className = {classes.cajaBoton} style={{marginTop:'1rem'}}>
        
      
          {
            (botonEditarId!=null)?
            <Button variant="contained"   style={{background:'#ff8f00'}} onClick={()=>console.log(botonEditarId)}>
               EDITAR
            </Button>    
              
              :
            <Button variant="contained" color="primary" type="submit">
                ENVIAR
            </Button>
          
          }
            
          <Button variant="contained"  style={{marginLeft:'1rem'}} onClick={()=>resetForm()}>
            LIMPIAR
          </Button>
        <div className="">
          {
            (botonEditarId!=null)?
           
                <Button variant="text" onClick={()=>setBotonEditarId(null)}>Agregar nuevo</Button>
              :
              ''
          
          }
        </div>
       </div>
      
    </form>

    <div>

    </div>

  </div>
  );
};

export default FormMain;
