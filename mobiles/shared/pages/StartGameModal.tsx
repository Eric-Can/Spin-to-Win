import React, { ReactNode, useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { isNumeric } from '../utils/Validation';
import alert from '../utils/Alert';
import { Player, PlayerList } from '../components/Player';

type props = {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setMoneyTotal: React.Dispatch<React.SetStateAction<number>>;
};

const StartGameModal = ({
  setVisible,
  visible,
  players,
  setPlayers,
  setMoneyTotal,
}: props) => {
  const [maxWinnings, setMaxWinnings] = useState('');
  const [playerName, setPlayerName] = useState('');

  const startGameOnPress = () => {
    if (players.length < 2) {
      alert(
        'Invalid Number of Players',
        'You cannot start a game with less than 2 players!',
      );
      return;
    }
    if (parseInt(maxWinnings) < 1) {
      alert(
        'Invalid Total Pot',
        'You cannot start a game with less than 1 dollar to be won!',
      );
      return;
    }
    if (!isNumeric(maxWinnings)) {
      alert(
        'Invalid Total Pot',
        'Your max amount to be won can only be a number!',
      );
      return;
    }

    setMoneyTotal(parseInt(maxWinnings, 10));
    setPlayers(
      (
        prev, //Set first player turn
      ) => {
        const randomPlayerIndex = Math.floor(Math.random() * players.length);
        return prev.map((player, index) => {
          if (index === randomPlayerIndex) player.isActive = true;
          return player;
        });
      },
    );
    setVisible(false);
    setMaxWinnings('');
  };

  return (
    <>
      <Modal
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <Appbar.Header dark mode="small">
          <Appbar.Content
            title="Christmas Sweep Stakes!"
            titleStyle={{ textAlign: 'center' }}
          />
        </Appbar.Header>
        <View
          style={{
            paddingVertical: 40,
            paddingHorizontal: 15,
            flex: 1,
          }}>
          <Gap />
          <TextInput
            onChangeText={amount => setMaxWinnings(amount)}
            mode="outlined"
            label="Max Winnings"
            value={maxWinnings}
            keyboardType="numeric"
          />
          <Gap />
          <Gap />
          <TextInput
            onChangeText={name => setPlayerName(name)}
            value={playerName}
            mode="outlined"
            label="New Player"
          />
          <Button
            onPress={() => {
              if (playerName) {
                setPlayers(prev => [
                  ...prev,
                  { name: playerName, amountWon: 0 },
                ]);
                setPlayerName('');
              } else {
                alert('You must add a player name');
              }
            }}>
            Add new Player
          </Button>
          <Gap />
          <Button
            mode="contained"
            style={{ alignContent: 'flex-end' }}
            onPress={startGameOnPress}>
            Start Game
          </Button>
          <PlayerList {...{ players, setPlayers }} />
        </View>
      </Modal>
    </>
  );
};

const Gap = () => {
  return <View style={styles.gap} />;
};

const styles = StyleSheet.create({
  gap: { height: 10 },
  playerList: {},
  container: {},
  buttons: { justifyContent: 'space-evenly' },
  containeralt: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    height: 300,
    margin: 'auto',
    padding: 30,
    width: 300,
  },
});

export default StartGameModal;
