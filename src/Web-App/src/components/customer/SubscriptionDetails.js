import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-dropdown';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { modifySubs } from "../../actions/authActions";
import classnames from "classnames";
import SideNavbar from "./SideNavbar";


var MAPPER = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
}

class SubscriptionDetails extends Component {
    constructor() {
        super();
        this.state = {
            subscansrequired: 0,
            day: 0,
            email: "",
            errors: {},
            active: 0,
            num: 0
        };
    }
    componentDidMount() {
        // console.log(this.props.auth.user)
        this.setState({ day: this.props.auth.user.day })
        this.setState({ email: this.props.auth.user.email })
        this.setState({ active: this.props.auth.user.active })
        this.setState({ subscansrequired: this.props.auth.user.subscansrequired })
    }
    componentWillReceiveProps(nextProps) {
        if (Object.entries(nextProps.errors).length != 0) {
            // console.log("test1") 
            // console.log(nextProps.errors)
            this.setState({
                errors: nextProps.errors
            });
        }
        else {
            // console.log("test")
            this.props.history.push("/kharidaardashboard")
        }
    }

    onChange = async e => {
        await this.setState({ [e.target.id]: e.target.value });
    };
    onselectDay = async e => {
        // console.log(MAPPER)
        // console.log(e.value)
        // console.log(MAPPER[e.value])
        await this.setState({ day: MAPPER[e.value] });
        // console.log(this.state)
        // console.log(MAPPER[e.value])
        // console.log(this.state.day)
    }
    onSubmit = async e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            subscansrequired: this.state.subscansrequired,
            day: this.state.day
        };
        // console.log(userData)
        await this.props.modifySubs(userData, this.props.auth.user);
        await this.setState({ num: 1 })
    };
    render() {
        const { errors } = this.state;
        var actStat = this.state.active;
        var { user } = this.props.auth;
        const days = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ]
        // console.log(days[this.state.day])
        // console.log("Kartik")
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    <div className="container">
                        {(
                            actStat == 1
                        ) ? (
                                <div style={{marginLeft:"30%",height:"40%",marginRight:"30%",marginTop:"20%",backgroundColor:"#FFFFFF",borderRadius:"10px"}}>
                                    <h4 className="text-muted center blue-text">Subscription Details (change if required)</h4>
                                    <form style={{paddingTop:"5%",paddingBottom:"5%"}} onSubmit={this.onSubmit}>
                                        <div className="form-group" style={{marginLeft:"10%",marginRight:"10%",marginBottom:"5%"}}>
                                            <input
                                                style={{borderBlockStyle:"solid",borderRadius:"10px"}}
                                                onChange={this.onChange}
                                                value={this.state.subscansrequired}
                                                error={errors.subscansrequired}
                                                id="subscansrequired"
                                                type="number"
                                                className={classnames("", {
                                                    invalid: errors.subscansrequired
                                                })}
                                            />
                                            <label htmlFor="subscansrequired">Filled Cans to be delivered on each delivery..</label>
                                            <span className="red-text">
                                                {errors.subscansrequired}
                                            </span>
                                        </div>
                                        <div className="dropdown-menu" style={{marginLeft:"10%",marginTop:"5%",marginRight:"10%",borderBlockStyle:"solid",borderRadius:"10px"}}>
                                            <Dropdown options={days} onChange={this.onselectDay} value={days[this.state.day]} placeholder="Select Day of Delivery" />
                                        </div>
                                        <div style={{ marginLeft:"35%",marginRight:"11%"}}>
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
                                            Update
                                                </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    <h4>
                                        <b>Hey there,</b> {user.name.split(" ")[0]}
                                        <p className="flow-text grey-text text-darken-1">
                                            You Have not Activated your Subscription, kindly activate it by navigating to Dashboard...
                                </p>
                                    </h4>
                                    <div>
                                        <Link to="/kharidaardashboard" style={{ width: "20%", borderRadius: "3px", letterSpacing: "1.5px" }} className="btn btn-large waves-effect waves-light hoverable black accent-3">
                                            <i className="zmdi zmdi-view-dashboard"></i> Dashboard
                                        </Link>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}

SubscriptionDetails.propTypes = {
    modifySubs: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { modifySubs }
)(SubscriptionDetails);