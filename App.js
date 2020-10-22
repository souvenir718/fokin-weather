import React from 'react';
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from  "expo-location";
import {Alert} from "react-native"
import axios from "axios";


const API_KEY = "f32d3ba57242e98dad9a1c4348095ab2";

//openWeathermap.org
export default class extends React.Component{
  state = {
    isLoading : true,
  }
  
  getWeather = async(latitude, longitude) => {
    const {data:{
            main :{temp},
            weather
  }} = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
      // console.log(weather);
      this.setState({
        isLoading:false,
        condition:weather[0].main,
        temp : temp
      })
    }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const {coords :{latitude, longitude}} = await Location.getCurrentPositionAsync();
      //Send to Api
      this.getWeather(latitude, longitude)
      // console.log(latitude, longitude);
    } catch (error) {
      Alert.alert("Can't find you.", "So sad")
    }
  }
  componentDidMount(){
   this.getLocation();
  }
  render(){
    const {isLoading, temp, condition} = this.state;
    return (
      isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition}/>
    );
  }
  }
  
