import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/Companyregister", userData)
    .then(res => history.push("/login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const createVehicle = (userData, history) => dispatch => {
  // console.log("Kartik")
  axios.post("/api/managers/Vehicleregister",userData).then(
    res => {
      // console.log("Kartik")
      history.push("/managerdashboard")
    }).catch(
    err=> dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
};

export const registerCustomer = (userData,history) => dispatch => {
  axios
    .post("/api/managers/Kharidaarregister", userData)
    .then(res => history.push("/managerdashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerSupervisor = (userData,history) => dispatch => {
  axios
    .post("/api/managers/Supervisorregister", userData)
    .then(res => history.push("/managerdashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerDriver = (userData,history) => dispatch => {
  axios
    .post("/api/managers/Driverregister", userData)
    .then(res => history.push("/managerdashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerBoy = (userData,history) => dispatch => {
  axios
    .post("/api/managers/Boyregister", userData)
    .then(res => history.push("/managerdashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const registerManager = (userData,history) => dispatch => {
  axios
    .post("/api/users/Managerregister", userData)
    .then(res => history.push("/companydashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const toggleStatus = (userData,user) => dispatch => {
  axios.post("/api/customers/Togglestatus",userData).then(
    res => {
      user.active = 1 - user.active
      localStorage.removeItem("COMPANY")
      localStorage.setItem("COMPANY", JSON.stringify(user))
      dispatch(setCurrentUser(user));
    })
}

export const requestCans = (userData,user) => dispatch => {
  axios.post("/api/customers/Requestcans",userData).then(
    res => {
      user.cansrequired = userData.cansrequired
      user.deliverydate = userData.deliverydate
      localStorage.removeItem("COMPANY")
      localStorage.setItem("COMPANY", JSON.stringify(user))
      dispatch(setCurrentUser(user));
    }).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

export const modifySubs = (userData,user) => dispatch => {
  axios.post("/api/customers/Modifysubs",userData).then(
    res => {
      user.subscansrequired = userData.subscansrequired
      user.day = userData.day
      localStorage.removeItem("COMPANY")
      localStorage.setItem("COMPANY", JSON.stringify(user))
      dispatch(setCurrentUser(user));
    }).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

export const registerComplaint = (userData,history) => dispatch => {
  axios.post("/api/customers/Registercomplaint",userData).then(
    res => {
      history.push("kharidaardashboard")
        return
    }).catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  )
}

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/Companylogin", userData)
    .then(res => {
      // Save to localStorage
// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // console.log(decoded)
      localStorage.setItem("COMPANY", JSON.stringify(decoded))
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("COMPANY")
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};