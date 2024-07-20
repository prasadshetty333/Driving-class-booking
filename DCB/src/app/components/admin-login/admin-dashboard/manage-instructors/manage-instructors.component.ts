import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';

interface instructorType { 
  name: string ; 
  photo: string ; 
  availableDates: string[] ; 
  availableTimes: string[] ; 
  wheelerType: string[] ; 
  description: string ;
}

@Component({
  selector: 'app-manage-instructors',
  templateUrl: './manage-instructors.component.html',
  styleUrls: ['./manage-instructors.component.css']
})
export class ManageInstructorsComponent implements OnInit {
  instructors: any[] = [];
  defaultInstructorValue = { name: '', photo: '', availableDates: [] , availableTimes: [], wheelerType: [], description: '' }
  newInstructor : instructorType = this.defaultInstructorValue;
  options: 'Add' | 'Update' | 'View' = 'Add';
  dateInput : string = '';
  timeInput : string = "";
  wheelerInput : string = "";


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadInstructors();
  }

  loadInstructors() {
    this.adminService.getInstructors().subscribe(data => {
      this.instructors = data;
    });
  }

  // addInstructor() {
  //   // Log the data to be sent
  //   console.log('Adding instructor with data:', this.newInstructor);

  //   this.adminService.addInstructor({
  //     ...this.newInstructor,
  //     availableDates: this.newInstructor.availableDates.split(',').map(date => date.trim()),
  //     availableTimes: this.newInstructor.availableTimes.split(',').map(time => time.trim()),
  //     wheelerType: this.newInstructor.wheelerType.split(',').map(type => type.trim())
  //   }).subscribe(() => {
  //     this.loadInstructors();
  //     this.newInstructor = { name: '', photo: '', availableDates: '', availableTimes: '', wheelerType: '', description: '' };
  //   });
  // }


  handleSubmit(){
    if(this.options == 'Add'){
      this.addInstructor();
    }else if(this.options == 'Update'){
      this.updateInstructor(this.newInstructor);
    }
  }

  addInstructor() {
    // Log the data to be sent
    console.log('Adding instructor with data:', this.newInstructor);
    this.adminService.addInstructor({
      ...this.newInstructor,
      availableDates: this.newInstructor.availableDates,
      availableTimes: this.newInstructor.availableTimes,
      wheelerType: this.newInstructor.wheelerType
    }).subscribe(() => {
      this.loadInstructors();
      this.newInstructor = this.defaultInstructorValue;
    });
  }

  updateInstructor(instructor: any) {
    this.adminService.updateInstructor(instructor._id, instructor).subscribe(() => {
      this.loadInstructors();
      this.newInstructor = this.defaultInstructorValue;
    });
  }

  pre_updateInstructor(instructor: any) {
    this.newInstructor = instructor;
    this.options = 'Update';
    window.scrollTo(0, 0);
  }

  pre_viewInstructor(instructor: any) {
    this.newInstructor = instructor
    this.options = 'View';
    window.scrollTo(0, 0);
  }

  deleteInstructor(id: string) {
    if(confirm('Do you want to delete this instructor?')){
      this.adminService.deleteInstructor(id).subscribe(() => {
        this.loadInstructors();
      });
    }
  }

  handleAddDate() {
    if (this.dateInput) {
      if(this.newInstructor.availableDates.findIndex((_)=>(_ == this.dateInput)) < 0){
        this.newInstructor = {
          ...this.newInstructor,
          availableDates: [
            ...this.newInstructor.availableDates,
            this.dateInput
          ]
        }
      }else{
        alert('Date already exists.')
      }
    }else{
      alert('Please select a date.')
    }
  }

  handleAddTime() {
    if (this.timeInput) {
      if(this.newInstructor.availableTimes.findIndex((_)=>(_ == this.timeInput)) < 0){
        this.newInstructor = {
          ...this.newInstructor,
          availableTimes: [
            ...this.newInstructor.availableTimes,
            this.timeInput
          ]
        }
      }else{
        alert('Time slot already exists.')
      }
    }else{
      alert('Please select a Time slot.')
    }
  }

  handleAddWheelerType() {
    if (this.wheelerInput) {
      if(this.newInstructor.wheelerType.findIndex((_)=>(_ == this.wheelerInput)) < 0){
        this.newInstructor = {
          ...this.newInstructor,
          wheelerType: [
            ...this.newInstructor.wheelerType,
            this.wheelerInput
          ]
        }
      }else{
        alert('Wheeler type already exists.')
      }
    }else{
      alert('Please select a Wheeler type.')
    }
  }

  handleDeleteDate(date : string){
    this.newInstructor = {
      ...this.newInstructor,
      availableDates: this.newInstructor.availableDates.filter(_=>(
        _ != date
      ))
    }
  }


  handleDeleteTimeSlot(timeSlot : string){
    this.newInstructor = {
      ...this.newInstructor,
      availableTimes: this.newInstructor.availableTimes.filter(_=>(
        _ != timeSlot
      ))
    }
  }

  handleDeleteWheelerType(wheelerType : string){
    this.newInstructor = {
      ...this.newInstructor,
      wheelerType: this.newInstructor.wheelerType.filter(_=>(
        _ != wheelerType
      ))
    }
  }



}
