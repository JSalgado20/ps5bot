import { GluegunPrint, GluegunPrompt } from 'gluegun'

const snakeCaseToSpaceSeparatedWord = (cronScheduleName: string) => {
  return cronScheduleName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, function (str) {
      return str.toUpperCase()
    })
    .toLowerCase()
}

export const input = async (
  cronScheduleName: string,
  prompt: GluegunPrompt,
  print: GluegunPrint
) => {
  const convertedcronScheduleName = snakeCaseToSpaceSeparatedWord(
    cronScheduleName
  )
  const result = await prompt.ask({
    type: 'input',
    name: cronScheduleName,
    message: `Enter your ${convertedcronScheduleName}.`
  })
  let cronSchedule: string
  if (result && result[cronScheduleName]) {
    cronSchedule = result[cronScheduleName]
  }
  // if they didn't provide one, we error out
  if (!cronSchedule) {
    print.error(`No ${convertedcronScheduleName} name specified!`)
    return
  }
  return cronSchedule
}
