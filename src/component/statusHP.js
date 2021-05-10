/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React ,{useEffect}from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet ,Image} from 'react-native'
import { connect } from 'react-redux';
import imageHeart from '../resource/image/heart.png'
import imageHeartEmpty from '../resource/image/heartEmpty.png'
import Device from '../utils/Device'
import { widthPercentageToDP as wp, heightPercentageToDP as hp, listenOrientationChange as lor, removeOrientationListener as rol } from '../utils/Device'

//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

const StatusHP = ({ heart,heartEmpty,side,orientation,upDateOrientation}) => {
    const items = []
    var sideRight = { flexDirection : 'row' , paddingTop : 20,paddingLeft : 20}
    //console.log(heart-heartEmpty)
    useEffect(() => {
      lor(upDateOrientation)
      return rol()
    }, [])

    if (heart-heartEmpty >=0){
        for (let i = 0; i < heart-heartEmpty; i++){
            //console.log("i = ",i)
            items.push(<Image key={i} source={imageHeart} style = {styles(orientation).imageHeart} />)
        }
    }
    else {
        heartEmpty = heart
    }

    for (let i = 0; i < heartEmpty; i++){
        //console.log("i = ",i+heart)
        items.push(<Image key={i+heart} source={imageHeartEmpty} style = {styles(orientation).imageHeart} />)
    }
    if(side == 'right'){
        sideRight = {flexDirection : 'row-reverse' , paddingTop : 20,paddingLeft : 20}
    }
  return (
      <View>
        <View style={styles(orientation).container,sideRight}>
         {items}
        </View>
      </View>
  )
     
      
}

const styles = (orientation) => StyleSheet.create({
  container: {
        flex : 2,
        flexDirection : 'row',
        justifyContent : 'flex-end',
        //position : 'absolute',
        padding : 20,
        backgroundColor : 'blue',
        height : wp('15'),
        width : wp('48'),
    },
  imageHeart: {
    //backgroundColor: 'linear-gradient(121deg, rgba(0,241,157,1) 100%, rgba(67,87,199,1) 100%);',
    height : orientation=='landscape'?wp('3.5'):wp('2.8'),
    width :  orientation=='landscape'?wp('3.5'):wp('2.8'),
    //borderRadius: width/10
  },
})

const mapStateToProps = state => {
  return {
    orientation: state.orientation
  }
}
const mapDispatchToProps = dispatch => {
  return {
    upDateOrientation: (orientation) => {
      dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusHP);