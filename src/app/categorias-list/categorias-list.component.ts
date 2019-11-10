import { Component, OnInit, Inject } from '@angular/core';
import { Categoria } from "../domain/Categoria";
import { CategoriasService } from "../services/categoria.service";
import { Http } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent implements OnInit {
  listado_categorias: Categoria[]
  cargando: boolean = false

  constructor(private categoriaService: CategoriasService, private http: Http, public dialog: MatDialog) {
  }

  async ngOnInit() {
    try {
      await this.fetchListadoCategorias()
    } catch (error) {
      console.log(error) // mostrar errores
    }
  }

  async fetchListadoCategorias() {
    this.cargando = true
    this.listado_categorias = await this.categoriaService.solicitarListadoCategorias()
    this.cargando = false
  }

  async crearCategoria() {
    this.openDialog(new Categoria(), "Crear", CategoriasDetailComponent)
  }

  async editarCategoria(categoria: Categoria) {
    this.openDialog(Object.assign(new Categoria(), categoria), "Editar", CategoriasDetailComponent)
  }

  async eliminarCategoria(categoria: Categoria) {
    this.openDialog(categoria, "Eliminar", CategoriaDeleteConfirmComponent)
  }

  openDialog(categoria: Categoria, titulo: String, component: any): void {
    const dialogRef = this.dialog.open(component, {
      width: '25rem',
      data: { categoria: categoria, titulo: titulo },
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result) {
        try {
          await this.fetchListadoCategorias()
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

  nombreValidator: FormControl = new FormControl('', [Validators.required]);
  descripcionValidator: FormControl = new FormControl('', [Validators.required]);
  isCreate: Boolean

  //Guardo las validaciones en un array para no complicarme la vida
  validaciones: FormControl[] = [
    this.nombreValidator,
    this.descripcionValidator
  ]

  get errorMsgNombre() {
    return this.nombreValidator.hasError('required') ? "Debe ingresar nombre" : ''
  }

  get errorMsgDescripcion() {
    return this.descripcionValidator.hasError('required') ? "Debe ingresar descripcion" : ''
  }

  constructor(
    private categoriaService: CategoriasService,
    public dialogRef: MatDialogRef<CategoriasDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (!data.categoria.nombre && !data.categoria.descripcion) {
      this.isCreate = true
    } else {
      this.isCreate = false
    }
  }

  get categoria() {
    return this.data.categoria
  }

  get titulo() {
    return this.data.titulo
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async aceptar() {
    try {
      if (this.isCreate) {
        await this.categoriaService.crearCategoria(this.categoria)
      } else {
        await this.categoriaService.actualizarCategoria(this.categoria)
      }
      this.dialogRef.close("true")
    } catch (error) {
      console.log(error) //mostrar errores
    }
  }

  noCompletoFormulario() {
    return !this.categoria.nombre || !this.categoria.descripcion
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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get categoria() {
    return this.data.categoria
  }

  async eliminar() {
    try {
      await this.categoriaService.eliminar(this.categoria)
      this.dialogRef.close("true")
    } catch (error) {
      console.log(error) //mostrar errores
    }
  }

}

