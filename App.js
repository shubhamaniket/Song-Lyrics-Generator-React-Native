import React from 'react';
import {View,StyleSheet,Text,ScrollView, TextInput,SafeAreaView,TouchableOpacity,ActivityIndicator} from 'react-native';

export default class App extends React.Component{
  state = {
    lyrics : '',
    songname : '',
    artistname : '',
    loading : true
  }
  handleapi = () => {
    fetch('https://api.lyrics.ovh/v1/'+this.state.artistname+'/'+this.state.songname)
    .then((response)=>response.json())
    .then((responsejson)=>this.setState({
      lyrics : responsejson.lyrics,
      loading : false
    }))
    .catch((error)=>console.log(error))
  }
  giveresult = () => {
    if(this.state.loading)
    {
      return(
        <View style={{height : 200,top:150}}>
          <ActivityIndicator size="large" color="blue"/>
        </View>
      )
    }
    else
    {
      return(
        <View style={{marginVertical:20,borderWidth:1,width:300}}>
          <Text style={{padding:5,fontWeight:'bold',fontSize:16}}>{this.state.lyrics}</Text>
        </View>
      )
    }
  }
  render(){
      return(
        <SafeAreaView style={{flex:1}}>
          <View style={styles.container}>
            <Text style={styles.header}>Lyrics Generator</Text>
            <Text>Made By - Shubham Aniket</Text>
            <View style={styles.artist}>
              <TextInput 
              placeholder="Enter Song Name"
              style={{padding:10,color:'blue'}}
              onChangeText={(songname)=>this.setState({
                songname : songname
              })}
              />
            </View>
            <View style={styles.artist}>
              <TextInput 
              placeholder="Enter Artist Name"
              style={{padding:10,color:'blue'}}
              onChangeText={(artistname)=>this.setState({
                artistname : artistname
              })}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={()=>this.handleapi()}>
              <Text style={{alignSelf:'center',top:5}}>Search</Text>
            </TouchableOpacity>
            <ScrollView>
              {this.giveresult()}
            </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
  }
const styles = StyleSheet.create({
  container : {
    flex : 1,
    alignItems : 'center'
  },
  header : {
    fontSize : 30,
    marginTop : 10,
    fontWeight : 'bold'
  },
  artist : {
    borderWidth : 1,
    height : 40,
    width : 300,
    marginVertical : 15
  },
  button : {
    borderWidth : 1,
    borderColor : 'green',
    width : 100,
    height : 35,
    borderRadius : 10
  }
})