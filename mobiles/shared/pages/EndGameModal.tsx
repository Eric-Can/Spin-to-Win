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
      <Modal {...{ visible }}>
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
            maxHeight: '60%',
            flexBasis: 4,
            flexShrink: 2,
            alignSelf: 'center',
            alignContent: 'center',
            justifyContent: 'center',
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
