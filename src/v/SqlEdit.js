import React from 'react';
import {AsyncStorage, Platform, View, Text, TextInput, StyleSheet,TouchableHighlight} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
//import SQLite from 'react-native-sqlite-storage'
//import alasql from 'alasql'
import alasql from '../sql/alasql.fs';
import AxInput from './AxInput';
import I18n from 'react-native-i18n';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import styles from '../style'

export default class FunctionEdit extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            sqls:{
                sql1:'',
                sql2:'',
                sql3:'',
            },
        }
	this.default_sqls = {
            sql1:'SELECT * from {SRC} ',
            sql2:'SELECT * from {SRC} ',
            sql3:'SELECT * from {SRC} ',
        }
        this.renderBackIcon = this.renderBackIcon.bind(this)
    }
	componentWillMount(){
		this.getFormula()
    }
	getFormula(){
		this.getFunctionDB("sqls")
	}
	getDefaultFunction(name){
		return this.default_sqls
	}
	getFunctionDB(name){
		AsyncStorage.getItem(name).then((value)=>{
			if(value){
				this.setState({
					sqls:JSON.parse(value)
				});
			}else{
				this.setState({
					sqls:this.default_sqls
				});
			}
		});
	}
	setFunctionDB(name,value){
		AsyncStorage.setItem(name,value)
	}
    handleValueChange(values){
         //alert('values='+JSON.stringify(values))
         //let key = Object.keys(values)[0]
         //let txt = values[key]
         this.setFunctionDB('sqls',JSON.stringify(values))
         this.setState({ sqls:values })
             //this.setState({form:{...this.state.form,cat:this.lastcat}})
             //if(values.price)this.setState({validationResults:GiftedFormManager.validate(this.formName)});
        //}
    }
    renderFormFunc(name){
        return (
            <GiftedForm.ModalWidget
                name={name}
                title={I18n.t(name)}
                //display={this.state.sqls.sql1}
                 //scrollEnabled={true}
                image={<View style={{marginLeft:8,width:20,alignItems:'center'}}><Icon name={'calculator'} size={20} /></View>}
                value={this.state.sqls[name]}
                //validationResults={this.state.validationResults}
                //displayValue='content'
            >
                <GiftedForm.SeparatorWidget/>
                <GiftedForm.TextAreaWidget name={name} title={I18n.t(name)}
                    autoFocus={true}
                    placeholder={I18n.t(name)}
                    //value={this.state.form.content}
                    //style={{flex:1}}
                />
            </GiftedForm.ModalWidget>
        )
    }
    renderBackIcon(){
        return (
        <TouchableHighlight onPress={Actions.pop}>
            <Icon name={"chevron-left"} color={"#2a2929"} size={24} style={styles.bk} />
        </TouchableHighlight>
        )
    }
    render(){
        return (
            <View style={styles.content}>
                <GiftedForm
                    formName={this.formName}
                    style={{flex:1,marginLeft:10,marginRight:10}}  //height:form_height
                    openModal={(route) => { Actions.formModal({ ...route, title:route.getTitle(), renderLeftButton:this.renderBackIcon }) }}
                    onValueChange={this.handleValueChange.bind(this)}
                    //validators={ this.validators }
                    defaults={this.state.form}
                    >
                        {this.renderFormFunc('sql1')}
                        {this.renderFormFunc('sql2')}
                        {this.renderFormFunc('sql3')}
                </GiftedForm>
            </View>
        );
    }
}
