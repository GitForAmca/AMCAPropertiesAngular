import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private titleService : Title,
    private metaService : Meta
  ) { }

  setMeta(title : string, description : string): void {
    this.titleService.setTitle(title);
    this.metaService.updateTag({name: 'description', content : description});
  }

}
