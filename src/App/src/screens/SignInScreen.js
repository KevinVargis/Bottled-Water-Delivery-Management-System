import React from 'react';
import { Text, StyleSheet, View, Button,Alert, TouchableOpacity } from 'react-native';
import axios from 'axios'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4FAFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    appButtonContainer: {
      elevation: 8,
      backgroundColor: "#02DE99",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12
    },
    appButtonText: {
      fontSize: 18,
      color: "#124559",
      fontWeight: "bold",
      alignSelf: "center",
      textTransform: "uppercase"
    }
})


export default class SignInScreen extends React.Component{

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Log In/Out of Duty',
    };
  };
  constructor(props) {
    super(props);
    this.state = 
        {   
            hi:'hi',
            loggedin:0,
            aadhar: ' ',
            info:' '
        }
        this.onButtonClick=this.onButtonClick.bind(this);
        this.changeLogStatus=this.changeLogStatus.bind(this);
  }

  changeLogStatus = async (val) =>{
    // alerts("hello")
      let obj={
        aadhar:val
      }
      // console.log("in getinfo")
      // console.log(val)
      // console.log(obj)
      axios.post("http://192.168.1.122:5000/api/drivers/AttLog",obj)
      .then(res => {
        // console.log("before",res.data)
        // console.log(this.state.info.driverData.login)
        let data=this.state.info
        if(data.driverData.login==false)
          data.driverData.login=true
        else
          data.driverData.login=false
        // console.log("after",data.login)
        let value=this.state.info.driverData.login
        this.setState({info:data})
        this.setState({loggedin:value})
        // console.log("state",this.state.loggedin)
        this.forceUpdate();
      })
      .catch(err => {
          alert(err)
          console.log(err)
      })
    }

  onButtonClick=()=>{
    let alert_title=''
    let alert_message=''
    if(this.state.info.driverData.login)
    {
      alert_title='Logging Out'
      alert_message='Are You Sure You Want to Log Out From Duty'
    }
    else{
      alert_title='Logging In'
      alert_message='Are You Sure You Want to Log In to Duty'
    }
    Alert.alert(
      alert_title,
      alert_message,
      [
        {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
        {text: 'YES', onPress: () => this.changeLogStatus(this.state.aadhar)},
      ]
    );
  }
  
  getInfo = async (val) =>{
    // alerts("hello")
      let obj={
        aadhar:val
      }
      console.log("in getinfo")
      // console.log(val)
      // console.log(obj)
      axios.post("http://192.168.1.122:5000/api/drivers/GetInfo",obj)
      .then(res => {
        let data=res.data
        this.setState({info:data})
      })
      .catch(err => {
          alert(err)
          console.log(err)
      })
    }

  componentDidMount(){
    this.setState({hi:"hii"})
    if(typeof(this.props.navigation.state.params)!='undefined')
    this.setState(
      {aadhar:this.props.navigation.state.params.aadhar},
      function() { this.getInfo(this.state.aadhar) }
      )
  }

  componentDidUpdate(prevProps){
    if(prevProps.navigation != this.props.navigation){
      this.setState({hi:"hiii"})
    if(typeof(this.props.navigation.state.params)!='undefined')
      this.setState(
        {aadhar:this.props.navigation.state.params.aadhar},
        function() { this.getInfo(this.state.aadhar) }
        )
      console.log("calling getinfo")
      // console.log(this.state.aadhar)
      
    }
  }

  render(){
    if(this.state.info == ' ')
      console.log('sike')
    // console.log(this.props)
    // console.log(this.state)
    let buttonmessage;
    if(this.state.aadhar!=' ' && this.state.info != ' ')
    {
      if(!this.state.info.driverData.login)
        buttonmessage="Login to Duty"
      else
        buttonmessage="Logout of Duty"
      return(
        <View style={styles.container}>
        <TouchableOpacity onPress={this.onButtonClick} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>{buttonmessage}</Text>
        </TouchableOpacity>
        </View>
      )
    }
    else{
      return(<Text>LOADING</Text>)
    }
  }
}