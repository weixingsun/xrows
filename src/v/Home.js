import React from 'react';
import {Dimensions, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import {DocumentPickerUtil,DocumentPicker} from "react-native-document-picker";
import Icon from 'react-native-vector-icons/FontAwesome';
import RNFS from 'react-native-fs';
import alasql from '../sql/alasql.fs';
import { Col, Row, Grid } from "react-native-easy-grid";
import I18n from 'react-native-i18n';

let styles = {
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        //backgroundColor: "#F5FCFF",
        marginTop:Platform.OS==='android'?54:64,
    },
    listContainer: {
        flex: 1,
        //flexDirection: 'column',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
	header:{
		alignItems:'center',
		justifyContent:'center',
		borderWidth:0.5,
		borderBottomWidth:0,
		borderRightWidth:0,
		height:40,
	},
	header_text:{
		fontWeight:'bold',
	},
	row:{
		alignItems:'center',
		justifyContent:'center',
		borderWidth:0.5,
		borderBottomWidth:0,
		borderTopWidth:0,
		borderRightWidth:0,
		height:40,
	},
	cell:{
		alignItems:'center',
		justifyContent:'center',
		borderWidth:0.5,
		borderTopWidth:0,
		borderLeftWidth:0
	},
};

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={ 
            lines:[],
        }
        this.file=null
    }
    componentWillMount() {
        //this.addRunIcon()
    }
    componentWillReceiveProps(nextProps) {
        //nextProps={onNavigate,navigationState,name,sceneKey,parent,type,title,initial,drawerIcon,component,index,file,from}
        //alert('componentWillReceiveProps: file'+JSON.stringify(nextProps.file))
        if(nextProps.file!==null){
            this.readFile(nextProps.file);
        //}else if(nextProps.content){
        //    this.setState({content:nextProps.content})
        }
    }
	getFileInfo(filePath){
		//filename.replace('%3A',':').replace('%2F','/')
		let lastIdx = filePath.lastIndexOf('/')
		let file = filePath.substr(lastIdx+1)
		let folder = filePath.substr(0,lastIdx)
		let dotIdx = file.lastIndexOf('.')
		let fileNoExt = file.substr(0,dotIdx)
		let ext = file.substr(dotIdx+1)
		return {
			dir:folder,
			name:file,
			ext:ext,
			noext:fileNoExt,
			full:filePath,
		}
	}
	readFile(filePath){
		this.file = this.getFileInfo(filePath)
		//alert(this.file.ext)
		if(this.file.ext==='csv'||this.file.ext==='xls'||this.file.ext==='xlsx'){
			this.readExcel(this.file)
		}
	}
	readExcel(file){
		//var sql = 'SELECT * from csv("'+file.full+'",{headers:true}) '
		var sql = 'SELECT * from '+file.ext+'("'+file.full+'") '
		//alert('sql='+sql)
		alasql(sql,[],(result)=>{
			//alert('alasql.select * '+JSON.stringify(result))
			this.updateWithActionIcon()
			this.setState({
				lines:result,
			})
			//let sql2 = 'SELECT * INTO csv("'+this.file.dir+'/test2.csv",{headers:true,separator:","}) FROM ?'
			//alert('sql2='+sql2)
			//alasql(sql2, [result]);
		})
	}
	updateWithActionIcon(){
		Actions.refresh({
			key:'home',
			title:this.file.name,
			renderRightButton: ()=> <Icon name={'play'} size={20} color={'#333'} onPress={()=> Actions.result({file:this.file.full,func:'func1'}) } />,
			//content:content,
			file:null,
		});
	}
	_renderRowView(rowData) {
		if(rowData==null) return
		//alert('rowData='+JSON.stringify(rowData))
		return (
			<View style={styles.row}>
				<Grid >
					{Object.keys(rowData).map((key,i)=>{
						return <Col key={i} style={styles.cell}><Text>{rowData[key]}</Text></Col>
					})}
				</Grid>
				<View style={styles.separator} />
			</View>
		);
	}
	_renderTitleRowView(rowData) {
		if(rowData==null) return
		return (
			<View style={styles.header}>
				<Grid >
					{Object.keys(rowData).map((key,i)=>{
						return <Col key={i} style={styles.cell}><Text style={styles.header_text}>{key}</Text></Col>
					})}
				</Grid>
				<View style={styles.separator} />
			</View>
		);
	}
    render(){
        return (
		<View style={styles.container} >
			{this._renderTitleRowView(this.state.lines[0])}
            <ListView style={styles.listContainer}
                dataSource={this.ds.cloneWithRows(this.state.lines)}
                renderRow={this._renderRowView.bind(this)}
                enableEmptySections={true}
            />
		</View>
        );
    }
}
