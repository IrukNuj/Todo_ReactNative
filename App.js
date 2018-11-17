import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    ScrollView,
    FlatList
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight

export default class App extends React.Component {
    constructor(props) {
        this.state = {
            todo: [
                {index: 1, title: 'hoge', done: false},
                {index: 2, title: 'huga', done: false}
            ],
            currentIndex: 2
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.filter}>
                    <Text>Filterがここに配置されます。</Text>
                </View>
                <ScrollView style={styles.todolist}>
                    <Text>Todoリストがここに配置されます</Text>
                </ScrollView>
                <View style={styles.input}>
                    <Text>テキスト入力がここに配置されます</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    filter: {
        height: 30,
    },
    todolist: {
        flex: 1
    },
    input: {
        height: 30
    }
});
