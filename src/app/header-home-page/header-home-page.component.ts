import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-home-page',
  templateUrl: './header-home-page.component.html',
  styleUrls: ['./header-home-page.component.scss']
})
export class HeaderHomePageComponent implements OnInit {

  constructor(private router: Router) { 
    
  }

  ngOnInit(): void {
  }


  Login(){
    this.router.navigate(['auth']);
    
  }

}
