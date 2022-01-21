import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatepostComponent } from '../createpost/createpost.component';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-postfeed',
  templateUrl: './postfeed.component.html',
  styleUrls: ['./postfeed.component.scss']
})
export class PostfeedComponent implements OnInit {

  posts: PostData [] = [];
  firestore = new FirebaseTSFirestore();
  constructor( private dialog:MatDialog ,) { }

  ngOnInit(): void {
    this.getPosts();
  }

  
  onCreatePostClick(){
   this.dialog.open(CreatepostComponent);
  }


  getPosts(){
    this.firestore.getCollection(
      {
        path: ["Posts"],
        where: [
          new OrderBy("timestamp", "desc"),
          new Limit(10)
        ],
        onComplete: (result) => {
          result.docs.forEach(
            doc => {
              let post = <PostData>doc.data();
              post.postId = doc.id;
              this.posts.push(post);
            }
          );
        },
        onFail: err => {

        }
      }
    );
  }
}


export interface PostData{
  comment: string;
  creatorId: string;
  imageUrl?: string;
  postId: string;
}