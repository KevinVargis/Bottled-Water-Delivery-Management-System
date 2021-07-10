import './App.css';

import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import React, { Component } from "react";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import ManagerDashboard from "./components/manager/Dashboard";
import CreateSupervisor from "./components/manager/CreateSupervisor"
import CreateCustomer from "./components/manager/CreateCustomer"
import CreateBoy from "./components/manager/CreateBoy"
import CreateDriver from "./components/manager/CreateDriver"
import CompanyDashboard from "./components/company/Dashboard"
import CreateManager from "./components/company/CreateManager"
import SupervisorDashboard from "./components/supervisor/Dashboard"
import Inventory from "./components/supervisor/Inventory"
import CreateVehicle from "./components/manager/CreateVehicle" 
import ViewVehicles from "./components/manager/ViewVehicles"
import CustomerDashboard from "./components/customer/Dashboard"
import SubscriptionDetails from "./components/customer/SubscriptionDetails"
import RequestCans from "./components/customer/RequestCans"
import CreateRoute from "./components/supervisor/CreateRoute"
import RegisterComplaint from "./components/customer/RegisterComplaint"
import ViewComplaints from "./components/manager/ViewComplaints"
import ViewQr from "./components/customer/ViewQr"
import AssignRoute from "./components/supervisor/AssignRoute"

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/companydashboard" component={CompanyDashboard} />
              <PrivateRoute exact path="/managerdashboard" component={ManagerDashboard} />
              <PrivateRoute exact path="/createsupervisor" component={CreateSupervisor} />
              <PrivateRoute exact path="/createcustomer" component={CreateCustomer} />
              <PrivateRoute exact path="/createdeliveryboy" component={CreateBoy} />
              <PrivateRoute exact path="/createdeliverydriver" component={CreateDriver} />
              <PrivateRoute exact path="/createmanager" component={CreateManager} />
              <PrivateRoute exact path="/supervisordashboard" component={SupervisorDashboard} />
              <PrivateRoute exact path="/supervisorinventory" component={Inventory} />
              <PrivateRoute exact path="/createvehicle" component={CreateVehicle} />
              <PrivateRoute exact path="/viewvehicles" component={ViewVehicles} />
              <PrivateRoute exact path="/kharidaardashboard" component={CustomerDashboard} />
              <PrivateRoute exact path="/subscription" component={SubscriptionDetails} />
              <PrivateRoute exact path="/requestcans" component={RequestCans} />
              <PrivateRoute exact path="/createroute" component={CreateRoute} />
              <PrivateRoute exact path="/registercomplaint" component={RegisterComplaint} />
              <PrivateRoute exact path="/viewcomplaints" component={ViewComplaints} />
              <PrivateRoute exact path="/viewqr" component={ViewQr} />
              <PrivateRoute exact path="/assignroute" component={AssignRoute} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
