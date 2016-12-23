import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { riversFetch, riverDelete, fetchApiRivers } from '../actions';



class SelectedRiversList extends Component {
  constructor() {
    super();
    this.state = { rivers: null, riverIds: '' };
    }

  componentWillMount() {
    this.props.riversFetch();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
    console.log(nextProps.selRivers, 'next props sel rivers')
    const rivers = nextProps.selRivers;
    this.setState({ rivers });

    const riverIds = [];
    rivers.map((river) => {
      riverIds.push(river.id);
    });
    const strRiverIds = riverIds.toString();
    console.log(strRiverIds, 'string river ids')
    this.setState({ riverIds: strRiverIds })
  }

  }

  componentWillUpdate(nextProps, nextState) {
    if(this.state.riverIds !== nextState.riverIds && nextState.riverIds !== '') {
      this.props.fetchApiRivers(nextState.riverIds);
    }
  }


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
      const time = moment( apiRiver.values[0].value[0].dateTime).format('hh:mm')
      const cfsRiver = { id: apiRiverId, cfs, time }
      apiRiverArray.push(cfsRiver);
    });



     return this.props.selRivers.map((river) => {
       const filter = apiRiverArray.forEach((cfsRiver) => {
               if(river.id === cfsRiver.id) {
                  river.cfs = cfsRiver.cfs;
                  river.time = cfsRiver.time;
               }
             });

      return (
        <li
          key={river.name}
          className="list-group-item">
          <h5>{river.name}</h5>
          <h5>CFS: {river.cfs} at {river.time}</h5>

          <button
            onClick={() => this.props.riverDelete(river)}
            className="delete btn btn-default"
          >
            Delete
          </button>
        </li>
      );
    });

  }



  render() {
    console.log(this.props, 'props on selected');
    console.log(this.state.rivers, 'this state rivers render');
    console.log(this.state.riverIds, 'API rivers for ever');




    return (

      <div>
        <ul className="list-group">
          {this.renderList()}
        </ul>
        <div className="text-xs-right">
          <Link to="/all" className="btn btn-primary">
            All
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // const selRivers = state.selectedRivers;
  const selRivers = _.map(state.selectedRivers, (val, uid) => {
    return { ...val, uid}
  });
  const apiRivers = _.map(state.apiRivers, (val, uid) => {
    return { ...val, uid }
  });
  return { selRivers, apiRivers };
};

export default connect(mapStateToProps, { riversFetch, riverDelete, fetchApiRivers })(SelectedRiversList);


          // <h5>CFS: {river.cfs} at <Moment format='hh:mm'>{river.time}</Moment></h5>
