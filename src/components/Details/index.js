import React from "react";
import {
  Container,
  TypeText,
  TypeDescription,
  TypeImage,
  RequestButtom,
  RequestButtomText,
} from "./styles";

import uberx from "../../assets/uberx.png";
import { Image } from "react-native";

const Details: React.FC = () => {
  return (
    <Container>
      <TypeText>Popular</TypeText>
      <TypeDescription>Viagem baratas para o dia a dia</TypeDescription>

      <Image source={uberx} />
      <TypeText>GetCarX</TypeText>
      <TypeDescription>R$6,00</TypeDescription>

      <RequestButtom onPress={() => console.log('Solicitando GetCarX')}>
        <RequestButtomText>SOLICITAR GetCarX</RequestButtomText>
      </RequestButtom>
    </Container>
  );
};

export default Details;
