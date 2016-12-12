import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
//import SQLite from 'react-native-sqlite-storage'
import alasql from 'alasql';
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
		var sql = 'SELECT people,age,sex,region,word,count(1) '
			+'from csv(?,{headers:true,fromString:true}) '
			+'group by people,age,sex,region,word'
		RNFS.readFile(this.props.file).then((contents)=>{ //'utf8'
			alasql(sql,[contents],function(result){
				alert('alasql.count(1) = '+JSON.stringify(result))
			})
		})
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
