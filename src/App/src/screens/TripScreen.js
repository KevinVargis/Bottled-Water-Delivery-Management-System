import React from 'react';
import { Text, StyleSheet, SafeAreaView,View,ScrollView, TouchableOpacity } from 'react-native';
import BottleTable from "../components/BottleTable"
import SwitchTripView from "../components/SwitchTripView"
import { Table, TableWrapper, Row } from 'react-native-table-component';

const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    container2: {
    //   flex: 1,
      flexDirection: 'row',
      marginTop: 20, 
    },
    tableContainer: { flex: 1, padding: 4, paddingTop: 30, backgroundColor: '#F4FAFF' },
    header: { height: 50, backgroundColor: '#124559'},
    text: { textAlign: 'center', fontWeight: '100' },
    headertext: { textAlign: 'center', fontWeight: 'bold',color:'#F4FAFF', },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#FFFFFF' },
    outerTable: {borderWidth: 1, borderColor: '#C1C0B9'},
    innerTable:{borderWidth: 1, borderColor: '#C1C0B9'}
    
});

export default class TripScreen extends React.Component{
    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Completed Deliveries',
        };
      };
    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Location', 'D', 'R', 'Time Stamp'],
          widthArr: [200, 40, 40, 120]
        }
      }

    render(){
      console.log("trip",this.props)
      const state=this.state
      const tableData = [];
      for (let i = 0; i < 20; i += 1) {
        const rowData = [];
        rowData.push('Dummmy Location')
        for (let j = 0; j < 3; j += 1) {
          rowData.push(`${i}${j}`);
        }
        tableData.push(rowData);
      }

        return(
            <View style={styles.container}>
                <BottleTable/>
                <SwitchTripView navigation={this.props.navigation}/>
                <View style={styles.tableContainer}>
                  <ScrollView horizontal={true}>
                    <View>
                      <Table borderStyle={styles.outerTable}>
                        <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.headertext}/>
                      </Table>
                      <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={styles.innerTable}>
                          {
                            tableData.map((rowData, index) => (
                              <Row
                                key={index}
                                data={rowData}
                                widthArr={state.widthArr}
                                style={[styles.row, index%2 && {backgroundColor: '#F4FAFF'}]}
                                textStyle={styles.text}
                              />
                            ))
                          }
                        </Table>
                      </ScrollView>
                    </View>
                  </ScrollView>
                </View>
            </View>
        )
    }

}