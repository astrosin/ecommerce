import { Component, OnInit } from '@angular/core';
import { UploadingService } from  '../uploading.service';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthServiceService} from '../auth-service.service'

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.page.html',
  styleUrls: ['./fileupload.page.scss'],
})

export class FileuploadPage implements OnInit {
  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;
  public validations_form: FormGroup;
  data;
  constructor(private uploadingService: UploadingService,public formBuilder: FormBuilder,public authenticationService:AuthServiceService) {
    this.validations_form = this.formBuilder.group({
      description:new FormControl('',Validators.compose([
        Validators.required
      ])),
    });

   }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.authenticationService.user().subscribe(res=>{
      this.data=JSON.stringify(res);
    })
}
  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }
  
  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }
  
  uploadFiles(data) {
    let files = this.getFiles();
    let requests = [];

    files.forEach((file) => {
      let formData = new FormData();
      formData.append('one_file' , file.rawFile, file.name);
      formData.append('description',data.description);
      requests.push(this.uploadingService.uploadFormData(formData));
    });

    concat(...requests).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }
}
