import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./CreateBoy.scss"
import { registerBoy } from "../../actions/authActions";
import SideNavbar from "../layout/SideNavbar"
import classnames from "classnames";
import { faUser,faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class CreateBoy extends Component {
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
        type:"B",
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
        type:"B",
        password1:this.state.password1,
        password2:this.state.password2,
        email:this.state.email,
        phonenum : this.state.phonenum,
        companyid : this.props.auth.user.companyid,
        managerid : this.props.auth.user.id
    };
    // console.log(newUser)
    this.props.registerBoy(newUser, this.props.history); 

  };
render() {
    const { errors } = this.state;
return (
    <div style={{display:"flex",flexDirection:"row"}}>
      <div style={{width:"15%"}}>
          <SideNavbar></SideNavbar>
      </div>
      <div id="body-substitute" style={{width:"45%",marginLeft:"20%",marginRight:"20%"}} className="container">
        <form className="login-form-copy" style={{width:"80%"}} action="javascript:void(0);">
          <div>
            <h1 className="logo-badge text-whitesmoke">
              <FontAwesomeIcon icon={faCar} />
            </h1>
          </div>
          <h1 id="h1">Create Delivery Boy</h1>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              id="name"
              type="text"
              autoComplete="off"
              placeholder="Username"
              className={classnames("form-control-material", {
                invalid: errors.name
              })}
              required
            />
            <label htmlFor="name">Username</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.aadharnum}
              error={errors.aadharnum}
              id="aadharnum"
              type="text"
              autoComplete="off"
              placeholder="Aadhar Number"
              className={classnames("form-control-material", {
                invalid: errors.aadharnum
              })}
              required
            />
            <label htmlFor="aadharnum">Aadhar Number</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.phonenum}
              error={errors.phonenum}
              id="phonenum"
              type="text"
              autoComplete="off"
              placeholder="Phone Number"
              className={classnames("form-control-material", {
                invalid: errors.phonenum
              })}
              required
            />
            <label htmlFor="phonenum">Phone Number</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              id="email"
              type="text"
              autoComplete="off"
              placeholder="Email"
              className={classnames("form-control-material", {
                invalid: errors.email
              })}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.line1}
              error={errors.line1}
              id="line1"
              type="text"
              autoComplete="off"
              placeholder="Address Line 1"
              className={classnames("form-control-material", {
                invalid: errors.line1
              })}
              required
            />
            <label htmlFor="line1">Address Line 1</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.line2}
              error={errors.line2}
              id="line2"
              type="text"
              autoComplete="off"
              placeholder="Address Line 2"
              className={classnames("form-control-material", {
                invalid: errors.line2
              })}
              required
            />
            <label htmlFor="line2">Address Line 2</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.line3}
              error={errors.line3}
              id="line3"
              type="text"
              autoComplete="off"
              placeholder="Address Line 3"
              className={classnames("form-control-material", {
                invalid: errors.line3
              })}
              required
            />
            <label htmlFor="line3">Address Line 3</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.pincode}
              error={errors.pincode}
              id="pincode"
              type="number"
              autoComplete="off"
              placeholder="Pincode"
              className={classnames("form-control-material", {
                invalid: errors.pincode
              })}
              required
            />
            <label htmlFor="pincode">Pincode</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.password1}
              error={errors.password1}
              id="password1"
              type="password"
              autoComplete="off"
              placeholder="Password"
              className={classnames("form-control-material", {
                invalid: errors.password1
              })}
              required
            />
            <label htmlFor="password1">Password</label>
          </div>
          <div className="form-input-material">
            <input
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              id="password2"
              type="password"
              autoComplete="off"
              placeholder="Confirm Password"
              className={classnames("form-control-material", {
                invalid: errors.password2
              })}
              required
            />
            <label htmlFor="password2">Confirm Password</label>
          </div>
          <input type="submit" onClick={this.onSubmit} value="Create" />
        </form>
      </div>
    </div>
    );
  }
}

CreateBoy.propTypes = {
    registerBoy: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    { registerBoy}
  )(withRouter(CreateBoy));  //add registerBoy in the curly braces