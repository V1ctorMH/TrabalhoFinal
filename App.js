import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen() {
  const [popularDestinations, setPopularDestinations] = useState([]);
  const [recommendedDestinations, setRecommendedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/destinosPopulares')
      .then(response => response.json())
      .then(data => setPopularDestinations(data))
      .catch(error => console.error('Error fetching popular destinations:', error));

    fetch('http://localhost:3000/recomendados')
      .then(response => response.json())
      .then(data => setRecommendedDestinations(data))
      .catch(error => console.error('Error fetching recommended destinations:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBox}>
          <Icon name="search" size={20} color="#999" />
          <TextInput placeholder="Buscar ..." style={styles.searchInput} />
        </View>
        <View style={styles.profile}>
          <Image source={{ uri: 'https://placekitten.com/50/50' }} style={styles.avatar} />
          <View>
            <Text style={styles.welcome}>Bem-Vindo!</Text>
            <Text style={styles.name}>Sr. Maria</Text>
          </View>
          <Icon name="notifications-none" size={24} style={styles.bellIcon} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Categorias</Text>
      <View style={styles.categoryContainer}>
        {[
          'Resorts', 'Estadias', 'Hoteis', 'Apartment',
          'Ver tudo'
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.categoryItem}>
            <Icon name="home" size={30} color="#fff" />
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Destinos Populares</Text>
        <Icon name="menu" size={20} />
      </View>
      <ScrollView horizontal style={styles.imageScroll}>
        {popularDestinations.map((destination) => (
          <View key={destination.id} style={styles.destinationCard}>
            <Image source={{ uri: destination.imagem }} style={styles.imageCard} />
            <Text style={styles.destinationTitle}>{destination.nome}</Text>
            <Text style={styles.destinationLocation}>{destination.local}</Text>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Recomendado</Text>
      <View style={styles.recommendContainer}>
        {recommendedDestinations.map((destination) => (
          <View key={destination.id} style={styles.recommendCard}>
            <Image source={{ uri: destination.imagem }} style={styles.recommendImage} />
            <View style={styles.recommendTextContainer}>
              <Text style={styles.destinationTitle}>{destination.nome}</Text>
              <Text style={styles.destinationLocation}>{destination.local}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Explorar"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="explore" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Procurar"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="search" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <Icon name="person" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
    backgroundColor: 'lightblue',
    borderRadius: 25,
    display: 'flex',
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 8,
  },
  welcome: {
    fontWeight: 'bold',
  },
  name: {
    color: '#777',
  },
  bellIcon: {
    marginLeft: 'auto',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    backgroundColor: '#5E50A1',
    borderRadius: 50,
    width: '22%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageScroll: {
    marginVertical: 10,
  },
  destinationCard: {
    marginRight: 16,
    width: 150,
  },
  imageCard: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  destinationTitle: {
    fontWeight: 'bold',
    marginTop: 4,
  },
  destinationLocation: {
    color: '#777',
    fontSize: 12,
  },
  recommendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  recommendCard: {
    width: '48%',
    marginBottom: 16,
  },
  recommendImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  recommendTextContainer: {
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});