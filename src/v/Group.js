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

export default class CsvView extends React.Component {
	constructor(props) {
        super(props);
        this.state={ 
            content:'',
        }
		this.file=null
    }
	componentWillMount(){
		this.file=this.getFileInfo(this.props.file)
		var sql1 = 'SELECT people,age,sex,region,word,count(1) '
			+'into csv("'+this.file.dir+'/test3.csv") '
			+'from csv("'+this.file.full+'",{headers:true}) '
			+'group by people,age,sex,region,word'
		alasql(sql1,[],(result)=>{
			alert('success') //JSON.stringify(result)
		})
        Actions.refresh({title:'Group by: '+this.file.name})
    }
	getFileInfo(filePath){
		//filename.replace('%3A',':').replace('%2F','/')
		let lastIdx = filePath.lastIndexOf('/')
		let file = filePath.substr(lastIdx+1)
		let folder = filePath.substr(0,lastIdx)
		let fileNoExt = file.substr(0,file.lastIndexOf('.'))
		return{
			dir:folder,
			name:file,
			noext:fileNoExt,
			full:filePath,
		}
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
