import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage'
//import alasql from 'alasql';
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

export default class CsvView extends React.Component {
	constructor(props) {
        super(props);
        this.state={ 
            content:'',
        }
    }
	sqlCsv(sql,param,cbk){
		//alasql(sql,param,function(data){
		//	cbk(data)
		//})
	}
	componentWillMount(){
		//filename.replace('%3A',':').replace('%2F','/')
		//RNFS.readFile(this.props.file)  //, 'utf8'
		//.then((contents)=>{
		//	this.setState({content:contents})
		//})
		var sql = 
		   'SELECT participant,age,sex,region,word,time_stamp, '
		   +'min(X_00) as Ax,max(X_00) as Bx,max(Y_00) as Cy '
		   +'FROM csv("'+this.props.file+'",{headers:true}) '
		   +'group by participant,age,sex,region,word,time_stamp';
		//this.sqlCsv(sql,[],(data)=>{
		//	alert('sqlCsv()'+data)
		//})
		let lastIdx   = this.props.file.lastIndexOf('/')
		let title = this.props.file.substr(lastIdx)
		let folder = this.props.file.substr(0,lastIdx)
        Actions.refresh({title:'Group by: '+title})
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
