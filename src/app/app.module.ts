import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SeatBookingComponent } from './seat-booking/seat-booking.component';

@NgModule({
  declarations: [SeatBookingComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [SeatBookingComponent],
})
export class AppModule {}
