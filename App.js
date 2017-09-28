import React from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Clipboard } from 'react-native';

const test_image = "https://media.giphy.com/media/xiAqCzbB3eZvG/giphy.gif"
// const random_url = "https://dog.ceo/api/bree ds/image/random"
const random_url = "http://tv.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag="
const default_tag = "fuck-this-shit"

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Get pics for another tag!</Text>
        <TextInput 
          style={{height: 40, width: 150, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({ tag: text })}
          value={this.state.tag}
        />
        <Button
          onPress={this.fetchPic}
          title="More Pics!!"
          color="#841584"
        />
        <Image
          style={{width: 350, height: 350}}
          source={{uri: this.state.pic}}
        />
        <Button
          onPress={this._copyUrl}
          title="Copy Image to Clipboard!!"
          color="#1429a2"
        />
        <Text>Image URL: {this.state.pic}</Text>
        <Text>Clipboard Content: {this.state.clipboardContent}</Text>
      </View>
    );
  }

  state = {
    pic: test_image,
    baseUrl: random_url,
    tag: default_tag,
    clipboardContent: "",
  }

  fetchPic = () => {
    fetch(this.state.baseUrl + this.state.tag)
      .then((response) => response.json())
      .then((responseData) => {
        //this.setState({ pic: responseData.message })
        this.setState({ pic: responseData.data.image_url })
      })
  }

  _copyUrl = async () => {
    Clipboard.setString(this.state.pic);
    try {
      var content = await Clipboard.getString();
      this.setState({ clipboardContent: content });
    } catch (e) {
      this.setState({ clipboardContent: e.message });
    }
    return 0;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
    marginTop: 20,
  },
});

