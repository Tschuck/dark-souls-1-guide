import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GuideService } from '../../providers/guide.service';
import { DataService } from '../../providers/data.service';

@Component({
  selector: 'app-guide-detail',
  templateUrl: './guide-detail.html',
  styleUrls: ['./guide-detail.scss']
})
export class GuideDetailComponent implements OnInit {
  public guide: Array<any>;
  public activeArea: number;
  public activeQuests: Array<any>;
  public solved: any;

  constructor(
    public guideService: GuideService,
    public dataService: DataService,
    public router: Router
  ) { }

  ngOnInit() {
    try {
      this.guide = this.guideService.loadCurrentGuide();
      this.solved = this.dataService.load('solved') || { };
      this.activeArea = parseInt(this.dataService.load('active-guide-index'), 10) || 0;

      this.setActiveArea(this.activeArea);
    } catch (ex) {
      console.error(ex);
    }

    if (!this.guide) {
      this.router.navigate([ '..', 'guide-selector' ]);
    }
  }

  setActiveArea(index) {
    this.activeArea = index;
    this.activeQuests = this.guide[index].quests;

    this.guideService.setActivearea(index);
  }

  setParentsSolved(questId: string) {
    const splittedQuestId = questId.split('.');
    let parent;
    let solved = true;

    // remove current child
    splittedQuestId.pop();

    // get parent
    while (splittedQuestId.length > 0) {
      parent = parent ? parent.quests[splittedQuestId[0]] : this.guide[splittedQuestId[0]];

      splittedQuestId.splice(0, 1);
    }

    for (let i = 0; i < parent.quests.length; i++) {
      if (!this.solved[parent.quests[i].id]) {
        solved = false;
      }
    }

    this.solved[parent.id] = solved;

    if (parent.id.split('.').length > 1) {
      this.setParentsSolved(parent.id);
    }
  }

  toggleQuestId(quest) {
    if (quest.quests.length === 0) {
      this.solved[quest.id] = !this.solved[quest.id];

      // check parents solved
      this.setParentsSolved(quest.id);

      this.dataService.save('solved', this.solved);
    }
  }
}
