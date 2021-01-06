/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    ImageBackground,
    Image,
    Alert,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    Modal,
    Dimensions,
} from 'react-native';
import { NativeRouter, Route, Link, Redirect } from "react-router-native";
import imageAlphabet from '../resource/image/alphabet.jpg';
import Pagination from '../component/pagination'
import Device from '../utils/Device';

//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

const DATA = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]
const DATA2 = ["1","2","3","4"]
const StatScene = () => {

    const [search, setSearch] = useState("");
    const [reportList, setReportList] = useState([1, 2, 3, 4, 5]);
    const [imageList, setImageList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [selectItem, setSelectItem] = useState(0)
    const [selectItemId, setSelectItemId] = useState(0)
    const [selectTab, setSelectTab] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);
    const [paging, setPaging] = useState(0);
    useEffect(() => {

        fetch(`http://10.0.2.2:8000/test/?page=${1}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('check')
                setReportList(responseJson.articles)
                console.log("1")
            })
            ;
    }, [])
    const queryImage = async () => {
        await fetch(`http://10.0.2.2:8000/classifications/?testid=${1}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('check2 ')
                console.log(responseJson)
                setImageList(responseJson.articles)
                console.log("1")
            })
            ;
    }
    const backText = "< "
    const onPress = (tab) => {
        setSelectTab(tab)

    }

    const Item = ({ item, onPress }) => (
        // <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        //   <Text style={styles.title}>{item}</Text>
        // </TouchableOpacity>

        <View
            style={{ color: "white", width: "25%", alignItems: "center", borderBottomWidth: 0.5, paddingBottom: "1%" }}
        onPress={() => setModalVisible(true)}
        >
            <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text> {item} </Text>
            <Text>โมเดลทำนาย : เขียนถูก</Text>
            <Text>ความน่าจะเป็น : 99%</Text> 
        <Image source={require('../resource/image/alphabet.jpg')} style={{
                width: width/8,
                height: width/8,
                resizeMode: 'contain',
            }}></Image>
            </TouchableOpacity>
        

        </View>

   );

    const renderItem = ({ item }) => {
        //const backgroundColor = item === selectedId ? "#6e3b6e" : "#f9c2ff";
        return (
          <Item
            item={item}
            onPress={true}
          />
        )
      };


    const itemList = reportList.map((element, index) => {
        console.log("element",element)
        return (<>
            < View style={{ alignSelf: 'stretch', flexDirection: 'row', marginTop: "2%", paddingBottom: "1%", borderBottomColor: "black", borderBottomWidth: 1 }
            }>
                <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }} ><Text style={{ color: 'rgba(0,0,0,1)' }}>{element.id}</Text></View>
                <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }} ><Text style={{ color: 'rgba(0,0,0,1)' }}>นายศุทธวีร์ วีระพงษ์</Text></View>
                <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }} ><Text style={{ color: 'rgba(0,0,0,1)' }}>{element.created === undefined ? "Pending" : element.created.split("T")[0]}</Text></View>
                <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }} ><Text style={{ color: 'rgba(0,0,0,1)' }}>{element.LDResult}</Text></View>
                <View style={{ flex: 1, alignSelf: 'stretch', alignItems: 'center' }} >
                    <Button
                        title="click"
                        onPress={() => {

                            setSelectItem(1)
                            setSelectItemId(element.id)
                            queryImage()
                        }}
                    />
                </View>
            </View >
            </>)
            
    })

    if (selectItem) {
        return (<>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                }}
            >
                <TouchableOpacity style={{ ...styles.centeredView, backgroundColor: 'rgba(142,142,142,0.5)' }} onPress={() => setModalVisible(!modalVisible)}>

                    <Image source={require('../resource/image/alphabet.jpg')} style={{
                        width: "50%",
                        height: "50%",
                        resizeMode: 'contain',
                    }}></Image>


                </TouchableOpacity>

            </Modal>

            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(249,249,249,1)' }}>
                <View style={{ flex: 1.1, flexDirection: 'row' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>


                        <TouchableOpacity style={{ marginTop: "3%", marginLeft: "4%", color: "white" }} onPress={() => setSelectItem(0)} >
                            <Text style={{ fontSize: 50, color: 'rgba(142,142,142,1)' }}> {backText}</Text>
                        </TouchableOpacity>
                        <Text style={{ marginTop: "2%", marginLeft: "0%", fontSize: 75 }}>{selectItemId}</Text>
                    </View>
                </View>


                <View style={{ flex: 1.5, flexDirection: 'row', marginLeft: "10%", marginRight: "10%", backgroundColor: "white", padding: "2%" }}>
                    <View style={{ flex: 2, }}>
                        <Text style={{ marginBottom: "1.5%", color: "black", fontSize: 20 }}>นายทดสอบ สมจริง</Text>
                        <Text style={{ marginBottom: "1.5%", color: "black", fontSize: 20 }}>ความน่าจะเป็น 97.2431%</Text>
                        <Text style={{ marginBottom: "1.5%", color: "black", fontSize: 20 }}>พยัญชนะ : เขียนถูก 30 ตัว <Text style={{ color: 'rgba(232,89,89,1)' }}>เขียนผิด</Text>10 ตัว <Text style={{ color: 'rgba(104,187,177,1)' }} >เขียนกลับด้าน</Text> 4 ตัว</Text>
                        <Text style={{ marginBottom: "1.5%", color: "black", fontSize: 20 }}>สระ : เขียนถูก 30 ตัว <Text style={{ color: 'rgba(232,89,89,1)' }}>เขียนผิด</Text> 10 ตัว <Text style={{ color: 'rgba(104,187,177,1)' }} >เขียนกลับด้าน</Text> 4 ตัว</Text>
                        <Text style={{ color: "black", fontSize: 20 }}>คำสะกด : เขียนถูก 7 ตัว <Text style={{ color: 'rgba(232,89,89,1)' }}>เขียนผิด</Text> 2 ตัว <Text style={{ color: 'rgba(104,187,177,1)' }} >เขียนกลับด้าน</Text> 1 ตัว</Text>
                    </View>
                    <View style={{ flex: 1, backgroundColor: "white", alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 30 }}>11/20/2020</Text>
                    </View>
                </View>


                <View style={{ marginTop: "2%", flex: 3, paddingLeft: "10%", paddingRight: "10%", flexDirection: 'column' }}>
                    <Text style={{ marginLeft: "3%", fontSize: 20 }}>รูปภาพการทำแบบทดสอบ</Text>
                    <View style={{ marginTop: "2%", flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{ backgroundColor: selectTab == 0 ? "white" : 'rgba(249,249,249,1)', marginLeft: "2%", paddingHorizontal: "2%", alignItems: 'center', borderTopEndRadius: 30, borderTopStartRadius: 30 }}
                            onPress={() => onPress(0)}

                        >
                            <Text style={{ color: selectTab == 0 ? "black" : 'rgba(142,142,142,1)', fontSize: 20 }}> พยัญชนะ </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: selectTab == 1 ? "white" : 'rgba(249,249,249,1)', marginLeft: "2%", paddingHorizontal: "2%", alignItems: 'center', borderTopEndRadius: 30, borderTopStartRadius: 30 }}
                            onPress={() => onPress(1)}

                        >
                            <Text style={{ color: selectTab == 1 ? "black" : 'rgba(142,142,142,1)', fontSize: 20 }}> สระ </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: selectTab == 2 ? "white" : 'rgba(249,249,249,1)', marginLeft: "2%", paddingHorizontal: "2%", alignItems: 'center', borderTopEndRadius: 30, borderTopStartRadius: 30 }}
                            onPress={() => onPress(2)}

                        >
                            <Text style={{ color: selectTab == 2 ? "black" : 'rgba(142,142,142,1)', fontSize: 20 }}> คำสะกด </Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{  flex: 10, flexDirection: 'row', backgroundColor: "white", flexWrap: 'wrap' }}> */}
                        {/* { imageListItem} */}
                        <View style={{flex : 10,flexDirection:'column',backgroundColor:"white"}}>
                            <FlatList
                                data={DATA}
                                renderItem={renderItem}
                                keyExtractor={(item) => item}
                                //extraData={selectedId}
                                horizontal={false}
                                numColumns={4}
                            />
                        </View>
                        
                    {/* </View> */}
                </View>
            </View>


        </>)
    } else {
        return (

            <>
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(249,249,249,1)' }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ marginTop: "5%", marginLeft: "5%", fontSize: 75 }}>ผลลัพธ์</Text>
                            <TextInput
                                style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, alignSelf: 'flex-end', marginRight: "5%", borderRadius: 50 }}
                                onChangeText={text => setSearch(text)}
                                value={search}
                                placeholder="   ค้นหา"
                            />

                        </View>

                    </View>

                    <View style={{ flex: 2, margin: "5%", backgroundColor: 'white' }}>
                        <View style={{ margin: "1%", flexDirection: "row", justifyContent: "space-around", }}>
                            <Text style={{ color: "gray" }}>เลขที่</Text>
                            <Text style={{ color: "gray" }}>ชื่อ-สกุล</Text>
                            <Text style={{ color: "gray" }}>วันที่</Text>
                            <Text style={{ color: "gray" }}>ความน่าจะเป็น</Text>
                            <Text></Text>
                        </View>
                        {itemList}
                 
                        
                    </View>
                    <View style={{flex:1 ,alignItems:"center" ,flexDirection:"row",justifyContent:"center"}}>  
                    {paging > 0 ? (<Button title={"ก่อน"} onPress={()=>{setPaging(paging-1)} }/>) : null}   
                            <Pagination paging={paging} number={21} split={5}/>
                            {/* วิธีคิด pagging คือต้องเอา number/split -1*/}
                    {paging < 3.2? (<Button title={"หลัง"} onPress={()=>{setPaging(paging+1)} }/>) : null}
                    </View>
                    
                </View>

            </>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default StatScene;
