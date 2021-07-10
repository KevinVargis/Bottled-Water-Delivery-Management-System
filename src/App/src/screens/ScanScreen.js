import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity,Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios'
import TripScreen from './TripScreen'
const styles = StyleSheet.create({
  loginScreenButton:{
    marginRight:40,
    marginLeft:40,
   marginTop:10,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#61dbfb',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#F4FAFF'
  },
  loginText:{
      color:'#F4FAFF',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
});

export default function ScanScreen({navigation}) {
  // console.log(navigation)
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [aadhar,setaadhar]=useState(" ");
  const [info,setinfo]=useState(" ");
  const [toggle,settoggle]=useState(1)
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const requestPair = async (val,vehicle) =>{
    // alerts("hello")
      let obj={
        aadhar:info.driverData.aadharnum,
        vehicle:vehicle
      }
      // console.log("in getinfo")
      // console.log(val)
      // console.log(obj)
      let address=''
      // console.log(info)
      console.log("obj",obj)
      if(info.userData.type=='D')
        address="http://192.168.1.122:5000/api/drivers/VehiclePair"
      else
        address="http://192.168.1.122:5000/api/boys/VehiclePair"
      // console.log(address)
      axios.post(address,obj)
      .then(res => {
        console.log("resdata",res.data)
        if (res.data.status=="success"){
          alert("Successfully paired")
          getInfo(info.driverData.aadharnum)
        }
        else
          alert(res.data.message)
      })
      .catch(err => {
          alert(err)
          console.log(err)
      })
    }

    const checkCustomer = async (val,email) =>{
      // alerts("hello")
        let obj={
          tripd:info.driverData.tripid,
          email:email
        }
        // console.log("in getinfo")
        // console.log(val)
        // console.log(obj)
        let address=''
        // console.log(info)
        
          address="http://192.168.1.122:5000/api/drivers/ScanCustomer"
        
        // console.log(address)
        axios.post(address,obj)
        .then(res => {
          console.log("resdata",res.data)
          if (res.data.status=="success"){
            alert("Successfully Scanned")
            navigation.navigate('Scroll',{
              email:email,
              tripid:info.driverData.tripid,
              aadhar:info.driverData.aadharnum
            });
          }
          else
            alert(res.data.message)
        })
        .catch(err => {
            alert(err)
            console.log(err)
        })
      }
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    if(info.driverData.tripid=='0' || info.driverData.tripid==0 || typeof info.driverData.tripid == null || typeof info.driverData.tripid == "undefined")
      {
        Alert.alert(
          "Pair Request",
          `Do you want to request a pairing with vehicle ${data}?`,
          [
            {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
            {text: 'YES', onPress: () => requestPair(info.driverData.aadharnum,data)},
          ]
        );
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      }
    else
    {
      Alert.alert(
        "Scan Customer Code",
        `Do you want to check for customer on route?`,
        [
          {text: 'NO', onPress: () => console.log('NO Pressed'), style: 'cancel'},
          {text: 'YES', onPress: () => checkCustomer(info.driverData.aadharnum,data)},
        ]
      );
      // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      // alert("Successfully paired")
      // // console.log("scn",navigation);
      // navigation.navigate('Scroll',{
      //   email:data,
      //   tripid:info.driverData.tripid
      // });
      // return(
      // <TripScreen customer_email={"hi"} tripid = {info.driverData.tripid} />
      // )
    }
  };

  const getInfo=(val)=>{
    
    let obj=val
    // console.log("in getinfo")
    // console.log(val)
    // console.log(obj)
    // console.log("before send", )
    axios.post("http://192.168.1.122:5000/api/drivers/GetInfo",obj)
    .then(res => {
      let data=res.data
      setinfo(data)
      // console.log(info,aadhar)
    })
    
    .catch(err => {
        alert(err)
        console.log(err)
    }) 
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (aadhar===" "){
    setaadhar(navigation.state.params.aadhar)
    return(<Text>LOADING</Text>);
  }
  // console.log("alldone",info,aadhar)
  if( info ===" " || info.status==="failure"){

    getInfo({aadhar})
    return(<Text>LOADING</Text>);
  }

  // console.log("alldone",info,aadhar)
  return (
    <View style={{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <TouchableOpacity
                        style={styles.loginScreenButton}
                        onPress={() => setScanned(false)}
                        underlayColor='#F4FAFF'>
                        <Text style={styles.loginText}>Scan Again</Text>
                </TouchableOpacity>}
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </View>
  );
}



// AppRegistry.registerComponent('default', () => ScanScreen);