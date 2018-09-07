import { Entity } from '@loopback/repository';
export declare class Island extends Entity {
    id: number;
    name?: string;
    population?: number;
    country?: string;
    remindAtAddress?: string;
    remindAtGeo?: string;
    constructor(data?: Partial<Island>);
}
