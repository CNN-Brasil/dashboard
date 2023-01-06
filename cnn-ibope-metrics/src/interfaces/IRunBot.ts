interface IRunBotParamsDTO {
  url: string,
  key: string
}

interface IRunBot {
  RunBot(params: IRunBotParamsDTO): Promise<object>
}

export { IRunBot, IRunBotParamsDTO };
