import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TagModel} from "../model/tag.model";
import {Tag} from "@angular/compiler/src/i18n/serializers/xml_helper";

const TAG_DATA = [
  {id: "1", tag:'Bash'},
  {id: "2", tag:"Entitlement"},
  {id: "3", tag:"Atlas"},
  {id: "4", tag:"Identity"},
  {id: "5", tag:"teleport"},
  {id: "6", tag:"kubernetes"}
]

@Component({
  selector: 'tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.css']
})
export class TagFilterComponent {
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<TagModel[]>;
  tags: string[] = [];
  alltags: TagModel[] = TAG_DATA;

  @ViewChild('fruitInput') tagInput?: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete?: MatAutocomplete;

  constructor() {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => tag ? this._filter(tag) : this.alltags.slice()));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    // @ts-ignore
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): TagModel[] {
    const filterValue = value.toLowerCase();

    return this.alltags.filter(tag => tag["tag"].toLowerCase().indexOf(filterValue) === 0);
  }
}
