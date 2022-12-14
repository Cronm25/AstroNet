import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const Banner = ({ navigation }) => {

  // traemos los productos con oferta
  let img = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1587831990711-23ca6441447b%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXIlMjB3aW5kb3dzfGVufDB8fDB8fA%253D%253D%26w%3D1000%26q%3D80&imgrefurl=https%3A%2F%2Funsplash.com%2Fes%2Fs%2Ffotos%2Fcomputer-windows&tbnid=YMFwWnjXMeZYqM&vet=12ahUKEwjewKqV5_34AhWNg5UCHQrpDwgQMygAegUIARDZAQ..i&docid=Ml2zzbRytNKAMM&w=1000&h=563&q=computer&ved=2ahUKEwjewKqV5_34AhWNg5UCHQrpDwgQMygAegUIARDZAQ"
  products = useSelector((state) => state.ALL_PRODUCTS.allProducts);
  products = products.filter(p => p.offer > 0).sort((a, b) => b.offer - a.offer);
  if (products.length > 5) { products = products.slice(0, 5) }
  const [state, setState] = useState({slideIndex:0,});
  products ? imgToView = products[state.slideIndex] : null
  const plusSlides =(n)=> {

    if (state.slideIndex + n === -1 ){
        return setState({
            ...state,
            slideIndex: (products.length-1),
            
        });
    }
    if (state.slideIndex + n === products.length){
        return setState({
        ...state,
        slideIndex: 0,
    });
    }
        return setState({
            ...state,
            slideIndex: (state.slideIndex) + n,
    });
}
const detFunc=()=>{
  if (imgToView.name){
    navigation.navigate("Details", imgToView);
  }else{
    imgToView =products[state.slideIndex]
    navigation.navigate("Details", imgToView);
  }
  }
const [visible, setVisible] = useState(false)
const[variable, setVariable] = useState('')
const user = useSelector((state) => state.USER.userName)
  return (

    <TouchableOpacity style={styles.TouchableOpacity} onPress={() =>detFunc()}>
      {
        imgToView ?
            <View style={styles.imageContainer}>
              <Image source={{ uri:imgToView.img[0]}} style={styles.image} />
              <Text style={styles.name}>
                {imgToView.name.toUpperCase().charAt(0).concat(imgToView.name.slice(1, 26))}...
              </Text> 
              <Text style={styles.offer}>
                {imgToView.offer}% Off!
              </Text>
              <View style={styles.Buttoncontainer}>
              <TouchableOpacity style={{position:'absolute',left:"5%",bottom:-50, backgroundColor:'#BDBDBD', height:100, width:35, borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={(e)=>plusSlides(-1)}><Icon name="arrow-back-outline" size={30} color="white" /></TouchableOpacity>
              <TouchableOpacity style={{position:'absolute',right:"5%",bottom:-50, backgroundColor:'#BDBDBD', height:100, width:35, borderRadius:10, justifyContent:"center", alignItems:"center"}} onPress={(e)=>plusSlides(1)}><Icon name="arrow-forward-outline" size={30} color="white" /></TouchableOpacity>
              </View>
            </View>
          :
          <Image source={{ uri: img }} style={styles.image} />
      }

    </TouchableOpacity>
    //   )}
    // />
  );
};

const styles = StyleSheet.create({
  TouchableOpacity:{
    // margin:10,
    marginTop:20,
    borderRadius:20
  },
  Buttoncontainer:{
    marginTop :160,
    justifyContent:'center',
    flexDirection: 'row',
    heigth: "100%",
    width: "100%",
    position:'absolute',
  },
  Button:{
    width: 40,
    position:'absolute'
  },
  imageContainer: {
    justifyContent: "center",
    backgroundColor:"white",
    width: "100%",
    resizeMode:"contain",
    borderRadius:20
  },
  image: {
    padding:30,
    height: 170,
    width: '100%',
    alignSelf:"center",
    resizeMode:"contain",
  },
  offer: {
    position: 'absolute',
    top:"2%",
    left:"8%",
    backgroundColor: 'green',
    borderRadius: 10,
    color: 'white',
    fontSize: 25,
  },
  name: {
    // color: 'white',
    marginLeft: 5,
    marginBottom: 10,
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'center',
    alignSelf:"center"
  }
});

export default Banner;