import logo from "./logo.svg";
import "./app.scss";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Chat from "./components/Chat/Chat";
import ProtectedRoute from './components/Router/ProtectedRoute'

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell } from '@fortawesome/free-solid-svg-icons'
library.add(faSmile, faImage, faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell)

function App() {
  return (
    <Router>
      <div className="app">
        {/* SWITCH WILL RENDER THE FIRST ROUTE THAT IT FINDS TO BE A MATCH */}
        {/* IF IT DOESN'T FIND A MATCH IT WILL RENDER THE LAST ROUTE THAT WE HAVE */}
        <Switch>
          <ProtectedRoute exact path="/" component={Chat} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route render={() => <h1>404 page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
