import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Playlist } from '@app/_models';
import { PlaylistService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    playlists: Playlist[];

    constructor(private playlistService: PlaylistService) { }

    ngOnInit() {
        this.loading = true;
        this.playlistService.getAll().pipe(first()).subscribe(playlists => {
            this.loading = false;
            this.playlists = playlists;
        });
    }
}