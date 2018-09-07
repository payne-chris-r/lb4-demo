import {inject} from '@loopback/core';
import {juggler, AnyObject} from '@loopback/repository';
const config = require('./othercoder.datasource.json');

export class OthercoderDataSource extends juggler.DataSource {
  static dataSourceName = 'othercoder';

  constructor(
    @inject('datasources.config.othercoder', {optional: true})
    dsConfig: AnyObject = config
  ) {
    super(dsConfig);
  }
}
