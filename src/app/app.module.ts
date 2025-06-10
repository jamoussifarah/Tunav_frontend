import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { CarouselHomePageComponent } from './carousel-home-page/carousel-home-page.component';
import { HeaderHomePageComponent } from './header-home-page/header-home-page.component';
import { ClientsCarouselComponent } from './clients-carousel/clients-carousel.component';
import { IOTCarouselComponent } from './iotcarousel/iotcarousel.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    VitrineComponent,
    CarouselHomePageComponent,
    HeaderHomePageComponent,
    ClientsCarouselComponent,
    IOTCarouselComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
