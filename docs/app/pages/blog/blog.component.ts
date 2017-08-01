import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { IBlogPost } from '../../interfaces/IBlogPost';

@Component({
    selector: 'uxd-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class BlogPageComponent { 

    /* 
        We must specify blog posts here
        We cannot in json due to the inability
        to perform dynamic requires. This also
        allows us to convert markdown to html
        at compile time rather than run time.
    */
    posts: IBlogPost[];

    constructor(private domSanitizer: DomSanitizer) {

        this.posts = [{
            title: 'Angular Productivity',
            author: 'Ashley Hunter',
            category: 'Technical',
            datestamp: 'May 25th',
            content: require('./posts/2017-05-25-Angular-Productivity.md')
        },
        {
            title: 'Bundle Optimization',
            author: 'Ashley Hunter',
            category: 'Technical',
            datestamp: 'May 25th',
            content: require('./posts/2017-05-25-Bundle-Optimization.md')
        },
        {
            title: 'Custom Validation Functions',
            author: 'Gavin Neeson',
            category: 'Technical',
            datestamp: 'Jan 27th',
            content: require('./posts/2017-01-27-Custom-Validation-Functions.md')
        },
        {
            title: 'UX Aspects Components - a tidy UX design',
            author: 'Gavin Neeson',
            category: 'Technical',
            datestamp: 'Oct 10th',
            content: require('./posts/2016-10-10-Why-use-UX-Aspects.md')
        },
        {
            title: 'Angular Performance Tips',
            author: 'Ashley Hunter',
            category: 'Technical',
            datestamp: 'Oct 10th',
            content: require('./posts/2016-10-10-11-Angular-Performance.md')
        },
        {
            title: 'Power of UX Aspects',
            author: ' Gita Narasimhan',
            category: 'Technical',
            datestamp: 'Oct 9th',
            content: require('./posts/2016-10-09-Power-of-UX-Aspects-Blog.md')
        }];

        // santize blog posts
        this.posts.forEach(post => {
            post.content = domSanitizer.bypassSecurityTrustHtml(post.content) as string;
        });
    }

    togglePost(post: IBlogPost, event: Event) {
        post.expanded = !post.expanded;
        event.preventDefault();
    }

}