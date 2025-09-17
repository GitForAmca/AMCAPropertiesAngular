import { Component } from '@angular/core';
import { Blogs } from '../../model/class/Blogs';
import { IBlogs } from '../../model/interface/IBlogs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BlogsService } from '../../service/blogs.service';

@Component({
  selector: 'app-blogssidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogssidebar.component.html',
  styleUrl: './blogssidebar.component.scss'
})
export class BlogssidebarComponent {

  ngOnInit(){
    this.getLatestBlogsDetails();
  }

  constructor(private routerblogs : Router, private blogsservice : BlogsService){}

  lastestblogsobj : Blogs = new Blogs();
  lastestBlogInterface : IBlogs [] = [];

  getLatestBlogsDetails(){
    this.blogsservice.GetBlogs(this.lastestblogsobj).subscribe((result:any) => {
      this.lastestBlogInterface = result;
    })
  }
  
  GoToBlogsPage(blogId : number, blogTitle : string){
    this.routerblogs.navigate([`/blogs/${blogTitle}`, blogId]);
  }
}
