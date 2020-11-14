import {Component, OnInit} from '@angular/core';
import {Estado} from '../../common/models/configuration.model';
import {ConfigurationService} from '../../services/configuration.service';
import {EstadoMapper} from '../../common/mappers/estado.mapper';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SucursalService} from '../../services/sucursal.service';
import {SucursalModel} from '../../common/models/sucursal.model';
import {NGXLogger} from 'ngx-logger';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessagesConst} from '../../common/constants';
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
      isDelivery: [null === 1, [Validators.required], []],
      showClient: [null === 1, [Validators.required], []],
      isFinal: [null, [Validators.required], []],
      notificarLlegada: [null, [Validators.required], []],
      htmlLlegada: [null, [], []],
      notificarFinal: [null, [Validators.required], []],
      htmlFinal: [null, [], []],
    });
  }

  setSucursal(): void{
    const s: SucursalModel = this.sucursales[this.i];
    this.logger.debug(`Sucursal ${s.nombre} seleccionada`);
    this.logger.debug(JSON.stringify(s));
    this.form = this.fb.group({
      name: [s.nombre, [Validators.required], []],
      idEstado: [s.idEstadoDefecto, [Validators.required], []],
      mail: [s.mailDelivery, [Validators.email], []],
      isDelivery: [s.isDelivery === 1, [Validators.required], []],
      showClient: [s.rastreable === 1, [Validators.required], []],
      isFinal: [s.isFinal === 1, [Validators.required], []],
      notificarLlegada: [s.notificableLlegada === 1, [Validators.required], []],
      htmlLlegada: [s.mensajeAlCliente, [], []],
      notificarFinal: [s.notificableFinal === 1, [Validators.required], []],
      htmlFinal: [s.mensajeAlClienteFinal, [], []],
    });
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
      const sucursal: SucursalModel = new SucursalModel();
      sucursal.idSucursal = this.sucursales[this.i].idSucursal;
      sucursal.nombre = this.form.get('name').value;
      sucursal.rastreable = this.form.get('showClient').value ? 0 : 1;
      sucursal.idEstadoDefecto = this.form.get('idEstado').value;
      sucursal.notificableLlegada = this.form.get('notificarLlegada').value.value ? 0 : 1;
      sucursal.notificableFinal = this.form.get('notificarFinal').value.value ? 0 : 1;
      sucursal.mensajeAlCliente = this.form.get('htmlLlegada').value;
      sucursal.mensajeAlClienteFinal = this.form.get('htmlFinal').value;
      sucursal.isFinal = this.form.get('isFinal').value.value ? 0 : 1;
      sucursal.isDelivery = this.form.get('isDelivery').value.value ? 0 : 1;
      sucursal.mailDelivery = this.form.get('mail').value;
      this.sucursalService.edit(sucursal).then(response => {
        this.sucursales[this.i] = response.body;
      }).catch(error => {
        this.logger.error(error);
      });
    } else {
      this.snackBar.open('Debe completar los campos', null, {
        duration: 2000,
        panelClass: [this.colorSnackbarMapper.colorMap.get('danger')]
      });
    }
  }
}
