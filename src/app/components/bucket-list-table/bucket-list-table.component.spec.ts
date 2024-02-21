import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketListTableComponent } from './bucket-list-table.component';

describe('BucketListTableComponent', () => {
  let component: BucketListTableComponent;
  let fixture: ComponentFixture<BucketListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BucketListTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BucketListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
