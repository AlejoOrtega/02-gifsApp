import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGIFResponse } from '../interface/gif.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private servicioUrl : string = 'https://api.giphy.com/v1/gifs/'
  private apiKey      : string = 'Tptg2i8id6oitQNickKEn32a45ZFy3Yr';
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

    const params = new HttpParams()
                      .set('api_key', this.apiKey)
                      .set('limit', '10')
                      .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.servicioUrl}/search?`, {params})
              .subscribe( (resp) => {
                this.resultados = resp.data;
                localStorage.setItem('resultado', JSON.stringify(this.resultados));
              });
  }

  
}
