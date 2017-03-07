import React, {Component} from 'react';
import _ from 'lodash';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {riversFetch, riverDelete, fetchApiRivers} from '../actions';


let hasAuth = false;

class SelectedRiversList extends Component {
  constructor() {
    super();
    this.state = {
      rivers: [],
      riverIds: null,
      num: null
    };
  }

  componentWillMount() {
    this.props.riversFetch();
  }

  componentDidMount() {
    if (!this.state.riverIds) {
       this.setState({ num: Math.random() });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && this.props.authenticated) {
      const rivers = nextProps.selRivers;
      this.setState({rivers});

      const riverIds = [];
      rivers.map((river) => {
        riverIds.push(river.id);
      });
      const strRiverIds = riverIds.toString();
      this.setState({riverIds: strRiverIds})
    }
  }

  componentWillUpdate(nextProps, nextState) {

    if (!this.props.authenticated && !hasAuth) {
      this.setState({ num: 5 });
      hasAuth = true;
    }

    if (this.state.riverIds !== nextState.riverIds && nextState.riverIds !== null) {
      this.props.fetchApiRivers(nextState.riverIds);
    }

  }

  // shouldComponentUpdate(nextProps, nextState) {
  //     console.log(nextProps, 'next props on the big should');
  // }

  // renderList() {
  //
  //    return this.props.apiRivers.map((river) => {
  //
  //     return (
  //       <li
  //
  //         key={river.name}
  //         id={river.sourceInfo.siteCode[0].value}
  //         className="list-group-item">
  //         <h5>{river.sourceInfo.siteName}</h5>
  //         <h5>CFS: {river.values[0].value[0].value} at <Moment format='hh:mm'>{river.values[0].value[0].dateTime}</Moment></h5>
  //         <button
  //           onClick={() => this.props.riverDelete(river.sourceInfo.siteCode[0].value)}
  //           className="add btn btn-primary"
  //         >
  //           Delete
  //         </button>
  //       </li>
  //     );
  //   });
  //
  // }

  renderList() {
    const cfs = null;
    const apiRiverArray = [];
    if (!this.state.rivers || (!this.props.apiRivers)) {
      return <h1>Loading</h1>
    }

    const apiRivers = this.props.apiRivers.map((apiRiver) => {
      const apiRiverId = apiRiver.sourceInfo.siteCode[0].value
      const cfs = apiRiver.values[0].value[0].value
      const time = moment(apiRiver.values[0].value[0].dateTime).format('hh:mm')
      const cfsRiver = {
        id: apiRiverId,
        cfs,
        time
      }
      apiRiverArray.push(cfsRiver);
    });

    const color = "white";
    return this.props.selRivers.map((river) => {
      const filter = apiRiverArray.forEach((cfsRiver) => {
        if (river.id === cfsRiver.id) {
          river.cfs = cfsRiver.cfs;
          river.time = cfsRiver.time;
          //   if(river.cfs < river.low) {
          //       color = "blue";
          //   } else if(river.cfs > river.high) {
          //       color = "red";
          //   } else {
          //       color = "green";
          //   }
        }
      });

      return (
        <li key={river.name} className="list-group-item">
          <div className="sel-river row">
            <div className="col-xs-5 name">{river.name}</div>
            <div className="col-xs-5 api">CFS:
              <span className="cfs"> {river.cfs}</span><br/>at {river.time}</div>
            <div className="col-xs-2">
              <button onClick={() => this.props.riverDelete(river)} className="delete btn btn-default">
                X
              </button>
            </div>
          </div>
        </li>
      );
    });
  }

  userMessage() {
    if (this.state.rivers.length === 0 && this.props.authenticated) {
      return <div className="message">Click the button to select some rivers</div>
    }
  }

  render() {

    return (

      <div>
        <ul className="list-group sel-rivers-container">
          {this.renderList()}
        </ul>
        <div>{this.userMessage()}</div>
        <div className="row">
          <div className="col-xs-1"></div>
          { this.props.authenticated &&
          <Link to="/all" className="rivers-button col-xs-10">
            River List
          </Link> }
          <div className="col-xs-1"></div>
        </div>
      </div>
    );
  }

}


const mapStateToProps = state => {
  const selRivers = _.map(state.selectedRivers, (val, uid) => {
    return {
      ...val,
      uid
    }
  });
  const apiRivers = _.map(state.apiRivers, (val, uid) => {
    return {
      ...val,
      uid
    }
  });
  const authenticated = state.auth.authenticated
  return {selRivers, apiRivers, authenticated};
};

export default connect(mapStateToProps, {riversFetch, riverDelete, fetchApiRivers})(SelectedRiversList);
