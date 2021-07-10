import React, { Component } from "react";
import { Link,withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createVehicle } from "../../actions/authActions"; //change for createVehicle
import SideNavbar from "../layout/SideNavbar"
import classnames from "classnames";
import { faUser,faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-date-picker"

class CreateVehicle extends Component {
  constructor() {
    super();
    // companyid=,
    this.state = {
        licenseplatenumber : "",
        rcenddate : new Date(),
        pucenddate : new Date(),
        fitnessenddate : new Date(),
        quarterlytaxenddate : new Date(),
        greentaxenddate : new Date(),
        insuranceenddate : new Date(),
        rc : "",
        insurance : "",
        puc : "",
        fitness : "",
        quarterlytax : "",
        greentax : "",
        photo : "",
        errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    // console.log("Kartik")
    // console.log(nextProps.errors)
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  onChangeText = e =>{
    this.setState({ [e.target.id]: e.target.value });
  }
  onChange = e => {
    let files = e.target.files
    this.setState({ [e.target.id]: files[0] });
  };
    onChangeDate(e,id){
    // console.log(e)
    this.setState({ [id]: e });
  };
onSubmit = e => {
    e.preventDefault();
    // companyid=this.state.companyid,
const newVehicle = {
        licenseplatenumber : this.state.licenseplatenumber,
        rcenddate : this.state.rcenddate,
        pucenddate : this.state.pucenddate,
        fitnessenddate : this.state.fitnessenddate,
        quarterlytaxenddate : this.state.quarterlytaxenddate,
        greentaxenddate : this.state.greentaxenddate,
        insuranceenddate : this.state.insuranceenddate,
        rc : this.state.rc,
        insurance : this.state.insurance,
        puc : this.state.puc,
        fitness : this.state.fitness,
        quarterlytax : this.state.quarterlytax,
        greentax : this.state.greentax,
        photo :this.state.photo,
        companyid : this.props.auth.user.companyid,
        managerid : this.props.auth.user.id
    };
    // console.log(newVehicle)
    this.props.createVehicle(newVehicle, this.props.history); //update for createVehicle

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
          <h1 id="h1" style={{fontSize:"50px"}}>Add Vehicle</h1>
          {/* <div className="form-input-material">
            <input
              onChange={this.onChange}
              // value={this.state.photo}
              error={errors.photo}
              id="photo"
              type="file"
              placeholder="Upload Image"
              className={classnames("form-control-material", {
                invalid: errors.photo
              })}
              required
            />
            <label htmlFor="photo">Choose Image</label>
          </div> */}
          <div className="form-input-material">
            <input
              onChange={this.onChangeText}
              value={this.state.licenseplatenumber}
              error={errors.licenseplatenumber}
              id="licenseplatenumber"
              type="text"
              autoComplete="off"
              placeholder="License Plate Number"
              className={classnames("form-control-material", {
                invalid: errors.licenseplatenumber
              })}
              required
            />
            <label htmlFor="licenseplatenumber">License Plate Number</label>
          </div>
          {/* <div className="form-input-material">
            <input
              onChange={this.onChange}
              // value={this.state.rc}
              error={errors.rc}
              id="rc"
              type="file"
              placeholder="Upload RC(*pdf)"
              className={classnames("form-control-material", {
                invalid: errors.rc
              })}
              required
            />
            <label htmlFor="rc">Choose File</label>
          </div> */}
          <div className="form-input-material">
            <DatePicker 
            value={this.state.rcenddate}
            id="rcenddate"
            onChange={e => this.onChangeDate(e,"rcenddate")}
            />
            <label htmlFor="rcenddate">Select Expiry Date of RC</label>
          </div>
          {/* <div className="form-input-material">
            <input
              onChange={this.onChange}
              // value={this.state.puc}
              error={errors.puc}
              id="puc"
              type="file"
              placeholder="Upload PUC(*pdf)"
              className={classnames("form-control-material", {
                invalid: errors.puc
              })}
              required
            />
            <label htmlFor="puc">Choose File</label>
          </div> */}
          <div className="form-input-material">
            <DatePicker 
            value={this.state.pucenddate}
            id="pucenddate"
            onChange={e => this.onChangeDate(e,"pucenddate")}
            />
            <label htmlFor="pucenddate">Select Expiry Date of PUC</label>
          </div>
          {/* <div className="form-input-material">
            <input
              onChange={this.onChange}
              // value={this.state.fitness}
              error={errors.fitness}
              id="fitness"
              type="file"
              placeholder="Upload Fitness(*pdf)"
              className={classnames("form-control-material", {
                invalid: errors.fitness
              })}
              required
            />
            <label htmlFor="fitness">Choose File</label>
          </div> */}
          <div className="form-input-material">
            <DatePicker 
            value={this.state.fitnessenddate}
            id="fitnessenddate"
            onChange={e => this.onChangeDate(e,"fitnessenddate")}
            />
            <label htmlFor="fitnessenddate">Select Expiry Date of Fitness</label>
          </div>
          {/* <div className="form-input-material">
            <input
              onChange={this.onChange}
              // value={this.state.insurance}
              error={errors.insurance}
              id="insurance"
              type="file"
              placeholder="Upload Insurance(*pdf)"
              className={classnames("form-control-material", {
                invalid: errors.insurance
              })}
              required
            />
            <label htmlFor="insurance">Choose File</label>
          </div> */}
          <div className="form-input-material">
            <DatePicker 
            value={this.state.insuranceenddate}
            id="insuranceenddate"
            onChange={e => this.onChangeDate(e,"insuranceenddate")}
            />
            <label htmlFor="insuranceenddate">Select Expiry Date of Insurance</label>
          </div>
          {/* <div className="form-input-material">
            <input
              onChange={this.onChange}
              // value={this.state.quarterlytax}
              error={errors.quarterlytax}
              id="quarterlytax"
              type="file"
              placeholder="Upload Quarterly Tax(*pdf)"
              className={classnames("form-control-material", {
                invalid: errors.quarterlytax
              })}
              required
            />
            <label htmlFor="quarterlytax">Choose File</label>
          </div> */}
          <div className="form-input-material">
            <DatePicker 
            value={this.state.quarterlytaxenddate}
            id="quarterlytaxenddate"
            onChange={e => this.onChangeDate(e,"quarterlytaxenddate")}
            />
            <label htmlFor="quarterlytaxenddate">Select Expiry Date of Quarterly Tax</label>
          </div>
          {/* <div className="form-input-material">
            <input
              onChange={this.onChange}
              // value={this.state.greentax}
              error={errors.greentax}
              id="greentax"
              type="file"
              placeholder="Upload Greentax(*pdf)"
              className={classnames("form-control-material", {
                invalid: errors.greentax
              })}
              required
            />
            <label htmlFor="greentax">Choose File</label>
          </div> */}
          <div className="form-input-material">
            <DatePicker 
            value={this.state.greentaxenddate}
            id="greentaxenddate"
            onChange={e => this.onChangeDate(e,"greentaxenddate")}
            />
            <label htmlFor="greentaxenddate">Select Expiry Date of Green Tax</label>
          </div>
          <button type="submit" onClick={this.onSubmit} className="form-button button-l margin-b">Create</button>
        </form>
      </div>
    </div>
    );
  }
}

CreateVehicle.propTypes = {
    createVehicle: PropTypes.func.isRequired, //update for createVehicle
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(
    mapStateToProps,
    {createVehicle }
  )(withRouter(CreateVehicle));  //add createVehicle in the curly braces