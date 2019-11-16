import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Categoria } from "../domain/Categoria";
import { CategoriasService } from "../services/categoria.service";
import { Http } from '@angular/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormControl } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-categorias-list',
  templateUrl: './categorias-list.component.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasListComponent implements OnInit {
  categorias: Categoria[]
  cargando: boolean = false
  server_error: String = ""
  displayed_columns: String[] = ['nombre', 'descripcion', 'acciones']
  listado_categorias:MatTableDataSource<Categoria>

  @ViewChild(MatSort) sort: MatSort;

  constructor(private categoriaService: CategoriasService, private http: Http, public dialog: MatDialog) {}

  async ngOnInit() {
    await this.fetchListadoCategorias()
    this.listado_categorias = new MatTableDataSource(this.categorias)
    this.listado_categorias.sort = this.sort;
  }

  async fetchListadoCategorias() {
    this.server_error = ""
    this.cargando = true
    try {
      this.categorias = await this.categoriaService.solicitarListadoCategorias()
    } catch (error) {
      this.server_error = error
      console.log(error) // mostrar errores
    }
    this.cargando = false
  }

  async crearCategoria() {
    this.openDialog(new Categoria(), "Crear", "Crear", CategoriasDetailComponent)
  }

  async editarCategoria(categoria: Categoria) {
    this.openDialog(Object.assign(new Categoria(), categoria), "Editar", "Aplicar", CategoriasDetailComponent)
  }

  async eliminarCategoria(categoria: Categoria) {
    this.openDialog(categoria, "Eliminar", "Eliminar", CategoriaDeleteConfirmComponent)
  }

  openDialog(categoria: Categoria, titulo: String, submitButtonText: String, component: any): void {
    const dialogRef = this.dialog.open(component, {
      width: '25rem',
      data: { categoria: categoria, titulo: titulo, submitButtonText: submitButtonText },
    });

    dialogRef.afterClosed().subscribe(async result => {
      console.log('The dialog was closed');
      if (result) {
        await this.ngOnInit()

      }
    });
  }

}

const LONGITUD_MAXIMA_NOMBRE_CATEGORIA = 45
const LONGITUD_MAXIMA_DESCRIPCION_CATEGORIA = 45
@Component({
  selector: 'categoria-detail-dialog',
  templateUrl: 'categoria-detail-dialog.html',
  styleUrls: ['./categorias-list.component.css']
})
export class CategoriasDetailComponent {
  nombreValidator: FormControl = new FormControl('', [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_NOMBRE_CATEGORIA)]);
  descripcionValidator: FormControl = new FormControl('', [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_DESCRIPCION_CATEGORIA)]);
  isCreate: Boolean
  server_error: String = ""
  cargando: boolean = false
  categoria: Categoria

  get errorMsgNombre() {
    return this.nombreValidator.hasError('required') ? "Debe ingresar nombre" : this.errorMsgNombreMaxLength
  }

  get errorMsgNombreMaxLength() {
    return this.nombreValidator.hasError('maxlength') ? `Supera máximo permitido: ${LONGITUD_MAXIMA_NOMBRE_CATEGORIA} caracteres` : ''
  }

  get errorMsgDescripcion() {
    return this.descripcionValidator.hasError('required') ? "Debe ingresar descripcion" : this.errorMsgDescripcionMaxLength
  }

  get errorMsgDescripcionMaxLength() {
    return this.descripcionValidator.hasError('maxlength') ? `Supera máximo permitido: ${LONGITUD_MAXIMA_DESCRIPCION_CATEGORIA} caracteres` : ''
  }

  constructor(
    private categoriaService: CategoriasService,
    public dialogRef: MatDialogRef<CategoriasDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.categoria = Object.assign(new Categoria(), this.data.categoria)
    if (!data.categoria.nombre && !data.categoria.descripcion) {
      this.isCreate = true
    } else {
      this.isCreate = false
    }
  }

  get titulo() {
    return this.data.titulo
  }

  get submitButtonText() {
    return this.data.submitButtonText
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

  get hayErrores() {
    return this.nombreValidator.errors !== null || this.descripcionValidator.errors !== null
  }

  cantSubmit() {
    return this.hayErrores || (this.categoria.nombre == this.data.categoria.nombre && this.categoria.descripcion == this.data.categoria.descripcion)
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

