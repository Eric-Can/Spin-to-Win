import React, { useRef, useState } from 'react';
import StartGameModal from './shared/pages/StartGameModal';
import { Player } from './shared/components/Player';
import HomePage from './shared/pages/HomePage';
import EndGameModal from './shared/pages/EndGameModal';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  //rename this as "Game"? Make a parent class that controls the flow over the modals and overall game then the smaller modals can control their speicfic funcitonality
  const [showEndGameModal, setShowEndGameModal] = useState(false);
  const [showStartGameModal, setShowStartGameModal] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [moneyTotal, setMoneyTotal] = useState(0);

  return (
    <PaperProvider>
      <StartGameModal
        visible={showStartGameModal}
        setVisible={state => setShowStartGameModal(state)}
        players={players}
        setPlayers={setPlayers}
        setMoneyTotal={setMoneyTotal}
      />
      {moneyTotal > 0 && (
        <HomePage
          {...{ players, setPlayers, moneyTotal, setShowEndGameModal }}
        />
      )}
      <EndGameModal
        visible={showEndGameModal}
        setVisible={setShowEndGameModal}
        players={players}
        showStartModal={setShowStartGameModal} //change these to (state) => setState(state) and find out why this is better (also change the types)
      />
    </PaperProvider>
  );
};

export default App;
