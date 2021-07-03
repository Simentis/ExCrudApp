import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryPostService } from '../services/library-post.service';
import { LibraryPost } from '../models/librarypost';

@Component({
  selector: 'app-library-post-add-edit',
  templateUrl: './library-post-add-edit.component.html',
  styleUrls: ['./library-post-add-edit.component.scss']
})
export class LibraryPostAddEditComponent implements OnInit {
  form: FormGroup;
  actionType: string;
  formTitle: string;
  formAdress: string;
  libId!: number;
  errorMessage: any;
  existingLibraryPost!: LibraryPost;

  constructor(private libraryPostService: LibraryPostService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formAdress = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.libId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        libId: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.libId > 0) {
      this.actionType = 'Edit';
      this.libraryPostService.getLibraryPost(this.libId)
        .subscribe(data => (
          this.existingLibraryPost = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formAdress].setValue(data.owner)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let libraryPost: LibraryPost = {
        title: this.form.get(this.formTitle).value,
        owner: this.form.get(this.formAdress).value
      };

      this.libraryPostService.saveLibraryPost(libraryPost)
        .subscribe((data) => {
          this.router.navigate(['/library/']);
        });
    }

    if (this.actionType === 'Edit') {
      let libraryPost: LibraryPost = {
        libId: this.existingLibraryPost.libId,
        title: this.form.get(this.formTitle).value,
        owner: this.form.get(this.formAdress).value
      };
      this.libraryPostService.updateLibraryPost(libraryPost.libId, libraryPost)
        .subscribe((data) => {
          this.router.navigate([this.router.url]);
          this.router.navigate(['/library/']);
        });
    }
  }

  cancel() {
     this.router.navigate(['/library/']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formAdress); }
}