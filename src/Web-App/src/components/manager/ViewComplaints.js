import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideNavbar from "../layout/SideNavbar"
import classnames from "classnames";
import QRCode from "react-qr-code";

class ViewComplaints extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            num:0
        };
        // this.download = this.download.bind(this);
    };
    async componentDidMount() {
        // this.download()
        const info = {
            managerid: this.props.auth.user.id
        }
        axios.post("/api/managers/Viewcomplaints", info).then(async res => {
            this.setState({ data: res.data });
        })
    }
    onClick = async (e,index)  =>{
        e.preventDefault()
        const info = {
            id : e.target.id,
            managerid: this.props.auth.user.id
        }
        // console.log(info)
        await axios.post("/api/managers/Deletecomplaint",info).then(async () => {
            await axios.post("/api/managers/Viewcomplaints", info).then(async res => {
                this.setState({ data: res.data });
            })
        })
    }
    render() {

        let data = this.state.data;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "15%" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "85%", paddingLeft: "0px" }} className="container">
                    {(data.length == 0
                    )?(
                        <h3>Congratulations! there are no complaints logged against you.</h3>
                    ):(
                        <h3>Complaints Registered are: </h3>
                    )}
                    {data.map((complaint,index) => (
                        <div className="card white" style={{ width: "80%", paddingBottom:"2%",marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%" }}>
                            <div className="card-body">
                                <div style={{display:"flex",flexDirection:"column"}}>
                                    <div>
                                        <h5 >Customer's email Address: {complaint.email}</h5>
                                        <h5>Complaint logged:</h5>
                                        <p>{complaint.complaint}</p>
                                    </div>
                                    <div style={{display:"flex",flexDirection:"row"}}>
                                        <button id={complaint._id} className="btn btn-large waves-effect waves-light hoverable blue accent-3" onClick={e => this.onClick(e,index)} style={{width:"50%"}}>Delete Complaint</button>
                                    </div>
                                </div>
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
export default connect(mapStateToProps, {})(ViewComplaints);