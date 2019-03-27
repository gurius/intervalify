import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  preset(data: string): Promise<{}> | boolean {
    const windowNavigator = (window.navigator as any)
    if (windowNavigator.share) {
      return windowNavigator.share({
        title: 'preset title',
        url: `${new URL(document.location.href).origin}/export?preset=${data}`,
      });

    } else {
      return false;
    }
  }

  construct(p = {}, e = [{}], i = [{}]) {
    return JSON.stringify({
      presets: [p],
      exercises: e,
      countdowns: i
    })
  }

  constructor() { }
}
