import React from 'react';
import './App.css';
import Axios from 'axios'
import DisplayWeather from './Components/DisplayWeather'
import Navbar from './Components/Navbar'

class App extends React.Component {
  //state
  constructor(props) {
    super(props)
  
    this.state = {
        coords:{
          latitude: 34,
          longitude: 43
        },
        data: {

        },
        inputData:{

        }
    }
  }
  componentDidMount(){
    //get system location
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
        let newCoords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.setState({
          coords:newCoords
        })

        Axios.get(`http://api.weatherstack.com/current?access_key=cb2a632994a2cb420b7e93cfe16da1a8&query=
        ${this.state.coords.latitude},${this.state.coords.longitude}`).then((res)=>{

          let weatherData = {
           location: res.data.location.name,
           temperature: res.data.current.temperature,
           description: res.data.current.weather_descriptions[0],
           region: res.data.location.region,
           country:res.data.location.country,
           wind_speed: res.data.current.wind_speed,
           pressure: res.data.current.pressure,
           precip: res.data.current.precip,
           humidity:res.data.current.humidity,
           img: res.data.current.weather_icons
          }
            this.setState({
              data:weatherData
            })
        })
      })


    }else{
      console.log('not supported')
    }
  }
  //for input field changes
  changeInputRegion = (value)=>{
    this.setState({inputData:value})
  }

  //forweather changes
  changeWeather = (event) => {
    event.preventDefault()

    Axios.get(`http://api.weatherstack.com/current?access_key=cb2a632994a2cb420b7e93cfe16da1a8&query=
        ${this.state.inputData}`).then((res)=>{

          let weatherData = {
           location: res.data.location.name,
           temperature: res.data.current.temperature,
           description: res.data.current.weather_descriptions[0],
           region: res.data.location.region,
           country:res.data.location.country,
           wind_speed: res.data.current.wind_speed,
           pressure: res.data.current.pressure,
           precip: res.data.current.precip,
           humidity:res.data.current.humidity,
           img: res.data.current.weather_icons
          }
            this.setState({
              data:weatherData
            })
        })
  }
  render() {
    return (
      <div className='App'>
            <div className = 'container '>
              <Navbar changeWeather = {this.changeWeather} changeRegion = {this.changeInputRegion}/>
              <DisplayWeather weatherData = {this.state.data}/> 
            </div>
               
      </div>
    )
  }
}

export default App