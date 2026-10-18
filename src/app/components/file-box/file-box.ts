import { DecimalPipe } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';

@Component({
  imports: [DecimalPipe],
  selector: 'file-box',
  styleUrl: './file-box.css',
  templateUrl: './file-box.html',
})
export class FileBox {

  fileName = input<string>('');
  fileSize = input<number|null>(0);
  fileNameOutput = output<string>();


  onDeleteFile(){
    this.fileNameOutput.emit(this.fileName());
  }

}
