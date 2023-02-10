class ConverterDataChannel {

  private individualsNumber: number;
  private numberIndividualsHousehold: number;

  constructor() {
    this.individualsNumber = parseFloat("26808336");
    this.numberIndividualsHousehold = parseFloat("1.6749");
  }

  //CÁLCULO DE DOMICÍLIOS LIGADOS
  CalculationConnectedHouseholds(shTotal: string): number {
    const shareHouseholdsConnected = parseFloat(shTotal);
    const totalConnectedHouseholds = this.individualsNumber * shareHouseholdsConnected / 100;
    return totalConnectedHouseholds;
  }

  //CÁLCULO DE INDIVÍDUOS LIGADOS
  CalculateLinkedIndividuals(shTotal: string): number {
    const calculationConnectedHouseholds = this.CalculationConnectedHouseholds(shTotal);
    const numberIndividualsHouseHold = this.numberIndividualsHousehold;
    const linkedIndividuals = calculationConnectedHouseholds * numberIndividualsHouseHold;
    return linkedIndividuals;
  }

  //CÁLCULO POR CANAL
  CalculationChannel(shTotal: string, shareChannel: string): number {
    const connectedIndividuals = this.CalculateLinkedIndividuals(shTotal);
    const linkedIndividuals = connectedIndividuals * parseFloat(shareChannel) / 100;
    return this.RemoveDuplicityYoutube(linkedIndividuals);
  }

  //REMOVE DUPLICIDADE YOUTUBE
  RemoveDuplicityYoutube(linkedIndividuals: number) {
    const withoutDuplicationYoutube = 3.21 / 100;
    let per: number = linkedIndividuals - (linkedIndividuals * withoutDuplicationYoutube);
    return per;
  }

  //Novo calculo
  CalculationNew(shTotal:string, shareChannel: string, keyChannel: string): number {
    //1.14 = numero medio de pessoas por domicilio em news
    //1.6749 = fator de correção anatel x Kantar

    const households:number = ((parseFloat(shTotal) / 100) * (this.individualsNumber * 1.14));
    const individualsByChannel:number = households * (parseFloat(shareChannel) / 100);
    const individualsByChannelAnatel:number = individualsByChannel * 1.6749;

    if (keyChannel !== "GLOBONEWS") {
      return this.RemoveDuplicityYoutube(individualsByChannelAnatel);
    }
    return individualsByChannelAnatel;
  }
}

export { ConverterDataChannel }