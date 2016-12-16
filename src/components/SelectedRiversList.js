import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { riversFetch } from '../actions';
import LoginForm from './LoginForm'


class SelectedRiversList extends Component {
  constructor() {
    super();
      this.state = { rivers: [] };
    }

  componentWillMount() {
    const rivers = this.props.riversFetch();
    console.log(this.props, 'first rivers fetch');

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.rivers, 'next props rivers');
    const rivers = nextProps.rivers;
    console.log(rivers, 'rivers state after next');
    this.setState({ rivers });
  }


  // fetchRivers() {
  //   const rivers = this.props.riversFetch();
  //   this.setState({ rivers });
  // }

  renderList() {
    return this.state.rivers.map((river) => {
      return (
        <li
          key={river.name}
          className="list-group-item">
          {river.name}
        </li>
      );
    });
  }
  //
  // renderContent() {
  //   switch (this.state.loggedIn) {
  //     case true:
  //       return (
  //         <ul className="list-group col-sm-4">
  //           {this.renderList()}
  //         </ul>
  //       );
  //     case false:
  //       return <LoginForm />;
  //   }
  // }


  render() {
    console.log(this.props, 'props on selected');
    console.log(this.state.rivers, 'this state rivers render')
    // if (!this.state.rivers) {
    //   return <div>not yet</div>
    // }
    // this.props.fetchRivers();
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
  const rivers = _.map(state.selectedRivers, (val, uid) => {
    return { ...val, uid }
  });
  return { rivers };
};

export default connect(mapStateToProps, { riversFetch })(SelectedRiversList);
