import React from 'react'
import {useState, useEffect} from 'react';
import {View, StyleSheet,Image,Button,Text,TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNshake from 'react-native-shake';
import imagex from './assets/icons/ligada.png';
import imagey from './assets/icons/desligada.png';


const App = ()=> {
  const [toggle, setToggle] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes,setMinutes] = useState(0);
  const [customInterval,setCustomInterval] = useState();
  const [clock, setClock] = useState(true);
  const [buttonpress, setbuttonpress] = useState(false);
  var passou = false;

  const startTime = () => {
      setbuttonpress(true)
      if(!buttonpress){
      setCustomInterval(
        setInterval(() =>{
          changeTime();
        },1000) 
      )
      }

  }

  const startTemp = () => {
    setbuttonpress(true)
    if(!buttonpress){
    setCustomInterval(
      setInterval(() =>{
        console.log(`Minutos: ${minutes}`);
        console.log(`Segundos: ${seconds}`);
        console.log(passou)
        if(!passou){
        changeTemp();
        }
      },1000)
    )
    }
} 

  const stopTimer = () => {
    setbuttonpress(false);
    if(customInterval){
      clearInterval(customInterval);
    }
  };

  const clear = () => {
    stopTimer();
    setMinutes(0);
    setSeconds(0);
  };

  const changeTime = () => {
    setSeconds((prevState)=>{
      if(prevState + 1 == 60){
        setMinutes(minutes+1);
        return 0;
      }
      return prevState + 1;
    })
  };

  const changeTemp1 = () => {
    setSeconds(60); 
  };
  const changeTemp15 = () => {
    setSeconds(15);
  };
  const changeTemp30 = () => {
    setSeconds(30);
  };

  const changeTemp = () => {
    setSeconds((prevState)=>{
      console.log(prevState);
      if(prevState - 1 == 0){
        passou = true;
      }
      return prevState < 1 ? 0 : prevState - 1;
    })
  };
  

  const handleOnPress = () => setToggle(oldToggle => !oldToggle)

  const ChangeClockOnPress = () => setClock(oldClock => !oldClock)

  const buttonPress = () => setbuttonpress(oldpress => !oldpress)

  useEffect(()=>{
    Torch.switchState(toggle);
  },[toggle]);

  useEffect(()=>{
    const subscription = RNshake.addListener(()=>{
        setToggle(oldToggle => !oldToggle);
    });
    return () => subscription.remove(); 
  },[]);

  return(
    <View style={toggle ? style.containerlight : style.container}>
    <TouchableOpacity onPress={handleOnPress}>
    <Image
    style={toggle ? style.lightingon : style.lightingoff}
    source={toggle ? imagex : imagey}
    />
    </TouchableOpacity>

    <Text style={toggle ? style.timeron : style.timeroff}>
    {minutes < 10 ? '0' + minutes : minutes}:
    {seconds < 10 ? '0' + seconds : seconds}
    </Text>

    <View style={style.ButtonControle}>
      <Button title='Iniciar' color={buttonpress ? 'green' : 'blue'} onPress={clock ? startTemp : startTime}/>
      <Button title='Parar' color={buttonpress ? 'blue' : 'green'} onPress={clock ? stopTimer : stopTimer}/>
      <Button title='Limpar' color={'blue'} onPress={clear}/>
    </View>

    <View style={style.ButtonCronometro}>
      <Button color={'blue'} title={clock ? 'Mudar para Cronômetro': 'Mudar para Temporizador'} onPress={ChangeClockOnPress}/>
    </View>

    {clock ? <View style={style.ButtonsTemporizador}>
      <Button color={'blue'} title='1 Minuto' onPress={changeTemp1}/>
      <Button color={'blue'} title='15 segundos' onPress={changeTemp15}/>
      <Button color={'blue'} title='30 segundos' onPress={changeTemp30}/>
    </View> : <View/>}
    </View>
  );
}

export default App

const style = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerlight:{
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingon:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingoff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
    opacity: 0.4,
    //tintColor: 'white'
  },
  timeron:{
    marginTop: 50,
    marginBottom: 15,
    fontSize: 20,
    color: 'blue',
    marginLeft: 10.
  },
  timeroff:{
    marginTop: 50,
    marginBottom: 15,
    fontSize: 20,
    color: 'white',
    marginLeft: 10.
  },
  ButtonControle:{
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  ButtonCronometro:{
    marginTop: 25,
  },
  ButtonsTemporizador:{
    width: '80%',
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnpress:{
    backgroundColor: 'red',
    color: 'red',
  },
  btnnopress:{
    backgroundColor: 'green',
    color: 'green',
  }
});