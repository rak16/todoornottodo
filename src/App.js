import React, { Component } from 'react';
import { Container, Divider, Segment } from 'semantic-ui-react';
import { TodoAdd } from './components/TodoAdd';
import { TodoList } from './components/TodoList';
import $ from 'jquery';

// import './App.css';

// Add todos from json to the list only on component mount

class TodoApp extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks : []
        };
        this.updateTaskList = this.updateTaskList.bind(this);
    }

    updateTaskList() {

        $.get('http://localhost:5000/', function(data, status) {

            //TODO : Add error checking
            // if(status === 'success') {
                // this.setState({tasks : 'jesus'});
            // }
            console.log(status);
            console.log(this);
            if(status === 'success') {
                this.setState({tasks : data});
            }

        }.bind(this));
    }

    componentDidMount() {

        console.log('Parent mounted');

        this.updateTaskList();
    }

    render() {

        return (
            <div>
                <Container style={{width: '1000px'}} textAlign='center'>
                    <Segment color='blue'>
                        <TodoAdd placeholder='E.g. Drink bleach at 1, ...' refresh={this.updateTaskList}/>
                        <Divider />
                        <TodoList tasks={this.state.tasks}  refresh={this.updateTaskList}/>
                    </Segment>
                </Container>
            </div>
        );
    }
}

export default TodoApp;
