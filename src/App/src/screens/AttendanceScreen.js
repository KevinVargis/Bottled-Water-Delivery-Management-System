import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Alert} from 'react-native';
// @ts-ignore
import axios from 'axios'
import WeekView from 'react-native-week-view';

const generateDates = (hours, minutes) => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  if (minutes != null) {
    date.setMinutes(minutes);
  }
  return date;
};

const sampleEvents = [
  {
    id: 1,
    description: 'Duty Hours',
    startDate: generateDates(0),
    endDate: generateDates(4),
    color: 'black',
  },
  {
    id: 2,
    description: 'Trip #8909',
    startDate: generateDates(1),
    endDate: generateDates(3),
    color: 'red',
  },
  {
    id: 3,
    description: 'Duty Hours',
    startDate: generateDates(-5),
    endDate: generateDates(-3),
    color: 'green',
  },
];

export default class AttendanceScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = 
    {
      aadhar: ' ',
      events: sampleEvents,
      selectedDate: new Date(),
      info: ' '
    }
  }

  onEventPress = ({id, color, startDate, endDate,description}) => {
    Alert.alert(
      description,
      `start: ${startDate}\nend: ${endDate}`,
    );
  };

  onGridClick = (event, startHour, date) => {
    const dateStr = date.toISOString().split('T')[0];
    Alert.alert(`Date: ${dateStr}\nStart hour: ${startHour}`);
  };

  getInfo = async (val) =>{
    // alerts("hello")
      let obj={
        aadhar:val
      }
      console.log("in getinfo")
      // console.log(val)
      // console.log(obj)
      axios.post("http://192.168.1.122:5000/api/drivers/GetInfo",obj)
      .then(res => {
        let data=res.data
        let events=[]
        let id=1
        data.driverData.attendance.map(ele =>{
          if(ele.endDate.getFullYear!=9998)
          {
            let obj=ele
            obj.id=id
            id+=1
            if(obj.description=="Duty Hours")
              obj.color='black'
            else
              obj.color='red'
            events.push(obj) 
          }
        });
        console.log(events)
        this.setState({events:events})
        // this.setState({info:data})
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
      console.log("calling getinfo")
      // console.log(this.state.aadhar)
      
    }
  }

  render() {
    const {events, selectedDate} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <WeekView
            ref={r => {
              this.componentRef = r;
            }}
            events={events}
            selectedDate={selectedDate}
            numberOfDays={3}
            onEventPress={this.onEventPress}
            onGridClick={this.onGridClick}
            headerStyle={styles.header}
            headerTextStyle={styles.headerText}
            hourTextStyle={styles.hourText}
            eventContainerStyle={styles.eventContainer}
            formatDateHeader="MMM D"
            hoursInDisplay={12}
            startHour={8}
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4FAFF',
    paddingTop: 0,
  },
  header: {
    backgroundColor: '#124559',
    borderColor: '#F4FAFF',
  },
  headerText: {
    color: '#F4FAFF',
  },
  hourText: {
    color: 'black',
  },
  eventContainer: {
    borderWidth: 1,
    borderColor: 'black',
  },
});