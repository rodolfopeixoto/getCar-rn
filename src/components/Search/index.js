import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import customStyle from './styles'


const QUERY = {
  key: process.env.GOOGLE_PLACES_API_KEY,
  language: 'pt-BR',
}

export default function Search() {
  const [searchFocused, setSearchFocused] = useState(false);
  return (
    <GooglePlacesAutocomplete
      placeholder="Where to go ?"
        onPress={(data, details = null) =>  console.log(data, details)}
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
      listViewDisplayed='auto'
      fetchDetails
      debounce={200}
      enablePoweredByContainer={false}
      styles={customStyle}
    />
  );
}
