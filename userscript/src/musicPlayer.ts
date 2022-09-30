//TODO - Different way of checking if Howler.js is initialized;  Add new songs; Add setings inputs;

interface Song {
  name: string;
  url: string;
}

const baseUrl = "";

const songs: Array<Song> = [
  {
    name: "Starry nights",
    url: "https://www.dropbox.com/s/i7jc9ojpnsyii2l/Urban%20Sunrise%20.mp3?dl=1",
  },
  {
    name: "Cornpopping Carnival",
    url: "https://www.dropbox.com/s/620qqip91g6td9t/Double%20Violin%20Concerto%201st%20Movement%20-%20J.S.%20Bach.mp3?dl=1",
  },
  {
    name: "Devils Advocate",
    url: "https://www.dropbox.com/s/ayf4cwdytqafs70/The%20Calling%20%20-%20Angelwing.mp3?dl=1",
  },
];

export async function handleKeyDownMusicPlayer(e: KeyboardEvent) {
  const isAltPressed = UserInput.pressed[18];
  if (e.repeat || !isAltPressed) return;

  switch (e.key) {
    case "z":
      musicPlayer.back();
      break;
    case "c":
      musicPlayer.next();
      break;
    case "x":
      musicPlayer.isPlaying ? musicPlayer.stop(true) : musicPlayer.start();
  }
}

class MusicPlayer {
  private isLoaded = false;
  public isPlaying = false;
  private currentTrackIndex = 0;
  private tracks: Array<Howl> = [];

  constructor(private songs: Array<Song>) {
    this.loadSongs();
  }

  public start() {
    if (!this.isLoaded || this.isPlaying) return;

    this.tracks[this.currentTrackIndex].play();
    this.isPlaying = true;
    App.Console.log(`Playing ${this.currentTrackName}`);
  }

  public stop(shouldLog: boolean) {
    if (!this.isLoaded || !this.isPlaying) return;
    this.tracks[this.currentTrackIndex].stop();
    this.isPlaying = false;
    if (shouldLog) App.Console.log(`Stopped ${this.currentTrackName}`);
  }

  public next() {
    if (!this.isLoaded) return;

    if (this.isPlaying) this.stop(false);
    this.currentTrackIndex++;
    if (this.currentTrackIndex >= this.songs.length) this.currentTrackIndex = 0;

    this.start();
  }

  public back() {
    if (!this.isLoaded) return;

    if (this.isPlaying) this.stop(false);
    this.currentTrackIndex--;
    if (this.currentTrackIndex < 0)
      this.currentTrackIndex = this.tracks.length - 1;

    this.start();
  }

  private async loadSongs() {
    setTimeout(() => {
      //Wait 7 seconds before initalizing, to ensure Howler.js is loaded first | TODO: Different way to check Howler.js Initialization state
      this.songs.forEach((song) =>
        this.tracks.push(
          new Howl({
            src: [song.url],
            html5: true,
            format: ["mp3"],
            autoplay: false,
            loop: true,
            volume: 0.7,
          })
        )
      );
      this.isLoaded = true;
      App.Console.log("Music player initialized");
    }, 1000 * 7);
  }

  private get currentTrackName(): string {
    return this.songs[this.currentTrackIndex].name;
  }
}

const musicPlayer = new MusicPlayer(songs);
