import { Routes } from '@angular/router';
import { BucketListTableComponent } from './components/bucket-list-table/bucket-list-table.component';
import { BucketDetailsComponent } from './components/bucket-details/bucket-details.component';

export const routes: Routes = [
    {
        path: '',
        component: BucketListTableComponent,
    },
    {
        path: 'buckets/:id',
        component: BucketDetailsComponent,
    }
];
