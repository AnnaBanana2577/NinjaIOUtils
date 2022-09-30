import { saveSettings, SETTINGS } from "./settings";
import { musicPlayer } from "../musicPlayer";

export default function hookSoundSettingsTab() {
  //Typewriter
  app.menu.settingsPanel.soundTab.addChild(
    (app.menu.settingsPanel.soundTab.typewriter = new Checkbox(
      "typewriter",
      "Enable Typing Noise",
      true
    ))
  );

  app.menu.settingsPanel.soundTab.typewriter.x =
    app.menu.settingsPanel.soundTab.volumeSlider.x;
  app.menu.settingsPanel.soundTab.typewriter.y =
    app.menu.settingsPanel.soundTab.volumeSlider.y +
    app.menu.settingsPanel.soundTab.volumeSlider.height +
    14;
  app.menu.settingsPanel.soundTab.typewriter.on(Checkbox.CHANGE, function (b) {
    SETTINGS.typewriter = b;
    saveSettings();
  });
  app.menu.settingsPanel.soundTab.typewriter.setChecked(SETTINGS.typewriter);

  //Music Player
  app.menu.settingsPanel.soundTab.addChild(
    (app.menu.settingsPanel.soundTab.musicPlayer = new Checkbox(
      "musicplayer",
      "Enable Music Player",
      SETTINGS.enableMusicPlayer
    ))
  );

  app.menu.settingsPanel.soundTab.musicPlayer.x =
    app.menu.settingsPanel.soundTab.volumeSlider.x;
  app.menu.settingsPanel.soundTab.musicPlayer.y =
    app.menu.settingsPanel.soundTab.typewriter.y +
    app.menu.settingsPanel.soundTab.typewriter.height +
    14;
  app.menu.settingsPanel.soundTab.musicPlayer.on(Checkbox.CHANGE, function (b) {
    SETTINGS.enableMusicPlayer = b;
    saveSettings();
    if (!b) musicPlayer.stop(true);
  });
}
