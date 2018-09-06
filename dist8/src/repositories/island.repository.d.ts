import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Island } from '../models';
export declare class IslandRepository extends DefaultCrudRepository<Island, typeof Island.prototype.id> {
    protected datasource: juggler.DataSource;
    constructor(datasource: juggler.DataSource);
}
