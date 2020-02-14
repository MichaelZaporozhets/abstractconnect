# AbstractConnect
[![NPM Version and link](https://img.shields.io/npm/v/abstractconnect)](https://www.npmjs.com/package/abstractconnect)

#### A utility that lets you connect your design data stored in Abstract to your application code

This package retrieves symbols from a specified sketch file stored in abstract, models the data neatly and transposes sketch format styles into more webdev(tm) friendly values.

### Usage


```javascript
import { getSymbols } from 'abstractconnect';

getSymbols({
  filter: symbol => symbol.name === 'MySymbol'
}).then(({ MySymbol }) => {
  const MyLayer = MySymbol.layers.MyLayerName
  const someCSS = `
    font-size: ${MyLayer.style.text.fontSize};
    background: ${MyLayer.style.background};
  `;

  //etc
});

```

### Setup

This package is configured using environment values. Simplest setup is to drop a `.env` file in your project directory.

```
ABSTRACT_TOKEN=<YOUR DEVELOPER TOKEN>
ABSTRACT_PROJECT_ID=<YOUR PROJECT ID>
ABSTRACT_FILE_NAME=<THE NAME OF YOUR SKETCH FILE>
```

**finding your project id**
The simplest way to find your project id is to open your project in browser, and collect the id from the url: `https://app.abstract.com/projects/<PROJECT_ID>/`;
