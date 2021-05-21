import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSupportComponent } from './main-support/main-support.component';
import { ChatContentComponent } from './chat-content/chat-content.component';

const routes: Routes = [
  {
    path: '', component: MainSupportComponent, children: [
      {
        path: ':chatId/messages', component: ChatContentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
