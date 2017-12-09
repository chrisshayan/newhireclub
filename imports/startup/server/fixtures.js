/**
 * Created by tankhuu on 11/20/17.
 */
import { Meteor } from 'meteor/meteor';
import { SubDomains } from '../../api/collections';

Meteor.startup(() => {
  console.log('Create subdomains collection if not exists');
  if (SubDomains.find().count() === 0) {
    const { subdomains } = Meteor.settings.default;
    subdomains.forEach((subdomain) => {
      SubDomains.insert({subdomain});
    });
  }
});
