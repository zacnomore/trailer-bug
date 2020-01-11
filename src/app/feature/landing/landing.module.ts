import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingContainerComponent} from './container/landing-container/landing-container.component';
import {RouterModule, Routes} from '@angular/router';
import {OpeningComponent} from './templates/opening/opening.component';
import {CardModule} from '../../shared/layout/card/card.module';

const crisisCenterRoutes: Routes = [
  {
    path: '',
    component: LandingContainerComponent
  }
];

export const landingSchema = {
  declarations: [
    LandingContainerComponent,
    OpeningComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(crisisCenterRoutes),
    CardModule
  ],
  exports: [
    RouterModule
  ]
};

@NgModule(landingSchema)
export class LandingModule { }
