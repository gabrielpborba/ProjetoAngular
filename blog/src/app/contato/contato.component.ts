import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  falha = {sucesso: false, texto  : "Problemas no envio do formulário de contato!"};
  contatoForm: FormGroup;
  listaErros = [];
  listaResultado = [];

  constructor(private fb: FormBuilder) { }

  mensagensErro = {'nome': {'required':'favor preencher o nome'},
                  'email': {'required':'favor preencher o email', 'emailIsValid':'o formato do email está incorreto'},
                  'texto': {'required':'favor preencher o texto', 'minlength':'Você precisa informar um texto com no mínimo 5 caracteres',
                  'maxlength': 'o limite do texto é de 100 caracteres'}};

  ngOnInit() {
    this.buildForm();
  }

  buildForm(){
    this.contatoForm = this.fb.group({
      'nome': ['',[Validators.required]],
      'email': ['',[Validators.required]],
      'texto': ['',[Validators.required, Validators.minLength(4), Validators.maxLength(100)]]
    });
  }
}
