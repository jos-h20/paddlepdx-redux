import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { riverSelect } from '../actions/index.js';


class AllRiversList extends Component {
  renderList() {
    return this.props.rivers.map((river) => {
      return (
        <li
          key={river.name}
          onClick={() => this.props.riverSelect(river)}
          className="list-group-item">
          {river.name}
        </li>
      );
    });
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <ul className="list-group col-sm-4">
          {this.renderList()}
        </ul>
        <div className="text-xs-right">
          <Link to="/selected" className="btn btn-primary">
            Selected
          </Link>
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of AllRiversList
  return {
    rivers: state.rivers
  };
}

// // Anything returned from this function will end up as props
// // on the AllRiversList container
// function mapDispatchToProps(dispatch) {
//   // Whenever selectRiver is called, the result shoudl be passed
//   // to all of our reducers
//   return bindActionCreators({ selectRiver: selectRiver }, dispatch);
// }

// Promote AllRiversList from a component to a container - it needs to know
// about this new dispatch method, selectRiver. Make it available
// as a prop.
export default connect(mapStateToProps, { riverSelect })(AllRiversList);
