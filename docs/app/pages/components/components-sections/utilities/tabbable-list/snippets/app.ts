import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    posts: Post[] = [
        {
            title: 'Getting Started with UX Aspects',
            date: chance.date({ year: 2018 }) as Date,
            content: chance.sentence()
        },
        {
            title: 'Ivy: A look at the New Render Engine for Angular',
            date: chance.date({ year: 2018 }) as Date,
            content: chance.sentence()
        },
        {
            title: 'Angular Console — The UI for the Angular CLI',
            date: chance.date({ year: 2018 }) as Date,
            content: chance.sentence()
        },
        {
            title: 'Angular Ngrx DevTools',
            date: chance.date({ year: 2018 }) as Date,
            content: chance.sentence()
        }
    ];
}

export interface Post {
    title: string;
    date: Date;
    content: string;
}