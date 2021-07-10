
import React from 'react';
import { Text, StyleSheet, SafeAreaView,View, ScrollView, TouchableOpacity } from 'react-native';
import BottleTable from "../components/BottleTable"
import SwitchTripView from "../components/SwitchTripView"
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import DeliScreenCard from '../components/DeliScreenCard'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    container2: {
    //   flex: 1,
      flexDirection: 'row',
      marginTop: 20, 
    }
});

let vals = []
vals.push({'name': 'Abdu', 'loc':'Hyderabad'})
vals.push({'name': 'Kev', 'loc':'Trivandrum'})

let cards = vals.map(item => {
  return <DeliScreenCard name={item.name} key={item.name} location={item.loc} />
})

export default class UpcomingDelScreen extends React.Component{
    constructor(props) {
        super(props);
      }
    
    render(){
      // console.log(vals)
        return(
            <ScrollView style={styles.container}>
                <BottleTable/>
                <SwitchTripView navigation={this.props.navigation}/>
                
                {cards}
            </ScrollView>
        )
    }

}