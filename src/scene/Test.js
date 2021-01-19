import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity,Image,View,Dimensions } from "react-native";
import Device from '../utils/Device';


//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

console.log("heigth : ",height)
const DATA2 = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];
const DATA = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"]



const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity
            style={{ color: "white", alignItems: "center",backgroundColor:"red", padding: 50,
            marginVertical: 20,
            marginHorizontal: 20,flex:1,}}
        onPress={() => setModalVisible(true)}
        >
        <Text>{item}</Text>
        <Text>โมเดลทำนาย : เขียนถูก</Text>
        <Image source={require('../resource/image/alphabet.jpg' )} style={{
      width: width/6,
      height: width/6,
      borderWidth:2,
      borderColor:'#d35647',
      resizeMode:'contain',
      margin:8
    }}></Image>
        {/* <Image source={require('../resource/image/alphabet.jpg')} style={{
                width: "50%",
                height: "50%",
                resizeMode: 'contain',
            }}></Image> */}
        {/* <Text>โมเดลทำนาย : เขียนถูก</Text>
        <Text>ความน่าจะเป็น : 99%</Text> 
        <Image source={require('../resource/image/alphabet.jpg')} style={{
                width: "50%",
                height: "50%",
                resizeMode: 'contain',
            }}></Image> */}

        </TouchableOpacity>
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

  return (
    <SafeAreaView style={styles.container}>
                            <FlatList
                                style={{flex:1}}
                                data={DATA}
                                renderItem={renderItem}
                                keyExtractor={(item) => item}
                                //extraData={selectedId}
                                horizontal={false}
                                numColumns={4}
                            />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:"blue"
  },
  item: {
    padding: 50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;