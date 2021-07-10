import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Dropdown from 'react-dropdown';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { requestCans } from "../../actions/authActions";
import classnames from "classnames";
import SideNavbar from "./SideNavbar";
import DatePicker from "react-date-picker"


class RequestCans extends Component {
    constructor() {
        super();
        this.state = {
            deliverydate: new Date(),
            requested: 0,
            email: "",
            errors: {},
            cansrequired: 0,
            num: 0
        };
    }
    
    async componentDidMount() {
        // console.log(this.props.auth.user) new Date(res.data[i].rcenddate)
        // console.log(this.props.auth.user)
        await this.setState({ deliverydate: new Date(this.props.auth.user.deliverydate)})
        await this.setState({ email: this.props.auth.user.email })
        await this.setState({ requested: this.props.auth.user.requested })
        await this.setState({ cansrequired: this.props.auth.user.cansrequired })
        // console.log(this.state.deliverydate)
    }
    componentWillReceiveProps(nextProps) {
        // console.log("test")
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
    onChangeDate(e,id){
        // console.log(e)
        this.setState({ [id]: e });
    };
    onSubmit = async e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            cansrequired: this.state.cansrequired,
            deliverydate: this.state.deliverydate
        };
        await this.props.requestCans(userData, this.props.auth.user);
        await this.setState({ num: 1 })
    };
    render() {
        const { errors } = this.state;
        var actStat = this.state.requested;
        var { user } = this.props.auth;
       
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
                            <div>
                                <h4>
                                    <b>Hey there,</b> {user.name.split(" ")[0]}
                                    <p className="flow-text grey-text text-darken-1">
                                        Wanna edit your request, Lets edit it (the fields have the old values)
                                    </p>
                                </h4>
                            </div>
                        ) : (
                            <div>
                                <h4>
                                    <b>Hey there,</b> {user.name.split(" ")[0]}
                                    <p className="flow-text grey-text text-darken-1">
                                        You Have not made a special request yet, Lets make a new one...
                                    </p>
                                </h4>
                            </div>
                        )}
                        <div style={{marginLeft:"30%",height:"40%",marginRight:"30%",marginTop:"20%",backgroundColor:"#FFFFFF",borderRadius:"10px"}}>
                            <h4 className="text-muted center blue-text">Request Details (change if required)</h4>
                            <form style={{paddingTop:"5%",paddingBottom:"5%"}} onSubmit={this.onSubmit}>
                                <div className="form-group" style={{marginLeft:"10%",marginRight:"10%",marginBottom:"5%"}}>
                                    <input
                                        style={{borderBlockStyle:"solid",borderRadius:"10px"}}
                                        onChange={this.onChange}
                                        value={this.state.cansrequired}
                                        error={errors.cansrequired}
                                        id="cansrequired"
                                        type="number"
                                        className={classnames("", {
                                            invalid: errors.cansrequired
                                        })}
                                    />
                                    <label htmlFor="cansrequired">Filled Cans required...</label>
                                    <span className="red-text">
                                        {errors.cansrequired}
                                    </span>
                                </div>
                                <div className="input-group date" style={{marginLeft:"10%",marginTop:"5%",marginRight:"10%",borderBlockStyle:"solid",borderRadius:"10px"}}>
                                      <DatePicker 
                                      value={this.state.deliverydate}
                                      id="deliverydate"
                                      onChange={e => this.onChangeDate(e,"deliverydate")}
                                      />
                                      <label htmlFor="deliverydate">Select the Date before which you want your delivery..</label>
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
                                    Request
                                        </button>
                                </div>
                            </form>
                        </div>
                            
                    </div>
                </div>
            </div>
        );
    }
}

RequestCans.propTypes = {
    requestCans: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { requestCans }
)(RequestCans);