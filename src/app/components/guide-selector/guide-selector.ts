import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GuideService } from '../../providers/guide.service';

@Component({
  selector: 'app-guide-selector',
  templateUrl: './guide-selector.html',
  styleUrls: ['./guide-selector.scss']
})
export class GuideSelectorComponent implements OnInit {
  constructor(
    public guideService: GuideService,
    public router: Router
  ) { }

  ngOnInit() { }

  public importGuide() {
    const guide = this.guideService.importGuide();

    if (guide) {
      this.router.navigate([ '..', 'guide-detail' ]);
    }
  }
}
