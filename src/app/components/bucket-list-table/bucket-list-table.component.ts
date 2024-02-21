import { Component, OnInit } from '@angular/core';
import { Bucket, NewBucket } from '../../types';
import { CommonModule } from '@angular/common';
import { BucketCreateComponent } from '../bucket-create/bucket-create.component';
import { FetchService } from '../../services/fetch.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-bucket-list-table',
  standalone: true,
  imports: [CommonModule, BucketCreateComponent, HttpClientModule, RouterModule],
  templateUrl: './bucket-list-table.component.html',
  styleUrl: './bucket-list-table.component.scss'
})
export class BucketListTableComponent implements OnInit {
  buckets: Bucket[] = [];
  isCreatingNewBucket = false;

  constructor(private fetchService: FetchService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchBuckets();
  }

  fetchBuckets() {
    this.fetchService.fetchBuckets().subscribe(res => {
      this.buckets = res;
    })
  }

  showCreateBucketComponent() {
    this.isCreatingNewBucket = true;
  }

  createBucket(bucket: NewBucket) {
    if (this.buckets.find(b => b.name == bucket.name)) {
      return;
    }

    this.fetchService.createBucket(bucket).subscribe(_ => {
      this.fetchBuckets();
    })
    this.isCreatingNewBucket = false;
  }
}
