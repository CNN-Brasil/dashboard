interface IRunBotParamsDTO {
  url: string,
  key: string
}

interface IRunBot {
  RunBot(params: IRunBotParamsDTO): Promise<Boolean>
}

export { IRunBot, IRunBotParamsDTO };