import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Platform,
    ScrollView,
    FlatList,
    TextInput,
    Button,
    KeyboardAvoidingView,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight
const TODO = "@todoapp.todo"

const TodoItem = (props) => {
    let textStyle = styles.todoItem
    if (props.done === true) {
        textStyle = styles.todoItemDone
    }
    return (
        <TouchableOpacity onPress={props.onTapTodoItem}>
            <Text style={textStyle}> {props.title}_</Text>
        </TouchableOpacity>
    )
}

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            todo: [
                {index: 'index', title: 'title', done: false}
            ],
            currentIndex: 0,
            inputText: "",
        }
    }

    componentDidMount() {
        this.loadTodo()
    }

    loadTodo = async () => {
        try {
            const  todoString = await AsyncStorage.getItem(TODO)
            if (todoString) {
                const todo = JSON.parse(todoString)
                const currentIndex = todo.length
                this.setState({todo: todo, currentIndex: currentIndex})
            }
        } catch (e) {
            console.log(e)
        }
    }

    saveTodo = async (todo) => {
        try {
            const todoString = JSON.stringify(todo)
            await AsyncStorage.setItem(TODO, todoString)
        } catch (e) {
            console.log(e)
        }
    }

    onTapTodoItem =　(todoItem) => {
        const todo = this.state.todo
        const index = todo.indexOf(todoItem)
        todoItem.done = !todoItem.done
        todo[index] = todoItem
        this.setState({todo: todo})
        this.saveTodo(todo)
    }

    onAddItem = () => {
        const title = this.state.inputText
        if (title === "") {
            return
        }
        const index = this.state.currentIndex + 1
        const newTodo = {index: index, title: title, done: false}
        const todo = [...this.state.todo, newTodo]
        this.setState({
            todo: todo,
            currentIndex: index,
            inputText: "",
            filterText: ""
        })
        this.saveTodo(todo)
    }

    onTapTodoItem = (todoItem)=>{
        const todo = this.state.todo
        const index = todo.indexOf(todoItem)
        todoItem.done = !todoItem.done
        todo[index] = todoItem
        this.setState({todo: todo})
        this.saveTodo(todo)
    }

    render() {
        const filterText = this.state.filterText
        let todo = this.state.todo
        if (filterText !== "") {
            todo = todo.filter(t => t.title.includes(filterText))
        }
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.filter}>
                    <TextInput
                        onchangeText={(text) => this.setState({filterText: text})}
                        value={this.state.filterText}
                        style={styles.inputText}
                        placeholder="Type filter text"
                    />
                </View>
                <ScrollView style={styles.todolist}>
                    <FlatList
                        data={todo}
                        extraDate = {this.state}
                        renderItem={({item}) =>
                            <TodoItem
                                title={item.title}
                                done={item.done}
                                onTapTodoItem={() => this.onTapTodoItem(item)}
                            />
                        }
                        keyExtractor={(item) => "todo_" + item.index}
                    />
                    <Text>Todoリストがここに配置されます</Text>
                </ScrollView>
                <View style={styles.input}>
                    <TextInput
                        onChangeText={(text) => this.setState({inputText: text})}
                        value={this.state.inputText}
                        style={styles.inputText}
                    />
                    <Button
                        title="Add"
                        onPress={this.onAddItem}
                        color="#841584"
                        style={styles.inputButton}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: '#fff',
        // alignItems: ' center',
        // justifyContent: ' center',
    },
    filter: {
        height: 30,
    },
    todolist: {
        flex: 1
    },
    input: {
        height: 30,
        flexDirection: 'row'
    },
    inputText: {
        flex: 1
    },
    inputButton: {
        width: 100
    },
    todoItem: {
        fontSize: 20,
        backgroundColor: "white"
    },
    todoItemDone: {
        fontSize: 20,
        backgroundColor: "red"
    }

});
