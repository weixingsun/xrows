import React from 'react';
import {AsyncStorage, Dimensions, ListView, Platform, StyleSheet, Text, TouchableHighlight, View, } from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import RNFS from 'react-native-fs';
//import SQLite from 'react-native-sqlite-storage'
import alasql from '../sql/alasql.fs';
import { Col, Row, Grid } from "react-native-easy-grid";
import I18n from 'react-native-i18n';
import styles from '../style'

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.ds= new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
            lines:[],
        }
        this.file=null
        this.default_sql = 'SELECT * from {SRC} '
        this.default_sqls = {
            sql1:this.default_sql,
            sql2:this.default_sql,
            sql3:this.default_sql,
        }
    }
    componentWillMount(){
        this.exist(this.props.file)
    }
    exist(path){
        RNFS.exists(path).then((result) => {
            if(result) {
                let file=this.getFileInfo(this.props.file)
                this.execFunc1(this.props.sql,file)
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
        if(txt==null) sql0 = this.default_sql
        let sql1 = sql0.replace('from',' into {DST} from ')
        let dst = 'csv("'+file.dir+'/'+func+'.csv",{separator:","})'
        let insert = sql1.replace('{DST}',dst).replace('{SRC}',file.ext+'("'+file.full+'") ')
        //alert('insert='+insert+'\nsql0='+sql0+'\nsql1='+sql1)
        var select = 'SELECT * from csv("'+file.dir+'/'+func+'.csv",{separator:","}) '
        return {insert,select}
    }
    findFunc(funcs_txt,name){
        let json = typeof funcs_txt==='object'?funcs_txt:JSON.parse(funcs_txt)
        return json[name]
    }
    execFunc1(name,file){
        AsyncStorage.getItem('sqls').then((sqls_result)=>{
            let sql = this.default_sql
            let sqls_txt = sqls_result==null?this.default_sqls:sqls_result
            let sql_txt = this.findFunc(sqls_txt,name)
            let sqls = this.processSql(name,sql_txt,file)
            //alert('sqls='+JSON.stringify(sqls))
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
            title:'Result '+this.props.sql+'.csv',
            //renderRightButton: ()=> <Icon name={'play'} size={20} color={'#333'} onPress={()=> Actions.result({file:this.file.full,sql:'sql1'}) } />,
        });
    }
    _renderRowView(rowData) {
        if(rowData==null) return
        //alert('rowData='+JSON.stringify(rowData))
        return (
            <View style={styles.row}>
                <Grid >
                    {Object.keys(rowData).map((key,i)=>{
                        return <Col key={i} style={styles.cell}><Text style={styles.value_text}>{rowData[key]}</Text></Col>
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
        <View style={styles.content} >
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
