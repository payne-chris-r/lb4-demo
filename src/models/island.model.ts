import { Entity, model, property } from '@loopback/repository';

@model()
export class Island extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  name?: string;


  @property({
    type: 'number',
  })
  population?: number;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  remindAtAddress?: string; // address,city,zipcode

  @property({
    type: 'string',
  })
  remindAtGeo?: string; // latitude,longitude

  constructor(data?: Partial<Island>) {
    super(data);
  }
}
