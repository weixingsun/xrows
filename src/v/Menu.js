import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
//import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
const DocumentPicker = require('react-native').NativeModules.RNDocumentPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#E5ECEF",
	padding:20,
    //borderWidth: 2,
    //borderColor: 'gray',
  }
});
const contextTypes = {
    drawer: React.PropTypes.object,
};
const showFilePicker = ()=>{
	DocumentPicker.show({
		//filetype: ['public.data'],
	},(result) => { 
		//{type:'text/comma-separated-values',fileName:'test.csv',fileSize:2499,uri:'content://...'}
		console.log('Menu page get file:'+JSON.stringify(result))
		if(result.type && result.type==='text/comma-separated-values'){
			Actions.view({file:result.uri })
		}else if(result.err) alert('err='+result.err)
	});
}
const Menu = (props, context) => {
    const drawer = context.drawer;
	//<MaterialIcon name="home" size={30} color={Colors.red} style={styles.icon}/>
    return (
        <View style={styles.container}>
			<TouchableOpacity
				style={styles.link}
				//underlayColor={Colors.charcoal}
				onPress={() => { drawer.close(); showFilePicker() } }>
				<Text style={styles.text}>Open a file</Text>
			</TouchableOpacity>
        </View>
    )
}
Menu.contextTypes = contextTypes;
export default Menu;