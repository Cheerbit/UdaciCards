import React, { Component } from 'react';
import {
  Button,
  ListView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DeckManager from './DeckManager';

export default class AddDeckView extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onButtonPress = () => {
    const title = this.state.text;
    DeckManager.saveDeckTitle(this.state.text);
    this.setState({ text: '' });
    this.props.navigation.navigate('Deck', {
      deckTitle: title,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>What is the title of your new deck?</Text>
        <TextInput
          style={ styles.textInput }
          placeholder={ 'Deck Title' }
          placeholderTextColor='gray'
          onChangeText={ text => this.setState({text}) }
          value={ this.state.text }
        />
        <Button
          onPress={ this.onButtonPress }
          title='Submit'
          color='black'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    marginTop: 20,
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
});
