import { Component, inject, signal } from '@angular/core';
import { HealthService } from '../../services/health.service';

@Component({
  imports: [],
  selector: 'health-checker',
  templateUrl: './health-checker.html',
})
export class HealthChecker {

  healthService = inject(HealthService);

  collapsed = signal(false);

  toggle() {
    this.collapsed.update(v => !v);
  }

}
