import {useState} from 'react'
import { Dimensions,PixelRatio} from 'react-native';
import { connect } from 'react-redux';

// Retrieve initial screen's width
let screenWidth = Dimensions.get('window').width;
// const [screenWidth,setScreenWidth]= useState(Dimensions.get('window').width)
// Retrieve initial screen's height
let screenHeight = Dimensions.get('window').height;
// const [screenHeight,setScreenHeight]= useState(Dimensions.get('window').height)
exports.isPortrait = () =>{
    const dim  = Dimensions.get('window');
    //console.log("dim ",dim.height >= dim.width)
    return dim.height >= dim.width
};

exports.isLandscape = () =>{
    const dim  = Dimensions.get('window');
    //console.log("dim2 ",dim.height >= dim.width)
    return dim.height < dim.width
};

exports.orientation = () =>{
  const dim  = Dimensions.get('window');
  return  dim.height >= dim.width ? "portrait":"landscape"
};

const msp = (dim,limit)=>{
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit
}

// exports.isTablet = () =>{
//     const dim  = Dimensions.get('screen');
//     return ((dim.scale < 2 && msp(dim, 1000 )) || ((dim.scale >= 2 && msp(dim, 1900 ))))
// }
exports.isTablet = () => {
    let pixelDensity = PixelRatio.get();
    let screenWidth = Dimensions.get('screen').width
    let screenHeight = Dimensions.get('screen').height
    const adjustedWidth = screenWidth * pixelDensity;
    const adjustedHeight = screenHeight * pixelDensity;
    if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
      return true;
    } else
      return (
        pixelDensity === 2 && (adjustedWidth >= 1920 || adjustedHeight >= 1920)
      );
  };

exports.widthPercentageToDP = widthPercent => {
    // Parse string percentage input and convert it to number.
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);
  
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
  };

exports.heightPercentageToDP = heightPercent => {
    // Parse string percentage input and convert it to number.
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);
  
    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
  };

exports.listenOrientationChange = (setStateHook = null) => {
    Dimensions.addEventListener('change', newDimensions => {
      // Retrieve and save new dimensions
      screenWidth = newDimensions.window.width;
      screenHeight = newDimensions.window.height;
      // console.log("wow ,",setStateHook)
    // setScreenWidth(newDimensions.window.width)
    // setScreenHeight(newDimensions.window.height)
      // Trigger screen's rerender with a state update of the orientation variable
      let orientation = {
        orientation: screenWidth < screenHeight ? 'portrait' : 'landscape'
      };
      // Trigger screen's rerender with a state update of the orientation variable
      if (setStateHook) {
        setStateHook(orientation.orientation); 
      } else {
        throw new Error("Must set only ONE of classComponentThis or setStateHook");
      }
    });
  };

exports.removeOrientationListener = () => {
    Dimensions.removeEventListener('change', () => {});
  };

//   const mapStateToProps = state => {
//     return {
//       orientation: state.orientation,
//     }
//   }
  
  
//   const mapDispatchToProps = dispatch => {
//     return {
//         upDateOrientation: (orientation) => {
//             dispatch({ type: 'EDIT_ORIENTATION', payload: orientation })
//         }
//     }
//   }
  
// exports.connect(mapStateToProps, mapDispatchToProps)(Device);
