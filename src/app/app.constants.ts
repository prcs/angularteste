import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    public static get API_URL(): string { return 'http://localhost:1337/'; }

}