import { Dimensions,} from 'react-native';

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

const msp = (dim,limit)=>{
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit
}

exports.isTablet = () =>{
    const dim  = Dimensions.get('screen');
    return ((dim.scale < 2 && msp(dim, 1000 )) || ((dim.scale >= 2 && msp(dim, 1900 ))))
}
