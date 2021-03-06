# AbstractConnect
### A Design-Token extractor for teams using Abstract & Javascript
[![NPM Version and link](https://img.shields.io/npm/v/abstractconnect)](https://www.npmjs.com/package/abstractconnect)

This package retrieves symbols from a specified sketch file stored in abstract, models the data neatly and transposes sketch format styles into more webdev(tm) friendly values.

### Usage


```javascript
import { getSymbols } from 'abstractconnect';

getSymbols({
  filter: symbol => symbol.name === 'MySymbol'
}).then(({ MySymbol }) => {

  //select your layer by name
  const MyLayer = MySymbol.layers.MyLayerName

  //do whatever it is you want to do with design information
  const someCSS = `
    font-size: ${MyLayer.style.text.fontSize}px;
    background: ${MyLayer.style.background};
  `;

  //etc
});

```
#### getSymbols
takes a single parameter, an object with config:
- `filter`: expects a standard js filter function
- `raw`: set to `true` to get the 'raw' symbol data from sketch
- `fromSHA`: target a specific commit in abstract
- `withFS`: force download to FS (ends up in the TEMP_PATH setup var below)

### Setup

This package is configured using environment values. Simplest setup is to drop a `.env` file in your project directory.

```
ABSTRACT_TOKEN=<YOUR DEVELOPER TOKEN>
ABSTRACT_PROJECT_ID=<YOUR PROJECT ID>
ABSTRACT_FILE_NAME=<THE NAME OF YOUR SKETCH FILE>
ABSTRACT_BRANCH=<OPTIONAL: DEFAULTS TO 'master'>
LOG_LEVEL=<OPTIONAL: to turn off console info add this to equal 'silent'>
TEMP_PATH=<OPTIONAL: DEFAULTS TO <YOURPROJECTPATH>/temp

```

**finding your project id**
The simplest way to find your project id is to open your project in browser, and collect the id from the url: `https://app.abstract.com/projects/<PROJECT_ID>/`;
