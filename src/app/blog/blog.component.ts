import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, inject } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  HttpClient = inject(HttpClient);
  data: any[] = [];

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList() {
    this._postService.getPostList().subscribe((data: any) => {
      this.data = data;
    });
  }
}
