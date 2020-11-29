import {Component, OnInit} from '@angular/core';
import {Estado} from '../../common/models/configuration.model';
import {ConfigurationService} from '../../services/configuration.service';
import {EstadoMapper} from '../../common/mappers/estado.mapper';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SucursalService} from '../../services/sucursal.service';
import {SucursalModel} from '../../common/models/sucursal.model';
import {NGXLogger} from 'ngx-logger';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ColorSnackbarMapper} from '../../common/mappers/color-snackbar.mapper';

declare var $: any;

@Component({
  selector: 'app-destinos',
  templateUrl: './destinos.component.html',
  styleUrls: ['./destinos.component.scss']
})
export class DestinosComponent implements OnInit {
  idEstado: any;
  estados: Estado[];
  private estadosMap: Map<number, Estado>;
  jsonDoc: string;
  configMenu = {
    placeholder: 'Notificación',
    tabsize: 2,
    height: '150px',
    toolbar: [
      ['style', ['style', 'bold', 'italic', 'underline', 'underline', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontname', 'fontsize']],
      ['para', ['ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'link', 'hr']],
      ['tag', ['sucursalBtn', 'rastreoBtn', 'descriptionBtn', 'pesoBtn', 'precioBtn']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times'],
    buttons: {
      sucursalBtn: this.customButton('Sucursal', '##SUCURSAL##'),
      rastreoBtn: this.customButton('Track', '##RASTREO##'),
      descriptionBtn: this.customButton('Descripción', '##DESCRIPCION##'),
      pesoBtn: this.customButton('Peso', '##PESO##'),
      precioBtn: this.customButton('Precio', '##PRECIO##')
    }
  };
  sucursales: Array<SucursalModel>;
  i: number = null;
  form: FormGroup;

  constructor(
    public config: ConfigurationService,
    public estadoMapper: EstadoMapper,
    public sucursalService: SucursalService,
    public logger: NGXLogger,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private colorSnackbarMapper: ColorSnackbarMapper
  ) {
    this.sucursalService.getSucursales().then(response => {
      this.sucursales = response.body;
      this.i = 0;
      this.setSucursal();
    }).catch(error => {
      this.logger.error(error);
    });
    this.form = this.fb.group({
      name: [null, [Validators.required], []],
      idEstado: [null, [Validators.required], []],
      mail: [null, [Validators.email], []],
      isDelivery: [false, [Validators.required], []],
      showClient: [false, [Validators.required], []],
      isFinal: [false, [Validators.required], []],
      notificarLlegada: [false, [Validators.required], []],
      htmlLlegada: [null, [], []],
      notificarFinal: [false, [Validators.required], []],
      htmlFinal: [null, [], []],
    });
  }

  setSucursal(): void{
    this.form.reset();
    if (this.i >= 0 && typeof(this.i) === 'number'){
      const s: SucursalModel = this.sucursales[this.i];
      this.logger.debug(`Sucursal ${s.nombre} seleccionada`);
      this.logger.debug(JSON.stringify(s));
      this.form.controls['name'].setValue(s.nombre);
      this.form.controls['idEstado'].setValue(s.idEstadoDefecto);
      this.form.controls['mail'].setValue(s.mailDelivery);
      this.form.controls['isDelivery'].setValue(s.isDelivery);
      this.form.controls['showClient'].setValue(s.rastreable);
      this.form.controls['isFinal'].setValue(s.isFinal === 1);
      this.form.controls['notificarLlegada'].setValue(s.notificableLlegada === 1);
      this.form.controls['htmlLlegada'].setValue(s.mensajeAlCliente);
      this.form.controls['notificarFinal'].setValue(s.notificableFinal === 1);
      this.form.controls['htmlFinal'].setValue(s.mensajeAlClienteFinal);
    }else{
      this.logger.debug(`Nueva sucursal`);
      this.form.controls['notificarLlegada'].setValue(false);
      this.form.controls['notificarFinal'].setValue(false);
      this.form.controls['isDelivery'].setValue(false);
      this.form.controls['showClient'].setValue(false);
      this.form.controls['isFinal'].setValue(false);
    }

  }

  ngOnInit(): void {
    this.config.config.asObservable().subscribe(c => {
      this.estados = c.estados;
      this.estadosMap = this.estadoMapper.estadosMap;
    });
  }

  gotoDestino(_i: number): void {
    this.i = _i;
    this.setSucursal();
  }

  customButton(title: string, tag: string): (context: any) => any {
    return (context) => {
      const ui = $.summernote.ui;
      const button = ui.button({
        contents: title,
        container: '.note-editor',
        className: 'note-btn',
        click: () => context.invoke('editor.insertText', tag)
      });
      return button.render();
    };
  }

  save(): void {
    if (this.form.valid) {
      const sucursal = this.newSucursal();
      if (this.i >= 0 && typeof(this.i) === 'number') {
        sucursal.idSucursal = this.sucursales[this.i].idSucursal;
        this.sucursalService.edit(sucursal).then(response => {
          this.sucursales[this.i] = response.body;
        }).catch(error => {
          this.logger.error(error);
        });
      } else {
        this.sucursalService.create(sucursal).then(response => {
          this.sucursales.push(response.body);
          this.i = this.sucursales.length - 1;
          this.setSucursal();
        }).catch(error => {
          this.logger.error(error);
        });
      }
    } else {
      this.snackBar.open('Debe completar los campos', null, {
        duration: 2000,
        panelClass: [this.colorSnackbarMapper.colorMap.get('danger')]
      });
    }
  }

  newSucursal(): SucursalModel {
    const sucursal: SucursalModel = new SucursalModel();
    sucursal.nombre = this.form.get('name').value;
    sucursal.rastreable = this.form.get('showClient').value ? 1 : 0;
    sucursal.idEstadoDefecto = this.form.get('idEstado').value;
    sucursal.notificableLlegada = this.form.get('notificarLlegada').value ? 1 : 0;
    sucursal.notificableFinal = this.form.get('notificarFinal').value ? 1 : 0;
    sucursal.mensajeAlCliente = this.form.get('htmlLlegada').value;
    sucursal.mensajeAlClienteFinal = this.form.get('htmlFinal').value;
    sucursal.isFinal = this.form.get('isFinal').value ? 1 : 0;
    sucursal.isDelivery = this.form.get('isDelivery').value ? 1 : 0;
    sucursal.mailDelivery = this.form.get('mail').value;
    this.logger.debug(JSON.stringify(sucursal));
    return sucursal;
  }

}
