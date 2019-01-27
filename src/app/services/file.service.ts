import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { file } from '../modelos/File';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FileService {
  uploadURL: Observable<string>
  task: AngularFireUploadTask;
  emitUrlPhoto: EventEmitter<any> = new EventEmitter();
  uploadProgress: Observable<number>
  constructor(private storage: AngularFireStorage) { }
  uploadFile(file: File, binder: string): Observable<file> {
    return Observable.create(Observer => {
      let path = `${binder}/${new Date().getTime()}_${file.name}`
      const fileRef = this.storage.ref(path);
      const task = fileRef.put(file).then((result) => {
        fileRef.getDownloadURL().subscribe(url => {
          let fileReturn: file = { name: file.name, url: url, id: path }

          Observer.next(fileReturn)
          Observer.complete()
        })
      })
    })

  }
}