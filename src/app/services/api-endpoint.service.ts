import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  readonly winnerEndpoint = 'https://machine-learning-model-server.herokuapp.com/machine_learning_models/winning';
  readonly goalEndpoint = 'https://machine-learning-model-server.herokuapp.com/machine_learning_models/goals';


  constructor() {}
}
