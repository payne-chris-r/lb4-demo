// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { repository } from '@loopback/repository';
import { IslandRepository } from '../repositories';
import { Island } from '../models';
import { post, get, del, requestBody, HttpErrors, param } from '@loopback/rest';
import { inject } from '../../node_modules/@loopback/core';
import { GeocoderService } from '../services'

export class IslandController {
  constructor(
    @repository(IslandRepository) protected islandRepo: IslandRepository,
    @inject('services.GeocoderService') protected geoService: GeocoderService,
  ) { }

  @post('/islands')
  async createIsland(@requestBody() island: Island) {
    if (!island.name) {
      throw new HttpErrors.BadRequest('title is required');
    }

    if (island.remindAtAddress) {
      // TODO handle "address not found"
      const geo = await this.geoService.geocode(island.remindAtAddress);
      // Encode the coordinates as "lat,lng"
      island.remindAtGeo = `${geo[0].y},${geo[0].x}`;
    }

    return await this.islandRepo.create(island);
  }

  @get('/islands')
  async findIslands(): Promise<Island[]> {
    return await this.islandRepo.find();
  }

  @del('/islands/{id}')
  async deleteIsland(@param.path.number('id') id: number): Promise<boolean> {
    return await this.islandRepo.deleteById(id);
  }
  // @get('/islands')
  // async findIslands(): Promise<Island[]> {
  //   return await this.islandRepo.find();
  // }
}
