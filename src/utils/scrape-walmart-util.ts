import * as puppeteer from 'puppeteer'
//import * as notifier from 'node-notifier'

export const scrapeWalmart = async (config: { [key: string]: string }) => {
  const {
    email,
    //phoneNumber,
    //firstName,
    //lastName,
    //state,
    //city,
    //zipCode,
    //address,
    //creditCardNumber,
    //expirationMonth,
    //expirationYear,
    cvv,
    walmartPassword
  } = config

  const browser = await puppeteer.launch({
    headless: false,
    args: ['--window-size=1920,1080'],
    defaultViewport: null
  })

  try {
    const page = await browser.newPage()
    await page.setRequestInterception(true)

    page.on('request', async req => {
      if (req.resourceType() === 'image') {
        await req.abort()
      } else {
        await req.continue()
      }
    })

    await page.goto(
      //Sign in link with return to playstation
      //'https://www.walmart.com/account/login?tid=0&returnUrl=%2Fip%2FSony-PlayStation-5-Digital-Edition%2F493824815'

      //Sign in link with return to Bai
      'https://www.walmart.com/account/login?tid=0&returnUrl=%2Fip%2FBai-Cocofusions-Variety-Pack-Version-II-Antioxidant-Infused-Beverage%2F514625433'
      //Regular links
      //'https://www.walmart.com/ip/Sony-PlayStation-5-Digital-Edition/493824815'
      //'https://www.walmart.com/ip/Bai-Cocofusions-Variety-Pack-Version-II-Antioxidant-Infused-Beverage/514625433?athcpid=514625433&athpgid=athenaHomepage&athcgid=dealspage-home-4374018&athznid=inspiredByRVIPageWPP&athieid=v1&athstid=CS023&athguid=466001f5-9a18a716-a742bfc59f15260d&athancid=null&athena=true'
      //'https://www.walmart.com/ip/Sony-PlayStation-5-DualSense-Wireless-Controller/615549727'
    )

    //Wait till sign in button is visible
    while (true) {
      try {
        await page.waitForSelector(
          'button[data-automation-id="signin-submit-btn"]',
          {
            timeout: 10000
          }
        )
        break
      } catch (error) {
      }
    }

    await page.type('input[name="email"]', email)
    await page.type('input[name="password"]', walmartPassword)

    const signInButton = await page.$(
      'button[data-automation-id="signin-submit-btn"]'
    )
    await signInButton.click()

    // keep refreshing until "Add to Cart is visible"
    while (true) {
      try {
        await page.waitForSelector(
          'button[data-tl-id="ProductPrimaryCTA-cta_add_to_cart_button"]',
          {
            timeout: 2000
          }
        )
        break
      } catch (error) {
        await page.reload()
      }
    }

    //Add To Cart
    const addToCartButton = await page.$(
      'button[data-tl-id="ProductPrimaryCTA-cta_add_to_cart_button"]'
    )
    await addToCartButton.click()

    await page.waitForTimeout(1000)

    //Check Out Button
    const checkoutButton = await page.$(
      'button[data-automation-id="pac-pos-proceed-to-checkout"]'
    )
    await checkoutButton.click()
    await page.waitForTimeout(1000)

    //
    //CONFIRMATION PAGE
    //

    //First Continue Button
    const continueButton1 = await page.$('button[data-automation-id="fulfillment-continue"]')
    await continueButton1.click()
    await page.waitForTimeout(1000)

    //Second Continue Button
    const continueButton2 = await page.$('button[data-automation-id="address-book-action-buttons-on-continue"]')
    await continueButton2.click()
    await page.waitForTimeout(1000)

    //Input CVV
    await page.type('input[name="cvv"]', cvv)

    //Review Order Button
    const reviewOrderButton = await page.$('button[data-automation-id="submit-payment-cc"]')
    await reviewOrderButton.click()

    // wait for possible captcha
    await page.waitForSelector('input[name="creditCard"]', {
      timeout: 900000
    })

    // await page.waitForTimeout(4000)
    //const placeOrderButton = await page.$(
    // 'button[data-test="placeOrderButton"]'
    //)
    //placeOrderButton.click()

  } catch (error) {
    console.log(error)
  } finally {
    // await browser.close();
  }
}
