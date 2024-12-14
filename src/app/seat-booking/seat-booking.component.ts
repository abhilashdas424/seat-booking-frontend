import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.css'],
})
export class SeatBookingComponent implements OnInit {
  seats: any[] = [];
  bookedSeats: any[] = [];
  selectedSeats: any[] = [];
  numSeats: number = 1;
  availableSeatsCount: number;
  errorMessage: string;

  constructor() {}

  ngOnInit() {
    this.loadSeats();
  }

  loadSeats() {
    axios
      .get('http://localhost:3000/getAllSeats')
      .then((response) => {
        this.seats = response?.data;
        this.availableSeatsCount = this.seats.filter(
          (seat) => !seat.is_booked
        ).length;
      })
      .catch((error) => {
        console.error('Error fetching seats:', error.response?.data?.message);
      });
  }

  seatRows(seats: any[]) {
    let rows = [];
    const rowSize = 7; // Assume each row has 7 seats
    for (let i = 0; i < seats.length; i += rowSize) {
      rows.push(seats.slice(i, i + rowSize));
    }
    return rows;
  }

  bookSeats() {
    console.log(this.numSeats);
    if (this.numSeats > 7 || this.numSeats < 1) {
      this.errorMessage = 'You can book upto 7 seats. Please select a valid number.';
      setTimeout(() => {
        this.errorMessage = ''; // Clear the error message
      }, 3000);
      return;
    }

    axios
      .post('http://localhost:3000/bookSeats', { numSeats: this.numSeats })
      .then((response) => {
        this.bookedSeats = response?.data?.bookedSeats;
        alert('Seats booked successfully: ' + this.bookedSeats.join(', '));
        this.loadSeats(); // Reload available seats
        this.numSeats = 1;
        setTimeout(() => {
          this.bookedSeats = [];
        }, 5000);
      })
      .catch((error) => {
        console.error('Error booking seats:', error.response.data.message);
        alert('Booking failed');
      });
  }

  resetBooking() {
    axios
      .get('http://localhost:3000/resetBookings')
      .then((response) => {
        this.seats = response?.data;
        this.loadSeats();
        this.numSeats = 1;
        this.bookedSeats = []; // Reload available seats
      })
      .catch((error) => {
        console.error('Error resetting seats:', error.response.data.message);
      });
  }
}
