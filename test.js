const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTests() {

  const options = new chrome.Options();
  options.addArguments('--start-maximized');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();


  try {
    //Login to goodreads
    await driver.get('https://www.goodreads.com/');
    await driver.sleep(1000);
    await driver.findElement(By.css('a[href="/user/sign_in"]')).click();
    await driver.findElement(By.xpath('/html/body/div[1]/div[1]/div[2]/div/div/div/div[1]/div/a[5]/button')).click();
    await driver.sleep(1000);
    await driver.findElement(By.id('ap_email')).sendKeys('htmlqwerty84@gmail.com');
    await driver.findElement(By.id('ap_password')).sendKeys('987654321', Key.RETURN);

    //Search for a specific book title
    await driver.findElement(By.xpath('/html/body/div/div/div[2]/div/header/div[2]/div/div[2]/form/input[1]')).sendKeys('Brave New World', Key.RETURN);
    await driver.sleep(2000);

    // Mark it as 'want to read' 
    await driver.findElement(By.xpath('/html/body/div[2]/div[3]/div[1]/div[2]/div[2]/table/tbody/tr[1]/td[2]/div[2]/div/div[1]/form/button')).click();
    await driver.sleep(2000);

    //Remove the selected book from my book list
    await driver.findElement(By.css('a[href="/review/list/167814435?ref=nav_mybooks"]')).click();
    await driver.sleep(2000);
    await driver.findElement(By.className('actionLinkLite smallText deleteLink')).click();
    await driver.wait(until.alertIsPresent());
    await driver.switchTo().alert().accept();

    //Logout
    await driver.findElement(By.className('circularIcon circularIcon--border')).click();
    await driver.sleep(2000);
    await driver.findElement(By.css('a[href="/user/sign_out?ref=nav_profile_signout"]')).click();

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

runTests();

