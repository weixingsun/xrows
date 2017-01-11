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

var styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
	content:{
        flex: 1,
		marginTop:Platform.select({
			ios: 64,
			android: 54,
		})
	},
	section:{
		flex: 1,
		justifyContent: 'center',
		//alignItems: 'center',
		//borderWidth: 1,
		//backgroundColor: '#fff',
		//borderColor: 'rgba(0,0,0,0.1)',
		//marginTop: 5,
		//shadowColor: '#ccc',
		//shadowOffset: { width: 2, height: 2, },
		//shadowOpacity: 0.5,
		//shadowRadius: 3,
		//flexDirection:'row',
		//padding: 15,
		//paddingTop:5,
		//paddingBottom:5,
	},
	title:{
		fontWeight:'bold',
		fontSize:20,
		backgroundColor:'#eeeeee',
	},
    bk:{
        marginLeft:5,
        marginRight:20,
        //alignItems:'center',
        //marginTop:5,
        //marginBottom:5,
    },
});

export default class FunctionEdit extends React.Component {
	constructor(props) {
        super(props);
        this.state={
		functions:{
			func1:'',
			func2:'',
			func3:'',
		},
        }
	this.default_funcs = {
            func1:'SELECT * from {SRC} ',
            func2:'SELECT * from {SRC} ',
            func3:'SELECT * from {SRC} ',
        }
        this.renderBackIcon = this.renderBackIcon.bind(this)
    }
	componentWillMount(){
		this.getFormula()
    }
	getFormula(){
		this.getFunctionDB("functions")
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
                title={I18n.t(name)}
                display={this.state.functions.func1}
                 //scrollEnabled={true}
                image={<View style={{marginLeft:8,width:20,alignItems:'center'}}><Icon name={'slack'} size={20} /></View>}
                value={this.state.functions[name]}
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
                        {this.renderFormFunc('func1')}
                        {this.renderFormFunc('func2')}
                        {this.renderFormFunc('func3')}
                </GiftedForm>
            </View>
        );
    }
}
