import { Component, input } from '@angular/core';
import { ArtigoModel } from '../../core/models/artigoModel';

@Component({
  selector: 'app-evento',
  imports: [],
  templateUrl: './evento.html',
  styleUrl: './evento.css',
})
export class Evento {
  data = input.required<ArtigoModel>()
}

