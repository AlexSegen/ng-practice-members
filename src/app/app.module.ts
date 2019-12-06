import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersComponent } from './members/members.component';
import { PriceInputComponent } from './members/price-input/price-input.component';

import { CurrencyPipe } from './pipes/currency.pipe';
import { PhonesComponent } from './phones/phones.component'

@NgModule({
  declarations: [
    AppComponent,
    MembersComponent,
    PriceInputComponent,
    CurrencyPipe,
    PhonesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
