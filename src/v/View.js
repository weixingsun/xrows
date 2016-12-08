import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';

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
	componentWillMount(){
		//filename.replace('%3A',':').replace('%2F','/')
		RNFS.readFile(this.props.file)  //, 'utf8'
		.then((contents)=>{
			this.setState({content:contents})
		})
		let arr   = this.props.file.split('/')
		let title = arr[arr.length-1]
        Actions.refresh({title});
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
