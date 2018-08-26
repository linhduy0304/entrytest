

import React, { Component } from 'react';
import { View, Text, FlatList , Picker} from 'react-native';
import realm, { getUsername, showAll, insert, getStatus, saveStatus } from '../database/allSchema';
import Label from '../components/home/Label';
import Sort from '../components/home/Sort';
import Filter from '../components/home/Filter';
import Button from '../components/Button';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      username: '',
      sort: 'username',
      input: '',
      id_user: '',
      status: '',
      page: 0,
      countPage: 1,
    };
    this.loadAll('username');
    realm.addListener('change', () => {
      this.loadAll('username')
    })
  }

  componentDidMount = () => {
    getUsername(this.props.username).then(data => {
      getStatus(data[0].id).then(status => {
        if(status.length !== 0) {
          this.setState({
            status: status[0],
          })
        }
      })
      this.setState({
        id_user: data[0].id,
        username: data[0].username
      })
    })
  }

  saveStatus() {
    const {sort, input, id_user} = this.state;
    var data = {
      sort,
      filter: input,
      id_user,
    }
    saveStatus(data)
    .then(a => {console.log(a)}
      
    )
    .catch(error => {
      console.log(error)
    })
  }

  loadAll = (sort, page=0) => {
    showAll(sort, this.state.input, page).then(data => {
      this.setState({data, sort})
    }).catch(error => {
      this.setState({data: []})
    })
  }

  filter = (input, page=0) => {
    showAll(this.state.sort, input, page).then(data => {
      this.setState({data, input})
    })
    .catch(error => {
      this.setState({data: []})
    })
  }

  logout() {
    this.saveStatus()
    Actions.login({type: 'reset'})
  }

  nextPage() {
    const {sort, page, data, countPage} = this.state;
    if(data.length === 5) {
      this.loadAll(sort, page+5 )
      this.setState({
        page: page+5,
        countPage: countPage +1,
      })
    }
  }

  prePage() {
    const {sort, page, countPage} = this.state;
    if(page >= 5) {
      this.loadAll(sort, page-5 )
      this.setState({
        page: page-5,
        countPage: countPage -1,
      })
    }
  }

  renderItem = (data) => {
    return (
      <View style={{flexDirection: 'row',paddingTop: 7, paddingBottom: 7, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
        <Text style={{flex: 1, textAlign: 'center'}}>{data.username}</Text>
        <Text style={{flex: 1, textAlign: 'center'}}>{data.fullname}</Text>
        <Text style={{flex: 2, textAlign: 'center'}}>{data.email}</Text>
      </View>
    )
  }


  renderFooter = () =>  {
    if(this.state.data.length === 0 ) {
      return <Text>No records</Text>
    }else return null
  }

  render() {
    const {data, username,countPage, status} = this.state;
    return (
      <View style={{flex: 1,paddingTop: 20, backgroundColor: '#fff'}}>
        <View style={{borderBottomWidth: 1,padding: 15, borderColor: '#ccc'}}>
          <Text style={{fontSize: 20, color: '#000',}}>UserName: <Text style={{color: 'blue'}}>{username}</Text></Text>
          {
            status ? 
              <Text>Filter by: "<Text style={{color: 'blue'}}>{status.filter}</Text>" and Sort by: "<Text style={{color: 'blue'}}>{status.sort}</Text>"</Text>
            : null
          }
        </View>
        
        <Filter
          filter={(input) => this.filter(input)}
        />
        <Sort
          loadAll={sort => this.loadAll(sort)}
        />
        <Label />
        <FlatList 
          data={data}
          ListFooterComponent={() => this.renderFooter()}
          renderItem={data => this.renderItem(data.item)}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={{flexDirection: 'row', paddingTop: 20,justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'blue', marginRight: 50}} onPress={() => this.prePage()}>{'<<'}</Text>
          <Text>{countPage}</Text>
          <Text style={{color: 'blue', marginLeft: 50}} onPress={() => this.nextPage()}>>></Text>
        </View>
        <View style={{alignItems: 'center', padding: 20}}>
          <Button 
            label='Logout'
            onPress={() => this.logout()}
            active={true}
          />
          <Button 
            label='Back to task'
            onPress={() => Actions.app({type: 'reset'})}
            active={true}
            marginTop={10}
          />
        </View>
       
      
      </View>
    );
  }
}

export default Home;
