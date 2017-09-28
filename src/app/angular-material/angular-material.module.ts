import { NgModule } from '@angular/core';
import {
    MdSelectModule, MdAutocompleteModule, MdButtonModule, MdInputModule, MdCheckboxModule, MdRadioModule,
    MdTooltipModule, MdSlideToggleModule, MdGridListModule, MdCardModule, MdTabsModule, MdToolbarModule, MdListModule,
    MdMenuModule, MdIconModule, MdSnackBarModule, MdDialogModule, MdSidenavModule, MdTableModule,
    MdProgressSpinnerModule
} from '@angular/material';
import { DialogComponent } from "../components/dialog/dialog.component";
import { CommonModule } from "@angular/common";
import { CdkTableModule } from "@angular/cdk/table";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        DialogComponent
    ],
    imports: [
        CommonModule,
        CdkTableModule,
        MdTableModule,
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
        MdSidenavModule,
        MdProgressSpinnerModule,
        FormsModule,
    ],
    exports: [
        CommonModule,
        CdkTableModule,
        MdTableModule,
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
        MdSidenavModule,
        // DialogComponent,
        MdProgressSpinnerModule,
    ],
    // entryComponents: [DialogComponent],
    bootstrap: [
        DialogComponent
    ]
})
export class AngularMaterialModule {
}
