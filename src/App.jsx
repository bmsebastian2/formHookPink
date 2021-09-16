import "./App.css";
import ComSliderMenuLeft from "./components/ComSliderMenuLeft";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FormHook2 from './components/FormHook2';



function App() {
  
  
  return (
    <>
      <main>
        <Router>
          <div className="contenedorGeneral">
          
            <ComSliderMenuLeft />

            <div className="contenedorFormulario">
              <Switch>
                
                <Route path="/FormHook2">
                  <h1>FormHook2</h1>     
                </Route>
                
                <Route path="/FormHook1">                 
                  <FormHook2/>
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
