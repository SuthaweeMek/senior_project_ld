
import AsyncStorage from '@react-native-community/async-storage'
var jwt_decode = require('jwt-decode')

exports.isTokenExpired = (token) => {
  var decoded = jwt_decode(token)
  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}
