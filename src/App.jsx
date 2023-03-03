import { Route, Switch } from "react-router-dom"
import { BrowserRouter as Router } from "react-router-dom"

import Header from "./views/Header"
import Main from "./views/Main.jsx"


export default function App() {
  return (
   <>
   <Router>
    <Switch>
    
      <Route exact path="/">
      <Header />
      <Main />
 
  </Route>
      </Switch>
      </Router>
      </>
  )
}
