import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

@Injectable()
export class GlobalsService {

  constructor() { }

  static arrayProvidersFound:Observable<any[]>;


}
