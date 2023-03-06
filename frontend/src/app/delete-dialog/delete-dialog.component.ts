import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  delete = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string; id: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  async onDelete(): Promise<void> {
    this.delete = true;
    const req = new Request(
      `http://localhost:3000/api/workouts/${this.data.id}`,
      {
        method: 'DELETE',
      }
    );
    const response = await fetch(req);
    if (!response.ok) {
      console.error(`Http error: ${response.body}`);
      return;
    }
    this.dialogRef.close();
  }
}
