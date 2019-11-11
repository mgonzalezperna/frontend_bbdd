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
  server_error: String = ""

  constructor(private categoriaService: CategoriasService, private http: Http, public dialog: MatDialog) {
  }

  async ngOnInit() {
    await this.fetchListadoCategorias()
  }

  async fetchListadoCategorias() {
    this.server_error = ""
    this.cargando = true
    try {
      this.listado_categorias = await this.categoriaService.solicitarListadoCategorias()
    } catch (error) {
      this.server_error = error
      console.log(error) // mostrar errores
    }
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
        await this.fetchListadoCategorias()
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
  server_error: String = ""
  cargando: boolean = false

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
    this.server_error = ""
    this.cargando = true
    try {
      if (this.isCreate) {
        await this.categoriaService.crearCategoria(this.categoria)
      } else {
        await this.categoriaService.actualizarCategoria(this.categoria)
      }
      this.dialogRef.close("true")
    } catch (error) {
      this.server_error = error
      console.log(error) //mostrar errores
    }
    this.cargando = false
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

  server_error: String = ""
  cargando: boolean = false

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
    this.server_error = ""
    this.cargando = true
    try {
      await this.categoriaService.eliminar(this.categoria)
      this.dialogRef.close("true")
    } catch (error) {
      this.server_error = error
      console.log(error) //mostrar errores
    }
    this.cargando = false
  }

}

