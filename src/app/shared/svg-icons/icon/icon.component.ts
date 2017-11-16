import { Component, ElementRef, Inject, InjectionToken, Input, OnInit, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const HOST_CONFIG = new InjectionToken<any>('HOST_CONFIG');

@Component({
    selector: 'app-ifs-icon',
    template: ' ',
    styleUrls: ['./icon.component.css']
})
export class IconComponent implements OnInit {
    @Input() icon: string;
    @Input() size: string;
    @Input() color: string;

    constructor(private viewContainerRef: ViewContainerRef,
                private svgRef: ElementRef,
                private http: HttpClient,
                @Inject(HOST_CONFIG) private config: any) {
    }

    render(svgString: string) {
        this.svgRef.nativeElement.innerHTML = svgString;
        const svg = this.svgRef.nativeElement.querySelector('svg');
        const polygons = this.svgRef.nativeElement.querySelectorAll('polygon');
        svg.setAttribute('height', this.size);
        svg.setAttribute('width', this.size);
        svg.setAttribute('fill', this.color);
        polygons.forEach((pol: any) => pol.setAttribute('fill', this.color));
    }

    ngOnInit() {
        this.viewContainerRef.clear();
        let iconName = this.icon;
        if (!!this.config.caseType) {
            switch (this.config.caseType) {
                case 'u':
                    iconName = this.icon.toUpperCase();
                    break;

                case 'l':
                    iconName = this.icon.toLowerCase();
                    break;

                default:
                    iconName = this.icon;
                    break;
            }

        }
        console.log(iconName);
        this.http.get(`${this.config.basePath}/${iconName}.svg`, {responseType: 'text'})
            .subscribe(this.render.bind(this));
    }
}
