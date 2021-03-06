import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'search',
    loadChildren: () =>
      import('./feature/search/search.module').then(mod => mod.SearchModule)
  },
  {
    path: 'feature',
    loadChildren: () =>
      import('./feature/feature-page/feature-page.module').then(
        mod => mod.FeaturePageModule
      )
  },
  {
    path: '',
    loadChildren: () =>
      import('./feature/landing/landing.module').then(mod => mod.LandingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
