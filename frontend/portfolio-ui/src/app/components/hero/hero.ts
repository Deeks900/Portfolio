import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-hero',
  imports: [MatGridListModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
}
