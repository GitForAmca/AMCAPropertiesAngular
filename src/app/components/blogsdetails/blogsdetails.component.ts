import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Blogs } from '../../model/class/Blogs';
import { IBlogs } from '../../model/interface/IBlogs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BlogsService } from '../../service/blogs.service';
import { SkeletonloaderComponent } from '../../reusableComponent/skeletonloader/skeletonloader.component';
import { BlogssidebarComponent } from '../blogssidebar/blogssidebar.component';

@Component({
  selector: 'app-blogsdetails',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SkeletonloaderComponent,
    BlogssidebarComponent,
    RouterLink,
  ],
  templateUrl: './blogsdetails.component.html',
  styleUrl: './blogsdetails.component.scss',
})
export class BlogsdetailsComponent {
  constructor(
    private route: ActivatedRoute,
    private blogsservice: BlogsService,
    private routerblogs: Router
  ) {}

  IsLoaded = true;
  IsShowImage = false;
  blogId!: number;
  blogTitle?: string;
  blogDate?: string;
  blogImage?: string;
  blogDescription?: string;
  blogURL?: string;

  blogsobj: Blogs = new Blogs();
  lastestblogsobj: Blogs = new Blogs();
  blogsInterface: IBlogs[] = [];
  lastestBlogInterface: IBlogs[] = [];
  singleBlog?: IBlogs;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const blogURL = params['blogURL'];
      if (blogURL) {
        this.blogURL = blogURL;
        this.blogsobj.blogURL = blogURL;
        this.getBlogsDetails();
      } else {
        // Handle missing blogURL case, e.g., redirect or show error
        console.error('No blogURL param found!');
        this.routerblogs.navigate(['/blogs']); // or wherever you want to redirect
      }
    });
  }
  getBlogsDetails() {
    this.blogsservice.GetBlogs(this.blogsobj).subscribe((result: any) => {
      this.blogsInterface = result;
      // Find the blog matching the current blogURL
      this.singleBlog = this.blogsInterface.find(
        (blog) => blog.blogURL === this.blogsobj.blogURL
      );

      this.IsLoaded = false;
      this.IsShowImage = true;
    });
  }
}
