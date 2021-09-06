import "./App.css";
import ComSliderMenuLeft from "./components/ComSliderMenuLeft";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";

import FormMain from "./components/FormMain";

const useStyles = makeStyles((theme) =>
  createStyles({
    stylePeper: {
      margin: "2rem",
      padding: "2rem",
    },
  })
);

function App() {
  

  const classes = useStyles();
  

  return (
    <>
      <main>
        <Router>
          <div className="contenedorGeneral">
            <ComSliderMenuLeft />

            <div className="contenedorFormulario">
              <Switch>
                
                <Route path="/FormHook2">
                  <Paper className={classes.stylePeper}>
                    <FormMain/>
                  </Paper>
                </Route>
                
                <Route path="/FormHook1">
                  <p style={{ border: "solid 1px black" }}>hola mundo1</p>
                </Route>
                
              </Switch>
            </div>
          </div>
        </Router>
      </main>
    </>
  );
}

export default App;
