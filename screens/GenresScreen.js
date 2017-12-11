import React, { Component } from 'react';
import { ToastAndroid, Image, StyleSheet, Dimensions, TouchableHighlight, View } from 'react-native'
import { Title, Body, Text, Container, Header, Footer, Icon, Grid, Col, Row, Thumbnail, Content, List, ListItem, Spinner, Card, CardItem, Button, StyleProvider } from 'native-base';
import _ from 'lodash'
import getTheme from '.././native-base-theme/components';
import material from '.././native-base-theme/variables/material';


var styles = StyleSheet.create({
    genre: {
        alignSelf: 'center', flex: 1, height: 100, width: 100, borderRadius: 4, borderWidth: 1.5, borderColor: 'gray', resizeMode: 'stretch'
    }
})




export default class GenresScreen extends Component {




    constructor(props) {
        super(props);
        this.state = {
            isLoading: false

        }

        console.log(this.props.screenProps)
        const { navigation, screenProps } = this.props

        this.state = {
            originaItems: screenProps.originalItems
        };



    }



    componentWillMount() {

    }

    async filter(text) {
        const { navigate } = this.props.navigation;
        var tempList = [];
        this.setState({ listItems: [] });
        if (text == "all") {
            navigate('Feed', { listItems: this.state.originaItems })
        } else {
            await this.state.originaItems.forEach((anime => {
                var animeGenre = anime.Genres.toLowerCase();
                if (animeGenre.contains(text.toLowerCase()))
                    tempList.push(anime)
            }))
            this.setState({
                listItems: tempList
            })

            navigate('Feed', { listItems: this.state.listItems })
        }



    }


    render() {

        const dimensions = Dimensions.get('window');
        const imageHeight = Math.round(dimensions.width * 9 / 16);
        const imageWidth = dimensions.width;

        return (
            <Container>
                <StyleProvider style={getTheme(material)}>
                    <Header backgroundColor='#FB8C00'>
                        <Body>
                            <Title>Genres</Title>
                        </Body>
                    </Header>
                </StyleProvider>
                <Content style={{ flex: 1 }}>
                    {this.state.isLoading ? <Spinner /> :
                        <List>
                            <Grid>
                                <Row style={{ marginTop: 10 }}>
                                    <TouchableHighlight
                                        onPress={() => this.filter('all')}>
                                        <Image
                                            style={{ width: imageWidth, height: 150, borderRadius: 4, borderWidth: 1.5, borderColor: 'gray' }}
                                            source={require('../assets/thumbs/thumb_all_anime.jpeg')}
                                        />
                                    </TouchableHighlight>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight
                                            onPress={() => this.filter('action')}>
                                            <Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_action.jpeg')} />
                                        </TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('Adventure')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_adventure.jpeg')} /></TouchableHighlight>
                                    </Col>
                                    <Col>
                                        <TouchableHighlight onPress={() => this.filter('drama')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_drama.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('fantasy')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_fantasy.jpeg')} /></TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('game')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_game.jpeg')} /></TouchableHighlight>
                                    </Col>
                                    <Col>
                                        <TouchableHighlight onPress={() => this.filter('horror')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_horror.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('josei')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_josei.jpeg')} /></TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('Martial Arts')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_martial_arts.jpeg')} /></TouchableHighlight>
                                    </Col>
                                    <Col>
                                        <TouchableHighlight onPress={() => this.filter('mecha')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_mecha.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('military')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_military.jpeg')} /></TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight
                                            onPress={() => this.filter('music')}>
                                            <Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_music.jpeg')} />
                                        </TouchableHighlight>
                                    </Col>
                                    <Col>
                                        <TouchableHighlight onPress={() => this.filter('police')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_police.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('Psychological')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_psychological.jpeg')} /></TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('romance')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_romance.jpeg')} /></TouchableHighlight>
                                    </Col>
                                    <Col>
                                        <TouchableHighlight onPress={() => this.filter('samurai')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_samurai.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('school')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_school.jpeg')} /></TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('sci-fi')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_scifi.jpeg')} /></TouchableHighlight>
                                    </Col>
                                    <Col>
                                        <TouchableHighlight onPress={() => this.filter('seinen')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_seinen.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('shoujo')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_shoujo.jpeg')} /></TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('shounen')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_shounen.jpeg')} /></TouchableHighlight>
                                    </Col>
                                    <Col>
                                        <TouchableHighlight onPress={() => this.filter('Slice of Life')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_slice_of_life.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('space')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_space.jpeg')} /></TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('sport')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_sport.jpeg')} /></TouchableHighlight>
                                    </Col>
                                    <Col>
                                        <TouchableHighlight onPress={() => this.filter('super power')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_superpower.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                                <Row style={{ margin: 10 }}>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('thriller')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_thriller.jpeg')} /></TouchableHighlight>

                                    </Col>
                                    <Col >
                                        <TouchableHighlight onPress={() => this.filter('vampire')}><Thumbnail large style={styles.genre} square source={require('../assets/thumbs/thumb_vampiere.jpeg')} /></TouchableHighlight>
                                    </Col>
                                </Row>
                            </Grid>
                        </List>}
                </Content>
            </Container>
        );
    }
}