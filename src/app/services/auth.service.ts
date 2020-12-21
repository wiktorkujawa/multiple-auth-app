import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService: WebService) { }

  getUser(){
    return this.webService.get('auth/user');
  }
}
