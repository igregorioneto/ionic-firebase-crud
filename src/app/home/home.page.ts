/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../shared/appointment.service';
import { Appointment } from '../shared/Appointment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Bookings = [];
  constructor(
    private aptService: AppointmentService,
  ) {}

  ngOnInit(): void {
    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Appointment);
      });
    });
  }

  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res);
    });
  }

  deleteBooking(id: string) {
    console.log(id);
    if (window.confirm('Do you really want to delete?')) {
      this.aptService.deleteBooking(id);
    }
  }

}
