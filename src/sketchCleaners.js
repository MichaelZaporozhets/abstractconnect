import { namedObjArrayToKeyVals } from './utils';

function cleanColor({ red, green, blue, alpha }) {
  return `rgba(${parseInt(red.toFixed(5)*255)}, ${parseInt(green.toFixed(5)*255)}, ${parseInt(blue.toFixed(5)*255)}, ${alpha})`
}

function hasText(layer) {
  return Boolean(layer.attributedString);
}

function cleanText(textStyle) {
  return {
    color: cleanColor(textStyle.encodedAttributes.MSAttributedStringColorAttribute),
    fontSize: textStyle.encodedAttributes.MSAttributedStringFontAttribute.attributes.size,
    fontFamily: textStyle.encodedAttributes.MSAttributedStringFontAttribute.attributes.name,
    lineHeight: textStyle.encodedAttributes.paragraphStyle.maximumLineHeight,
    alignment: textStyle.encodedAttributes.paragraphStyle.alignment,
    verticalAlignment: textStyle.verticalAlignment
  }
}

function cleanGradient(gradient) {
  return {
    from: gradient.from,
    to: gradient.to,
    stops: gradient.stops.map(stop => ({ color: cleanColor(stop.color) })),
  }
}

function hasBackground(layerStyle) {
  return layerStyle.fills.length > 0;
}

function cleanBackground(background) {
  return {
    fill: cleanColor(background.color),
    hasGradient: background.fillType == 1,
    gradient: background.fillType == 1 && cleanGradient(background.gradient)
  }
}

function cleanBorder(border) {
  return {
    color: cleanColor(border.color),
    width: border.thickness
  }
}

function hasBorder(layerStyle) {
  return layerStyle.borders.length && layerStyle.borders[0].isEnabled
}

function isShape(layer) {
  return Boolean(layer.points) && layer.points.length > 0
}

function hasChildren(layer) {
  return Boolean(layer.layers) && layer.layers.length > 0
}

function cleanLayer(layer) {
  return {
    // loves a good name
    name: layer.name,

    // it's useful to know what type of layer it is
    type: layer._class,

    // if it's a text layer, we'll probably need the text in the layer
    hasText: hasText(layer),
    text: hasText(layer) && layer.attributedString.string,

    // some useful points of data
    isVisible: layer.isVisible,
    isLocked: layer.isLocked,

    // shapes are useful to know!
    isShape: isShape(layer),
    shapeData: isShape(layer) && layer.points,

    // is this layer a parent?
    hasChildren: hasChildren(layer),
    children: hasChildren(layer) && namedObjArrayToKeyVals(layer.layers.map(cleanLayer)),

    // the big one!
    style: {
      width: layer.frame.width,
      height: layer.frame.height,
      top: layer.frame.x,
      left: layer.frame.y,
      text: hasText(layer) && cleanText(layer.style.textStyle),
      background: hasBackground(layer.style) && cleanBackground(layer.style.fills[0]),
      border: hasBorder(layer.style) && cleanBorder(layer.style.borders[0]),
      shadows: {
        outer: layer.style.shadows,
        inner: layer.style.innerShadows
      }
    }
  }
}

function cleanSymbol(symbol) {
  return {
    name: symbol.name,
    layers: namedObjArrayToKeyVals(symbol.layers.map(cleanLayer)),

    dimensions: {
      width: symbol.frame.width,
      height: symbol.frame.height
    },

    position: {
      x: symbol.frame.x,
      y: symbol.frame.y
    }
  };
}

export {
  cleanColor,
  cleanBorder,
  cleanGradient,
  cleanBackground,
  cleanText,
  cleanLayer,
  cleanSymbol,
  hasText,
  hasBorder,
  hasBackground
}
