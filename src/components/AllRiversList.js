import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { riverSelect, riversFetch, fetchRiverList } from '../actions/index.js';


class AllRiversList extends Component {
  constructor() {
    super();
    this.state = { selRivers: null }
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


  renderList() {
    if (!this.props.rivers || (!this.state.selRivers)) {
      return <h1>Loading</h1>
    }
    console.log(this.props, 'props on all rivers render list');

    return this.props.rivers.map((river) => {
      river.isHidden = false;
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

    return (
      <div>
        <ul className="list-group col-sm-8">
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
  const selRivers = _.map(state.selectedRivers, (val, uid) => {
    return { ...val, uid}
  });
  return {
    rivers: state.rivers,
    selRivers

  };
}

export default connect(mapStateToProps, { riverSelect, riversFetch, fetchRiverList })(AllRiversList);
