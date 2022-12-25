import React, { useState } from 'react';
import { View, Modal } from 'react-native';
import { Player, PlayerList } from '../components/Player';
import { Appbar, Button, Text } from 'react-native-paper';

type props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  players: Player[];
  showStartModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EndGameModal = ({
  visible,
  players,
  showStartModal,
  setVisible,
}: props) => {
  return (
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
        <Button
          mode="contained"
          onPress={() => {
            setVisible(false);
            showStartModal(true);
          }}>
          New Game
        </Button>
      </View>
    </Modal>
  );
};

export default EndGameModal;
