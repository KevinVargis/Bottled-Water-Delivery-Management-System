import React from 'react';
import { Text, StyleSheet, SafeAreaView,View, TouchableOpacity } from 'react-native';
import BottleTable from "../components/BottleTable"
import SwitchTripView from "../components/SwitchTripView"
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

export default class ProgressScreen extends React.Component{
    constructor(props) {
        super(props);
      }
      
      static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Delivery Progress',
        };
      };
    
    render(){
        return(
            <View style={styles.container}>
                <BottleTable/>
                <SwitchTripView navigation={this.props.navigation}/>
                <Text>In Development Stage</Text>
            </View>
        )
    }

}