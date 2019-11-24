
import { COLORS, FONTSIZES } from '../constant';

const others = {
    "CODE": {
        padding: "0 4px",
        margin: "0 2px",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        borderRadius: "2px",
        fontSize: "14px",
        fontFamily: "monaco, Consolas, Liberation Mono, Courier, monospace",
    },
};

var _customInlineStyleMap = {
    color: {},
    fontSize: {},
};

COLORS.forEach((color)=>{
    _customInlineStyleMap.color[`color-${color}`] = { color: color}
});

FONTSIZES.forEach((size)=>{
    _customInlineStyleMap.fontSize[`fontSize-${size}`] = { fontSize: size}
});

//------------------------------------------------

export var customInlineStyleMapGroup = _customInlineStyleMap;

export default {
    ..._customInlineStyleMap.color,
    ..._customInlineStyleMap.fontSize,
    ...others,
}
