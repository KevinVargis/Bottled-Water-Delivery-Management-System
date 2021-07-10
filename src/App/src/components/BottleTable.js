import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class BottleTable extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        HeadTable: ['Filled', 'Empty', 'Damaged', 'Total'],
        DataTable: [
          [6 , 7, 9, 0]
        ]
      }
      this.state.DataTable[0][3]=this.state.DataTable[0][2]+this.state.DataTable[0][1]+this.state.DataTable[0][0]
    }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#042161'}}>
          <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.HeaderText}/>
          <Rows data={state.DataTable} textStyle={styles.TableText}/>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    // flex: 1,
    padding: 18,
    paddingTop: 30,
    backgroundColor: '#F4FAFF' 
  },
  HeadStyle: { 
    height: 50,
    alignContent: "center",
    backgroundColor: '#124559'
  },
  TableText: { 
    margin: 10,
    fontWeight: "bold"
  },
  HeaderText: { 
    margin: 10,
    fontWeight: "bold",
    color:'white'
  }
});