import { NgModule } from '@angular/core';
import {
    MdSelectModule, MdAutocompleteModule, MdButtonModule, MdInputModule, MdCheckboxModule, MdRadioModule,
    MdTooltipModule, MdSlideToggleModule, MdGridListModule, MdCardModule, MdTabsModule, MdToolbarModule, MdListModule,
    MdMenuModule, MdIconModule, MdSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        MdSnackBarModule,
        MdIconModule,
        MdMenuModule,
        MdListModule,
        MdToolbarModule,
        MdTabsModule,
        MdCardModule,
        MdGridListModule,
        MdTooltipModule,
        MdInputModule,
        MdAutocompleteModule,
        MdSelectModule,
        MdButtonModule,
        MdRadioModule,
        MdCheckboxModule,
        MdSlideToggleModule,
    ],
    exports: [
        MdSnackBarModule,
        MdIconModule,
        MdMenuModule,
        MdListModule,
        MdToolbarModule,
        MdTabsModule,
        MdCardModule,
        MdGridListModule,
        MdSlideToggleModule,
        MdTooltipModule,
        MdCheckboxModule,
        MdRadioModule,
        MdInputModule,
        MdAutocompleteModule,
        MdSelectModule,
        MdButtonModule,
    ]
})
export class AngularMaterialModule {
}
