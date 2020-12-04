import * as puppeteer from 'puppeteer'
//import * as notifier from 'node-notifier'

export const scrapeBestBuy = async (config: { [key: string]: string }) => {
  const {
    cvv,
    bestBuyEmail,
    bestBuyPassword,
    bestBuyLink
  } = config

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    defaultViewport: null
  })

  //Major Try catch, contains everything
  try {
    //Opens a new browser
    const page = await browser.newPage()
    await page.setRequestInterception(true)
    page.on('request', async req => {
      if (req.resourceType() === 'image') {
        await req.abort()
      } else {
        await req.continue()
      }
    })

    //Opens Play station link
    await page.goto(
      'https://www.bestbuy.com/identity/global/signin'
    )

    //Wait till sign in button is visible
    while (true) {
      try {
        await page.waitForSelector(
          'button[data-track="Sign In"]',
          {
            timeout: 10000
          }
        )
        break
      } catch (error) {
      }
    }

    //Enters sign in information
    await page.type('input[type="email"]', bestBuyEmail)
    await page.type('input[type="password"]', bestBuyPassword)

    //Clicks sign in button
    const signInButton = await page.$(
      'button[data-track="Sign In"]'
    )
    await signInButton.click()

    console.log("Best Buy: Waiting for the page to load")
    await page.waitForTimeout(10000)

    //Go to item page
    await page.goto(bestBuyLink)


    console.log("Best Buy: Trying to find add to cart")
    // keep refreshing until "Add to Cart" is visible
    while (true) {
      try {
        await page.waitForSelector(
          'button[class="btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button"]',
          {
            timeout: 10000
          }
        )
        break
      } catch (error) {
        try {
          await page.reload()
        }
        catch (error) {
          continue
        }
      }
    }

    console.log("Best Buy: Trying to click Add to cart")
    //Add To Cart
    //btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button
    //data-sku-id="6341994" //powerbeats pro
    //PS5 id: 6430161
    const addToCartButton = await page.$(
      'button[class="btn btn-primary btn-lg btn-block btn-leading-ficon add-to-cart-button"]'
    )
    //await page.waitForTimeout(10000)
    await addToCartButton.click()

    //await page.waitForTimeout(10000)


    //Go to Cart
    await page.goto('https://www.bestbuy.com/cart')

    console.log("Best Buy: Trying to checkout of here")

    //Checkout Button
    await page.waitForTimeout(10000)
    const checkoutButton = await page.$('button[data-track="Checkout - Top"]')
    await checkoutButton.click()

    await page.waitForTimeout(10000)
    await page.type('input[id="credit-card-cvv"]', cvv)

    const placeYourOrder = await page.$('button[class="btn btn-lg btn-block btn-primary button__fast-track"]')
    await placeYourOrder.click()

    await page.waitForTimeout(60000)

    console.log("Best Buy: Order submitted")

  } catch (error) {
    console.log(error)
  } finally {
    await browser.close();
  }
}
