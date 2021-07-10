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


class CreateRoute extends Component {
    constructor() {
        super();
        this.state = {
            supervisorid:"",                            //don
            managerid:"",                               //don
            already_added_customers:[],                 //don
            already_made_routes:[],                     //don
            to_be_added_customers:[],                   //don
            all_routes:[],
            special_request_customers :[],              //don
            map_cutomer_to_done:{},                     //don
            map_customer_to_requirement:{},             //don
            current_routes:[],
            errors:{}
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
            // console.log("Kart")
            // console.log(res.data)
            // console.log(res.data.length)
            this.setState({already_made_routes: res.data})
            var customer_to_dict = {}
            var customers = []
            for(var i=0;i<res.data.length;i++){
                // console.log(typeof(res.data[i].customers))
                // console.log(typeof(customers))
                // customers.concat(res.data[i].customers)
                // console.log(customers)
                for(var j=0;j<res.data[i].customers.length;j++){
                    customer_to_dict[res.data[i].customers[j]] = 1
                    customers.push(res.data[i].customers[j])
                }
            }
            // console.log(customers)
            this.setState({ already_added_customers: customers })
            await axios.post("/api/supervisors/Getdaycustomers", info).then(async res => {
                // console.log("Abdu")
                // console.log(res.data)
    
                var all_cust = []
                var requirement_dict = {}
                for(var i=0;i<res.data.length;i++){
                    // all_cust.push(res.data[i].email)
                    requirement_dict[res.data[i].email] = res.data[i].subscansrequired
                    if(!(res.data[i].email in customer_to_dict)){
                        all_cust.push(res.data[i].email)
                        customer_to_dict[res.data[i].email] = 0
                    }
                }
                this.setState({to_be_added_customers:all_cust})
                // this.setState({map_cutomer_to_done:customer_to_dict})
                // this.setState({map_customer_to_requirement:requirement_dict})
                await axios.post("/api/supervisors/Getspecialcustomers",info).then(async res=> {
                    // console.log("Kev")
                    // console.log(res.data)
        
                    var new_cust = []
                    // temp_dict = []
                    for(var i =0;i<res.data.length;i++){
                        if(!(res.data[i].email in customer_to_dict) || customer_to_dict[res.data[i].email] == 0){
                            new_cust.push(res.data[i].email)
                            if (!(res.data[i].email in customer_to_dict)){
                                requirement_dict[res.data[i].email] = res.data[i].cansrequired
                                customer_to_dict[res.data[i].email] = 0
                            }
                            else{
                                customer_to_dict[res.data[i].email] = 0
                                requirement_dict[res.data[i].email] = requirement_dict[res.data[i].email]+res.data[i].cansrequired
                            }
                            // temp_dict[res.data[i].email] = res.data[i].cansrequired   
                        }
                    }
                    this.setState({map_cutomer_to_done:customer_to_dict})
                    this.setState({map_customer_to_requirement:requirement_dict})
                    this.setState({special_request_customers:new_cust})
                    // console.log(this.state)
                // this.setState({map_special_customers_to_requirement:temp_dict})
                })

            })
        }).catch(err => {
        });
    }
    onChange = e => {
        // this.setState({ [e.target.id]: e.target.value });
    };
    onCreateRoute = e =>{
        e.preventDefault();
        var currentRoutes = this.state.current_routes;
        var newRoute = {
            customers:[],
            totalCans:0,
            remaining:15,
            made:0
        }
        currentRoutes.push(newRoute)
        this.setState({current_routes:currentRoutes})
    }
    onSubmit = async(e,index) => {
        e.preventDefault()
        var newRoute = this.state.current_routes[index]
        const info = {
            managerid:this.state.managerid,
            supervisorid:this.state.supervisorid,
            customers: newRoute.customers,
            totalcansrequired: newRoute.totalCans
        }
        axios.post("/api/supervisors/Createroute",info).then(async res => {
            // this.props.history.push("/createroute")
            window.location.reload(false);
        }).catch(async err =>  {
            console.log(err)
        })
    }
    onselectCustomer = async (e,index) => {
        // await this.setState({ day: MAPPER[e.value] });
        // console.log(index)
        // console.log(e)
        // e.preventDefault()
        var value = e.value
        e.value = "Select Customer"
        var routes = this.state.current_routes
        var requirements = this.state.map_customer_to_requirement
        var done = this.state.map_cutomer_to_done
        var already_added = this.state.already_added_customers
        var to_be_added = this.state.to_be_added_customers
        var special_request = this.state.special_request_customers
        routes[index].customers.push(value)
        routes[index].remaining -= 1 //change to 1
        routes[index].totalCans += requirements[value]
        done[value] = 1
        already_added.push(value)
        var ind = to_be_added.indexOf(value)
        if (ind !== -1){
            to_be_added.splice(ind,1)
        }
        ind = special_request.indexOf(value)
        if(ind!==-1){
            special_request.splice(ind,1)
        }
        this.setState({currentRoutes:routes})
        this.setState({map_customer_to_requirement:requirements})
        this.setState({map_cutomer_to_done:done})
        this.setState({already_added_customers:already_added})
        this.setState({to_be_added_customers:to_be_added})
        this.setState({special_request_customers:special_request})
    }
    componentWillReceiveProps(nextProps) {

    }
    render() {
        
        var errors = this.state.errors;
        var already_routes = this.state.already_made_routes
        var routesInDev = this.state.current_routes;
        var customersAvailable = this.state.to_be_added_customers;
        var specialCustomersAvailable = this.state.special_request_customers;
        var addedCustomers = this.state.already_added_customers;
        var allcustomers = customersAvailable.concat(specialCustomersAvailable)
        var unique = {}
        allcustomers.forEach(function(i){
            if(!unique[i]){
                unique[i] = true
            }
        })
        allcustomers = Object.keys(unique)
        return (
            <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={{ width: "16%", padding: "0" }}>
                    <SideNavbar></SideNavbar>
                </div>
                <div style={{ width: "68%",display:"flex",flexDirection:"row"}}>
                    <div style={{ width:"100%", display:"flex",flexDirection:"column" }}>
                        <div style={{ display:"flex",flexDirection:"row-reverse" }}>
                            <button className="yellow" style={{width:"20%",height:"50px",marginRight:"10%"}} onClick={this.onCreateRoute}>Add Route</button>
                        </div>
                        <div style={{ display:"flex",flexDirection:"column"}}>
                            {(
                                routesInDev.length>0
                            )?(
                                <h4>Routes in development</h4>
                            ):(
                                <h4></h4>
                            )}
                            {routesInDev.map((route,index) =>(
                                <div className="card blue" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%",borderBlockStyle:"solid",borderRadius:"10px",borderWidth:"4px" }}>
                                    <div className="card-body">
                                        <h3 className="center panel-title">#Route {index+1}</h3>
                                        {(
                                            route.made == 0
                                            )?(
                                                <div>
                                                    {(
                                                        route.remaining>0
                                                        )?(
                                                            <h5 className="center">Free Slots Available</h5>
                                                        ):(
                                                            <h5 className="center">Full</h5>
                                                    )}
                                                </div>
                                            ):(
                                                <div>
                                                    <h5 className="center"> Alredy Made! Can't be Changed :`(</h5>
                                                </div>
                                        )}
                                        <div style={{display:"flex",flexDirection:"row"}}>
                                            {(
                                                route.remaining>0
                                            )?(
                                                <div style={{width:"50%"}}>
                                                    <h4 >Add Customer Below</h4>
                                                    <div className="dropdown-menu" style={{marginTop:"5%",marginRight:"5%",width:"60%",borderBlockStyle:"solid",borderRadius:"10px",backgroundColor:"#FFFFFF"}}>
                                                        <Dropdown options={allcustomers} value="Select Customer" onChange={ e => this.onselectCustomer(e,index)} placeholder="Select Customer" />
                                                        {/* add value */}
                                                    </div>
                                                </div> 
                                            ):(
                                                <div style={{width:"50%"}}>

                                                </div>
                                            )}
                                            {/* <div style={{width:"50%"}}>
                                                <h4 >Add Customer Below</h4>
                                                <div className="dropdown-menu" style={{marginTop:"5%",marginRight:"5%",width:"60%",borderBlockStyle:"solid",borderRadius:"10px",backgroundColor:"#FFFFFF"}}>
                                                    <Dropdown options={allcustomers} value="Select Customer" onChange={ e => this.onselectCustomer(e,index)} placeholder="Select Customer" />
                                                </div>
                                            </div>  */}
                                            <div style={{width:"50%"}}>
                                                <h4 >View this Route's Customers Below</h4>
                                                <div className="dropdown-menu" style={{marginTop:"5%",marginRight:"5%",width:"60%",borderBlockStyle:"solid",borderRadius:"10px",backgroundColor:"#FFFFFF"}}>
                                                    <Dropdown options={route.customers} placeholder="View Customers" />
                                                    {/* add value */}
                                                </div>
                                            </div>
                                        </div>
                                        <div style={{display:"flex",flexDirection:"row",marginTop:"4%"}}>
                                            <h5 className="center" style={{width:"60%"}}>Total Cans Required in this Route: {route.totalCans}</h5>
                                            <button className="yellow" onClick={e => this.onSubmit(e,index)} style={{width:"20%",height:"50px",marginLeft:"20%",borderRadius:"10px"}} >Make Route</button>
                                            {/* add onClick */}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {(
                                already_routes.length>0
                            )?(
                                <h4>Routes Already made for today</h4>
                            ):(
                                <h4></h4>
                            )}
                            {already_routes.map((route,index) =>(
                                <div className="card blue" style={{ width: "80%", marginLeft: "10%", marginRight: "10%", paddingLeft: "10%", paddingRight: "10%",borderBlockStyle:"solid",borderRadius:"10px",borderWidth:"4px" }}>
                                    <div className="card-body">
                                        <h3 className="center panel-title">#Route {index+1}</h3>
                                        <div style={{width:"80%",marginLeft:"10%",marginRight:"10%"}}>
                                            <h5 >View this Route's Customers Below</h5>
                                            <div className="dropdown-menu" style={{marginTop:"5%",marginRight:"5%",width:"60%",borderBlockStyle:"solid",borderRadius:"10px",backgroundColor:"#FFFFFF"}}>
                                                <Dropdown options={route.customers} placeholder="View Customers" />
                                                {/* add value */}
                                            </div>
                                            <div style={{marginTop:"4%"}}>
                                                <h5 className="center">Total Cans Required in this Route: {route.totalcansrequired}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{width:"16%"}}>
                    <div style={{width:"100%",display:"flex",flexDirection:"column"}}>
                        <div className="card" style={{maxHeight:"33%", minHeight:"33%", overflowY:"scroll", backgroundColor:"white"}}>
                            <div className="card-body" >
                                <p className="primary-text" style={{fontSize:"20px",marginLeft:"5px"}}><b>Customers yet to be Addded</b></p>
                                <ul style={{marginLeft:"15px"}}>
                                {customersAvailable.map((customer,index) => (
                                    <div>
                                        <li>{customer}</li>
                                    </div>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <div className="card" style={{height:"33%",overflowY:"scroll", backgroundColor:"white"}}>
                            <div className="card-body" >
                                <p className="primary-text" style={{fontSize:"20px",marginLeft:"5px"}}><b>Special Customers that require attention</b></p>
                                <ul style={{marginLeft:"15px"}}>
                                {specialCustomersAvailable.map((customer,index) => (
                                    <div>
                                        <li>{customer}</li>
                                    </div>
                                ))}
                                </ul>
                            </div>
                        </div>
                        <div className="card" style={{height:"33%",overflowY:"scroll", backgroundColor:"white"}}>
                            <div className="card-body" >
                            <p className="primary-text" style={{fontSize:"20px",marginLeft:"5px"}}><b>Customers That Have Already Been Added</b></p>
                                <ul style={{marginLeft:"15px"}}>
                                {addedCustomers.map((customer,index) => (
                                    <div>
                                        <li>{customer}</li>
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
CreateRoute.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(CreateRoute);