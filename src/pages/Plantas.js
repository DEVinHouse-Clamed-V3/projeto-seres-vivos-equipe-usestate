import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, ActivityIndicator, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

const localData = require('../../database.json');

const Plantas = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [displayedData, setDisplayedData] = useState([]);
  const flatListRef = useRef(null);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setDisplayedData(filteredData.slice(0, itemsPerPage));
  }, [filteredData]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.16.105:3000/plantas?page=${page}&limit=${itemsPerPage}`);
      const apiData = response.data;

      if (apiData.length < itemsPerPage) {
        setAllDataLoaded(true);
      }

      const newData = [...localData.plantas, ...apiData];
      const uniqueData = Array.from(new Map(newData.map(item => [item.id, item])).values());

      setData(uniqueData);
      setFilteredData(uniqueData);
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
    setLoading(false);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text) {
      const filtered = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleLoadMore = () => {
    if (!loading && filteredData.length > displayedData.length) {
      setDisplayedData(filteredData.slice(0, displayedData.length + itemsPerPage));
    }
  };

  const scrollToTop = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const renderFooter = () => {
    return loading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.detail}>Nutrição: {item.nutrition}</Text>
        <Text style={styles.detail}>Tipo de célula: {item.cellType}</Text>
        <Text style={styles.detail}>Organização celular: {item.cellOrganization}</Text>
        <Text style={styles.detail}>Reprodução: {item.reproduction}</Text>
        <Text style={styles.detail}>Respiração: {item.respiration}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={{ uri: 'https://i.pinimg.com/236x/7c/7e/a6/7c7ea6c8d5717ecb6ae3f7437d7ef8bd.jpg' }} 
      style={styles.background} 
      imageStyle={{ opacity: 0.8 }}
    >
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Buscar plantas..."
          value={search}
          onChangeText={handleSearch}
        />
        <FlatList
          ref={flatListRef}
          data={displayedData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
        {filteredData.length > displayedData.length && (
          <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
            <Text style={styles.loadMoreText}>Ver mais</Text>
          </TouchableOpacity>
        )}
        {displayedData.length > 0 && (
          <TouchableOpacity style={styles.scrollToTopButton} onPress={scrollToTop}>
            <Icon name="arrow-up" size={30} color="#006414" />
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fundo levemente esbranquiçado para o campo de busca
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#ffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  detail: {
    fontSize: 12,
    color: '#888',
  },
  loader: {
    marginVertical: 20,
    alignItems: 'center',
  },
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5,
    padding: 10,
  },
  loadMoreButton: {
    padding: 5,
    alignItems: 'center',
    width: 120,
    alignSelf: 'center',
    backgroundColor: '#006414',
    borderRadius: 10,
    marginVertical: 10,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Plantas;
