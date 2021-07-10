import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-dropdown';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { modifySubs } from "../../actions/authActions";
import classnames from "classnames";
import SideNavbar from "./SideNavbar";
import QRCode from "react-qr-code";

class ViewQr extends Component {
    constructor() {
        super();
        this.state = {
            user: ""
        };
    }
    componentDidMount() {
        // console.log(this.props.auth.user)
        this.setState({ user: this.props.auth.user })
    }
    render() {
        var { user } = this.props.auth;
        
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    <h3>QR Code:</h3>
                    <div className="center">
                        <QRCode id={user.email} value={user.email} />
                        {/* <button onClick={this.downloadQR(vehicle.licenseplatenumber)}> Download QR </button> */}
                    </div>
                </div>
            </div>
        );
    }
}

ViewQr.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {  }
)(ViewQr);