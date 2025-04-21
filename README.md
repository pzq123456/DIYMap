# DIYMap
> - If you want to add new map styles, please attach the style file when submitting a PR.
> - Demo link: [DIYMap](https://pzq123456.github.io/DIYMap/)
> - Designed and developed by [PZQ](https://pzq123456.github.io/) in 2025.

## Introduction
DIYMap is a simple map application that allows users to customize map styles and printing settings. It uses the Maplibre GL JS library to render maps and provides a user-friendly interface for selecting and applying different map styles.

## Features

``` bash
src/
│
├── main.ts                    // Entry file, application initialization
├── map.ts                     // Map initialization and style control
├── style.ts                   // Page style control (background color, font color)
├── print-ui.ts                // Print settings UI and logic
├── search.ts                  // City search functionality
└── constants.ts               // Constant definitions (e.g., style file list, default values, etc.)
```

## Data Sources
- OpenStreetMap (OSM)

## How to Run it Locally

1. install dependencies:
   ```bash
   npm install
   ```
2. run the project:
   ```bash
   npm run dev
   ```
3. open the browser and visit [`http://localhost:5173/`](http://localhost:5173)
