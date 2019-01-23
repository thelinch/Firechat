import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { file } from '../modelos/File';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  uploadURL: Observable<string>
  task: AngularFireUploadTask;
  emitUrlPhoto: EventEmitter<any> = new EventEmitter();
  constructor(private storage: AngularFireStorage) { }
  uploadFile(file: File, binder: string) {
    console.log("lol")
    let path = `${binder}/${new Date().getTime()}_${file.name}`
    const fileRef = this.storage.ref(path);
    const task = fileRef.put(file).then(succes => {
      console.log(succes.downloadURL)
    })
    task.then(s => { console.log(s) })
    this.emitUrlPhoto.emit({ url: "sqs" })
    /* this.storage.upload(path, file).snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(url => {
        console.log(url)
      })
    }))
*/
  }
}
