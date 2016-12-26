import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router';
import { riverSelect, riversFetch, fetchRiverList } from '../actions/index.js';


class AllRiversList extends Component {
  constructor() {
    super();
    this.state = { selRivers: [] }
  }
  componentWillMount() {
    this.props.riversFetch();
    this.props.fetchRiverList();

  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
    const selRivers = nextProps.selRivers;
    this.setState({ selRivers });
    }
  }

  renderButton() {
    const rivers = this.state.selRivers;

    if (this.state.selRivers) {
      console.log(rivers.length, 'render button');
      if (rivers.length !== 0) {
      return (
        <div className="text-xs-right">
          <Link to="/selected" className="btn btn-primary">
            Selected
          </Link>
        </div>
      );
    }
  }
    return (
      <div><h2>Add some rivers</h2></div>
    );
  }

  renderList() {
    if (!this.props.rivers) {
      return <h1>Loading</h1>
    }
    console.log(this.props, 'props on all rivers render list');

    return this.props.rivers.map((river) => {
      river.isHidden = false;
      if (!this.state.selRivers) {
        return <h2>Loading</h2>
      }

      const filter = this.state.selRivers.forEach((selRiver) => {
        if (selRiver.id === river.id) {
          river.isHidden = true;
        }
      });

      if (!river.isHidden) {
        return (
          <li
            key={river.name}
            className="list-group-item">
            {river.name}
            <button
              onClick={() => {river.isHidden=true; this.props.riverSelect(river)}}
              className="add btn btn-primary"
            >
               Add
            </button>
          </li>
        );
      }
    });
  }

  render() {
    console.log(this.props, 'all rivers list')
    console.log(this.state.selRivers, 'sel rivers state on render')

    return (
      <div>
        <ul className="list-group col-sm-8">
          {this.renderList()}
        </ul>
        {this.renderButton()}
      </div>

    )
  }
}

function mapStateToProps(state) {
  const selRivers = _.map(state.selectedRivers, (val, uid) => {
    return { ...val, uid}
  });
  return {
    rivers: state.rivers,
    selRivers

  };
}

export default connect(mapStateToProps, { riverSelect, riversFetch, fetchRiverList })(AllRiversList);
