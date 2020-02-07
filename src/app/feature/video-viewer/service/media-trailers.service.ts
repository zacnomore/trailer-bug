import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { MovieDBConfigService } from 'src/app/global/movieDBConfig/movie-dbconfig.service';
import { MovieDB } from 'src/config/config';
import { VideoItem } from '../templates/viewer/viewer.component';

@Injectable({
  providedIn: 'root'
})
export class MediaTrailersService {
  private movieApiConfig: MovieDB = this.movieDBService.apiConfig;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.movieApiConfig.accessToken}`
    })
  };
  private videoType = {
    YouTube: 'youTube',
    Vimeo: 'vimoe'
  };
  constructor(
    private movieDBService: MovieDBConfigService,
    private http: HttpClient
  ) {}

  public getMediaVideos(id: string): Observable<VideoItem[]> {
    return this.http
      .get<ServiceVideo>(this.movieApiConfig.video(id), this.httpOptions)
      .pipe(
        map(res => {
          return res.results.map(val => {
            const youTube = this.movieApiConfig.youTube;
            const vimoe = this.movieApiConfig.vimeo;
            return {
              title: val.name,
              type: val.site as 'youtube' | 'vimoe',
              url: val.site === 'YouTube' ? youTube(val.key) : vimoe(val.key)
            };
          });
        })
      );
  }
}

interface ServiceVideo {
  id: number;
  results: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    site: 'YouTube' | 'Vimeo';
    size: number;
    type: string;
  }[];
}
