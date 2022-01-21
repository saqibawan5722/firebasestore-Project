import { Component, OnInit } from '@angular/core';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { FirebaseTSStorage} from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-createpost',
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatepostComponent implements OnInit {
 
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  
  selectedImageFile : File;
  constructor(private dialog : MatDialogRef<CreatepostComponent> ) { }

  ngOnInit(): void {
  }


  onPhotoSelected(photoSelector: HTMLInputElement) {
    this.selectedImageFile = photoSelector.files[0];
    if(!this.selectedImageFile) return;
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);
    fileReader.addEventListener(
      "loadend",
      ev => {
        let readableString = fileReader.result.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
        postPreviewImage.src = readableString;
      }
    );
  }



//  this for backend dataa send

  onPostClick(commentInput : HTMLTextAreaElement){
     let comment = commentInput.value;
     if(comment.length >= 0)
     if(this.selectedImageFile){
       this.uploadPostImg(comment);
     }else{
       this.uploadPost(comment);
     }
    
  }


  uploadPostImg(comment : string){

    let postId = this.firestore.genDocId();
    this.storage.upload({
     uploadName : "upload Image Post",
     path : ["Posts" , postId , "image"],
     data : {
       data : this.selectedImageFile,
     },
     onComplete: (downloadUrl) => {
      // alert(downloadUrl);
      this.firestore.create(
        {
          path: ['Posts'],
          data: {
            comment : comment,
            creatorId : this.auth.getAuth().currentUser.uid,
            imageUrl: downloadUrl,
            timestamp: FirebaseTSApp.getFirestoreTimestamp(),
          },
          onComplete: (docId) => {
            this.dialog.close();
          }
        });
      
     }
    });
  }


  uploadPost(comment:string){
 
     this.firestore.create(
       {
         path: ['Posts'],
         data: {
           comment : comment,
           creatorId : this.auth.getAuth().currentUser.uid,
           timestamp: FirebaseTSApp.getFirestoreTimestamp(),
         },
         onComplete: (docId) => {
           this.dialog.close();
         }
       });
  }

}
