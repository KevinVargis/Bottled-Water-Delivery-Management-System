import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link,withRouter } from "react-router-dom";
import "./SideNav.css"
class SideNavbar extends Component {
    onClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    }
    onClickFaltu = e =>{
        e.preventDefault()
    }
  render() {
    return (
        <div id="viewport">
            <div id="sidebar" style={{ padding:"0", backgroundColor:"#e2dccd"}}>
              <ul className="nav">
                <li >
                    <Link to="/managerdashboard" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> My Dashboard
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/createsupervisor" style={{width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Create SuperVisor
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/createcustomer" style={{width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Create Customer
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/createdeliveryboy" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Create Delivery Boy
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/createdeliverydriver" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Create Delivery Driver
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/viewcomplaints" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> View Complaints
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/viewvehicles" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> View Vehicles
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/createvehicle" style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Add Vehicle
                    </Link>
                </li>
                <li style={{marginTop:"5%"}}>
                    <Link to="/" onClick={this.onClick} style={{ width:"100%", borderRadius: "3px", letterSpacing: "1.5px"}}className="btn btn-large waves-effect waves-light hoverable black accent-3">
                        <i className="zmdi zmdi-view-dashboard"></i> Logout
                    </Link>
                </li>
              </ul>
            </div>
      </div>
    );
  }
}
SideNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps, { logoutUser })(withRouter(SideNavbar));