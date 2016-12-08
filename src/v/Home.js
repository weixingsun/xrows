import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";

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

export default class Home extends React.Component {
    showFilePicker(){
      DocumentPicker.show({
        //filetype: ['public.data'],
      },(result) => { 
	    //{type:'text/comma-separated-values',fileName:'test.csv',fileSize:2499,uri:'content://...'}
		console.log('Home page get file:'+JSON.stringify(result))
		if(result.type && result.type==='text/comma-separated-values') Actions.view({file:result.uri })
		else if(result.err) alert('err='+result.err)
      });
    }
    render(){
        return (
            <View style={styles.container}>
                <Text>Go to Menu</Text>
                <Button onPress={this.showFilePicker}>Open a file</Button>
            </View>
        );
    }
}
