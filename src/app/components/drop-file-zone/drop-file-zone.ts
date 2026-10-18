import { Component, ElementRef, output, signal, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'drop-file-zone',
  styleUrl: './drop-file-zone.css',
  templateUrl: './drop-file-zone.html',
})
export class DropFileZone {
  private fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  //files = signal<File[]>([]);

  isDragging = signal<boolean>(false);

  filesSelected = output<File[]>();

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {

  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFiles(Array.from(files));
    }
  }

  openFileSelector() {
    this.fileInput().nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFiles(Array.from(input.files));
    }
  }

  private handleFiles(newFiles: File[]) {
    const pdfs = newFiles.filter(
      f => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf') && f.size <= 5 * 1024 * 1024
    );

    this.filesSelected.emit(pdfs);
  }
  
}
