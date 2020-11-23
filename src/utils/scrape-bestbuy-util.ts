import * as puppeteer from 'puppeteer'
//import * as notifier from 'node-notifier'

export const scrapeBestBuy = async (config: { [key: string]: string }) => {
  const {
    bestBuyEmail,
    bestBuyPassword,
    //cvv
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

    console.log("Waiting for the page to load")
    await page.waitForTimeout(10000)

    //Go to item page
    await page.goto(
      //Paper Link
      'https://www.bestbuy.com/site/insignia-92-bright-multipurpose-paper-500-count-white/2449084.p?skuId=2449084'
      //Digital PS5 Link
      //'https://www.bestbuy.com/site/sony-playstation-5-digital-edition-console/6430161.p?skuId=6430161'
    )


    console.log("Trying to find add to cart")
    // keep refreshing until "Add to Cart is visible"
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
        await page.reload()
      }
    }

    console.log("Trying to click Add to cart")
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

    console.log("Trying to checkout")

    //Checkout Button
    await page.waitForTimeout(10000)
    const checkoutButton = await page.$('button[data-track="Checkout - Top"]')
    await checkoutButton.click()

    await page.waitForTimeout(10000)

    const placeYourOrder = await page.$('button[class="btn btn-lg btn-block btn-primary button__fast-track"]')
    await placeYourOrder.click()

  } catch (error) {
    console.log(error)
  } finally {
    await browser.close();
  }
}


/*
/identity/signin?token=tid%3A39f718ee-2d0a-11eb-95ae-12e142c46721'
      //Sign in link with return to power beats pro
      //'https://www.bestbuy.com/identity/signin?token=tid%3A7a7d6cf9-2cf2-11eb-8fef-0a2bfd6cfd27'
      //Sign in link with return to usb drive
      //'https://www.bestbuy.com/identity/signin?token=tid%3A9895e0c1-2cf9-11eb-9a24-0e7bb6f6e84f'
      //Sign in link with return to playstation
      //'https://www.bestbuy.com/identity/signin?token=tid%3A87ac6c5e-2cec-11eb-939b-0e51b584aadb'
      */