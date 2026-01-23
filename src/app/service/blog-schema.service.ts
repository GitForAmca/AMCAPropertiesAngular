import { Inject, Injectable } from '@angular/core';
import { IBlogs } from '../model/interface/IBlogs';
@Injectable({
  providedIn: 'root',
})
export class BlogSchemaService {
  addBlogSchema(blog: IBlogs) {
    if (!blog) return;
    this.removeBlogSchema();
    const schema: any = {
      '@context': 'https://schema.org',
      '@type': 'blogDetail',
      headline: blog.title?.trim() || 'Untitled Blog',
      description: blog.metaDescription?.trim() || blog.description || '',
      author: {
        '@type': 'Person',
        // name: blog.createdByName?.trim() || 'Admin',
        name: 'AMCA Properties',
      },
      datePublished: blog.createdOn
        ? new Date(blog.createdOn).toISOString()
        : new Date().toISOString(),
      url: blog.blogURL
        ? `https://amcaproperties.com/blogs/${blog.blogURL}`
        : window.location.href,
    };
    if (blog.imagesPath) {
      schema.image = {
        '@type': 'ImageObject',
        url: blog.imagesPath,
      };
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.classList.add('blog-schema');
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  removeBlogSchema() {
    document
      .querySelectorAll('script[type="application/ld+json"].blog-schema')
      .forEach((s) => s.remove());
  }
  addBlogsSchema(blogs: IBlogs[]) {
    if (!blogs || !blogs.length) return;
    this.removeBlogSchema();
    const itemList = {
      '@context': 'https://schema.org',
      '@type': 'blogList',
      itemListElement: blogs.map((blog, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://amcaproperties.com/blogs/${blog.blogURL}`,
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.classList.add('blog-schema');
    script.text = JSON.stringify(itemList);
    document.head.appendChild(script);
  }
}
