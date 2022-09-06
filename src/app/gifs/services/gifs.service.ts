import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey      : string = 'Tptg2i8id6oitQNickKEn32a45ZFy3Yr'
  private _historial  : string [] = [];

  public resultados  : Gif [] = [];

  get historial() {
    return [... this._historial]
  }

  constructor(private http: HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')! ) || [];

    this.resultados= JSON.parse(localStorage.getItem('resultado')! ) || [];

  }

  async buscarGifs(query: string){

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGIFResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=20`)
              .subscribe( (resp) => {
                console.log(resp.data)
                this.resultados = resp.data

                localStorage.setItem('resultado', JSON.stringify(this.resultados))
              });
  }

  
}
