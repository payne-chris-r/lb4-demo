import { IslandRepository } from '../repositories';
import { Island } from '../models';
export declare class IslandController {
    protected islandRepo: IslandRepository;
    constructor(islandRepo: IslandRepository);
    createIsland(island: Island): Promise<Island>;
    findIslands(): Promise<Island[]>;
}
