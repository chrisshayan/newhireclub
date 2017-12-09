/**
 * Created by tankhuu on 12/9/17.
 */
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// defaultValue and data cleaning
class SubDomainsCollection extends Mongo.Collection {
}

// Collection
const SubDomains = new SubDomainsCollection('subdomains');

// Collection Schema
/**
 * Enable extend Options for SimpleSchema
 */
SimpleSchema.extendOptions(['autoform', 'unique']);

SubDomains.schema = new SimpleSchema({
  subdomain: {
    type: String,
    unique: true,
    trim: true,
  },
});
SubDomains.attachSchema(SubDomains.schema);

// Collection Helpers
SubDomains.helpers({
  subdomain() {
    return this.subdomain;
  },
});

export default SubDomains;
