
import React from 'react'
import SwipePicker from 'react-native-swipe-picker'
import { Text, StyleSheet, SafeAreaView,View,ScrollView, TouchableOpacity,Alert } from 'react-native';
import axios from "axios"
/* ... */

let options1 = []
for(var i=0; i <= 500; i++)
{
    options1.push({
                    value: i,
                    label: `${i}`
                })
}


export default class SP extends React.Component  {

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Delivery Details',
        };
      };

    constructor(props) {
        super(props);
        this.state = {
          options:options1,
          height: 500,
          width: 120,
          selectedValues:[1,1,0],
        }
        
      }
    
       updateDetails = async () =>{
        // alerts("hello")
          let obj={
            // tripid:this.props.navigation.state.params.tripid,
            tripid:"60898fd1f422cad33a09d971",
            filled:this.state.selectedValues[0],
            empty:this.state.selectedValues[1],
            damaged:this.state.selectedValues[2]
          }
          console.log("obj",obj)
          // console.log("in getinfo")
          // console.log(val)
          let address=''
          // console.log(info)
          
            address="http://192.168.1.122:5000/api/drivers/UpdateDetails"
          
          // console.log(address)
          axios.post(address,obj)
          .then(res => {
            console.log("resdata",res.data)
            if (res.data.status=="success"){
              alert("Done")
            //   navigation.navigate('Trip',{
            //     aadhar:this.props.navigation.state.params.aadhar,
                // tripid:this.props.navigation.state.params.tripid
            //   });
            }
            else
              alert(res.data.message)
          })
          .catch(err => {
              alert(err)
              console.log(err)
          })
        }
    reflectChange=(position,value)=>{
        let temp=this.state.selectedValues
        temp[position]=value
        this.setState({selectedValues:temp})
    }

    updateDetailsAlert=()=>{
        Alert.alert(
            "Confirm Details",
            `Are You Sure About the Data?`,
            [
              {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => this.updateDetails()},
            ]
          );
    }
    render(){
        // console.log("scrooll",this.props)
        const state=this.state
        return (
            // { /* ... */ }
        <View>
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <SwipePicker
                        items={state.options}
                        onChange={ ({ index, item }) => {
                            this.reflectChange(0,item.value)
                        }}
                        height={state.height}
                        width={state.width}
                    />
                <Text style={styles.loginText}>Delivered: {state.selectedValues[0]}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <SwipePicker
                        items={state.options}
                        onChange={ ({ index, item }) => {
                            this.reflectChange(1,item.value)
                        }}
                        height={state.height}
                        width={state.width}
                    />
                <Text style={styles.loginText}>Returned: {state.selectedValues[1]}</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <SwipePicker
                        items={state.options}
                        onChange={ ({ index, item }) => {
                            this.reflectChange(2,item.value)
                        }}
                        height={state.height}
                        width={state.width}
                    />
                <Text style={styles.loginText}> Damaged: {state.selectedValues[2]}</Text>
                </View>  
            </View>
            <TouchableOpacity  style={styles.appButtonContainer} onPress={this.updateDetailsAlert}>
                <Text style={styles.appButtonText}>Confirm Details</Text>
            </TouchableOpacity>
        </View>

        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center'
    },
    loginScreenButton:{
      //   display: 'flex',
      // flexDirection: 'row',
      // flex: 30%,
      marginRight:1,
      marginLeft:1,
     marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor: 'skyblue',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#00A5CF'
    },
    loginText:{
      // flexDirection: 'row',
        fontSize: 18,
        fontWeight: "bold",
        color:'#124559',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        paddingTop: 8,
        marginTop:19,
    },
    appButtonContainer: {
        // elevation: 8,
        backgroundColor: "#00A5CF",
        borderRadius: 10,
        marginTop:600,
        marginRight:25,
        marginLeft:25,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      appButtonText: {
        fontSize: 18,
        color: "#F4FAFF",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
})

/* ... */