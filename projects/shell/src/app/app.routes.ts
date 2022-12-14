import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { startsWith, WebComponentWrapper, WebComponentWrapperOptions } from '@angular-architects/module-federation-tools';
import { DashboardComponent } from './dashboard/dashboard.component';

let URL = 'http://localhost:3000/remoteEntry.js';

export const APP_ROUTES: Routes = [
    {
      path: '',
      component: HomeComponent,
      pathMatch: 'full'
    },

    // Your route here:

    // Local usage
    // {
    //   path: 'flights',
    //   loadChildren: () => {
    //     return loadRemoteModule({
    //       type: 'module',
    //       remoteEntry: URL,
    //       exposedModule: './Module'
    //     })
    //     .then(m => m.FlightsModule) }
    // },
    {
      path: 'flights',
      loadChildren: () => {
        return loadRemoteModule({
          type: 'module',
          remoteEntry: 'https://brave-glacier-0ffc18c10.azurestaticapps.net/remoteEntry.js',
          exposedModule: './Module'
        })
        .then(m => m.FlightsModule) }
    },  
    {
      path: 'angular1',
      component: WebComponentWrapper,
      data: {
        remoteEntry: 'http://localhost:8080/static/remoteEntry.js',
        remoteName: 'angular1',
        exposedModule: './web-components',
        elementName: 'angular1-element'
      } as WebComponentWrapperOptions
    },     
    {
      matcher: startsWith('angular3'),
      component: WebComponentWrapper,
      data: {
        remoteEntry: 'https://gray-river-0b8c23a10.azurestaticapps.net/remoteEntry.js',
        // remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteName: 'angular3',
        exposedModule: './web-components',
        elementName: 'angular3-element'
      } as WebComponentWrapperOptions
    },  
    {
      path: 'dashboard',
      component: DashboardComponent
    },

    {
      path: '**',
      component: NotFoundComponent
    }

    // DO NOT insert routes after this one.
    // { path:'**', ...} needs to be the LAST one.

];

