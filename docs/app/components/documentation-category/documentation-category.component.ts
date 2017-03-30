import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from '../../interfaces/ICategory';

@Component({
    selector: 'uxd-documentation-category',
    templateUrl: './documentation-category.component.html'
})
export class DocumentationCategoryComponent implements OnInit {

    private category: ICategory;
    
    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        // Fetch category details from the route metadata
        this.category = this.activatedRoute.snapshot.data['category'];
    }
}