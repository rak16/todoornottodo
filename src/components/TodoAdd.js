import React, { Component } from 'react';
import { Input, Button, Icon, Grid } from 'semantic-ui-react';
import $ from 'jquery'

class TodoAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value : ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickResponse = this.handleClickResponse.bind(this);
    }

    handleInputChange(event) {
        this.setState({value : event.target.value});
    }

    handleClick(event) {
        var task = this.state.value;

        console.log(this.props.refresh);

        $.post('http://localhost:5000/', {data: task}, this.handleClickResponse);

        event.preventDefault();
    }

    handleClickResponse(data, status) {
        if(status === 'success') {
            console.log('Added todo task');

            this.setState({value : ''});

            this.props.refresh();
        }
        else {
            console.log('Could not add task. Status: ' + status);
        }
    }

    render() {

        return(
            <div>
                <Grid verticalAlign='middle' columns={2}>
                    <Grid.Column stretched width={15}>
                        <Input fluid floated='left' size='large' placeholder={this.props.placeholder} value={this.state.value} onChange={this.handleInputChange}/>
                    </Grid.Column>

                    <Grid.Column width={1}>
                        <Button primary circular icon floated='right'  onClick={this.handleClick}>
                            <Icon name='add'/>
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export { TodoAdd }
