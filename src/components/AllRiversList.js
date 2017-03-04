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
          <div className="row">
          <div className="col-xs-1"></div>
            <Link to="/" className="rivers-button col-xs-10">
              My Rivers
            </Link>
          <div className="col-xs-1"></div>
          </div>
        );
      }
    }
    return (
      <div className="message">Click above to add some rivers.</div>
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
            <div className="all-river row">
            <div className="col-xs-10">
                <div className="name">{river.name}</div>
            </div>
            <div
              onClick={() => {river.isHidden=true; this.props.riverSelect(river)}}
              className=" col-xs-2 add text-right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" stroke="none" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
            </div>
            </div>
          </li>
        );
      }
    });
  }

  render() {

    return (
      <div>
        <ul className="list-group">
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
    selRivers,
    user: state.auth.user

  };
}

export default connect(mapStateToProps, { riverSelect, riversFetch, fetchRiverList })(AllRiversList);
