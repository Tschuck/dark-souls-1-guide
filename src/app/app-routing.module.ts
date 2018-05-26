import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { GuideDetailComponent } from './components/guide-detail/guide-detail';
import { GuideSelectorComponent } from './components/guide-selector/guide-selector';
import { GuideSmallComponent } from './components/guide-small/guide-small';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'guide-selector',
        component: GuideSelectorComponent
      },
      {
        path: 'guide-detail',
        component: GuideDetailComponent
      },
      {
        path: 'guide-small',
        component: GuideSmallComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
