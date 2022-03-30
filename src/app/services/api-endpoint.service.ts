import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiEndpointService {

  readonly winnerEndpoint = 'http://127.0.0.1:8000/machine_learning_models/winning';
  readonly goalEndpoint = 'http://127.0.0.1:8000/machine_learning_models/goals';


  constructor() {}
}
