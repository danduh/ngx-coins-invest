import { NgModule } from '@angular/core';
import {
    MatSelectModule, MatAutocompleteModule, MatButtonModule, MatInputModule, MatCheckboxModule, MatRadioModule,
    MatTooltipModule, MatSlideToggleModule, MatGridListModule, MatCardModule, MatTabsModule, MatToolbarModule, MatListModule,
    MatMenuModule, MatIconModule, MatSnackBarModule, MatDialogModule, MatSidenavModule, MatTableModule,
    MatProgressSpinnerModule, MatExpansionModule, MatProgressBarModule
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
        MatProgressBarModule,
        MatExpansionModule,
        CommonModule,
        CdkTableModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatToolbarModule,
        MatTabsModule,
        MatCardModule,
        MatGridListModule,
        MatTooltipModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        FormsModule,
    ],
    exports: [
        MatProgressBarModule,
        MatExpansionModule,
        CommonModule,
        CdkTableModule,
        MatTableModule,
        MatDialogModule,
        MatSnackBarModule,
        MatIconModule,
        MatMenuModule,
        MatListModule,
        MatToolbarModule,
        MatTabsModule,
        MatCardModule,
        MatGridListModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatButtonModule,
        MatSidenavModule,
        // DialogComponent,
        MatProgressSpinnerModule,
    ],
    // entryComponents: [DialogComponent],
    bootstrap: [
        DialogComponent
    ]
})
export class AngularMaterialModule {
}
