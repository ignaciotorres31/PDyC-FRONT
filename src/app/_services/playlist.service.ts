import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Playlist } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class PlaylistService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Playlist[]>(`${environment.apiUrl}/playlists`);
    }
}