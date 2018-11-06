# Klank

## Goals

1. Create an amazing App for free (Windows, Mac, Linux)
   - Think as a Musician instead as a Technican
2. Show that it is possible to just use pure JavaScript ( aka Vanilla JS ;) ) to create amazing Apps without getting crazy with thousands of Frameworks
3. Extract the Components and Techniques to share with other Electron Apps

Comes from 'electron-quick-start' ( https://github.com/electron/electron-quick-start )

## Visions, Ideas, Enhancements, Bugs

- [ ] Add Outliner
- [ ] Dials
- [ ] Widgets
- [ ] Animations
- [ ] Video Engine
- [ ] Independent Tempi per Track
- [ ] Whole UI can be matched whats needed; no systematic UI Flow; User takes what he needs like in real World
- [ ] Per Track Connection to Main Tempi or different Tracks Tempi
- [ ] Multiplier inbetween Tempi Connections to create synced or unsynced polyrythms
- [ ] Tempi is limitless means goes from 0 BPM up to lets say 10.000 BPM
- [ ] Whole App Modifiers like LFO etc for all purposes; eg. Change Main Tempo or adding Tracks randomly with FX and a Sample Folder Pool with random Notes etc.; What comes in your Mind you should be able to do
- [ ] Add Line Player; Kind of small String which is flying in the Wind; Add Forces to it like Wind or Magnetic if the String has kind of Metal in it's Material Properties; Notes are attached to these Strings and by the Forces the Timing changes per String because they move in the Room and the Notes get per Force and Properties different Play Positions; They are from top to down, follow the Gravity

## Screenshots

![Dialog](https://raw.githubusercontent.com/dschiller/klank/master/docs/dialoga.png)

![Dialog](https://raw.githubusercontent.com/dschiller/klank/master/docs/coder.png)

## Used Modules

```
electron-reload
electron-mocha
spectron
```

## Installation and Running

```
git clone https://github.com/dschiller/Klank
cd Klank
npm install
npm start
```

## Testing

```
npm test
```

## Features

### Coder

It is possible to use Code to control the whole App via JavaScript.

```tracks.track_2.volume.setValue(.2)``` Set the Volume of Track 2 to to 0.2

### Default Value

A Doubleclick on a Rotary / Knob animates to the Default Value.

### Dialog

The Dialogs are modal and a Click somewhere else animates them shaking to raise Attention to it.
The Dialogs laid down in JSON Files to simplify Dialog Creation. Eg. ```Templates/renameTrack.json```.
- [ ] Implement AccessKeys

### Tracknumber

A click on a Tracknumber animates the Collapse or Expand of the Track.

### Trackname

A Doubleclick on a Trackname opens the Rename Dialog.

- [ ] Add Textfield
 
## License

[MIT](LICENSE.md)
