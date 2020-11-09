import { Component, OnInit } from '@angular/core';
import {Estado} from '../../common/models/configuration.model';
import {ConfigurationService} from '../../services/configuration.service';
import {EstadoMapper} from '../../common/mappers/estado.mapper';
import {FormControl, FormGroup} from '@angular/forms';

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
      ['insert', ['table', 'link', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  };
  form: FormGroup = new FormGroup({
    html: new FormControl(''),
    notificarLlegada: new FormControl(''),
  });
  notificarLlegada: string;

  constructor(
    public config: ConfigurationService,
    public estadoMapper: EstadoMapper,
  ) { }

  ngOnInit(): void {
    this.config.config.asObservable().subscribe(c => {
      this.estados = c.estados;
      this.estadosMap = this.estadoMapper.estadosMap;
    });
  }

  gotoDestino(number: number) {
    console.log(this.form.get('html').value);
  }
}
