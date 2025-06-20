import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carte-produit-nodevis',
  templateUrl: './carte-produit-nodevis.component.html',
  styleUrls: ['./carte-produit-nodevis.component.css']
})
export class CarteProduitNodevisComponent {
  @Input() titre: string = '';
  @Input() description: string = '';
  @Input() image: string = '';
  @Input() categorie: string = '';
  @Input() prix: string = '';
  @Input() caracteristiques: string[] = [];


  hover: boolean = false;
  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

}
