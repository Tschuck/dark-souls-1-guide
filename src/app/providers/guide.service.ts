import { Injectable } from '@angular/core';
import { ElectronService } from './electron.service';
import { DataService } from './data.service';

const level0 = 'Questebene 1';
const level1 = 'Questebene 2';
const level2 = 'Questebene 3';

@Injectable()
export class GuideService {
  constructor(
    public electronService: ElectronService,
    private dataService: DataService
  ) { }

  importGuide = () => {
    const files = this.electronService.remote.dialog.showOpenDialog({
      filters: <any>{
        extensions: [ 'xlsx' ]
      },
      properties: ['openFile']
    });

    const guide = this.loadGuide(files[0]);

    this.dataService.save('guide-path', files[0]);

    return guide;
  }

  loadGuide = (file) => {
    const guide = [];

    const workbook = this.electronService.xlsx.readFile(file);
    for (let i = 0; i < workbook.SheetNames.length; i++) {
      const sheetData = this.electronService.xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[i]]);
      const area = {
        name: workbook.SheetNames[i],
        id: i,
        quests: []
      };

      const queststack = [];
      for (let x = 0; x < sheetData.length; x++) {
        const quest: any = sheetData[x];
        quest.quests = [];

        if (quest[level0]) {
          quest.id = area.id + '.' + area.quests.length;
          quest.name = quest[level0];
          area.quests.push(quest);
          queststack[0] = quest;
        } else if (quest[level1]) {
          quest.id = queststack[0].id + '.' + queststack[0].quests.length;
          quest.name = quest[level1];
          queststack[1] = quest;
          queststack[0].quests.push(quest);
        } else if (quest[level2]) {
          quest.id = queststack[1].id + '.' + queststack[1].quests.length;
          quest.name = quest[level2];
          queststack[1].quests.push(quest);
        }
      }

      guide.push(area);
    }

    this.dataService.save('guide', JSON.stringify(guide));

    return guide;
  }

  loadCurrentGuide() {
    return JSON.parse(this.dataService.load('guide'));

    // const guidePath = this.dataService.load('guide-path');

    // return this.loadGuide(guidePath);
  }

  setActivearea(index) {
    this.dataService.save('active-guide-index', index);
  }
}
