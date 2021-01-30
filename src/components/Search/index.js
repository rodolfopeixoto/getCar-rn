import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import customStyle from './styles'


const QUERY = {
  key: process.env.GOOGLE_PLACES_API_KEY,
  language: 'pt-BR',
}

export default function Search(props) {
  const { onLocationSelected } = props;
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <GooglePlacesAutocomplete
      placeholder="Where to go ?"
        onPress={onLocationSelected}
      query={QUERY}
      textInputProps={{
        onFocus: () => {
          setSearchFocused(true);
        },
        onBlur: () => {
          setSearchFocused(false);
        },
        autoCapitalize: 'none',
        autoCorrect: false,
      }}
      fetchDetails
      debounce={200}
      enablePoweredByContainer={false}
      styles={customStyle}
    />
  );
}
