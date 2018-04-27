import { PizzasService } from './pizzas.service';
import { ToppingsService } from './toppings.service';
import { DogService } from './dog.service';
import { AccessoriesService } from './accessories.service';


export const services: any[] = [PizzasService, ToppingsService, DogService, AccessoriesService];

export * from './pizzas.service';
export * from './toppings.service';
export * from './dog.service';
export * from './accessories.service';