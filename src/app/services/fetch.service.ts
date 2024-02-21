import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bucket, NewBucket, Location } from '../types';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  url = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  fetchLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(`${this.url}/locations`);
  }

  fetchBuckets(): Observable<Bucket[]> {
    return this.httpClient.get<Bucket[]>(`${this.url}/buckets`);
  }

  fetchBucket(id: string): Observable<Bucket> {
    return this.httpClient.get<Bucket>(`${this.url}/buckets/${id}`);
  }

  createBucket(bucket: NewBucket): Observable<Bucket> {
    return this.httpClient.post<Bucket>(`${this.url}/buckets`, JSON.stringify(bucket));
  }

  updateBucket(bucket: Bucket) {
    return this.httpClient.put(`${this.url}/buckets/${bucket.id}`, JSON.stringify(bucket));
  }

  deleteBucket(id: string): Observable<Bucket> {
    return this.httpClient.delete<Bucket>(`${this.url}/buckets/${id}`);
  }

}
