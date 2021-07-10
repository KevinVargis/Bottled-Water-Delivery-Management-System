import React from 'react';
import { Text, StyleSheet, SafeAreaView,View, TouchableOpacity } from 'react-native';


const styles = StyleSheet.create({
    loginScreenButton:{
      //   display: 'flex',
      // flexDirection: 'row',
      // flex: 30%,
      marginRight:1,
      marginLeft:1,
     marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor: '#00A5CF',
      borderRadius:10,
      borderWidth: 1,
      borderColor: '#F4FAFF'
    },
    loginText:{
      // flexDirection: 'row',
        color:'#F4FAFF',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    container: {
        flex: 1,
      },
      container2: {
      //   flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20, 
      }
  });


  export default class SwitchTripView extends React.Component{

    render(){
        return(
            <View style={styles.container2}>
                <TouchableOpacity
                    style={styles.loginScreenButton}
                    // onPress={() => setScanned(false)}
                    onPress={() => this.props.navigation.navigate('Trip')}
                    underlayColor='#F4FAFF'>
                    <Text style={styles.loginText}>Delivered</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginScreenButton}
                    // onPress={() => setScanned(false)}
                    onPress={() => this.props.navigation.navigate('Progress')}
                    underlayColor='#F4FAFF'>
                    <Text style={styles.loginText}>Progress Screen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginScreenButton}
                    // onPress={() => setScanned(false)}
                    onPress={() => this.props.navigation.navigate('Upcoming')}
                    underlayColor='#F4FAFF'>
                    <Text style={styles.loginText}>Upcoming Deliveries</Text>
                </TouchableOpacity>
            </View>
        )
    }
      
  }