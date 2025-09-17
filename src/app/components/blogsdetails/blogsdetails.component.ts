import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blogs } from '../../model/class/Blogs';
import { IBlogs } from '../../model/interface/IBlogs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../service/blogs.service';
import { SkeletonloaderComponent } from "../../reusableComponent/skeletonloader/skeletonloader.component";
import { BlogssidebarComponent } from "../blogssidebar/blogssidebar.component";

@Component({
  selector: 'app-blogsdetails',
  standalone: true,
  imports: [FormsModule, CommonModule, SkeletonloaderComponent, BlogssidebarComponent],
  templateUrl: './blogsdetails.component.html',
  styleUrl: './blogsdetails.component.scss'
})
export class BlogsdetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private blogsservice : BlogsService,
    private routerblogs : Router
  ) {}

  IsLoaded = true;
  IsShowImage = false;
  blogId!: number;
  blogTitle? : string;
  blogDate? : string;
  blogImage? : string;
  blogDescription? : string;

  
  blogsobj : Blogs = new Blogs();
  lastestblogsobj : Blogs = new Blogs();
  blogsInterface : IBlogs [] = [];
  lastestBlogInterface : IBlogs [] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      debugger
      this.blogId = +params['blogId'];
      this.blogsobj.autoId = this.blogId;
      this.getBlogsDetails();
    });
  }

  getBlogsDetails(){
    this.blogsservice.GetBlogs(this.blogsobj).subscribe((result:any) => {
      this.blogsInterface = result;
      this.blogTitle = this.blogsInterface[0].title;
      this.blogDate = this.blogsInterface[0].createdOn;
      this.blogImage = this.blogsInterface[0].imagesPath;
      this.blogDescription = this.blogsInterface[0].description;
      this.IsLoaded = false;
      this.IsShowImage = true;
    })
  }
  
}
