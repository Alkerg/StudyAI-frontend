import { Component, inject, signal } from '@angular/core';
import { DropFileZone } from '../../components/drop-file-zone/drop-file-zone';
import { StudyAIService, Summary } from '../../services/studyai.service';
import { FileBox } from '../../components/file-box/file-box';
import { finalize } from 'rxjs';
import { MarkdownComponent } from 'ngx-markdown';
import { HealthChecker } from '../../components/health-checker/health-checker';

@Component({
  imports: [DropFileZone, FileBox, MarkdownComponent, HealthChecker],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePage {

  studyAIService = inject(StudyAIService);

  filesUploaded = signal<File[]>([]);
  summaries = signal<Summary[]>([]);
  loadingData = signal<boolean>(false);
  summarizeReady = signal<boolean>(false);

  onFilesSelected(files: File[]) {
    // Filtrar por archivos unicos
    const uniqueFiles = files.filter(file => !this.filesUploaded().some(f => f.name === file.name));
    // Agregar los archivos unicos a la lista de archivos subidos
    this.filesUploaded.set([...this.filesUploaded(), ...uniqueFiles]);
  }

  deleteFileAndSummary(fileName: string){
    this.filesUploaded.set(this.filesUploaded().filter(file => file.name !== fileName));
    this.summaries.set(this.summaries().filter(item => item.fileName !== fileName));
  }


  sendFilesToSummarize(files: File[]){
    this.loadingData.set(true);
    this.summarizeReady.set(false);

    this.studyAIService.getSummaries(files)
    .pipe(finalize(() => {
      this.loadingData.set(false);
      this.summarizeReady.set(true);
    }))
    .subscribe({
      next: (response) => {
        this.summaries.set(response);
        console.log('Summaries received:', response);
      },
      error: (error) => {
        console.error('Error fetching summaries:', error);
      }
    });
  }




}
