import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  'links.insert': function (url) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url,
      },
    }).validate({ url });

    Links.insert({
      _id: shortid.generate(),
      url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null,
    });
  },
  'links.setVisibility': function (_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorised');
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      visible: {
        type: Boolean,
      },
    }).validate({ _id, visible });
    Links.update(
      {
        userId: this.userId,
        _id,
      },
      {
        $set: { visible },
      },
    );
  },
  'links.trackVisit': function (_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    }).validate({ _id });

    Links.update(
      { _id },
      {
        $set: {
          lastVisitedAt: new Date().getTime(),
        },
        $inc: {
          visitedCount: 1,
        },
      },
    );
  },
});
