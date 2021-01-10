
import AsyncStorage from '@react-native-community/async-storage'
var jwt_decode = require('jwt-decode')




async function getAccessUsingRefresh(refreshToken) {
  console.log(refreshToken)
  return fetch(`http://10.0.2.2:8000/api/token/refresh/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }, body: JSON.stringify({
      refresh: refreshToken
    })
  }
  ).then(res => res.json())
}

const getVerifiedKeys = async (keys) => {
  console.log('Loading keys from storage')
  if (keys) {
    console.log('checking access')

    if (!isTokenExpired(keys.access)) {
      console.log('returning access')
      return keys.access
    } else {
      console.log('access expired')

      console.log('checking refresh expiry')

      if (!isTokenExpired(keys.refresh)) {
        console.log('fetching access using refresh')

        const response = await getAccessUsingRefresh(keys.refresh)
        response.refresh = keys.refresh
        await AsyncStorage.setItem('token', JSON.stringify(response))

        console.log('UPDATED ONE')

        return response.access
      } else {
        console.log('refresh expired, please login')

        return null
      }
    }
  } else {
    console.log('access not available please login')

    return null
  }
}

function isTokenExpired(token) {
  var decoded = jwt_decode(token)
  console.log(decoded)
  if (decoded.exp < Date.now() / 1000) {
    return true
  } else {
    return false
  }
}


exports.saveData = async (STORAGE_KEY, value) => {
  try {
    console.log(value)
    await AsyncStorage.setItem(STORAGE_KEY, value)
    console.log("Store Success")
  } catch (e) {
    alert('Failed to save the data to the storage')
  }
}

exports.readData = async (STORAGE_KEY) => {
  try {
    const userToken = await AsyncStorage.getItem(STORAGE_KEY)
    let cred = await getVerifiedKeys(JSON.parse(userToken))
    console.log(cred)
    if (userToken != null && cred != null) {

      return cred
    } else {
      return null
    }
  } catch (e) {
    return false
  }
}

exports.clearStorage = async () => {
  try {
    AsyncStorage.clear()
    return true
  } catch (e) {
    return false
  }
}


exports.removeData = async (STORAGE_KEY) => {

  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
    console.log("Fetch Success")
    return true
  } catch (e) {
    return false
  }

}