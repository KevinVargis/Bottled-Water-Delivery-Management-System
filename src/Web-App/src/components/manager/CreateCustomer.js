import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import "./CreateCustomer.css"
import { registerCustomer } from "../../actions/authActions";
import SideNavbar from "../layout/SideNavbar"
import classnames from "classnames";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


// const mapStyles = {
    // width: '40%',
    // height: '40%'
// };
  
//companyid
//managerid
//gecoordinates => latitude

class CreateCustomer extends Component {
    constructor() {
        super();
        // companyid=,
        this.state = {
            name:"",
            aadharnum:"",
            line1:"",
            line2:"",
            line3:"",
            pincode:"",
            type:"K",
            phonenum : "",
            email:"",
            latitude:0,
            longitude:0,
            password1:"",
            password2:"",
            errors:{}
        };
        this.componentWillMount = this.componentWillMount.bind(this)
    }
    componentWillMount(){
        // console.log("aaradhya ne foda")
        var lat,long
        var cpy = this
        navigator.geolocation.getCurrentPosition(function(position) {
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            lat = position.coords.latitude
            long = position.coords.longitude
            cpy.setState({latitude:lat})
            cpy.setState({longitude:long})
          });
        // this.setState({latitude:lat})
        // this.setState({longitude:long})
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        // companyid=this.state.companyid,
        var geocoors = {
            latitude : this.state.latitude,
            longitude : this.state.longitude
        }
        const newUser = {
            name:this.state.name,
            aadharnum:this.state.aadharnum,
            line1:this.state.line1,
            line2:this.state.line2,
            line3:this.state.line3,
            pincode:this.state.pincode,
            type:"K",
            password1:this.state.password1,
            password2:this.state.password2,
            email:this.state.email,
            phonenum : this.state.phonenum,
            geocoordinates:geocoors,
            companyid : this.props.auth.user.companyid,
            managerid : this.props.auth.user.id
        };
        // console.log(newUser)
        this.props.registerCustomer(newUser, this.props.history); 

    };
    render() {
        const { errors } = this.state;
        return (
            <div style={{display:"flex",flexDirection:"row"}}>
                <div style={{width:"15%"}}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{width:"35%",marginLeft:"25%",marginRight:"25%",display:"flex",flexDirection:"column"}}>
                    <form method="get" action="javascript: void(0);" id="login-form" className="login-form" autocomplete="off" role="main">        
                        <h1 className="a11y-hidden">Login Form</h1>
                        <div>
                            <label className="label-email">

                                <input
                                    onChange={this.onChange}
                                    value={this.state.name}
                                    error={errors.name}
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className={classnames("text", {
                                      invalid: errors.name
                                    })}
                                    tabIndex="1"
                                    required=""
                                />
                                <span className="required">Name</span>
                            </label>
                        </div>
                        <div>
                            <label className="label-email">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    className={classnames("text", {
                                      invalid: errors.email
                                    })}
                                    tabIndex="1"
                                    required="true"
                                />
                                <span className="required">Email</span>
                            </label>
                        </div>
                        <div>
                            <label className="label-email">

                                <input
                                    onChange={this.onChange}
                                    value={this.state.aadharnum}
                                    error={errors.aadharnum}
                                    id="aadharnum"
                                    type="text"
                                    name="aadharnum"
                                    placeholder="Aadhar Number"
                                    className={classnames("text", {
                                      invalid: errors.aadharnum
                                    })}
                                    tabIndex="1"
                                    required=""
                                />
                                <span className="required">Aadhar Number</span>
                            </label>
                        </div>
                        <div>
                            <label className="label-email">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.phonenum}
                                    error={errors.phonenum}
                                    id="phonenum"
                                    type="text"
                                    name="phonenum"
                                    placeholder="Phone Number"
                                    className={classnames("text", {
                                      invalid: errors.phonenum
                                    })}
                                    tabIndex="1"
                                    required=""
                                />
                                <span className="required">Phone Number</span>
                            </label>
                        </div>
                        <div>
                            <label className="label-email">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.line1}
                                    error={errors.line1}
                                    id="line1"
                                    type="text"
                                    name="line1"
                                    placeholder="Address Line 1"
                                    className={classnames("text", {
                                      invalid: errors.line1
                                    })}
                                    tabIndex="1"
                                    required=""
                                />
                                <span className="required">Address Line 1</span>
                            </label>
                        </div>
                        <div>
                            <label className="label-email">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.line2}
                                    error={errors.line2}
                                    id="line2"
                                    type="text"
                                    name="line2"
                                    placeholder="Address Line 2"
                                    className={classnames("text", {
                                      invalid: errors.line2
                                    })}
                                    tabIndex="1"
                                    required=""
                                />
                                <span className="required">Address Line 2</span>
                            </label>
                        </div>
                        <div>
                            <label className="label-email">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.line3}
                                    error={errors.line3}
                                    id="line3"
                                    type="text"
                                    name="line3"
                                    placeholder="Address Line 3"
                                    className={classnames("text", {
                                      invalid: errors.line3
                                    })}
                                    tabIndex="1"
                                    required=""
                                />
                                <span className="required">Address Line 3</span>
                            </label>
                        </div>
                        <div>
                            <label className="label-email">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.pincode}
                                    error={errors.pincode}
                                    id="pincode"
                                    type="text"
                                    name="pincode"
                                    placeholder="Pincode"
                                    className={classnames("text", {
                                      invalid: errors.pincode
                                    })}
                                    tabIndex="1"
                                    required=""
                                />
                                <span className="required">Pincode</span>
                            </label>
                        </div>
                        <input type="checkbox" name="show-password" className="show-password a11y-hidden" id="show-password" tabIndex="3" />
                        <label className="label-show-password" for="show-password">
                            <span>Show Password</span>
                        </label>
                        <div>
                            <label className="label-password">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password1}
                                    error={errors.password1}
                                    id="password1"
                                    type="text"
                                    name="password"
                                    placeholder="Password"
                                    tabIndex="2"
                                    className={classnames("test", {
                                      invalid: errors.password1
                                    })}
                                    required
                                />
                                <span className="required">Password</span>
                            </label>
                        </div>
                        <div>
                            <label className="label-password">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password2}
                                    error={errors.password2}
                                    id="password2"
                                    type="text"
                                    name="password"
                                    placeholder="Confirm Password"
                                    tabIndex="2"
                                    className={classnames("test", {
                                      invalid: errors.password2
                                    })}
                                    required
                                />
                                <span className="required">Confirm Password</span>
                            </label>
                        </div>
                        {/* <button type="submit" onClick={this.onSubmit} style={{marginTop:"1px"}}>Create</button> */}
                        <input type="submit" onClick={this.onSubmit} value="Create" />
                        <figure aria-hidden="true">
                            <div className="person-body"></div>
                            <div className="neck skin"></div>
                            <div className="head skin">
                                <div className="eyes"></div>
                                <div className="mouth"></div>
                            </div>
                            <div className="hair"></div>
                            <div className="ears"></div>
                            <div className="shirt-1"></div>
                            <div className="shirt-2"></div>
                        </figure>
                    </form>
                </div>
            </div>
        );
    }
}

CreateCustomer.propTypes = {
    registerCustomer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {registerCustomer}
)(withRouter(CreateCustomer));  //add registerCustomer in the curly braces