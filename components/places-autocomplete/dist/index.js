"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Textfield = _interopRequireDefault(require("@material-ui/core/Textfield"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function loadScript(src, position, id, setLoaded) {
  if (!position) {
    return;
  }

  var script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  script.addEventListener("load", setLoaded);
  position.appendChild(script);
}

var _default = function _default(_ref) {
  var googleApiKey = _ref.googleApiKey,
      onPlaceSelected = _ref.onPlaceSelected,
      _ref$types = _ref.types,
      types = _ref$types === void 0 ? [] : _ref$types,
      bounds = _ref.bounds,
      _ref$fields = _ref.fields,
      fields = _ref$fields === void 0 ? ["formatted_address", "name", "geometry.location"] : _ref$fields,
      componentRestrictions = _ref.componentRestrictions,
      disabled = _ref.disabled,
      rest = _objectWithoutProperties(_ref, ["googleApiKey", "onPlaceSelected", "types", "bounds", "fields", "componentRestrictions", "disabled"]);

  var propTypes = {
    onPlaceSelected: _propTypes.default.func,
    types: _propTypes.default.array,
    componentRestrictions: _propTypes.default.object,
    bounds: _propTypes.default.object,
    fields: _propTypes.default.array
  };
  var inputRef = (0, _react.useRef)(null);
  var autocomplete = null;
  var event = null;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loaded = _useState2[0],
      setLoaded = _useState2[1];

  (0, _react.useEffect)(function () {
    if (typeof window !== "undefined" && !loaded.current) {
      if (!document.querySelector("#google-maps")) {
        loadScript("https://maps.googleapis.com/maps/api/js?key=".concat(googleApiKey, "&libraries=places"), document.querySelector("head"), "google-maps", function () {
          setLoaded(true);
        });
      } else setLoaded(true);
    }
  }, []);
  (0, _react.useEffect)(function () {
    if (!loaded) return;
    var config = {
      types: types,
      bounds: bounds,
      fields: fields
    };

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, config);
    event = autocomplete.addListener("place_changed", onSelected);
    return function () {
      return event && event.remove();
    };
  }, [loaded]);

  var onSelected = function onSelected() {
    if (onPlaceSelected && autocomplete) {
      onPlaceSelected(autocomplete.getPlace());
    }
  };

  return _react.default.createElement(_Textfield.default, _extends({
    variant: disabled ? "filled" : "outlined",
    inputRef: inputRef
  }, rest));
};

exports.default = _default;

//# sourceMappingURL=index.jsx.map