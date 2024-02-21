import { Component, OnInit } from '@angular/core';
import { FetchService } from '../../services/fetch.service';
import { Bucket } from '../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-bucket-details',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './bucket-details.component.html',
  styleUrl: './bucket-details.component.scss'
})
export class BucketDetailsComponent implements OnInit {
  bucket: Bucket | undefined;
  selectedTab: "files" | "details" = "files";
  isModalShown = {
    file: false,
    bucket: false
  }
  selectedFileIndex = -1;

  constructor(private fetchService: FetchService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get("id");
      this.fetchBucket(id!);
    });
  }

  fetchBucket(id: string) {
    this.fetchService.fetchBucket(id).subscribe(res => {
      this.bucket = res;
    });
  }

  deleteBucket() {
    if (!this.bucket) {
      return;
    }

    this.fetchService.deleteBucket(this.bucket.id).subscribe(_ => {
      this.closeModal('bucket');
      this.router.navigateByUrl('/');
    });
  }

  uploadObject() {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (ev) => {
      if (input.files && input.files.length > 0 && this.bucket) {
        const file = input.files[0];
        this.bucket.files.push({
          size: file.size,
          name: file.name,
          lastModified: Date.now()
        });

        this.fetchService.updateBucket(this.bucket).subscribe();
      }
    }
    input.click();
  }

  deleteObject() {
    this.bucket?.files.splice(this.selectedFileIndex, 1);

    this.fetchService.updateBucket(this.bucket!).subscribe();

    this.selectedFileIndex = -1;
    this.closeModal("file");
  }

  tableRowClick(index: number) {
    if (this.selectedFileIndex === index) {
      this.selectedFileIndex = -1;
      return;
    }

    this.selectedFileIndex = index;
  }

  showModal(modal: "file" | "bucket") {
    if (modal === "file" && this.selectedFileIndex === -1) {
      return;
    }

    this.isModalShown[modal] = true;
  }

  closeModal(modal: "file" | "bucket") {
    this.isModalShown[modal] = false;
  }

  changeTab(tab: "files" | "details") {
    this.selectedTab = tab;
  }

  getAccumulateFileSizes() {
    const total = (this.bucket?.files || []).reduce((prev, f) => prev + f.size, 0);
    return this.formatSize(total);
  }

  mapDate(timestamp: number) {
    return new Date(timestamp).toLocaleDateString().replaceAll('/', '. ');
  }

  formatSize(value: number) {
    const val = { value, label: 'B' }
    if (value >= tb) {
      val.value = Math.round(value / tb * 100) / 100;
      val.label = 'TB';
    }
    else if (value >= gb) {
      val.value = Math.round(value / gb * 100) / 100;
      val.label = 'GB';
    }
    else if (value >= mb) {
      val.value = Math.round(value / mb * 100) / 100;
      val.label = 'MB';
    }
    else if (value >= kb) {
      val.value = Math.round(value / kb * 100) / 100;
      val.label = 'kB';
    }

    return `${val.value} ${val.label}`;
  }

}

const tb = 1000 ** 4;
const gb = 1000 ** 3;
const mb = 1000 ** 2;
const kb = 1000 ** 1;


