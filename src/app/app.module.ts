import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { HeroFilterComponent } from './hero-filter/hero-filter.component';
import { HeroImageComponent } from './hero-image/hero-image.component';
import { TemplateFormsComponent } from './template-forms/template-forms.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { IdentityRevealedDirective } from './identity-revealed.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    NewHeroComponent,
    HeroFilterComponent,
    HeroImageComponent,
    TemplateFormsComponent,
    ReactiveFormComponent,
    DynamicFormComponent,
    IdentityRevealedDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
