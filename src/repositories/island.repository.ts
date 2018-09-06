import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Island } from '../models';
import { inject } from '@loopback/core';

export class IslandRepository extends DefaultCrudRepository<
  Island,
  typeof Island.prototype.id
  > {
  constructor(
    @inject('datasources.db') protected datasource: juggler.DataSource,
  ) {
    super(Island, datasource);
  }
}
