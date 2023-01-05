class ConverterDataChannel {

    private individualsNumber : number;
    private numberHomes : number;

    constructor() {
        this.individualsNumber = parseFloat("25882108");
        this.numberHomes = parseFloat("71382065");
    }

    //ESTIMATIVAS KANTAR
    KantarIestimated(): number {
      const numberIndividualsHousehold = this.numberHomes / this.individualsNumber;
      return numberIndividualsHousehold;
    }

    //CÁLCULO DE DOMICÍLIOS LIGADOS
    CalculationConnectedHouseholds(shTotal: string): number {
      const shareHouseholdsConnected = parseFloat(shTotal);
      const totalConnectedHouseholds =  this.individualsNumber * shareHouseholdsConnected / 100;
      return totalConnectedHouseholds;
    }

    //CÁLCULO DE INDIVÍDUOS LIGADOS
    CalculateLinkedIndividuals(shTotal: string): number {
      const calculationConnectedHouseholds = this.CalculationConnectedHouseholds(shTotal);
      const numberIndividualsHouseHold = this.KantarIestimated();
      const linkedIndividuals = calculationConnectedHouseholds * numberIndividualsHouseHold;
      return linkedIndividuals;
    }

    //CÁLCULO POR CANAL
    CalculationChannel(shTotal: string, shareChannel: string): number {
      const connectedIndividuals = this.CalculateLinkedIndividuals(shTotal);
      const linkedIndividuals = connectedIndividuals * parseFloat(shareChannel) / 100;
      return linkedIndividuals;
    }

    // removeDuplicityYoutube(shTotal: string, shareChannel: string) {
    //   const connectedIndividualsChannel = this.calculationChannel(shTotal, shareChannel);
    //   const withoutDuplicationYoutube = 0.15;
    //   const per = connectedIndividualsChannel - withoutDuplicationYoutube;
    //   return per;
    // }
  }

  export { ConverterDataChannel }