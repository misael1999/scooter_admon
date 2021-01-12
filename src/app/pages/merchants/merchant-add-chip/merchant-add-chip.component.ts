import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'app-merchant-add-chip',
  templateUrl: './merchant-add-chip.component.html',
  styleUrls: ['./merchant-add-chip.component.scss']
})
export class MerchantAddChipComponent {
  idMerchant: number;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];


  allTags: Array<any> = [
    { nombre: 'Oriental' },
    { nombre: 'China' },
    { nombre: 'Japonesa' },
    { nombre: 'Mexicana' },
    { nombre: 'Antojitos' },
    { nombre: 'Italiana' },
    { nombre: 'Postres' },
    { nombre: 'Pollo' },
    { nombre: 'Arabe' },
    { nombre: 'Ensalada' },
    { nombre: 'Latina' },
    { nombre: 'Mariscos' },
    { nombre: 'Pizza' },
    { nombre: 'Sushi' },
    { nombre: 'Alitas' },
    { nombre: 'Hamburguesas' },
    { nombre: 'Desayunos' },
    { nombre: 'Tacos' },
  ];
  selectTags: Array<any> = [{ nombre: 'Helados' }];
  formControlTag = new FormControl();
  filteredTags: Observable<string[]>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;



  // Real
  // fruitCtrl = new FormControl();
  // filteredFruits: Observable<string[]>;
  // fruits: string[] = ['Lemon'];

  // allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  // @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
  // @ViewChild('auto') matAutocomplete: MatAutocomplete;



  constructor(private router: Router, private route: ActivatedRoute) {
    this.idMerchant = this.route.snapshot.params.id;

    this.filteredTags = this.formControlTag.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.allTags.slice()));

  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.selectTags.push(value.trim());
      // this.fruits.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    // this.fruitCtrl.setValue(null);
    this.formControlTag.setValue(null);
  }

  saveChips() {
    this.router.navigate(['/merchants']);
  }

  remove(tag): void {
    const index = this.selectTags.indexOf(tag);
    if (index >= 0) {
      this.selectTags.splice(index, 1);
    }
  }



  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectTags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.formControlTag.setValue(null);
  }

 

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
}

