import { Component, inject, OnInit, signal } from '@angular/core';
import { Artigos } from '../../core/services/artigos';
import { ArtigoModel } from '../../core/models/artigoModel';
import { Evento } from '../../shared/evento/evento';

@Component({
  selector: 'app-vitrine',
  imports: [Evento],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit {

  private readonly artigoService = inject(Artigos)

  artigos = signal<ArtigoModel[]>([]);

  ngOnInit(): void {
    this.artigoService.getAll().subscribe((res) => {
      this.artigos.set(res)
      console.log(res)
    })
  }

}
