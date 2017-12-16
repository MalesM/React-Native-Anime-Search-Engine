import { TabNavigator, StackNavigator, NavigationActions } from 'react-navigation';
import AnimeList from '../screens/AnimeList';
import AnimeInfo from '../screens/AnimeInfo';
import FavoritesTab from '../screens/FavoritesTab';
import HistoryTab from '../screens/HistoryTab';
import { Button, Icon, Footer, FooterTab, Text, StyleProvider } from 'native-base';
import { View } from 'react-native'
import React from "react";
import AnimeEpisodes from '../screens/AnimeEpisodes'
import Player from '../screens/Player';
import GenresScreen from '../screens/GenresScreen';
import getTheme from '.././native-base-theme/components';
import material from '.././native-base-theme/variables/material';
import {
    AdMobBanner
} from 'react-native-admob'
export const FeedStack = StackNavigator({
    Genres: {
        screen: GenresScreen,
        /* navigationOptions: {
            title: 'Anime List',
        } */
    },
    Feed: {
        screen: AnimeList,
        /* navigationOptions: {
            title: 'Anime List',
        } */
    },
    Info: {
        screen: AnimeInfo,
        navigationOptions: ({ navigation }) => ({
            title: `${navigation.state.params.title}`,
        })
    },

    Episodes: {
        screen: AnimeEpisodes,
        navigationOptions: {
            title: 'Episodes',
        }
    },

    Player: {
        screen: Player,
        navigationOptions: {
            title: 'Player',


        },

    }
}, {
        headerMode: 'none'
    });


export const Tabs = TabNavigator({
    Feed: {
        screen: FeedStack,
        navigationOptions: {
            tabBarLabel: 'Search',

        },
    },
    Favorites: {
        screen: FavoritesTab,
        navigationOptions: {
            tabBarLabel: 'Favorites',
            title: 'Favorites'

        },
    },
    History: {
        screen: HistoryTab,
        navigationOptions: {
            tabBarLabel: 'History',
            title: 'History'

        },
    },

}, {
        tabBarPosition: "bottom",
        tabBarComponent: props => {

            return (
                <View>
                    <AdMobBanner
                        adSize="fullBanner"
                        adUnitID="ca-app-pub-3282954780570062/4037280808"
                        testDevices={[AdMobBanner.simulatorId]}
                        onAdFailedToLoad={error => console.log(error)}
                    />
                    <StyleProvider style={getTheme(material)}>
                        <Footer >
                            <FooterTab
                                tabActiveBgColor="#4fb5f9"
                                tabBarActiveTextColor="#2d83bc"
                                tabBarTextColor="#6b6b6b">
                                <Button
                                    vertical
                                    active={props.navigationState.index === 0}
                                    onPress={() => {

                                        const resetAction = NavigationActions.reset({
                                            index: 0,
                                            actions: [
<<<<<<< HEAD
                                                NavigationActions.navigate({routeName: 'Genres'})
=======
                                                NavigationActions.navigate({ routeName: 'Genres' })
>>>>>>> origin/radoman
                                            ]
                                        });
                                        props.navigation.dispatch(resetAction);

<<<<<<< HEAD
                                    }

                                    }>
=======
                                    }}>
>>>>>>> origin/radoman
                                    <Icon name="search" />
                                    <Text>Browse</Text>
                                </Button>
                                <Button
                                    vertical
                                    active={props.navigationState.index === 1}
                                    onPress={() => props.navigation.navigate("Favorites")}>
                                    <Icon name="star" />
                                    <Text>Favorites</Text>
                                </Button>
                                <Button
                                    vertical
                                    active={props.navigationState.index === 2}
                                    onPress={() => props.navigation.navigate("History")}>
                                    <Icon name="calendar" />
                                    <Text>History</Text>
                                </Button>
                            </FooterTab>
                        </Footer>
                    </StyleProvider>
                </View>

            );
        }

    },

);

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}