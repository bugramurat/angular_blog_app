import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../services/post.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-post-add-edit',
  templateUrl: './post-add-edit.component.html',
  styleUrl: './post-add-edit.component.scss',
})
export class PostAddEditComponent implements OnInit {
  postForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _postService: PostService,
    private _dialogRef: MatDialogRef<PostAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.postForm = this._fb.group({
      desc: '',
      email: '',
      date: new Date().toISOString().substring(0, 10),
    });
  }

  ngOnInit(): void {
    this.postForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.postForm.valid) {
      if (this.data) {
        this._postService
          .updatePost(this.data.id, this.postForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Post updated');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._postService.addPost(this.postForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Post added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
