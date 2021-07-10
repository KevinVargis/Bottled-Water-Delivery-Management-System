import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CreateSupervisor.css"
import { registerSupervisor } from "../../actions/authActions";
import SideNavbar from "../layout/SideNavbar"
import classnames from "classnames";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CreateSupervisor extends Component {
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
        type:"S",
        password1:"",
        password2:"",
        email:"",
        phonenum : "",
        errors:{}
    };
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
const newUser = {
        name:this.state.name,
        aadharnum:this.state.aadharnum,
        line1:this.state.line1,
        line2:this.state.line2,
        line3:this.state.line3,
        pincode:this.state.pincode,
        type:"S",
        password1:this.state.password1,
        password2:this.state.password2,
        email:this.state.email,
        phonenum : this.state.phonenum,
        managerid: this.props.auth.user.id,
        companyid: this.props.auth.user.companyid
    };
    this.props.registerSupervisor(newUser, this.props.history); 

  };
render() {
    const { errors } = this.state;
return (
    <div style={{display:"flex",flexDirection:"row"}}>
    <div style={{width:"15%"}}>
        <SideNavbar></SideNavbar>
    </div>
    <div style={{width:"85%",paddingLeft:"0px"}} className="container">
        <div className="main-bg" style={{width:"100%",marginLeft:"0px"}}>
            <div className="login-container text-c animated flipInX">
                <div>
                    <h1 className="logo-badge text-whitesmoke">
                    <FontAwesomeIcon icon={faUser} />
                    </h1>
                </div>
                <h3 className="text-whitesmoke">Supervisor Sign Up</h3>
                <p className="text-whitesmoke">Sign Up</p>
                <div className="container-content">
                    <form className="margin-t">
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.name}
                                error={errors.name}
                                id="name"
                                type="text"
                                placeholder="Username"
                                className={classnames("form-control", {
                                  invalid: errors.name
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="text"
                                placeholder="Email"
                                className={classnames("form-control", {
                                  invalid: errors.email
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.aadharnum}
                                error={errors.aadharnum}
                                id="aadharnum"
                                type="text"
                                placeholder="Aadhar Number"
                                className={classnames("form-control", {
                                  invalid: errors.aadharnum
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.phonenum}
                                error={errors.phonenum}
                                id="phonenum"
                                type="text"
                                placeholder="Phone Number"
                                className={classnames("form-control", {
                                  invalid: errors.phonenum
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.line1}
                                error={errors.line1}
                                id="line1"
                                type="text"
                                placeholder="Address Line 1"
                                className={classnames("form-control", {
                                  invalid: errors.line1
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.line2}
                                error={errors.line2}
                                id="line2"
                                type="text"
                                placeholder="Address Line 2"
                                className={classnames("form-control", {
                                  invalid: errors.line2
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.line3}
                                error={errors.line3}
                                id="line3"
                                type="text"
                                placeholder="Address Line 3"
                                className={classnames("form-control", {
                                  invalid: errors.line3
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.pincode}
                                error={errors.pincode}
                                id="pincode"
                                type="number"
                                placeholder="Pincode"
                                className={classnames("form-control", {
                                  invalid: errors.pincode
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.password1}
                                error={errors.password1}
                                id="password1"
                                type="password"
                                placeholder="Password"
                                className={classnames("form-control", {
                                  invalid: errors.password1
                                })}
                                required=""
                            />
                        </div>
                        <div className="form-group">
                            <input
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                placeholder="Confirm Password"
                                className={classnames("form-control", {
                                  invalid: errors.password1
                                })}
                                required=""
                            />
                        </div>
                        <button type="submit" onClick={this.onSubmit} className="form-button button-l margin-b">Create</button>
                    </form>
                </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

CreateSupervisor.propTypes = {
    registerSupervisor: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    {registerSupervisor}
  )(withRouter(CreateSupervisor));  //add registerSupervisor in the curly braces