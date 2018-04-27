import { DogService } from './dog.service';
import { AccessoriesService } from './accessories.service';


export const services: any[] = [DogService, AccessoriesService];

export * from './dog.service';
export * from './accessories.service';