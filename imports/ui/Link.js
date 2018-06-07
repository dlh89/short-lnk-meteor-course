import React from 'react';
import { Meteor } from 'meteor/meteor';

import LinksList from '../ui/LinksList';
import PrivateHeader from '../ui/PrivateHeader';
import AddLink from '../ui/AddLink';
import LinksListFilters from '../ui/LinksListFilters';

export default class Link extends React.Component {
  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.replace('/');
    }
  }
  render() {
    return (
      <div>
        <PrivateHeader title="Your Links" />
        <div className="page-content">
          <LinksListFilters />
          <AddLink />
          <LinksList />
        </div>
      </div>
    );
  }
}
