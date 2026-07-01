import { Component, inject, OnInit, signal } from '@angular/core';
import { Artigos } from '../../../core/services/artigos';
import { ArtigoModel } from '../../../core/models/artigoModel';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private readonly eventosService = inject(Artigos)

  eventos = signal<ArtigoModel[]>([])
  isLoading = signal(true) 

  ngOnInit(): void {
    this.loadEventos()
  }

  private loadEventos(): void{
    this.eventosService.getAll(). subscribe({
      next:(data) => {
        this.eventos.set(data);
        this.isLoading.set(false);
      }
    })
  }

  deleteEventos(id: any): void {
    
    if(!confirm("Tem certeza que deseja excluir?" + id)) {
      return
    }

    this.eventosService.delete(id).subscribe({
     next: () => {
      alert("Item deletado com sucesso!");
      this.loadEventos()
      },
      error: (err) => {
        alert(err.error?.error || "Erro ao excluir item.")
      }
    })
  }
}

