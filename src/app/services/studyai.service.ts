import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "../../environments/environment";

const API_URL = environment.apiUrl;

interface SummariesResponse {
    [fileName: string]: string;
}

export interface Summary {
  id: string;
  fileName: string;
  summary: string;
}

@Injectable({
    providedIn: 'root'
})
export class StudyAIService {
    private http = inject(HttpClient);
    
    getSummaries(files: File[]) {
        const formData = new FormData();

        for (const file of files) {
            formData.append('Files', file, file.name);
        }

        return this.http.post<SummariesResponse>(`${API_URL}/api/Summaries`, formData).pipe(
            map((response): Summary[] => Object.entries(response).map(([fileName, summary]) => ({
                id: this.generateUniqueId(fileName),
                fileName,
                summary
            })))
        );
    }

    generateUniqueId(fileName: string){
        // Generate unique id with filename and uuid
        const uuid = crypto.randomUUID();
        return `${fileName}-${uuid}`;

    }
}