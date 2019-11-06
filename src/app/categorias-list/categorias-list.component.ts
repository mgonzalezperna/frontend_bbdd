import { Component, OnInit, Inject } from '@angular/core';
import { Categoria } from "../domain/Categoria";
import { CategoriasService } from "../services/categoria.service";
import { Http } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent implements OnInit {
  listado_categorias: Categoria[]

  constructor(private categoriaService: CategoriasService, private http: Http, public dialog: MatDialog) {
  }

  async ngOnInit() {
    try {
      this.listado_categorias = [new Categoria('Rock', 'Genero musical'), new Categoria('Accion', 'Peliculas trepidantes')]
    } catch (error) {
      console.log(error) // mostrar errores
    }
  }

  async crearCategoria() {
    this.openDialog(new Categoria(), CategoriasDetailComponent)
  }

  async editarCategoria(categoria: Categoria) {
    this.openDialog(Object.assign(new Categoria(), categoria), CategoriasDetailComponent)
  }

  async eliminarCategoria(categoria: Categoria) {
    this.openDialog(categoria, CategoriaDeleteConfirmComponent)
  }

  openDialog(categoria: Categoria, component: any): void {
    const dialogRef = this.dialog.open(component, {
      width: '15rem',
      data: categoria
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result) {
        try {
          const respuesta = await this.categoriaService.solicitarListadoCategorias()
          this.listado_categorias = respuesta.data
        } catch (error) {
          console.log(error) //mostrar errores
        }
      }
    });
  }

}

@Component({
  selector: 'categoria-detail-dialog',
  templateUrl: 'categoria-detail-dialog.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasDetailComponent {

  constructor(
    private categoriaService: CategoriasService,
    public dialogRef: MatDialogRef<CategoriasDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: Categoria) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async aceptar() {
    try {
      await this.categoriaService.actualizarCategoria(this.categoria)
    } catch (error) {
      console.log(error) //mostrar errores
    }
  }

}
@Component({
  selector: 'categoria-delete-confirm',
  templateUrl: 'categoria-delete-confirm.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriaDeleteConfirmComponent {

  constructor(
    private categoriaService: CategoriasService,
    public dialogRef: MatDialogRef<CategoriaDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: Categoria) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async eliminar() {
    try {
      await this.categoriaService.eliminar(this.categoria)
    } catch (error) {
      console.log(error) //mostrar errores
    }
  }

}

