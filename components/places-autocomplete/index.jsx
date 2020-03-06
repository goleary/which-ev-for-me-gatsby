// this is adapted from 'react-google-autocomplete' npm package
// I changed it to a function component that makes use of hooks
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

import Textfield from "@material-ui/core/Textfield";

function loadScript(src, position, id, setLoaded) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  script.addEventListener("load", setLoaded);
  position.appendChild(script);
}

export default ({
  googleApiKey,
  onPlaceSelected,
  types = [],
  bounds,
  fields = ["formatted_address", "name", "geometry.location"],
  componentRestrictions,
  disabled,
  ...rest
}) => {
  const propTypes = {
    onPlaceSelected: PropTypes.func,
    types: PropTypes.array,
    componentRestrictions: PropTypes.object,
    bounds: PropTypes.object,
    fields: PropTypes.array
  };

  const inputRef = useRef(null);

  let autocomplete = null;
  let event = null;
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && !loaded.current) {
      if (!document.querySelector("#google-maps")) {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`,
          document.querySelector("head"),
          "google-maps",
          () => {
            setLoaded(true);
          }
        );
      } else setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const config = {
      types,
      bounds,
      fields
    };

    if (componentRestrictions) {
      config.componentRestrictions = componentRestrictions;
    }

    autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      config
    );

    event = autocomplete.addListener("place_changed", onSelected);
    return () => event && event.remove();
  }, [loaded]);

  const onSelected = () => {
    if (onPlaceSelected && autocomplete) {
      onPlaceSelected(autocomplete.getPlace());
    }
  };
  return (
    <Textfield
      variant={disabled ? "filled" : "outlined"}
      inputRef={inputRef}
      {...rest}
    />
  );
};
