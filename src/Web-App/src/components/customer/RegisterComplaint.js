import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-dropdown';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerComplaint } from "../../actions/authActions";
import classnames from "classnames";
import SideNavbar from "./SideNavbar";

class RegisterComplaint extends Component {
    constructor() {
        super();
        this.state = {
            managerid: "",
            customerid: "",
            complaint: "",
            email: "",
            num: 0
        };
    }
    componentDidMount() {
        // console.log(this.props.auth.user)
        this.setState({ managerid: this.props.auth.user.managerid })
        this.setState({ customerid: this.props.auth.user.id })
        this.setState({ email: this.props.auth.user.email })
    }

    onChange = async e => {
        await this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = async e => {
        e.preventDefault();
        const userData = {
            managerid: this.state.managerid,
            customerid: this.state.customerid,
            complaint: this.state.complaint,
            email: this.state.email
        };
        // console.log(userData)
        await this.props.registerComplaint(userData, this.props.history);
        await this.setState({ num: 1 })
    };
    render() {
        const { errors } = this.state;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    <div style={{marginLeft:"20%",marginRight:"20%",marginTop:"10%"}}>
                        <form onSubmit={this.onSubmit}>
                            <h4>Found Something Bad about the system?...Don't Worry we would like to hear the complaint. Tell us..</h4>
                            <input
                                style={{ borderBlockStyle: "solid", borderRadius: "10px" }}
                                onChange={this.onChange}
                                value={this.state.complaint}
                                id="complaint"
                                type="text"
                                required
                            />
                            <label htmlFor="complaint">COMPLAINT</label>
                            
                            <button
                                style={{
                                    width: "54%",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px",
                                    marginTop: "1rem"
                                }}
                                type="submit"
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                            >
                                Complain
                    </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

RegisterComplaint.propTypes = {
    registerComplaint: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerComplaint }
)(RegisterComplaint);