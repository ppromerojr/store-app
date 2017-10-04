import { Component, Attribute } from '@angular/core';

@Component({
    selector: 'app-now',
    template: `
      <h2 (updateTime)="updateMyTime()">{{date | date: format}}</h2>
    `
})
export class NowComponent {
    private date;
    format: string;

    constructor( @Attribute('format') format) {
        this.format = format;
        this.date = new Date();

        setInterval(() => {
            this.date = new Date();
        }, 1000);
    }

}
