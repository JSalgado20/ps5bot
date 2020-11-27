import * as puppeteer from 'puppeteer'

export const scrapeTarget = async (config: { [key: string]: string }) => {
  const {
    cvv,
    targetEmail,
    targetPassword
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
      'https://www.target.com/account'
    )

    await page.waitForTimeout(5000)

    //Wait till sign in button is visible
    while (true) {
      try {
        await page.waitForSelector(
          'button[type="submit"]',
          {
            timeout: 10000
          }
        )
        break
      } catch (error) {
      }
    }

    //Enters sign in information
    await page.type('input[name="username"', targetEmail)
    await page.type('input[name="password"]', targetPassword)

    //Clicks sign in button
    const signInButton = await page.$(
      'button[type="submit"]'
    )
    await signInButton.click()

    console.log("Target: Waiting for the page to load")
    await page.waitForTimeout(10000)

    //Go to item page
    await page.goto(
      //Paper Link
      //'https://www.target.com/p/500ct-letter-printer-paper-white-up-38-up-8482/-/A-75001545#lnk=sametab'
      //Digital PS5 Link
      'https://www.target.com/p/playstation-5-digital-edition-console/-/A-81114596#lnk=sametab'
    )

    let pickUpOnly: boolean = false;
    let shipItOnly: boolean = false;


    console.log("Target: Trying to find add to cart")
    // keep refreshing until "Add to Cart" is visible
    while (true) {
      try {
        await page.waitForSelector(
          'button[data-test="orderPickupButton"]',
          {
            timeout: 10000
          }
        )
        pickUpOnly = true;
        break
      } catch (error) {
        try {
          await page.reload()
        }
        catch (error) {
          continue
        }
      }

      try {
        await page.waitForSelector(
          'button[data-test="orderPickupButton"]',
          {
            timeout: 10000
          }
        )
        shipItOnly = true;
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

    //Add To Cart
    console.log("Target: Trying to click Add to cart")

    if (pickUpOnly) {
      const addToCartButton = await page.$(
        'button[data-test="orderPickupButton"]'
      )

      await addToCartButton.click()
    }
    else if (shipItOnly) {
      const addToCartButtonShip = await page.$(
        'button[data-test="orderPickupButton"]'
      )

      await addToCartButtonShip.click()
    }


    //Go to Cart
    await page.goto('https://www.target.com/co-cart')

    console.log("Target: Trying to checkout of here")

    //Checkout Button
    await page.waitForTimeout(5000)
    const checkoutButton = await page.$('button[data-test="checkout-button"]')
    await checkoutButton.click()

    await page.waitForTimeout(5000)
    await page.type('input[data-test="credit-card-cvv-input"]', cvv)


    const placeYourOrder = await page.$('button[data-test="placeOrderButton"]')
    await placeYourOrder.click()

    await page.waitForTimeout(60000)

    console.log("Target: Order submitted")

  } catch (error) {
    console.log(error)
  } finally {
    await browser.close();
  }
}