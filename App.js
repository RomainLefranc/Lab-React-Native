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

const Counter = ({countStart}) => {
  const [count, setCount] = useState(countStart);
  return (
    <View
      style={{
        height: 150,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            padding: 10,
          }}>
          Vous avez cliqué {count} fois
        </Text>
        <Button
          onPress={() => setCount(count + 1)}
          title="Incrémenter"></Button>
      </View>
    </View>
  );
};

const UserList = () => {
  const [isLoading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch('https://dayliz.herokuapp.com/api/users')
      .then(response => response.json())
      .then(json => {
        setUsers(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const list = () => {
    return users.map(user => {
      return <User user={user} key={user.id}></User>;
    });
  };

  useEffect(() => {
    getUsers();
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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          height: '100%',
        }}>
        {isLoading ? <Loading /> : list()}
      </ScrollView>
    </View>
  );
};
const PromotionList = () => {
  const [isLoading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  const getPromotions = () => {
    return fetch('https://dayliz.herokuapp.com/api/promotions')
      .then(response => response.json())
      .then(json => {
        setPromotions(json);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const list = () => {
    return promotions.map(promotion => {
      return <Promotion promotion={promotion} key={promotion.id}></Promotion>;
    });
  };
  useEffect(() => {
    getPromotions();
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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          height: '100%',
        }}>
        {isLoading ? <Loading /> : list()}
      </ScrollView>
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
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{
          height: '100%',
        }}>
        <UserList />
        <PromotionList />
      </ScrollView>
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
