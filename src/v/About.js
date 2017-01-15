import React from 'react';
import {Alert,Image,ListView, View, Text, StyleSheet, ScrollView, TouchableOpacity,NativeModules,Linking} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import I18n from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info'

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        padding: 15,
    },
	detail_card: {
		justifyContent: 'center',
		//alignItems: 'center',
		borderWidth: 1,
		backgroundColor: '#fff',
		borderColor: 'rgba(0,0,0,0.1)',
		marginTop: 5,
		shadowColor: '#ccc',
		//shadowOffset: { width: 2, height: 2, },
		shadowOpacity: 0.5,
		shadowRadius: 3,
		//flexDirection:'row',
		padding: 15,
		//paddingTop:5,
		//paddingBottom:5,
	},
});

export default class Group extends React.Component {
	constructor(props) {
        super(props);
        this.state={ 
            id:'',
        }
		this.file=null
    }
	renderFeedback(){
        return (
            <View style={styles.detail_card} >
              <View style={{flexDirection:'row'}}>
                  <Text style={{width:80,justifyContent: 'center',alignItems:'center',fontSize:16,fontWeight:'bold',color:'black'}}> {I18n.t('id')}: </Text>
                  <Text style={{marginLeft:10,justifyContent:'center'}}>{this.state.id}</Text>
              </View>
            </View>
        )
    }
    renderIcon(){
		//DeviceInfo.getVersion()
        return (
            <View style={{flex:1,height:200,justifyContent: 'center',alignItems:'center'}}>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Image 
                    style={{width: 100, height: 100, backgroundColor:'white'}}
                    source={require('../../img/xrows.png')}
                />
                <Text style={{justifyContent:'center'}} >{I18n.t('xrows')} {DeviceInfo.getVersion()}</Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
            </View>
        )
    }
    renderCopyright(){
        let date = new Date()
        return (
            <View style={{flex:1,height:200,justifyContent: 'center',alignItems:'center'}}>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} >Copyright @{date.getYear()+' '+I18n.t('xrows')}</Text>
                <Text style={{justifyContent:'center'}} > </Text>
            </View>
        )
    }
    render(){
		//<Text>File:{this.props.file}</Text>
        return (
            <View style={styles.container}>
			{this.renderIcon()}
			{this.renderFeedback()}
			{this.renderCopyright()}
            </View>
        );
    }
}
/*
'use strict';
import React, {Component} from 'react'
import {Alert,Image,ListView, View, Text, StyleSheet, ScrollView, TouchableOpacity,NativeModules,Linking } from 'react-native'
import {Icon} from './Icon'
import Style from './Style'
import ToS from './ToS'
import Push from '../io/Push'
import NavigationBar from 'react-native-navbar'
import I18n from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info'

export default class About extends React.Component {
    constructor(props) {
      super(props);
      this.ds = new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
      });
      this.state = {
          //onesignal_id:'',
          uid:'',
      };
      //this.openJsonAPI = this.openJsonAPI.bind(this);
      //this.openWebList = this.openWebList.bind(this);
    }
    componentWillMount() {
        //Push.getS1Id()
    }
    renderPush(){
        return (
            <View style={Style.detail_card} >
              <View style={{flexDirection:'row'}}>
                  <Text style={{width:80,justifyContent: 'center',alignItems:'center',fontSize:16,fontWeight:'bold',color:'black'}}> {I18n.t('uid')}: </Text>
                  <Text style={{marginLeft:10,justifyContent: 'center'}}>{ Push.uid }</Text>
              </View>
            </View>
        )
    }


    render(){
      let titleName = I18n.t('about')+' '+I18n.t('shareplus')
      return (
      <View>
          <NavigationBar style={Style.navbar} title={{title:titleName,tintColor:Style.font_colors.enabled}} 
              leftButton={
                 <TouchableOpacity style={{width:50,height:50}} onPress={() => this.props.navigator.pop()}>
                    <Icon name={"ion-ios-arrow-round-back"} color={Style.font_colors.enabled} size={40} />
                 </TouchableOpacity>
              }
          />
          {this.renderIcon()}
          {this.renderPush()}
          {this.renderFeedback()}
          {this.renderCopyright()}
      </View>
      );  //{this.renderHomepage()}
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    scrollViewContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
    },
    listViewContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        backgroundColor: "#EEE",
    },
    header: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 6,
        backgroundColor: "#387ef5",
    },
});
*/
