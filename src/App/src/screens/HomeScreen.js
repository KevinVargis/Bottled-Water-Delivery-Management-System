import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
const styles = StyleSheet.create({
  Headertext: {
    fontSize: 30,
    padding: 27,
    color:'white',
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    paddingVertical:19,
    backgroundColor:'#1D2234'
  },
  buttonStyle: {
    width: '100%',
    padding: 25,
    justifyContent:'center',
  },
  buttonText:{
    fontSize:18,
    color:'#BFD1E5',
    fontWeight:'bold'
  }
});
export default class HomeScreen extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = this.props.navigation.state.params
  }

  navigateOption =(target,displayText)=>{
    // alert(this.state.aadhar)
    return(
      <TouchableOpacity  onPress={()=> this.props.navigation.navigate(target,{aadhar:this.state.aadhar,router:this.props.navigation.router})} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>{displayText}</Text>
      </TouchableOpacity>
    )
  }

  componentDidMount()
  {
    this.props.navigation.navigate('Profile',{aadhar:this.state.aadhar})
  }
  render(){
  // console.log(this.state)
  // console.log("home",this.props.navigation)
  return (
    <View style={styles.container}>
      <Text style={styles.Headertext}>Dashboard</Text>
      {this.navigateOption('Profile','Your Profile')}
      {this.navigateOption('Attendance','Attendance Log')}
      {this.navigateOption('DutyLog','Duty Log')}
      {this.navigateOption('Scanner','Scan QR')}
      {this.navigateOption('Trip','Trip Details')}
      {this.navigateOption('Scroll','Enter Details')}
    </View>
  );}
};



