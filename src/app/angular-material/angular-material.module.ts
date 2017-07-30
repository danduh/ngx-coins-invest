import { NgModule } from '@angular/core';
import {
    MdSelectModule, MdAutocompleteModule, MdButtonModule, MdInputModule, MdCheckboxModule, MdRadioModule,
    MdTooltipModule, MdSlideToggleModule, MdGridListModule, MdCardModule, MdTabsModule, MdToolbarModule, MdListModule,
    MdMenuModule, MdIconModule, MdSnackBarModule, MdDialogModule
} from '@angular/material';
import { DialogComponent } from "../components/dialog/dialog.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [DialogComponent],
    imports: [
        CommonModule,
        MdDialogModule,
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
        CommonModule,
        MdDialogModule,
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
        DialogComponent
    ],
    bootstrap: [
        DialogComponent
    ]
})
export class AngularMaterialModule {
}
