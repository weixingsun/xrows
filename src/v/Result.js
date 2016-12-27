import React from 'react';
import {AsyncStorage, Dimensions, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
//import SQLite from 'react-native-sqlite-storage'
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

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            lines:[],
        }
        this.file=null
        this.default_func = 'SELECT * from {SRC} '
        this.default_funcs = {
            func1:this.default_func,
            func2:this.default_func,
            func3:this.default_func,
        }
    }
    componentWillMount(){
        this.exist(this.props.file)
    }
    exist(path){
        RNFS.exists(path).then((result) => {
            if(result) {
                let file=this.getFileInfo(this.props.file)
                this.execFunc1(this.props.func,file)
                this.updateTitle()
            }else{
                alert(I18n.t('file_expired'))
            }
        }).catch((err)=>{
            alert('err '+JSON.stringify(err))
        })
    }
    processSql(func,txt,file){
        let sql0 = txt
        if(txt==null) sql0 = this.default_func
        let sql1 = sql0.replace(' from ',' into {DST} from ')
        let dst = 'csv("'+file.dir+'/'+func+'.csv",{separator:","})'
        let insert = sql1.replace('{DST}',dst).replace('{SRC}',file.ext+'("'+file.full+'") ')
        var select = 'SELECT * from csv("'+file.dir+'/'+func+'.csv",{separator:","}) '
        return {insert,select}
    }
    findFunc(funcs_txt,name){
        let json = typeof funcs_txt==='object'?funcs_txt:JSON.parse(funcs_txt)
        return json[name]
    }
    execFunc1(name,file){
        AsyncStorage.getItem('functions').then((funcs)=>{
            let sql = this.default_func
            let funcs_txt = funcs==null?this.default_funcs:funcs
            let func_txt = this.findFunc(funcs_txt,name)
            let sqls = this.processSql(name,func_txt,file)
            alasql.promise(sqls.insert).then((res)=>{
                alasql.promise(sqls.select).then((result)=>{
                    this.setState({ lines:result })
                }).catch((err)=>{})
            }).catch((err)=>{
                alert(I18n.t('invalid_sql'))
            })
        });
    }
    getFileInfo(filePath){
        //filename.replace('%3A',':').replace('%2F','/')
        let lastIdx = filePath.lastIndexOf('/')
        let file = filePath.substr(lastIdx+1)
        let folder = filePath.substr(0,lastIdx)
        let dotIdx = file.lastIndexOf('.')
        let fileNoExt = file.substr(0,dotIdx)
        let ext = file.substr(dotIdx+1)
        return{
            dir:folder,
            name:file,
            ext:ext,
            noext:fileNoExt,
            full:filePath,
        }
    }
    updateTitle(){
        Actions.refresh({
            //key:'result',
            title:'Result '+this.props.func+'.csv',
            //renderRightButton: ()=> <Icon name={'play'} size={20} color={'#333'} onPress={()=> Actions.result({file:this.file.full,func:'func1'}) } />,
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
