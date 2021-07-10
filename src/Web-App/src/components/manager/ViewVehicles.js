import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideNavbar from "../layout/SideNavbar"
import classnames from "classnames";
import QRCode from "react-qr-code";

class ViewVehicles extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
        // this.download = this.download.bind(this);
    };
    async componentDidMount() {
        // this.download()
        const info = {
            managerid: this.props.auth.user.id
        }
        axios.post("/api/managers/Viewvehicles", info).then(res => {
            // console.log(res)
            for(var i = 0; i<res.data.length;i++){
                res.data[i].rcenddate = new Date(res.data[i].rcenddate)
                res.data[i].pucenddate = new Date(res.data[i].pucenddate)
                res.data[i].fitnessenddate = new Date(res.data[i].fitnessenddate)
                res.data[i].quarterlytaxenddate = new Date(res.data[i].quarterlytaxenddate)
                res.data[i].greentaxenddate = new Date(res.data[i].greentaxenddate)
                res.data[i].insuranceenddate = new Date(res.data[i].insuranceenddate)
                var test = res.data[i].rcenddate
                res.data[i].rcenddate = test.getDate().toString() + "/" + test.getMonth().toString() + "/" + test.getFullYear().toString()
                test = res.data[i].pucenddate
                res.data[i].pucenddate = test.getDate().toString() + "/" + test.getMonth().toString() + "/" + test.getFullYear().toString()
                test = res.data[i].fitnessenddate
                res.data[i].fitnessenddate = test.getDate().toString() + "/" + test.getMonth().toString() + "/" + test.getFullYear().toString()
                test = res.data[i].quarterlytaxenddate
                res.data[i].quarterlytaxenddate = test.getDate().toString() + "/" + test.getMonth().toString() + "/" + test.getFullYear().toString()
                test = res.data[i].insuranceenddate
                res.data[i].insuranceenddate = test.getDate().toString() + "/" + test.getMonth().toString() + "/" + test.getFullYear().toString()
                test = res.data[i].greentaxenddate
                res.data[i].greentaxenddate = test.getDate().toString() + "/" + test.getMonth().toString() + "/" + test.getFullYear().toString()
            }
            // console.log(res.data)
            this.setState({ data: res.data });
        })

    }

    // downloadQR(LPN){
        // const canvas = document.getElementById(LPN);
        // const pngUrl = canvas
        //   .toDataURL("image/png")
        //   .replace("image/png", "image/octet-stream");
        // let downloadLink = document.createElement("a");
        // downloadLink.href = pngUrl;
        // downloadLink.download = LPN.toString() +".png";
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
        // document.body.removeChild(downloadLink);
    //   };

    render() {

        let data = this.state.data;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "15%" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "85%", paddingLeft: "0px" }} className="container">
                    {data.map(vehicle => (
                        <div className="card green" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%" }}>
                            <div className="card-body">
                                <h3 className="card-title center text-primary">License Plate Number: {vehicle.licenseplatenumber}</h3>
                                <div style={{marginTop:"5px",paddingBottom:"5px"}}>
                                    <div style={{display:"flex", flexDirection:"row"}}>
                                        <div style={{ width: "50%" }}>PUC Expiry Date: {vehicle.pucenddate}</div>
                                        <div style={{ width: "50%",marginLeft:"20%" }}>RC Expiry Date: {vehicle.rcenddate}</div>
                                    </div>
                                </div>
                                <div style={{marginTop:"5px",paddingBottom:"5px"}}>
                                    <div style={{display:"flex", flexDirection:"row"}}>
                                        <div style={{ width: "50%" }}>Fitness Expiry Date: {vehicle.fitnessenddate}</div>
                                        <div style={{ width: "50%",marginLeft:"20%" }}>Quarterly Tax Due Date: {vehicle.quarterlytaxenddate}</div>
                                    </div>
                                </div>
                                <div style={{marginTop:"5px",paddingBottom:"5px"}}>
                                    <div style={{display:"flex", flexDirection:"row"}}>
                                        <div style={{ width: "50%" }}>Insurance Expiry Date: {vehicle.insuranceenddate}</div>
                                        <div style={{ width: "50%",marginLeft:"20%" }}>Green Tax Due Date: {vehicle.greentaxenddate}</div>
                                    </div>
                                </div>
                            </div>
                            QR Code:
                            <div className="center">
                                <QRCode id={vehicle.licenseplatenumber} value={vehicle.licenseplatenumber} />
                                {/* <button onClick={this.downloadQR(vehicle.licenseplatenumber)}> Download QR </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        );
    }
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {})(ViewVehicles);