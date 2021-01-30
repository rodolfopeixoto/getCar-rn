import { Platform, PixelRatio } from 'react-native';

export function getPixcelSize(pixels){
  return Platform.select({
    ios: pixels,
    android: PixelRatio.getPixelSizeForLayoutSize(pixels)
  })
}