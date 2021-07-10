import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import classnames from "classnames";
import SideNavbar from "./SideNavbar";
import { faUser, faCar, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";


class Inventory extends Component {
    constructor() {
        super();
        this.state = {
            filled: 0,
            empty: 0,
            damaged: 0,
            supervisorid: "",
            filledadded: 0,
            filledremoved: 0,
            damagedadded: 0,
            damagedremoved: 0,
            emptyadded: 0,
            emptyremoved: 0,
            errors:{}
        };
    }
    componentWillMount() {
        this.setState({ supervisorid: this.props.auth.user.id });


    }
    componentDidMount() {
        // console.log("testing")
        // console.log(this.state)
        axios.post("/api/supervisors/Viewinventory", this.state).then(res => {
            // console.log("Kartik")
            // console.log(res.data)
            this.setState({ filled: res.data.filled })
            this.setState({ damaged: res.data.damaged })
            this.setState({ empty: res.data.empty })
        }).catch(err => {
            // console.log("kevin")
        });
        // console.log(this.state)
        // console.log("End")
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        var newData = {
            filledadded : parseInt(this.state.filledadded),
            filledremoved : parseInt(this.state.filledremoved),
            damagedadded : parseInt(this.state.damagedadded),
            damagedremoved : parseInt(this.state.damagedremoved),
            emptyadded : parseInt(this.state.emptyadded),
            emptyremoved : parseInt(this.state.emptyremoved),
            supervisorid : this.state.supervisorid
        }
        // console.log("TEst")
        // console.log(newData)
        axios.post("/api/supervisors/Manageinventory", newData).then(res => {
            // console.log("Kartik")
            // console.log(res.data)
            this.setState({ filled: res.data.filled })
            this.setState({ damaged: res.data.damaged })
            this.setState({ empty: res.data.empty })
            this.setState({filledadded:0})
            this.setState({filledremoved:0})
            this.setState({damagedadded:0})
            this.setState({damagedremoved:0})
            this.setState({emptyadded:0})
            this.setState({emptyremoved:0})
        }).catch(err => {
            console.log(err)
        });
    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        const { user } = this.props.auth;
        var filled = this.state.filled;
        var empty = this.state.empty;
        var damaged = this.state.damaged;
        var errors = this.state.errors;
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "84%" }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ width: "10%" }}>
                            <FontAwesomeIcon style={{ width: "60%", height: "10%", marginTop: "20%", marginLeft: "40%" }} icon={faWarehouse} />
                        </div>
                        <div style={{ width: "85%", display: "flex", marginLeft: "0", flexDirection: "column",marginBottom:"0px" }}>
                            <h1>Inventory details</h1>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <div className="card" style={{ width: "25%", height: "90%", marginLeft: "0%", marginRight: "5%" }}>
                                    <img className="card-img-top" style={{ height: "70%", width: "100%" }} src={'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2F20-l-plastic-mineral-water-jar-14718169873.html&psig=AOvVaw3mrwZ05bvSBxvvwzJPtN9t&ust=1619717777842000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMjtgo29ofACFQAAAAAdAAAAABAD'} alt="Filled Water Can" />
                                    <div className="card-body" style={{marginTop:"0px",marginBottom:"0px"}}>
                                        <h5 className="card-title heading center" style={{ marginLeft: "4%", marginRight: "4%",marginTop:"0px",marginBottom:"0px" }}><b>Filled Cans</b></h5>
                                        <p className="card-text" style={{ marginLeft: "47%", marginRight: "4%", fontSize: "25px",marginTop:"0px",marginBottom:"0px" }}>{filled}</p>
                                        <form style={{marginTop:"0px",marginBottom:"0px"}}>
                                            <div>
                                                <label for="filledadded" style={{marginTop:"0px",marginBottom:"0px"}}>Cans to be added:</label>
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.filledadded}
                                                    error={errors.filledadded}
                                                    id="filledadded"
                                                    type="number"
                                                    min="0"
                                                    style={{marginTop:"0px",marginBottom:"0px"}}
                                                    className={classnames("", {
                                                        invalid: errors.filledadded
                                                    })}
                                                    required=""
                                                />
                                            </div>
                                            <div>
                                                <label for="filledremoved" style={{marginTop:"0px",marginBottom:"0px"}}>Cans to be removed:</label>
                                                <input
                                                    onChange={this.onChange}
                                                    value={this.state.filledremoved}
                                                    error={errors.filledremoved}
                                                    id="filledremoved"
                                                    min="0"
                                                    type="number"
                                                    style={{marginTop:"0px",marginBottom:"0px"}}
                                                    className={classnames("", {
                                                        invalid: errors.filledremoved
                                                    })}
                                                    required=""
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card" style={{ width: "25%", height: "88%", marginLeft: "5%", marginRight: "5%" }}>
                                    <img className="card-img-top" style={{ height: "70%", width: "100%" }} src={'https://5.imimg.com/data5/JM/LU/DW/ANDROID-2653062/img-20200314-165703-jpg-250x250.jpg'} alt="Card image cap" />
                                    <div className="card-body" style={{marginTop:"0px",marginBottom:"0px"}}>
                                        <h5 className="card-title heading center" style={{ marginLeft: "4%", marginRight: "4%",marginTop:"0px",marginBottom:"0px" }}><b>Empty Cans</b></h5>
                                        <p className="card-text" style={{ marginLeft: "47%", marginRight: "4%", fontSize: "25px",marginTop:"0px",marginBottom:"0px" }}>{empty}</p>
                                    </div>
                                    <form style={{marginTop:"0px",marginBottom:"0px"}}>
                                        <div>
                                            <label for="emptyadded" style={{marginTop:"0px",marginBottom:"0px"}}>Cans to be added:</label>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.emptyadded}
                                                error={errors.emptyadded}
                                                id="emptyadded"
                                                min="0"
                                                type="number"
                                                style={{marginTop:"0px",marginBottom:"0px"}}
                                                className={classnames("", {
                                                    invalid: errors.emptyadded
                                                })}
                                                required=""
                                            />
                                        </div>
                                        <div>
                                            <label for="emptyremoved">Cans to be removed:</label>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.emptyremoved}
                                                error={errors.emptyremoved}
                                                id="emptyremoved"
                                                min="0"
                                                type="number"
                                                style={{marginTop:"0px",marginBottom:"0px"}}
                                                className={classnames("", {
                                                    invalid: errors.emptyremoved
                                                })}
                                                required=""
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="card" style={{ width: "25%", height: "88%", marginLeft: "5%", marginRight: "10%" }}>
                                    <img className="card-img-top heading" style={{ height: "70%", width: "100%" }} src={'https://thumbs.dreamstime.com/b/small-crushed-water-bottle-white-background-small-crushed-water-bottle-188296016.jpg'} alt="Card image cap" />
                                    <div className="card-body" style={{marginTop:"0px",marginBottom:"0px"}}>
                                        <h5 className="card-title heading center" style={{ marginLeft: "4%", marginRight: "4%",marginTop:"0px",marginBottom:"0px" }}><b>Damaged Cans</b></h5>
                                        <p className="card-text" style={{ marginLeft: "47%", marginRight: "4%", fontSize: "25px",marginTop:"0px",marginBottom:"0px" }}>{damaged}</p>
                                    </div>
                                    <form style={{marginTop:"0px",marginBottom:"0px"}}>
                                        <div>
                                            <label for="damagedadded" style={{marginTop:"0px",marginBottom:"0px"}}>Cans to be added:</label>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.damagedadded}
                                                error={errors.damagedadded}
                                                id="damagedadded"
                                                min="0"
                                                type="number"
                                                style={{marginTop:"0px",marginBottom:"0px"}}
                                                className={classnames("", {
                                                    invalid: errors.damagedadded
                                                })}
                                                required=""
                                            />
                                        </div>
                                        <div>
                                            <label for="damagedremoved">Cans to be removed:</label>
                                            <input
                                                onChange={this.onChange}
                                                value={this.state.damagedremoved}
                                                error={errors.damagedremoved}
                                                id="damagedremoved"
                                                min="0"
                                                type="number"
                                                style={{marginTop:"0px",marginBottom:"0px"}}
                                                className={classnames("", {
                                                    invalid: errors.damagedremoved
                                                })}
                                                required=""
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <button style={{marginTop:"0px"}} onClick={this.onSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Inventory.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Inventory);