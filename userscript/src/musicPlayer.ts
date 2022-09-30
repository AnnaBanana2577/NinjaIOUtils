const songs = [
  "https://www.dropbox.com/s/i7jc9ojpnsyii2l/Urban%20Sunrise%20.mp3?dl=1",
];

export async function handleKeyDownMusicPlayer(e: KeyboardEvent) {
  if (e.repeat) return;
  if (e.key == "F9") musicPlayer.start();
  if (e.key == "F10") musicPlayer.stop();
}

class MusicPlayer {
  private currentSongIndex = 0;
  private songs: Array<Howl> = [];

  constructor(private songUrls: Array<string>) {
    setTimeout(() => {
      songUrls.forEach((song) =>
        this.songs.push(
          new Howl({
            src: [song],
            format: ["mp3"],
            autoplay: false,
            loop: true,
            volume: 0.7,
          })
        )
      );
    }, 1000 * 7);
  }

  public start() {
    this.songs[this.currentSongIndex].play();
  }

  public stop() {
    this.songs[this.currentSongIndex].stop();
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
}

const musicPlayer = new MusicPlayer(songs);
