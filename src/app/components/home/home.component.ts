import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from '../../providers/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private router: Router;
  private dataService: DataService;

  constructor(
    router: Router,
    dataService: DataService
  ) {
    this.router = router;
    this.dataService = dataService;
  }

  ngOnInit() {
    if (this.router.url === '/') {
      if (!this.dataService.load('guide-path')) {
        this.router.navigate(['guide-selector']);
      } else if (this.dataService.load('guide-small')) {
        this.router.navigate(['guide-small']);
      } else {
        this.router.navigate(['guide-detail']);
      }
    }
  }
}
