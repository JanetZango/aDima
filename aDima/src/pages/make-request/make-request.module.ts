import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MakeRequestPage } from './make-request';

@NgModule({
  declarations: [
    MakeRequestPage,
  ],
  imports: [
    IonicPageModule.forChild(MakeRequestPage),
  ],
})
export class MakeRequestPageModule {}
