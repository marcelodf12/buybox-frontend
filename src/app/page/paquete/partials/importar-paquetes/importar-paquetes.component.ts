import { Component, OnInit } from '@angular/core';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import {Producto} from '../../../../interface/producto.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {PaqueteService} from '../../../../services/paquete.service';
import {FileInput} from 'ngx-material-file-input';
import {PaqueteImportModel} from '../../../../common/models/paquete-import.model';

@Component({
  selector: 'app-importar-paquetes',
  templateUrl: './importar-paquetes.component.html',
  styleUrls: ['./importar-paquetes.component.scss']
})
export class ImportarPaquetesComponent implements OnInit {
  dummySource: Producto[];
  displayedColumns: string[];
  faFileExcel: any = faFileExcel;
  archivo: any;
  formArchivo: FormGroup;
  paquetesImportados: PaqueteImportModel[];

  constructor(
    private paqueteService: PaqueteService,
  ) {
    this.formArchivo = new FormGroup({
      file: new FormControl()
    });
    this.displayedColumns = ['orden', 'casilla', 'trackPaquete', 'cliente', 'estadoImportado'];
  }

  ngOnInit(): void {
  }

  subir(): void {
    const fileForm: FileInput = this.formArchivo.get('file').value;
    const file = fileForm.files[0]; // in case user didn't selected multiple files
    const formData = new FormData();
    formData.append('file', file);
    this.paqueteService.uploadFile(formData).subscribe(value => {
        this.paquetesImportados = value.body;
    });
  }
}
