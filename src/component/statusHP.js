/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet ,Image} from 'react-native'
import imageHeart from '../resource/image/heart.png'
import imageHeartEmpty from '../resource/image/heartEmpty.png'
import Device from '../utils/Device'

//dimesions
width = Device.isPortrait() ? Dimensions.get('screen').height : Dimensions.get('screen').width //1:4.65
height = Device.isPortrait() ? Dimensions.get('screen').width : Dimensions.get('screen').height //1:4.65

const StatusHP = ({ heart,heartEmpty,side }) => {
    const items = []
    var sideRight = { flexDirection : 'row' , paddingTop : 20,paddingLeft : 20}
    //console.log(heart-heartEmpty)
    if (heart-heartEmpty >=0){
        for (let i = 0; i < heart-heartEmpty; i++){
            //console.log("i = ",i)
            items.push(<Image key={i} source={imageHeart} style = {styles.imageHeart} />)
        }
    }
    else {
        heartEmpty = heart
    }

    for (let i = 0; i < heartEmpty; i++){
        //console.log("i = ",i+heart)
        items.push(<Image key={i+heart} source={imageHeartEmpty} style = {styles.imageHeart} />)
    }
    if(side == 'right'){
        sideRight = {flexDirection : 'row-reverse' , paddingTop : 20,paddingLeft : 20}
    }
  return (
      <View>
        <View style={styles.container,sideRight}>
         {items}
        </View>
      </View>
  )
     
      
}

const styles = StyleSheet.create({
    container: {
        flex : 2,
        flexDirection : 'row',
        justifyContent : 'flex-end',
        //position : 'absolute',
        padding : 20,
        backgroundColor : 'blue',
        height : height/15,
        width : height/15,
    },
  imageHeart: {
    //backgroundColor: 'linear-gradient(121deg, rgba(0,241,157,1) 100%, rgba(67,87,199,1) 100%);',
    height : height/20,
    width : height/20,
    //borderRadius: width/10
  },
})

export default StatusHP;