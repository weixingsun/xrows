import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
//import SQLite from 'react-native-sqlite-storage'
import alasql from '../sql/alasql.fs';
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});

export default class Group extends React.Component {
	constructor(props) {
        super(props);
        this.state={ 
            content:'',
        }
		this.file=null
    }

    render(){
		//<Text>File:{this.props.file}</Text>
        return (
            <View style={styles.container}>
				<Text>{this.state.content}</Text>
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

export default class USBList extends React.Component {
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
      //I18n.locale = NativeModules.RNI18n.locale
      //this.openJsonAPI = this.openJsonAPI.bind(this);
      //this.openWebList = this.openWebList.bind(this);
    }
    componentWillMount() {
        //Push.getS1Id()
    }
    goToS(){
        this.props.navigator.push({
            component: ToS,
            passProps: {navigator:this.props.navigator,},
        })
    }
    renderEmail(){
        return (
            <View style={Style.detail_card} >
              <View style={{flexDirection:'row'}}>
                  <Text style={{width:60,justifyContent: 'center',alignItems:'center',fontSize:16,fontWeight:'bold',color:'black'}}> {I18n.t('s1id')}: </Text>
                  <Text style={{marginLeft:10,justifyContent: 'center'}}> sun.app.service@gmail.com </Text>
              </View>
            </View>
        )
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
    renderFeedback(){
        return (
            <View style={Style.detail_card} >
              <View style={{flexDirection:'row'}}>
                  <Text style={{width:80,justifyContent: 'center',alignItems:'center',fontSize:16,fontWeight:'bold',color:'black'}}> {I18n.t('feedback')}: </Text>
                  <Text style={{marginLeft:10,justifyContent: 'center'}} onPress={this.openEmail}>sun.app.service@gmail.com</Text>
              </View>
            </View>
        )
    }
    openEmail(){
        Alert.alert(
            I18n.t("feedback"),
            I18n.t("confirm_feedback"),
            //"Do you want to reply this information ? \nnotify_value="+JSON.stringify(notify_value),
            [
                {text:I18n.t("no"), },
                {text:I18n.t('yes'), onPress:()=>{
                    Linking.openURL('mailto:sun.app.service@gmail.com')
                }},
            ]
        );
    }
    renderIcon(){
        return (
            <View style={{flex:1,height:200,justifyContent: 'center',alignItems:'center'}}>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Image 
                    style={{width: 100, height: 100}}
                    source={require('../img/icon.png')}
                />
                <Text style={{justifyContent:'center'}} >{I18n.t('shareplus')} {DeviceInfo.getVersion()}</Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
            </View>
        )
    }
    renderCopyright(){
        return (
            <View style={{flex:1,height:200,justifyContent: 'center',alignItems:'center'}}>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{color:'blue',textDecorationLine:'underline',textDecorationStyle:'solid',justifyContent:'center'}} onPress={() => this.goToS()} >{I18n.t('tos')}</Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} >Copyright @2016 {I18n.t('shareplus')}</Text>
                <Text style={{justifyContent:'center'}} > </Text>
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