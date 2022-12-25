import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { Player, PlayerList } from '../components/Player';
import { Appbar, Button, Text } from 'react-native-paper';

type props = {
  visible: boolean;
  resetState: () => void;
  players: Player[];
};

const EndGameModal = ({ visible, players, resetState }: props) => {
  return (
    <>
      <Modal visible={visible} style={{ width: '100%', borderWidth: 1 }}>
        <Appbar.Header dark mode="small">
          <Appbar.Content
            title="Christmas Sweep Stakes!"
            titleStyle={{ textAlign: 'center' }}
          />
        </Appbar.Header>
        <View
          style={{
            paddingVertical: 40,
            maxHeight: '60%',
            flex: 1,
            paddingHorizontal: 15,
          }}>
          <Text variant="titleLarge">The Game is Over!</Text>
          <Text>Here are the final results</Text>
          <PlayerList players={players}></PlayerList>
          <Button mode="contained" onPress={resetState}>
            New Game
          </Button>
        </View>
      </Modal>
    </>
  );
};

export default EndGameModal;
