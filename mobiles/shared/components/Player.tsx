import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { List, Button, Divider, Badge } from 'react-native-paper';

export type Player = {
  name: string;
  amountWon: number;
  isActive?: boolean;
};

type PlayerListProps = {
  players: Player[];
  setPlayers?: React.Dispatch<React.SetStateAction<Player[]>>;
};

export const PlayerList = ({ players, setPlayers }: PlayerListProps) => {
  const onRemovePlayer = setPlayers
    ? (player: Player) => () => {
        setPlayers(prev =>
          prev.filter(currPlayer => player.name !== currPlayer.name),
        );
      }
    : undefined;

  return (
    <View style={styles.container}>
      <List.Section style={styles.container}>
        <List.Subheader>Players</List.Subheader>
        <ScrollView>
          {players.map((player: Player, index: number) => (
            <View key={player.name + index}>
              <List.Item
                title={player.name}
                titleStyle={{ fontSize: 24 }}
                left={() => {
                  return player.isActive ? (
                    <List.Image
                      source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYuplFhYEsk5EFEuLdWfqnxaejAEL9mbGKfKm-MFZAukRbQGId7Jd-T3i9v4trLdK0GEg&usqp=CAU',
                      }}
                      style={{ resizeMode: 'center', width: 5, height: 5 }}
                    />
                  ) : (
                    <List.Image
                      source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/1324/1324728.png',
                      }}
                      style={{ resizeMode: 'center', width: 5, height: 5 }}
                    />
                  );
                }}
                right={() =>
                  onRemovePlayer ? (
                    <Badge
                      onPress={onRemovePlayer(player)}
                      size={40}
                      style={{
                        alignSelf: 'center',
                        backgroundColor: 'rgb(1, 110, 33)',
                      }}>
                      X
                    </Badge>
                  ) : (
                    <Badge
                      size={50}
                      style={{
                        alignSelf: 'center',
                        backgroundColor: 'rgb(1, 110, 33)',
                      }}>
                      ${player.amountWon}
                    </Badge>
                  )
                }
              />
              <Divider />
            </View>
          ))}
        </ScrollView>
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexBasis: 1,
    // innerWidth: '80%',
    // borderWidth: 1,
    // borderColor: 'white',
    // backgroundColor: 'aliceblue',
    //  backgroundColor: "powderblue",
    //  backgroundColor: "steelblue" skyblue
  },
  listItem: {
    flexDirection: 'row',
    flex: 1,
    alignContent: 'center',
  },
  removeButton: {
    flexGrow: 1,
    padding: 10,
    opacity: 0.3,
    color: 'steelblue',
    justifyContent: 'flex-end',
  },
  text: {
    flexGrow: 2,
    color: 'steelblue',
    fontWeight: '300',
    justifyContent: 'center',
    alignContent: 'center',
    fontSize: 20,
  },
});
