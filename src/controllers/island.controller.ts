// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';
import { repository } from '@loopback/repository';
import { IslandRepository } from '../repositories';
import { Island } from '../models';
import { post, get, requestBody, HttpErrors } from '@loopback/rest';

export class IslandController {
  constructor(@repository(IslandRepository) protected islandRepo: IslandRepository) { }

  @post('/islands')
  async createIsland(@requestBody() island: Island) {
    if (!island.population) {
      throw new HttpErrors.BadRequest('title is required, you need to change this')
    }
    return await this.islandRepo.create(island)
  }

  @get('/islands')
  async findIslands(): Promise<Island[]> {
    return await this.islandRepo.find();
  }
  // @get('/todos')
  // async findTodos(): Promise<Todo[]> {
  //   return await this.todoRepo.find();
  // }
}
