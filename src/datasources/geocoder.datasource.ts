import {inject} from '@loopback/core';
import {juggler, AnyObject} from '@loopback/repository';
const config = require('./geocoder.datasource.json');

export class GeocoderDataSource extends juggler.DataSource {
  static dataSourceName = 'geocoder';

  constructor(
    @inject('datasources.config.geocoder', {optional: true})
    dsConfig: AnyObject = config
  ) {
    super(dsConfig);
  }
}
