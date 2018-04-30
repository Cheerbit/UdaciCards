import { AsyncStorage } from 'react-native';

export default class DeckManager {
  static async getDecks() {
    const keys = await AsyncStorage.getAllKeys();
    if (!keys) {
      return [];
    }
    const rawDecks = await AsyncStorage.multiGet(keys);
    return rawDecks.map(rawDeck => JSON.parse(rawDeck[1]));
  }

  static async getDeck(id) {
    const rawDeck = await AsyncStorage.getItem(id);
    return JSON.parse(rawDeck);
  }

  static async saveDeckTitle(title) {
    const deck = {
      title,
      questions: [],
    };
    await AsyncStorage.setItem(title, JSON.stringify(deck));
  }

  static async addCardToDeck(title, card) {
    await AsyncStorage.mergeItem(title, JSON.stringify(card));
  }
}
