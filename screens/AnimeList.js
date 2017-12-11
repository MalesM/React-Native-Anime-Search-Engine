import { TouchableHighlight, View, Dimensions, ActivityIndicator, ToastAndroid, AsyncStorage, FlatList } from 'react-native';
import { Text, Item, Container, Thumbnail, Spinner, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, List, ListItem, Input, StyleProvider } from 'native-base';
import { RecyclerListView, LayoutProvider, DataProvider } from 'recyclerlistview';
import getTheme from '.././native-base-theme/components';
import material from '.././native-base-theme/variables/material';
import { Col, Row, Grid } from "react-native-easy-grid";
import React, { Component } from 'react';

const { width, height } = Dimensions.get('window');


export default class AnimeList extends Component {

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    let { width } = Dimensions.get("window");

    this.state = {
      isLoading: false,

      listItems: params.listItems,
      originaItems: params.listItems,
      _dataProvider: new DataProvider((r1, r2) => { return r1 !== r2; }).cloneWithRows(params.listItems),

    }
    console.log(this.state.listItems.length);


    this._layoutProvider = new LayoutProvider(() => { return "DEFAULT" }, (type, dim) => {
      dim.width = width;
      dim.height = 65;
    });


  }


  _renderItem = (type, data) => {
    const { navigate } = this.props.navigation;
    const item = data;
    return (
      <Container>
        <Content style={{ paddingLeft: 5, paddingRight: 5, paddingTop: 2.5 }}>
          <Grid
            onPress={() => navigate('Info', { title: item.Title, image: item.Thumb, animeLink: item.Link })}
            style={{
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#d6d7da'
            }}>
            <Col size={1}>

              <Thumbnail source={{ uri: item.Thumb }} />

            </Col>
            <Col size={5} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>{item.Title}</Text>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }


  componentDidMount() {

  }

  render() {



    const { navigate } = this.props.navigation;

    return (


      <View style={{ flex: 1 }}>
        <StyleProvider style={getTheme(material)}>
          <Header searchBar rounded backgroundColor='#FB8C00'>
            <Item>
              <Icon name="ios-search" />
              <Input style={{ padding: 4 }} ref='searchBar' onChangeText={(text) => { this.filter(text) }} placeholder="Search" />
              <Icon name="ios-search" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
        </StyleProvider>
        <View style={{ flex: 1 }}>
          <RecyclerListView
            style={{ flex: 1 }}
            renderAheadOffset={250}
            rowRenderer={this._renderItem}
            dataProvider={this.state._dataProvider}
            layoutProvider={this._layoutProvider}
          />
        </View>
      </View>

    )
  }
  filter(text) {
    if (text == '') {
      this.setState({
        listItems: this.state.originaItems
      })
    } else {
      text = text.toLowerCase();
      var result = _.filter(this.state.listItems, (item) => {
        var title = item.Title.toLowerCase();
        return title.indexOf(text) > -1
      })
      this.setState({
        listItems: result,
        _dataProvider: new DataProvider((r1, r2) => { return r1 !== r2; }).cloneWithRows(result),
      })
      console.log(result);
    }
  }
}

