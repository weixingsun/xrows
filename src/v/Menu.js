import React from 'react';
import {Platform, View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
//const DocumentPicker = require('react-native').NativeModules.RNDocumentPicker;
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    //alignItems: "flex-start",
    backgroundColor: "#2a2929",
	//padding:20,
    //borderWidth: 2,
    //borderColor: 'gray',
  },
  menu_title: {
    justifyContent: "center",
    //alignItems: "flex-start",
    backgroundColor: "#2a2929",
	//padding:20,
	...Platform.select({
      ios: {
        height: 64,
      },
      android: {
        height: 54,
      },
    }),
  },
  menu0: {
    justifyContent: "center",
    //alignItems: "flex-start",
    backgroundColor: "#494949",
	height:48,
	paddingLeft:6,
	marginTop:1,
  },
  menu_name: {
    marginLeft:10,
    fontSize:20,
    color:'white',
  },
  menu_link:{
	  marginLeft:10,
	  flexDirection:'row',
	  justifyContent:'center',
  },
});
const contextTypes = {
    drawer: React.PropTypes.object,
};
const showFilePicker = ()=>{
	DocumentPicker.show({
		//filetype: ['public.data'],
	},(result) => { 
		//{type:'text/comma-separated-values',fileName:'test.csv',fileSize:2499,uri:'content://...'}
		//console.log('Menu page get file:'+JSON.stringify(result))
		if(result.type==='text/comma-separated-values' //csv
		|| result.type==='application/vnd.ms-excel'    //xls
		|| result.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'  //xlsx
		){
			//alert('excel='+result.type)
			Actions.refresh({
				key:'home',
				file:result.path,
			});
		}else if(result.err){
			alert('err='+result.err)
		//}else if(result.type==='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){  //xlsx
		//	alert('Excel 2010 not supported, Please use csv format')
		//}else if(result.type==='application/vnd.ms-excel'){  //xls
		//	alert('Excel 2007 not supported, Please use csv format')
		}else{
			alert('Not supported type: '+result.type)
		}
	});
}
const renderOneMenu = (drawer,icon,name,func)=>{
	return(
		<TouchableOpacity
			style={styles.menu0}
			onPress={() => { drawer.close(); func() } }>
			<View style={styles.menu_link}>
				<View style={{width:24,justifyContent:"center",}}>
				<Icon name={icon} size={20} color={'white'} />
				</View>
				<Text style={styles.menu_name}>{name}</Text>
				<View style={{flex:1}}/>
			</View>
		</TouchableOpacity>
	)
}
const Menu = (props, context) => {
    const drawer = context.drawer;
			//{renderOneMenu(drawer,'mouse-pointer','Graphic Editor',Actions.edit)}
    return (
        <View style={styles.container}>
			<View style={styles.menu_title}>
				<Text style={styles.menu_name}>Menu</Text>
			</View>
			{renderOneMenu(drawer,'folder','Open an Excel',showFilePicker)}
			{renderOneMenu(drawer,'cog','Function Editor',Actions.edit)}
			{renderOneMenu(drawer,'info-circle','About',Actions.about)}
			{renderOneMenu(drawer,'book','User Manual',Actions.book)}
			{renderOneMenu(drawer,'envelope','Contact Me',Actions.mail)}
        </View>
    )
}
Menu.contextTypes = contextTypes;
export default Menu;