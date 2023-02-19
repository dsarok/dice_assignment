/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
let debounce = require('lodash/debounce');
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Card from './Card';
import Chips from './Chips';
function App() {
  const [fetchedApi, setFetchedApi] = useState();
  const [searching, setSearching] = useState('');
  const [sortby, setSortBy] = useState('stars');
  const [order, setOrder] = useState('asc');
  const newSetSearching = debounce(e => {
    setSearching(e);
    setFetchedApi([]);
  }, 700);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/vnd.github+json');
    myHeaders.append('X-GitHub-Api-Version', '2022-11-28');
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    const query = encodeURIComponent(`${searching} in:name or in:description`);
    searching&&fetch(
      `https://api.github.com/search/repositories?q=${query}&sort=${sortby}&order=${order}`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        const items = result.items.map(e => ({
          repo_name: e.full_name,
          stars: e.stargazers_count,
          language: e.language,
          description: e.description,
          avatar_url: e.owner.avatar_url,
          score:e.score
        }));
        setFetchedApi(items);
      })
      .catch(error => console.log('error', error));
  }, [searching, sortby,order]);
  const searchBasis = [
    {value: 'stars', key: 'stars'},
    {value: 'created at', key: 'created'},
    {value: 'updated at', key: 'updated'},
    {value: 'name', key: 'name'},
    {value: 'watchers count', key: 'watchers_count'},
    {value:'score',key:'score'}
  ];
  return (
    <SafeAreaView>
      <View style={{flexDirection: 'column', height: '100%'}}>
        <TextInput
          autoCapitalize="none"
          placeholder="Search Repo"
          onChangeText={e => {
            newSetSearching(e);
          }}
          style={{
            height: 50,
            width: '100%',
            fontSize: 30,
            marginTop: 14,
            paddingLeft: 15,
            borderRadius: 15,
            opacity: 1,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 4,
            paddingLeft: 15,
          }}>
          <Text style={{fontWeight: 'bold', marginRight: 5}}>Sort By</Text>
          <TouchableOpacity onPress={() => setOrder('asc')}>
            <Chips category={'asc'} backgroundColor={order==='asc'?'grey':'white'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOrder('desc')}>
            <Chips category={'desc'} backgroundColor={order==='desc'?'grey':'white'}/>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {searchBasis.map(e => (
              <TouchableOpacity onPress={() => setSortBy(e.key)}>
                <Chips
                  category={e.value}
                  backgroundColor={sortby !== e.key ? 'white' : 'grey'}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={fetchedApi}
          ListEmptyComponent={<ActivityIndicator size={'large'} />}
          renderItem={({item}) => {
            return (
              <Card
                description={item.description}
                repo_name={item.repo_name}
                imageUrl={item.avatar_url}
                stars={item.stars}
                language={item.language}
                score={item.score}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
