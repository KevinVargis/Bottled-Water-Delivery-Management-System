import React from 'react';
import { render } from 'react-dom';
import axios from 'axios'
import { Text, StyleSheet, View, Button,TextInput ,TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SmoothPinCodeInput } from "react-native-smooth-pincode-input";

export default class LoginScreen extends React.Component{

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Login Screen',
          headerStyle: {
            backgroundColor: '#5497A7',
          },
          headerTitleStyle: {
            color: '#FFF',
        }
        };
      };

    constructor(props) {
        super(props);
        this.state = 
        {
            password:' ',
            email:''
        }
        this.passwordChange=this.passwordChange.bind(this);
        this.emailChange=this.emailChange.bind(this);
      }
    
   passwordChange(event){
       this.setState({password:event})
   }

   emailChange(event){
     this.setState({email:event})
   }
  
   storeToken= async (user) => {
    try {
       await AsyncStorage.setItem("email", user);
    } catch (error) {
      alert("Something went wrong", error);
    }
  }
  emailChange(event){
    this.setState({email:event})
    this.storeToken(event)
  }
  getToken =  async () => {
    try {
      let userData = await AsyncStorage.getItem("email");
      // let data = JSON.parse(userData);
      if(!userData)
      {
        // alert("no data")
        // this.
      }
      else{
        // alert(userData)
        this.setState({email:userData})
      }
    } catch (error) {
      alert(error);
    }
  }
  successfulLogin = (value)=>{
    this.setState({password:''})
    this.storeToken(this.state.email)
    this.textInput.clear()
    this.props.navigation.navigate('DrawerNav',{aadhar:value});
}

    loginAttempt = async () =>{
    // alerts("hello")
      let obj={
        email: this.state.email,
        pin: this.state.password
      }
      console.log(obj)
      axios.post("http://192.168.1.122:5000/api/drivers/SignIn",obj)
      .then(res => {
        let data=res.data
        if(data.status == 'failure')
        {
          alert(data.error)
        }
        else
        {
          // alert(data.aadhar) 
          this.successfulLogin(data.aadhar)
        }
      })
      .catch(err => {
          alert(err)
          console.log(err)
      })
    }
  componentDidMount(){
    this.getToken()
  }
    render(){
      console.log(this.state)
        return(

            <View style={styles.container}>      
            <View style={styles.inputView}>
            <TextInput
                ref={input1 => { this.textInput = input1 }}
                style={styles.TextInput}
                placeholder="Enter Your Email Id"
                placeholderTextColor="#003f5c"
                onChangeText={this.emailChange}
                value={this.state.email}
            />
            </View>
            <View style={styles.inputView}>
            <TextInput
                ref={input => { this.textInput = input }}
                style={styles.TextInput}
                placeholder="Enter Your Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={this.passwordChange}
                keyboardType="numeric"
                maxLength={4}
            />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={this.loginAttempt}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F4FAFF',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputView: {
        backgroundColor: "#B8FFE8",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
      },
      
      TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },
      loginText:{
        // flexDirection: 'row',
          color:'#36151E',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10,
          fontWeight:'bold'
      },
      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#02DE99",
    }
  });
  