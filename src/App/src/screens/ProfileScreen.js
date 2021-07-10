import React from 'react';
import { Text, StyleSheet, SafeAreaView,View, TouchableOpacity } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper'
import axios from 'axios'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = 
    {
      aadhar: ' ',
      hi:'hi',
      info: ' '
    }
  }

  getInfo = async (val) =>{
    // alerts("hello")
      let obj={
        aadhar:val
      }
      // console.log("in getinfo")
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
      // console.log("calling getinfo")
      // console.log(this.state.aadhar)
      
    }
  }
  render(){
    // if(this.state.info == ' ')
    //   console.log('sike')
    if(this.state.aadhar!=' ' && this.state.info != ' ') // && this.state.userData.type != null)
    {
      // console.log(this.props)
      // console.log(this.props.navigation.state.params.aadhar)
      let info = this.state.info.userData
      let role=''
      if (this.state.info.userData.type=='D')
        role="Driver"
      else
        role="Delivery Boy"
      return(
        <SafeAreaView style={styles.container}>
          
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <Avatar.Image  
              source={{
                uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
              }}
              size={80}
            />
            <View style={{marginLeft: 20}}>
              <Title style={[styles.title, {
                marginTop:15,
                marginBottom: 5,
              }]}>{info.name}</Title>
              <Caption style={styles.caption}>{role}</Caption>
            </View>
          </View>
        </View>

        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#6D1A36" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{info.pincode}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#6D1A36" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{info.phonenum}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#6D1A36" size={20}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{info.email}</Text>
          </View>
        </View>

        <View style={styles.infoBoxWrapper}>
            <View style={[styles.infoBox, {
              borderRightColor: '#dddddd',
              borderRightWidth: 1
            }]}>
              <Title>15</Title>
              <Caption>Attendance</Caption>
            </View>
            <View style={styles.infoBox}>
              <Title>8</Title>
              <Caption>Trips</Caption>
            </View>
        </View>

        {/* <View style={styles.menuWrapper}>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="heart-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Your Favorites</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="credit-card" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Payment</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={myCustomShare}>
            <View style={styles.menuItem}>
              <Icon name="share-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Tell Your Friends</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="account-check-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Support</Text>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.menuItem}>
              <Icon name="settings-outline" color="#FF6347" size={25}/>
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
          </TouchableRipple>
        </View> */}
      </SafeAreaView>
      )
    }
    else{
      return(<Text>LOADING</Text>)
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});