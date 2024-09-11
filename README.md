# Reforged UI Maker (RUID)

**A cross-platform desktop application made to create User Interface designs and systems for Warcraft 3 Maps without code.**

The application terminates the need for coding in favor of creating draggable graphical elements to express the design. Its easy-to-learn mechanics and concepts make it easy and usable for non-coders or GUI users to create fully-fledged UI systems, and its precision, speed and saved templates make it viable for Professionals and Veterans to make their systems in minutes, instead of typically hours or days.

It produces code in a file that can be opened by a text editor, then copied and pasted into a World Editor trigger or Custom Script. It works on Warcraft III version 1.31+

The main goal of the application is to take WC3 UI modding to the next level, by facilitating UI creation and allowing anyone to design their own unique UI, without any prerequisite coding knowledge. This application is made to be used by GUI coders, Jass coders, LUA coders and Typescript coders. For Typescript, it is specifically made to work with TriggerHappy's TSTL template.

## Main Application Distribution Source [Hive Workshop](https://www.hiveworkshop.com/threads/warcraft-3-reforged-ui-designer-ruid.334868/).

The linked page also includes video showcases, tutorials, features and much more.

## Expectations

This application and UI Modding together have unlimited potential. As it gets more and more known and used, it will gradually revolutionize the whole modding scene, and become a core part of making any map. This is the future of Map Development.

## Technology Used

-   Electron Framework
-   HTML & CSS
-   Bootstrap
-   Typescript

## Contributions

Everyone is encouraged to contribute to this project. Simply fork the repo, pick an issue, make a PR, then contact me to discuss it!

## Getting Started

### Prerequisites

Need to have Node & NPM installed. (Google them)

### Clone & Install Project

Clone the repo into the desired location, then in terminal at the root of the project, run `npm install` to install the dependencies.
Afterwards manually create a "build" folder, otherwise the next command won't work!
Also you will need to create a configMain.ts in src/ts, otherwise the commands will fail as well.

configMain.ts

```
const config = {
    key: '',
    namespace: ''
}

export default config;
```

### Starting the Development Project

To build and run the project, run `npm run start`. This will also refresh the application on src code changes. (This applies to the _renderer_ process code only. The _main_ process will need to re-run this command.)

### If you already have the project built, you can just run it without re-building

By running `npm run run`.

### Packing the Project

To pack the project to be distributed, run `npm run pack`. This will create a packed installation file (to install the application), and an portable (unpacked) folder, which can run without installation.
In order for the pack command to work, you need to have a "dist" folder in your projects root. Otherwise the command will fail.
