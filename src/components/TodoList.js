import React, { Component } from 'react';
import { Grid, Message, Icon, Checkbox, Button } from 'semantic-ui-react';
import $ from 'jquery';

class TodoListItem extends Component {

    constructor(props) {

        super(props);

        var done = this.props.done === 0 ? false : true;

        this.state = {
            checked : done
        }

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleCheckboxResponse = this.handleCheckboxResponse.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickResponse = this.handleClickResponse.bind(this);
    }


    handleCheckboxChange(event) {

        this.setState({ checked: !this.state.checked });

        var serialNumber = this.props.srNo;

        $.ajax(
        {
            type: 'PUT',
            url: 'http://localhost:5000/',
            data: {srNo : serialNumber}
        }).done(this.handleCheckboxResponse);

        event.preventDefault();
    }

    handleCheckboxResponse(data, status) {
        if(status === 'success') {
            console.log('Task marked done');

            this.props.refresh();
        }
        else {
            console.log("Task couldn't be marked. Status: " + status);
        }
        console.log('task done status toggled');
    }

    handleClick(event) {

        var serialNumber = this.props.srNo;

        $.ajax(
        {
            type: 'DELETE',
            url: 'http://localhost:5000/',
            data: {srNo : serialNumber}
        }).done(this.handleClickResponse);

        event.preventDefault();
    }

    handleClickResponse(data, status) {
        if(status === 'success') {
            console.log('Task deleted');

            this.props.refresh();
        }
        else {
            console.log("Could not delete task. Status: " + status);
        }
    }

    render() {

        var done = this.props.done === 0 ? false : true;

        return(
            <div>
                <Grid columns={3}>
                    <Grid.Column verticalAlign='middle' width={1}>
                        <Checkbox floated='left' checked={this.state.checked} fitted onChange={this.handleCheckboxChange}/>
                    </Grid.Column>

                    <Grid.Column textAlign='left' verticalAlign='middle' width={14}>
                        <Message success={done} visible
                            header={this.props.text}
                        />
                    </Grid.Column>

                    <Grid.Column verticalAlign='middle' width={1}>
                        <Button secondary circular icon floated='right' onClick={this.handleClick}>
                            <Icon name='close'/>
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

class TodoList extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        var tasks = this.props.tasks.data;

        let taskList = '';

        if(tasks !== undefined) {
            taskList = tasks.map((item) =>
                <TodoListItem key={item.sr_no} srNo={item.sr_no} text={item.task}
                done={item.done} refresh={this.props.refresh}/>
            );
        }
        // var taskList = 'tasklist';

        return(
            <div>
                {taskList}
            </div>
        );
    }
}

export { TodoList }
