# GetCar App with route

GetCar is a project in React Native with expo for to call a private car to take you anywhere with security.

## Installation

Use the package manager [yarn](http://yarnpkg.com) or [npm](http://npmjs.com) to install GetCar.

Install [expo](http://expo.io)

```bash
  yarn install # or npm install
```

## Usage

1. [Generate API Key](https://developers.google.com/places/web-service/get-api-key)
2. Add API Key in file `src/components/Search/index.js` and in const `GOOGLE_PLACES_API_KEY` like: `const GOOGLE_PLACES_API_KEY = "MY-KEY";`
3. Enable [Place API](https://console.cloud.google.com/apis/library/places-backend.googleapis.com?q=PLACE%20API&id=ecefdd63-ee2b-4751-b6c3-8e9113791baf&project=uber-faker-rod&supportedpurview=project)
4. Enable [Geocoding API](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?q=Geoc&id=42fea2de-420b-4bd7-bd89-225be3b8b7b0&project=uber-faker-rod&supportedpurview=project)

Rename file `.env.example` to `.env` and add values in file. It is variables environment for app `localhost`.


```bash
  expo start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)