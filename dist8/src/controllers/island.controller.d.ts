import { IslandRepository } from '../repositories';
import { Island } from '../models';
import { GeocoderService } from '../services';
export declare class IslandController {
    protected islandRepo: IslandRepository;
    protected geoService: GeocoderService;
    constructor(islandRepo: IslandRepository, geoService: GeocoderService);
    createIsland(island: Island): Promise<Island>;
    findIslands(): Promise<Island[]>;
    deleteIsland(id: number): Promise<boolean>;
}
