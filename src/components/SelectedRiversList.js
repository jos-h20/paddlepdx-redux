import React, { Component } from 'react';
import { connect } from 'react-redux';


class SelectedRiversList extends Component {
  renderList() {
    return this.props.rivers.map((river) => {
      return (
        <li
          key={river.name}
          className="list-group-item">
          {river.name}
        </li>
      );
    });
  }

  render() {
    console.log(this.props);
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of SelectedRiversList
  return {
    rivers: state.selectedRivers
  };
}

// // Anything returned from this function will end up as props
// // on the SelectedRiversList container
// function mapDispatchToProps(dispatch) {
//   // Whenever selectRiver is called, the result shoudl be passed
//   // to all of our reducers
//   return bindActionCreators({ selectRiver: selectRiver }, dispatch);
// }

// Promote SelectedRiversList from a component to a container - it needs to know
// about this new dispatch method, selectRiver. Make it available
// as a prop.
export default connect(mapStateToProps)(SelectedRiversList);
