import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateBusinessPage } from './create-business';

@NgModule({
  declarations: [
    CreateBusinessPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateBusinessPage),
  ],
})
export class CreateBusinessPageModule {}
