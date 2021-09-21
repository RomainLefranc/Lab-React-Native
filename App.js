/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import {Colors, LearnMoreLinks} from 'react-native/Libraries/NewAppScreen';

const Header = () => {
  return (
    <View
      style={{
        height: 70,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#B0BEC5',
          margin: 5,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: 'black',
            padding: 10,
            fontSize: 17,
          }}>
          Dayliz
        </Text>
      </View>
    </View>
  );
};

const UserList = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://dayliz.herokuapp.com/api/users')
      .then(response => response.json())
      .then(json => {
        setUsers(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: 300,
        backgroundColor: '#B0BEC5',
        margin: 5,
        borderRadius: 10,
        padding: 15,
      }}>
      <Text
        style={{
          marginBottom: 5,
        }}>
        Utilisateurs
      </Text>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <FlatList
            style={{flex: 1, height: '100%'}}
            data={users}
            renderItem={user => <User user={user.item}></User>}
            keyExtractor={user => user.id}
          />
        </ScrollView>
      )}
    </View>
  );
};
const PromotionList = () => {
  const [isLoading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetch('https://dayliz.herokuapp.com/api/promotions')
      .then(response => response.json())
      .then(json => {
        setPromotions(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        height: 300,
        backgroundColor: '#B0BEC5',
        margin: 5,
        borderRadius: 10,
        padding: 15,
      }}>
      <Text
        style={{
          marginBottom: 5,
        }}>
        Promotions
      </Text>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <FlatList
            data={promotions}
            renderItem={promotion => (
              <Promotion promotion={promotion.item}></Promotion>
            )}
            keyExtractor={promotion => promotion.id}
          />
        </ScrollView>
      )}
    </View>
  );
};
const User = ({user}) => {
  return (
    <Text
      style={{
        backgroundColor: '#E0E0E0',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        padding: 10,
      }}>
      {user.promotion} - {user.lastName} {user.firstName}
    </Text>
  );
};

const Promotion = ({promotion}) => {
  return (
    <Text
      style={{
        backgroundColor: '#E0E0E0',
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 10,
        padding: 10,
      }}>
      {promotion.name}
    </Text>
  );
};

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            color: 'black',
            textAlign: 'center',
          }}>
          Chargement
        </Text>
        <ActivityIndicator
          style={{
            color: 'white',
          }}></ActivityIndicator>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#CFD8DC',
        height: '100%',
      }}>
      <StatusBar barStyle="light-content" />
      <Header />
      <UserList />
      <PromotionList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    color: 'deepskyblue',
  },
});

export default App;
