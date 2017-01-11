import React from 'react';
import {AsyncStorage, Platform, View, Text, TextInput, StyleSheet,TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';
//import RNFS from 'react-native-fs';
//import Button from "react-native-button";
//import MIcon from 'react-native-vector-icons/MaterialIcons';
//import SQLite from 'react-native-sqlite-storage'
//import alasql from 'alasql'
//import alasql from '../sql/alasql.fs';
//import AxInput from './AxInput';
import I18n from 'react-native-i18n';
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form';
import styles from '../style'

export default class FunctionEdit extends React.Component {
	constructor(props) {
        super(props);
        this.state={
            functions:{},
        }
	this.default_funcs = {}
        this.renderBackIcon = this.renderBackIcon.bind(this)
    }
    componentWillMount(){
        //AsyncStorage.removeItem("functions")
        this.getFunctionDB("functions")
        this.default_funcs['sqrt'] = 'function(x){\n  return Math.sqrt(x)\n}'
        this.default_funcs['inc'] = 'function(x){\n  return x+1\n}'
    }
    getDefaultFunction(name){
        return this.default_funcs //.replace('{function}',name)
    }
    getFunctionDB(name){
        AsyncStorage.getItem(name).then((value)=>{
            if(value){
                this.setState({
                    functions:JSON.parse(value)
                });
            }else{
                this.setState({
                    functions:this.default_funcs
                });
            }
        });
    }
    setFunctionDB(name,value){
        AsyncStorage.setItem(name,value)
    }
    handleValueChange(values){
         //alert('values='+JSON.stringify(values))
         //if(values.func1){
         //let key = Object.keys(values)[0]
         //let txt = values[key]
         this.setFunctionDB('functions',JSON.stringify(values))
         //let functions = this.state.functions[key]=txt
         this.setState({ functions:values })
             //this.setState({form:{...this.state.form,cat:this.lastcat}})
             //if(values.price)this.setState({validationResults:GiftedFormManager.validate(this.formName)});
        //}
    }
    renderFormFunc(name){
        return (
            <GiftedForm.ModalWidget
                name={name}
                title={name}
                //display={this.state.functions.func1}
                key={name}
                //scrollEnabled={true}
                image={<View style={{marginLeft:8,width:20,alignItems:'center'}}><Icon name={'slack'} size={20} /></View>}
                value={this.state.functions[name]}
                //validationResults={this.state.validationResults}
                //displayValue='content'
            >
                <GiftedForm.SeparatorWidget/>
                <GiftedForm.TextAreaWidget name={name} title={I18n.t(name)}
                    autoFocus={true}
                    placeholder={'function(x){\n  return x+1\n}'}
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
        //alert(JSON.stringify(this.state.functions))
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
                    {Object.keys(this.state.functions).map((k,i)=>{
                        return this.renderFormFunc(k)
                    })}
                </GiftedForm>
            </View>
        );
    }
}
