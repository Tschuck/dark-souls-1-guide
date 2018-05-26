import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  constructor() {
  }

  save = (key, value) => {
    let saveValue = value;

    try {
      saveValue = JSON.stringify(value);
    } catch (ex) { }

    window.localStorage[key] = saveValue;
  }

  load = (key) => {
    let value = window.localStorage[key];

    try {
      value = JSON.parse(value);
    } catch (ex) { }

    return value;
  }

  saveToFile = () => {

  }

  loadToFile = () => {

  }
}
