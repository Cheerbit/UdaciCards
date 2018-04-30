import React, { Component } from 'react';
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import DeckManager from './DeckManager';

export default class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: 0, correctCount: 0, showAnswer: false };
  }

  componentDidMount() {
    (async () => {
      const { params } = this.props.navigation.state;
      const deck = await DeckManager.getDeck(params.deckTitle);
      this.setState({ deck });
    })();
  }

  onCorrectPress = () => {
    const { correctCount, progress } = this.state;
    this.setState({ progress: progress + 1, correctCount: correctCount + 1 });
  };

  onIncorrectPress = () => {
    const { progress } = this.state;
    this.setState({ progress: progress + 1 });
  };

  onViewAnswerPress = () => {
    this.setState({ showAnswer: true });
  };

  onHideAnswerPress = () => {
    this.setState({ showAnswer: false });
  };

  renderQuizSection = () => {
    return (
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <TouchableHighlight style={ styles.button } onPress={ this.onViewAnswerPress } underlayColor='lightgray'>
          <Text>Show Answer</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ this.onCorrectPress } underlayColor='lightgray'>
          <Text>Correct</Text>
        </TouchableHighlight>
        <TouchableHighlight style={ styles.button } onPress={ this.onIncorrectPress } underlayColor='lightgray'>
          <Text>Incorrect</Text>
        </TouchableHighlight>
      </View>
    );
  };

  renderAnswerSection = () => {
    return (
      <View>
        <Text>{ `Answer: ${this.state.deck.questions[this.state.progress].answer}` }</Text>
        <TouchableHighlight style={ styles.button } onPress={ this.onHideAnswerPress } underlayColor='lightgray'>
          <Text>Hide Answer</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render() {
    const { correctCount, deck, progress, showAnswer } = this.state;
    if (!deck) {
      return null;
    }

    if (progress === deck.questions.length) {
      return (
        <View style={ styles.container }>
          <Text>{ `Your Score: ${correctCount}!` }</Text>
        </View>
      );
    }

    return (
      <View style={ styles.container }>
        <Text style={ styles.item }>{ `${progress + 1}/${deck.questions.length}` }</Text>
        <Text style={ styles.titleText }>{ deck.questions[progress].question }</Text>
        { showAnswer ? this.renderAnswerSection() : this.renderQuizSection() }
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
  itemWrapper: {
    flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});