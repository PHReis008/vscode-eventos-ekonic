import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Artigos } from '../../../core/services/artigos';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtigoModel } from '../../../core/models/artigoModel';

@Component({
  selector: 'app-evento-form',
  imports: [ReactiveFormsModule],
  templateUrl: './evento-form.html',
  styleUrl: './evento-form.css',
})
export class EventoForm implements OnInit {

  private eventoService = inject(Artigos);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  selectedFile: File | null = null;
  id: any;
  isEditMode = signal(false);
  itemEdit: ArtigoModel[] = [];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)

    if (this.id) {
    this.eventoService.getById(this.id).subscribe({
      next: (res) => {
        this.itemEdit = res;
        
        this.eventosForm.patchValue({
          nome: res.nome,
          data: res.data,
          local: res.local,
          ingressos_restantes: res.ingressos_restantes,
        });
      },
    });
   }
  }


  eventosForm = new FormGroup({
    nome: new FormControl(),
    data: new FormControl(),
    local: new FormControl(),
    ingressos_restantes: new FormControl(),
  })


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null
  }

  onSubmit(): void {
    const formData = new FormData();
    const values = this.eventosForm.value;

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    if(this.selectedFile) {
      formData.append("imagem", this.selectedFile)
    }


    if (this.id) {
      this.eventoService.update(formData, this.id).subscribe({
        next: () => {
          alert('Atualizado com sucesso!');
          this.router.navigate(['/admin/dashboard'])
        },
      });
    } else {
    this.eventoService.create(formData).subscribe({
      next: () => {
        alert("Criado com sucesso!");
        this.router.navigate(['/admin/dashboard'])
      },
      error: () => {
        alert("Foi não 🤷‍♂️");
      },
    });
    }
  }
}
