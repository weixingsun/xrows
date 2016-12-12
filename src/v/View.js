import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
//import SQLite from 'react-native-sqlite-storage'
import alasql from 'alasql'

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
		this.db=null;
		this.lines=null;
    }
	
	componentWillMount(){
		//filename.replace('%3A',':').replace('%2F','/')
		let lastIdx   = this.props.file.lastIndexOf('/')
		let file = this.props.file.substr(lastIdx+1)
		let folder = this.props.file.substr(0,lastIdx)
		let fileNoExt = file.substr(0,file.lastIndexOf('.'))
		RNFS.readFile(this.props.file)  //, 'utf8'
		.then((contents)=>{
			this.setState({content:contents})
			//this.lines=contents;
			//if(this.db!==null) 
			//this.insertAll(fileNoExt,contents)
			//if(this.db) this.createTable(this.db,fileNoExt,contents)
            //console.log('RNFS.readFile()'+this.props.file)
		})
        //Actions.refresh({rightTitle:'Run',onRight:()=>Actions.group({file: this.props.file})});
		Icon.getImageSource('play', 20, '#559').then(imgsource => {
			//this.setState({ rightIcon: imgsource })
			Actions.refresh({
					key:'view',
					title:file,
					rightButtonImage: imgsource,
					rightButtonIconStyle:{width:20,height:20},
					onRight:()=>{ Actions.group({file: this.props.file}) }
			});
        })
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
