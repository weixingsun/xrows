import React from 'react';
import {Alert,Image,ListView, View, Text, StyleSheet, ScrollView, TouchableOpacity,NativeModules,Linking} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import I18n from 'react-native-i18n';
import DeviceInfo from 'react-native-device-info'
import styles from '../style'
import BaiduPush from 'react-native-bdpush'

export default class About extends React.Component {
    constructor(props) {
        super(props);
        this.state={ 
            id:'',
        }
        this.updateUI=true
    }
    componentWillMount() {
        let inst = new BaiduPush((evt)=>{
            if(typeof evt === 'object' && this.updateUI){
                this.setState({
                    id:evt.channel_id
                })
            }
        })
    }
    componentWillUnmount() {
        this.updateUI=false
    }
    renderField(title,value){
        return (
            <View style={styles.detail_card} >
              <View style={{flexDirection:'row'}}>
                  <Text style={{width:80,justifyContent: 'center',alignItems:'center',fontSize:16,fontWeight:'bold',color:'black'}}> {title}: </Text>
                  <Text style={{marginLeft:10,justifyContent:'center'}}>{value}</Text>
              </View>
            </View>
        )
    }
    renderIcon(){
        return (
            <View style={{flex:1,height:200,justifyContent: 'center',alignItems:'center'}}>
                <Text style={{justifyContent:'center'}} > </Text>
                <Text style={{justifyContent:'center'}} > </Text>
                <Image 
                    style={{width: 100, height: 100, backgroundColor:'white'}}
                    source={require('./img/xrows.png')}
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
                <Text style={{justifyContent:'center'}} >Copyright @{date.getFullYear()+' '+I18n.t('xrows')}</Text>
                <Text style={{justifyContent:'center'}} > </Text>
            </View>
        )
    }
    render(){
        return (
            <View style={styles.container}>
                {this.renderIcon()}
                {this.renderField(I18n.t('id'), this.state.id)}
                {this.renderCopyright()}
            </View>
        );
    }
}
