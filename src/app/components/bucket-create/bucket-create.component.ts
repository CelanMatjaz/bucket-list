import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewBucket, Location } from '../../types';
import { HttpClientModule } from '@angular/common/http';
import { FetchService } from '../../services/fetch.service';

@Component({
  selector: 'app-bucket-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './bucket-create.component.html',
  styleUrl: './bucket-create.component.scss'
})
export class BucketCreateComponent implements OnInit {
  @Output("createBucket") createBucket = new EventEmitter<NewBucket>();

  bucketLocations: Location[] = [
  ]

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private fetchService: FetchService) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      location: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    this.fetchLocations();
  }

  fetchLocations() {
    this.fetchService.fetchLocations().subscribe(res => {
      this.bucketLocations = res;
    })
  }

  submit() {
    if (!this.formGroup.valid) {
      return;
    }

    if (this.createBucket) {
      const { name, location } = this.formGroup.value;
      this.createBucket.emit({ name, location, files: [] });
      this.formGroup.reset();
    }
  }
}
