import React, { Component,useRef} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import classnames from "classnames";
import SideNavbar from "./SideNavbar";
import Dropdown from 'react-dropdown';
import { faUser, faCar, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";


class AssignRoute extends Component {
    constructor() {
        super();
        this.state = {
            routes : [],
            trios : [],
            supervisorid : "",
            managerid : "",
            trips : [],
            aaroutes : [],
            aatrios : [],
            trips_made : []
        };
    }
    componentWillMount() {
        this.setState({ supervisorid: this.props.auth.user.id});
        this.setState({ managerid: this.props.auth.user.managerid});
    }
    async componentDidMount() {
        const info = {
            managerid:this.state.managerid,
            supervisorid:this.state.supervisorid
        }
        await axios.post("/api/supervisors/Viewroutes", info).then(async res => {
            var Routes = []
            var aaRoutes = []
            for(var i=0;i<res.data.length;i++){
                var newRoute = {
                    NOC : res.data[i].customers.length,
                    CR : res.data[i].totalcansrequired,
                    TA : res.data[i].tripassigned,
                    C : res.data[i].customers,
                    id: res.data[i]._id
                }
                if(newRoute.TA == 0){
                    Routes.push(newRoute)
                }
                else{
                    aaRoutes.push(newRoute)
                }
            }
            this.setState({ routes: Routes })
            this.setState({ aaroutes: aaRoutes })
            await axios.post("/api/supervisors/Gettrio", info).then(async res => {
                // console.log(res.data)
                var all_trios = []
                var aa_trios = []
                for(var i=0;i<res.data.length;i++){
                    var curTrio = {
                        LPN : res.data[i].vehicle,
                        ND : 1,
                        NOB : res.data[i].boys.length,
                        D : res.data[i].driver,
                        B : res.data[i].boys,
                        RA : res.data[i].routeassigned,
                        id: res.data[i]._id
                    }
                    if(curTrio.RA == 0){
                        all_trios.push(curTrio)
                    }
                    else{
                        aa_trios.push(curTrio)
                    }
                }
                this.setState({trios:all_trios})
                this.setState({aatrios:aa_trios})
                await axios.post("/api/supervisors/Gettrips",info).then(async res => {
                    var made_trips = res.data
                    // console.log(res.data)
                    this.setState({trips_made : made_trips})
                })
            })
        }).catch(err => {
        });
    }
    onChange = e => {
        // this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = async(e,index) => {  //onSubmit
        e.preventDefault()
        var Trips = this.state.trips
        var newtrip = Trips[index]
        // console.log(newtrip)
        if(newtrip.routeadded == 1 && newtrip.trioadded == 1){
        axios.post("/api/supervisors/Assignroute",newtrip).then(async res => {
            window.location.reload(false);
        }).catch(async err =>  {
            console.log(err)
        })
        }
        else{
            alert("You have not assigned the trios and routes for this trip")
        }
    }
    onCreateTrip = e =>{
        e.preventDefault();
        var Trips = this.state.trips;
        var newtrip = {
            driver : "",
            boys : [],
            vehicle : "",
            filled: 0,
            customers: [],
            supervisorid: this.state.supervisorid,
            intermediatetripid: "",
            routeid: "",
            routeadded :0,
            trioadded: 0
        }
        Trips.push(newtrip)
        this.setState({trips:Trips})
    }
    onselectRoute = async (e,index) => {
        var value = e.value - 1
        var Routes = this.state.routes
        var aaRoutes = this.state.aaroutes
        var Trips = this.state.trips
        Trips[index].filled = Routes[value].CR
        Trips[index].customers = Routes[value].C
        Trips[index].routeid = Routes[value].id
        Trips[index].routeadded = 1
        Routes[value].TA = 1
        aaRoutes.push(Routes[value])
        Routes.splice(value,1)
        this.setState({routes:Routes})
        this.setState({aaroutes:aaRoutes})
        this.setState({trips:Trips})
    }
    onselectTrio = async (e,index) => {
        var value = e.value - 1
        var aaTrios = this.state.aatrios
        var Trios = this.state.trios
        var Trips = this.state.trips
        Trips[index].driver = Trios[value].D
        Trips[index].boys = Trios[value].B
        Trips[index].vehicle = Trios[value].LPN
        Trips[index].intermediatetripid = Trios[value].id
        Trips[index].trioadded = 1
        Trios[value].RA = 1
        aaTrios.push(Trios[value])
        Trios.splice(value,1)
        this.setState({trips:Trips})
        this.setState({trios:Trios})
        this.setState({aatrios:aaTrios})
    }
    
    render() {
        
        var trips_made = this.state.trips_made
        var routes = this.state.routes
        var trios = this.state.trios
        var aatrios = this.state.aatrios
        var aaroutes = this.state.aaroutes
        var trips = this.state.trips
        var indexesroutes = []
        var indexestrios = []
        for(var i =0;i<routes.length;i++){
            indexesroutes.push(i+1)
        }
        for(var i =0;i<trios.length;i++){
            indexestrios.push(i+1)
        }
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "68%",display:"flex",flexDirection:"row"}}>
                    <div style={{ width:"100%", display:"flex",flexDirection:"column" }}>
                        <div style={{ display:"flex",flexDirection:"row-reverse" }}>
                            <button className="yellow" style={{width:"20%",height:"50px",marginRight:"10%"}} onClick={this.onCreateTrip}>Add Trip</button>
                        </div>
                        <div style={{ display:"flex",flexDirection:"column"}}>
                            {(
                                trips.length>0
                            )?(
                                <h4>Trips in development</h4>
                            ):(
                                <h4></h4>
                            )}
                            {trips.map((trip,index) =>(
                                <div className="card blue" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%",borderBlockStyle:"solid",borderRadius:"10px",borderWidth:"4px" }}>
                                    <div className="card-body">
                                        <h3 className="center panel-title">Trip {index+1}</h3>
                                        <div style={{display:"flex",flexDirection:"row"}}>
                                            <div style={{width:"50%"}}>
                                                <h4 >Assign Route Below</h4>
                                                <div className="dropdown-menu" style={{marginTop:"5%",marginRight:"5%",width:"60%",borderBlockStyle:"solid",borderRadius:"10px",backgroundColor:"#FFFFFF"}}>
                                                    <Dropdown options={indexesroutes} value="Select Route Number" onChange={ e => this.onselectRoute(e,index)} placeholder="Select Route Number" />
                                                </div>
                                            </div> 
                                            <div style={{width:"50%"}}>
                                                <h4 >Assign Trio Below</h4>
                                                <div className="dropdown-menu" style={{marginTop:"5%",marginRight:"5%",width:"60%",borderBlockStyle:"solid",borderRadius:"10px",backgroundColor:"#FFFFFF"}}>
                                                    <Dropdown options={indexestrios} value="Select Trio Number" onChange={ e => this.onselectTrio(e,index)} placeholder="Select Trio Number" />
                                                </div>
                                            </div> 
                                        </div>
                                        <div style={{display:"flex",flexDirection:"row",marginTop:"4%"}}>
                                            <button className="yellow" onClick={e => this.onSubmit(e,index)} style={{width:"20%",height:"50px",marginLeft:"20%",borderRadius:"10px"}} >Make trip</button>
                                            {/* add onClick */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(
                               trips_made.length>0
                            )?(
                                <h4>Trips Already made for today</h4>
                            ):(
                                <h4></h4>
                            )}
                            {trips_made.map((trip,index) =>(
                                <div className="card blue" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%",borderBlockStyle:"solid",borderRadius:"10px",borderWidth:"4px" }}>
                                    <div className="card-body">
                                        <h3 className="center panel-title">#Trip {index+1}</h3>
                                        <div style={{width:"80%",marginLeft:"10%",marginRight:"10%"}}>
                                            <h5 >View this trip's Customers Below</h5>
                                            <div className="dropdown-menu" style={{marginTop:"5%",marginRight:"5%",width:"60%",borderBlockStyle:"solid",borderRadius:"10px",backgroundColor:"#FFFFFF"}}>
                                                <Dropdown options={trip.customers} placeholder="View Customers" />
                                            </div>
                                            <h5 >View this trip's Delivery Boys Below</h5>
                                            <div className="dropdown-menu" style={{marginTop:"5%",marginRight:"5%",width:"60%",borderBlockStyle:"solid",borderRadius:"10px",backgroundColor:"#FFFFFF"}}>
                                                <Dropdown options={trip.boys} placeholder="View Delivery Boys" />
                                            </div>
                                            <h5 >trip's Delivery driver is: {trip.driver}</h5>
                                            <h5>filled cans required in the trip are: {trip.filled}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{width:"16%"}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <div className="card" style={{maxHeight:"25%", minHeight:"33%", overflowY:"scroll", backgroundColor:"white"}}>
                            <div className="card-body" >
                                <p className="primary-text" style={{fontSize:"20px",marginLeft:"5px"}}><b>Routes To be Assigned</b></p>
                                <ul style={{marginLeft:"15px"}}>
                                {routes.map((route,index) => (
                                    <div>
                                        <li>Route #{index + 1} with {route.NOC} customers requiring {route.CR} filled cans</li>
                                    </div>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <div className="card" style={{height:"25%",overflowY:"scroll", backgroundColor:"white"}}>
                            <div className="card-body" >
                                <p className="primary-text" style={{fontSize:"20px",marginLeft:"5px"}}><b>Vehicle - boys - Driver Trios available</b></p>
                                <ul style={{marginLeft:"15px"}}>
                                {trios.map((trio,index) => (
                                    <div>
                                        <li>Trio #{index+1} with vehicle({trio.LPN}) and {trio.NOB} boys </li>
                                    </div>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <div className="card" style={{height:"25%",overflowY:"scroll", backgroundColor:"white"}}>
                            <div className="card-body" >
                            <p className="primary-text" style={{fontSize:"20px",marginLeft:"5px"}}><b>Routes that have already been assigned</b></p>
                                <ul style={{marginLeft:"15px"}}>
                                {aaroutes.map((route,index) => (
                                    <div>
                                        <li>A Route with {route.NOC} customers requiring {route.CR} filled cans</li>
                                    </div>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <div className="card" style={{height:"25%",overflowY:"scroll", backgroundColor:"white"}}>
                            <div className="card-body" >
                            <p className="primary-text" style={{fontSize:"20px",marginLeft:"5px"}}><b>Trios that have already been assigned</b></p>
                                <ul style={{marginLeft:"15px"}}>
                                {aatrios.map((trio,index) => (
                                    <div>
                                        <li>A Trio with vehicle({trio.LPN}) and {trio.NOB} boys </li>
                                    </div>
                                ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AssignRoute.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(AssignRoute);