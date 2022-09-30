const songs = [
  "https://www.dropbox.com/s/i7jc9ojpnsyii2l/Urban%20Sunrise%20.mp3?dl=1",
  "https://www.dropbox.com/s/c26fdsksh9q0nzg/Images%20-%20Lost%20European.wav?dl=1",
  "https://www.dropbox.com/s/36gyipvdty81o51/What%20a%20beautiful%20Sunset%21%20%28radio%20mix%29%20-%20Angelwing.wav?dl=1",
];

export async function handleKeyDownMusicPlayer(e: KeyboardEvent) {
  if (e.repeat) return;

  switch (e.key) {
    case "F6":
      musicPlayer.back();
      break;
    case "F8":
      musicPlayer.next();
      break;
    case "F7":
      musicPlayer.isPlaying ? musicPlayer.stop() : musicPlayer.start();
  }
}

class MusicPlayer {
  public isPlaying = false;
  private currentSongIndex = 0;
  private songs: Array<Howl> = [];

  constructor(private songUrls: Array<string>) {
    this.loadSongs();
  }

  public start() {
    if (this.isPlaying) return;
    this.songs[this.currentSongIndex].play();
    this.isPlaying = true;
  }

  public stop() {
    if (!this.isPlaying) return;
    this.songs[this.currentSongIndex].stop();
    this.isPlaying = false;
  }

  public next() {
    this.stop();

    if (this.currentSongIndex++ > this.songs.length - 1)
      this.currentSongIndex = this.songs.length - 1;

    this.start();
  }

  public back() {
    this.stop();

    if (this.currentSongIndex-- < 0) this.currentSongIndex = 0;

    this.start();
  }

  private async loadSongs() {
    setTimeout(() => {
      //Wait 7 seconds before initalizing, to ensure Howler.js is loaded first
      this.songUrls.forEach((song) =>
        this.songs.push(
          new Howl({
            src: [song],
            html5: true,
            format: ["mp3"],
            autoplay: false,
            loop: true,
            volume: 0.7,
          })
        )
      );
    }, 1000 * 7);
  }
}

const musicPlayer = new MusicPlayer(songs);
