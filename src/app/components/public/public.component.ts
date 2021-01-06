import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  mediaSub!: Subscription;
  opened: boolean=false;
  user: any;
  mobile!: boolean;
  environment: string = environment.apiUrl;
 

  constructor(private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private breakpointObserver: BreakpointObserver) {
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]).subscribe(result => {
        if (result.matches) {
          result.breakpoints[Breakpoints.XSmall] ?
            this.mobile = true :
            this.mobile = false;
          
        }
      });
    }
    onOutletLoaded(component:any) {
      this.authService.getUser().subscribe( user => {
        this.user = user;
        component.user = this.user;
      })
    } 

    onSwitchTheme(event:any){
      event.checked ? this.document.body.classList.add('alternate-theme'): this.document.body.classList.remove('alternate-theme') 
    }


  ngOnInit(): void {

  }
}