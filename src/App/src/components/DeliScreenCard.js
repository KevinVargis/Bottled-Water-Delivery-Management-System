
import React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import {View,ScrollView} from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="map-marker-radius" backgroundColor='#124559' color="#F4FAFF"/>



export default class DeliScreenCard extends React.Component{
    constructor(props) {
        super(props);
      }
    
    render(){
        return(
            <View>
                <Card style={{marginTop: 10}}>
                  <Card.Title title={this.props.name}  subtitle={this.props.location} left={LeftContent} />
                  <Card.Content>
                    {/* <Title>Card title</Title> */}
                    {/* <Paragraph>Card content</Paragraph> */}
                  </Card.Content>
                  {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                  <Card.Actions>
                    <Button color='#124559'>Cancel</Button>
                    <Button color='#124559'>Ok</Button>
                  </Card.Actions>
                </Card>
            </View>
        )
    }

}