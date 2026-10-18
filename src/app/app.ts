import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { DropFileZone } from './components/drop-file-zone/drop-file-zone';

@Component({
  imports: [RouterOutlet, Navbar, DropFileZone],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

}
