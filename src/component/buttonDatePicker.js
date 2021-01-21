import React, {useState,useEffect} from 'react';
import {View, Button, Platform,Text,TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';

const formatDate = (date) =>{
  format = String(date.getDate())+"/"+String(date.getMonth()+1)+"/"+String(date.getFullYear())
  return format
}

const ButtonDatePicker = (props) => { 
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [ddmmyyyy,setDdmmyyyy] = useState(formatDate(date));
  console.log("date",date)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  

  useEffect(()=>{
    setDdmmyyyy(formatDate(date))
  }
  ,[date])


  
    return (
     <View>
      <View>
        <TouchableOpacity onPress={()=>{setShow(true)}}>
          <Text>{ddmmyyyy}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
    )
  }
  
  // export default ButtonDatePicker;
  
  // <Button onPress={showDatepicker} title="Show " />
  // {show && (
  // <DateTimePicker
  // testID="dateTimePicker"
  // value={date}
  // mode={mode}
  // is24Hour={true}
  // display="default"
  // onChange={onChange}
  // />
  // )}

  const styles= (props) => StyleSheet.create({
    container: {
      paddingHorizontal : 12,
      // flex:1,
      // justifyContent: "center",
      // alignContent:"center",
      // alignItems:"center",
      // alignSelf:"center",
      // height: height/20,
      // width: width/6,
      // marginTop:10, 
      // paddingBottom:30,
      // marginLeft:70,
      // marginRight:70,
      // borderRadius: 8,
      // alignItems: "center", 
      // borderColor: 'gray', 
      // borderWidth: 0.5
    },
  });

  const mapStateToProps = state => {
    return {
      orientation: state.orientation,
    }
  }
  
  export default connect(mapStateToProps, null)(ButtonDatePicker);