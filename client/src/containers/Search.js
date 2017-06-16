import React, { Component } from 'react';
import { connect } from 'react-redux';


/* * Utils * */
import { AutoComplete, Paper } from 'material-ui';

/* * Actions * */
import { queryES } from '../actions';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource : [],
      term : ''
    }
  }

  onChange(event) {
    this.setState( { term: event.target.value });
  }

  onNewRequest() {
    this.props.queryES(this.state.term);
  }


  render() {
    return (
      <Paper
        style={{ textAlign: 'center', margin: '1rem' }}
        rounded={false}
      >
        <AutoComplete
          dataSource={this.state.dataSource}
          onUpdateInput={() => this.onChange(event)}
          onNewRequest={() => this.onNewRequest()}
          hintText="Search"
          value={this.state.term}
          underlineShow={false}
        />
      </Paper>
    )
  }
}

function mapStateToProps({ search }) {
  return {
    search: search
  }
}

export default connect(null, { queryES })(Search);