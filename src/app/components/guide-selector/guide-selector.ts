import { Component, OnInit } from '@angular/core';

import { GuideService } from '../../providers/guide.service';

@Component({
  selector: 'app-guide-selector',
  templateUrl: './guide-selector.html',
  styleUrls: ['./guide-selector.scss']
})
export class GuideSelectorComponent implements OnInit {
  constructor(
    public guideService: GuideService
  ) { }

  ngOnInit() {

  }
}
