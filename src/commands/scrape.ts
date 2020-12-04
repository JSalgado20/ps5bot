//const config = JSON.parse(fs.readFileSync('/Users/mustafasoby/Documents/coding/PS5Bot/PS5bot/config.json', 'utf8'))

import * as fs from 'fs'
import { GluegunToolbox } from 'gluegun'
import { TARGET, BESTBUY } from '../contants'
import { scrapeTarget } from '../utils/scrape-target-util'
import { scrapeBestBuy } from '../utils/scrape-bestbuy-util'

module.exports = {
  name: 'scrape',
  alias: ['s'],
  description: 'Runs the webscraper',
  run: async (toolbox: GluegunToolbox) => {
    // retrieve the tools from the toolbox that we will need
    const { prompt } = toolbox

    const config = JSON.parse(fs.readFileSync('../config.json', 'utf8'))

    const { sitesToScrape }: { sitesToScrape: string[] } = await prompt.ask({
      type: 'multiselect',
      name: 'sitesToScrape',
      message: `Which sites do you want to scrape? (press space to select)`,
      choices: [TARGET, BESTBUY]
    })

    if (sitesToScrape.length === 3) {
      await Promise.allSettled([
        scrapeTarget(config),
        scrapeBestBuy(config)
      ])
    } else {
      if (sitesToScrape.includes(TARGET)) {
        scrapeTarget(config)
      }
      if (sitesToScrape.includes(BESTBUY)) {
        scrapeBestBuy(config)
      }
    }
  }
}
