import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Progress } from 'aws-sdk/lib/request';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import SendData = ManagedUpload.SendData;

@Injectable({
  providedIn: 'root'
})

export class S3Service {

  public uploadListener = new BehaviorSubject<string>(null);
  public progressListener = new BehaviorSubject<Progress>(null);

  constructor() { }

  public upload = (file) => {
    const bucket = new S3(environment.s3Bucket.access);

    const params = {
      Bucket: environment.s3Bucket.name,
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: file.type
    };

    bucket.upload(params).on('httpUploadProgress', (evt: Progress) =>
      this.progressListener.next(evt)
    ).send((err, data: SendData) => {
      if (err) console.log('There was an error uploading your file: ', err);
      else this.uploadListener.next(data.Location);
    });
  }

}
