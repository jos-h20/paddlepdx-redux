import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { riversFetch, riverDelete, fetchApiRivers } from '../actions';



class SelectedRiversList extends Component {
  constructor() {
    super();
    this.state = { rivers: null, riverIds: '', apiRivers: null };
    }

  componentWillMount() {
    this.props.riversFetch();
      // this.setState({ rivers });
      // const riverIds = [];
      // console.log(rivers, "OH YEAH");
      // rivers.map((river) => {
      //   riverIds.push(river.id);
      // });
      // const strRiverIds = riverIds.toString();
      // this.setState({ riverIds: strRiverIds })
      // console.log(strRiverIds, "sel river STRING");
      //
      // const apiRivers = this.props.fetchApiRivers(strRiverIds);
      // this.setState({ apiRivers });


    console.log(this.props, 'first rivers fetch');
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, 'ya this props');
    if (this.props !== nextProps) {
    console.log(nextProps, 'next props rivers');
    const rivers = nextProps.selRivers;
    console.log(rivers, 'rivers state after next');
    this.setState({ rivers });

    const riverIds = [];
    console.log(rivers, "OH YEAH");
    rivers.map((river) => {
      riverIds.push(river.id);
    });
    const strRiverIds = riverIds.toString();
    this.setState({ riverIds: strRiverIds })
    console.log(strRiverIds, "sel river STRING");
  }
    //
    // const apiRivers = this.props.fetchApiRivers(this.state.riverIds);



  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, 'will update next props');
    console.log(nextState, 'will update next state');
    if(this.state.riverIds !== nextState.riverIds) {
      this.props.fetchApiRivers(nextState.riverIds);
    }
  }



  componentDidMount () {
    console.log(this.state.riverIds, 'river ids from did mount');
    // const rivers = this.props.riversFetch();
    // this.setState({ rivers })

  console.log(this.state.rivers, 'did mount');
      // this.props.fetchApiRivers(strRiverIds);
    // const riverIds = [];
    // console.log(rivers, "OH YEAH");
    // rivers.map((river) => {
    //   riverIds.push(river.id);
    // });
    // const strRiverIds = riverIds.toString();
    // this.setState({ riverIds: strRiverIds })
    // console.log(strRiverIds, "sel river STRING");

    // const apiRivers = this.props.fetchApiRivers(this.state.riverIds);
    // this.setState({ apiRivers });


    // const apiRivers = this.props.fetchApiRivers(this.state.riverIds);
    // // this.setState({ apiRivers });
    // console.log(apiRivers, 'API rivers for ever');
    // if (this.state.riverIds) {
    //   const apiRivers = this.props.fetchApiRivers(this.state.riverIds);
    //   this.setState({ apiRivers });
    //   console.log(apiRivers, 'API rivers for ever');
    // }

  //   if (this.state.riverIds) {
  //   axios.get('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=' + this.state.riverIds + '&parameterCd=00060&siteStatus=all')
  //   .then((response) => {
  //     console.log('response sel rivers', response)
  //     this.setState({apiRivers: response.data.value.timeSeries})
  //   })
  //   .catch((error) => {
  //     console.error('axios error', error)
  //   })
  //   setInterval( () => {
  //     axios.get('http://waterservices.usgs.gov/nwis/iv/?format=json&sites=' + this.state.riverIds + '&parameterCd=00060&siteStatus=all')
  //     .then((response) => {
  //       console.log('response sel rivers', response)
  //       this.setState({apiRivers: response.data.value.timeSeries})
  //     })
  //     .catch((error) => {
  //       console.error('axios error', error)
  //     })
  //   }, 900000);
  // }
}
  // renderApiRiverList() {
  //   if(!this.props.apiRivers) {
  //     return <h2>loading ...</h2>
  //   }
  //   return this.props.apiRivers.map((river) => {
  //     return <li>{river.values[0].value[0].value}</li>
  //   });
  // }

  // getCfs() {
  //   apiRiverArray.forEach((cfsRiver) => {
  //     if(river.id === cfsRiver.id) {
  //       return cfs = cfsRiver.cfs;
  //     }
  //   });
  // }

  // const cfss = apiRiverArray.forEach((cfsRiver) => {
  //         if(river.id === cfsRiver.id) {
  //            river.cfs = cfsRiver.cfs;
  //         }
  //       });
  //       console.log(river.cfs)

  renderList() {
    const cfs = null;
    const apiRiverArray = [];

    if (!this.state.rivers || (!this.props.apiRivers)) {
      return <h1>Loading</h1>
    }

    const apiRivers = this.props.apiRivers.map((apiRiver) => {
      const apiRiverId = apiRiver.sourceInfo.siteCode[0].value
      const cfs = apiRiver.values[0].value[0].value
      const cfsRiver = { id: apiRiverId, cfs: cfs}
      apiRiverArray.push(cfsRiver);
    });



     return this.state.rivers.map((river) => {
       const cfss = apiRiverArray.forEach((cfsRiver) => {
               if(river.id === cfsRiver.id) {
                  river.cfs = cfsRiver.cfs;
               }
             });
             console.log(river.cfs)
      return (
        <li

          key={river.name}
          className="list-group-item">
          {river.name}
          {river.cfs}
          <button
            onClick={() => this.props.riverDelete(river)}
            className="add btn btn-primary"
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
        <ul className="list-group col-sm-4">
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
  const selRivers = _.map(state.selectedRivers, (val, uid) => {
    return { ...val, uid }
  });
  const apiRivers = _.map(state.apiRivers, (val, uid) => {
    return { ...val, uid }
  });
  return { selRivers, apiRivers };
};

export default connect(mapStateToProps, { riversFetch, riverDelete, fetchApiRivers })(SelectedRiversList);
