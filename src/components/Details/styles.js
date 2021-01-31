import React from "react";
import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  height: 280px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  padding: 20px;
`;

export const TypeText = styled.Text`
  font-size: 20px;
  color: #222;
`;

export const TypeDescription = styled.Text`
  color: #666;
  font-size: 14px;
`;
export const TypeImage = styled.Image`
  height: 80px;
  margin: 10 0;
`;
export const RequestButtom = styled.TouchableOpacity`
  background: #222;
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 10px;
`;
export const RequestButtomText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;
