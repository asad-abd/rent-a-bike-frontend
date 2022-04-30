import React, {Component} from 'react';
import {View,Text} from 'react-native'; 
import RNUpiPayment from 'react-native-upi-payment';
/*
    npm install react-native-upi-payment
    react-native link
*/

export default class App extends Component{
    constructor(props){
        super();
        this.state={
            Status:"", txnId:"",
        }
    }
    render(){
        that=this;
        function floo(){
            RNUpiPayment.initializePayment({
                vpa: '7715077008', // or can be john@ybl or mobileNo@upi
                payeeName: 'Asad Abidi',
                amount: '1',
                transactionRef: 'some-random-id'
            },successCallback,failureCallback);
        }
        function failureCallback(data){
            if(data['Status']=="SUCCESS"){
                that.setState({Status:"SUCCESS"});
                that.setState({txnId:data['txnId']});
            else
                that.setState({Status:"FAILURE"})
        }
        function successCallback(data){
            //nothing happened here using Google Pay
        }
        return (
        <View style={{alignItems:"center",justifyContent:"center",flex:1}}>
            <Text onPress={()=>{floo()}}>OPEN</Text>
            <Text>{this.state.Status+" "+this.state.txnId}</Text>
        </View>
        );
    }
}