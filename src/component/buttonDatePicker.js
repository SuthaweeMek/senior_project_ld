import React, {useState,useEffect} from 'react';
import {View, Button, Platform,Text,TouchableOpacity,StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import Color from '../resource/color'
import Font from '../resource/font'
import {widthPercentageToDP as wp, heightPercentageToDP as hp,listenOrientationChange as lor,removeOrientationListener as rol} from '../utils/Device'
import { Icon } from 'react-native-elements'
import Device from '../utils/Device'
import {FontSize,LayoutSize} from '../resource/dimension'

const formatDate = (date) =>{
  format = String(date.getDate())+"/"+String(date.getMonth()+1)+"/"+String(date.getFullYear())
  return format
}

const ButtonDatePicker = (props) => { 
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [ddmmyyyy,setDdmmyyyy] = useState(formatDate(date));
  var orientation = props.orientation
  size = props.size
  console.log("date",date)
  
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.onChangeDate(currentDate)
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
          <View style={styles({orientation,size}).btnStyle}>
            <Text style={styles({orientation,size}).btnTextStyle}>{ddmmyyyy}</Text>
            <Icon
            //reverse
            name={"date"}
            type = "fontisto"
            color= {Color.Sub_Surface} 
            size={LayoutSize.DatePickerIcon}
            style={styles({orientation,size}).icon} 
            />         
          </View>
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
      // paddingHorizontal : 12,
      flex:1,
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
    btnStyle: {
      paddingHorizontal : LayoutSize.DatePickerPaddingHorizontal,
      flexDirection:"row",
      borderColor : Color.Surface,
      borderWidth:  LayoutSize.DatePickerBorderWidth,
      paddingHorizontal : LayoutSize.DatePickerPaddingHorizontal,
      width:props.size.wp,
      height:LayoutSize.DatePickerHeight,
      borderRadius: LayoutSize.DatePickerRadius,
      minWidth : LayoutSize.DatePickerMinWidth,
      // justifyContent:"flex-start",
      // alignItems:"center",
      justifyContent: "center",
      alignItems:"center",
    },
    btnTextStyle: {
    fontSize : Device.fontSizer(FontSize.BUTTON),
    fontFamily : "EkkamaiNew-Regular",
    },
    icon:{
      // backgroundColor:"red",
      // alignItems:"flex-end",
      // justifyContent:"flex-end",
      //  alignSelf:"flex-end",
      // alignContent:"flex-end",
      justifyContent:"center",
      paddingLeft : 12,
      height: LayoutSize.DatePickerIcon,
    },
  });

  const mapStateToProps = state => {
    return {
      orientation: state.orientation,
    }
  }
  
  export default connect(mapStateToProps, null)(ButtonDatePicker);