import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HOST_CONFIG, IconComponent } from './icon/icon.component';


@NgModule({
    imports: [
        HttpClientModule,
    ],
    declarations: [
        IconComponent,
    ],
    exports: [
        IconComponent,
    ]
})
export class IconsModule {
    static forRoot(config: any): ModuleWithProviders {
        return {
            ngModule: IconsModule,
            providers: [{provide: HOST_CONFIG, useValue: config}]
        };
    }
}
