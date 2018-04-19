package com.example.tests;

import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class TestClientTrucks {
  private WebDriver driver;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();

  @Before
  public void setUp() throws Exception {
	System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir")+"/chromedriver");
    driver = new ChromeDriver();
    baseUrl = "http://localhost:4200";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
  }

  @Test
  public void shouldShowClientMap() throws Exception {
    driver.get("http://localhost:4200/home");
    driver.findElement(By.xpath("//header/div/div")).click();
    driver.findElement(By.xpath("(//button[@type='button'])[2]")).click();
    try {
 	   Thread.sleep(5000);
 	} catch (InterruptedException e) {
 	   e.printStackTrace();
 	}
    driver.findElement(By.xpath("//input[@type='text']")).click();
  }
  
  @Test
  public void shouldShowLoadedTrucks() throws Exception {
    driver.get("http://localhost:4200/home");
    driver.findElement(By.xpath("//header/div/div")).click();
    driver.findElement(By.xpath("(//button[@type='button'])[2]")).click();
    try {
 	   Thread.sleep(5000);
 	} catch (InterruptedException e) {
 	   e.printStackTrace();
 	}
    driver.findElement(By.xpath("//div[@id='content']/ul/li")).click();
  }
  
  @Test
  public void shouldShowTruckMenu() throws Exception {
    driver.get("http://localhost:4200/home");
    driver.findElement(By.xpath("//header/div/div")).click();
    driver.findElement(By.xpath("(//button[@type='button'])[2]")).click();
    try {
 	   Thread.sleep(5000);
 	} catch (InterruptedException e) {
 	   e.printStackTrace();
 	}
    driver.findElement(By.xpath("//div[@id='content']/ul/li")).click();
    driver.findElement(By.xpath("//div[@id='content']/ul/li/div[2]/img")).click();
    try {
  	   Thread.sleep(2000);
  	} catch (InterruptedException e) {
  	   e.printStackTrace();
  	}
    driver.findElement(By.id("menu-item")).click();
  }
  
  @Test
  public void shouldShowTruckContact() throws Exception {
    driver.get("http://localhost:4200/home");
    driver.findElement(By.xpath("//header/div/div")).click();
    driver.findElement(By.xpath("(//button[@type='button'])[2]")).click();
    try {
 	   Thread.sleep(5000);
 	} catch (InterruptedException e) {
 	   e.printStackTrace();
 	}
    driver.findElement(By.xpath("//div[@id='content']/ul/li")).click();
    driver.findElement(By.xpath("//div[@id='content']/ul/li/div[2]/img[2]")).click();
    try {
  	   Thread.sleep(2000);
  	} catch (InterruptedException e) {
  	   e.printStackTrace();
  	}
    driver.findElement(By.xpath("//div[@id='modalContactForm']/div/div/div[2]/div/label")).click();
  }
  
  @Test
  public void shouldLogUserIn() throws Exception {
	    driver.get("http://localhost:4200/home");
	    driver.findElement(By.linkText("Login")).click();
	    driver.findElement(By.id("form3")).click();
	    driver.findElement(By.id("form3")).clear();
	    driver.findElement(By.id("form3")).sendKeys("rjames@example.com");
	    driver.findElement(By.id("form2")).clear();
	    driver.findElement(By.id("form2")).sendKeys("password");
	    driver.findElement(By.xpath("//div[4]/button")).click();
	    driver.findElement(By.linkText("Dashboard")).click();
	    try {
	   	   Thread.sleep(2000);
	   	} catch (InterruptedException e) {
	   	   e.printStackTrace();
	   	}
	    driver.findElement(By.linkText("Logout")).click();
  }
  
  @Test
  public void shouldSendRegistrationEmail() throws Exception {
	    driver.get("http://localhost:4200/home");
	    driver.findElement(By.linkText("Login")).click();
	    driver.findElement(By.linkText("Need an Account? Sign up!")).click();
	    driver.findElement(By.id("form1")).click();
	    driver.findElement(By.id("form1")).clear();
	    driver.findElement(By.id("form1")).sendKeys("rjames@example.com");
	    driver.findElement(By.id("form2")).clear();
	    driver.findElement(By.id("form2")).sendKeys("Richard");
	    driver.findElement(By.id("form3")).clear();
	    driver.findElement(By.id("form3")).sendKeys("James");
	    driver.findElement(By.id("form5")).clear();
	    driver.findElement(By.id("form5")).sendKeys("RJames Food Truck");
	    driver.findElement(By.xpath("//button[2]")).click();
	    try {
		   	   Thread.sleep(2000);
		   	} catch (InterruptedException e) {
		   	   e.printStackTrace();
		   	}
	    driver.findElement(By.xpath("//div[@id='centralModalSuccess']/div/div/div[2]/div/i")).click();
  }
  
  @Test public void shouldLoadProfileInfo() throws Exception {
	    driver.get("http://localhost:4200/home");
	    driver.findElement(By.linkText("Login")).click();
	    driver.findElement(By.id("form3")).click();
	    driver.findElement(By.id("form3")).clear();
	    driver.findElement(By.id("form3")).sendKeys("rjames@example.com");
	    driver.findElement(By.id("form2")).clear();
	    driver.findElement(By.id("form2")).sendKeys("password");
	    driver.findElement(By.xpath("//div[4]/button")).click();
	    driver.findElement(By.linkText("Dashboard")).click();
	    try {
	   	   Thread.sleep(4000);
	   	} catch (InterruptedException e) {
	   	   e.printStackTrace();
	   	}
	    driver.findElement(By.linkText("Start Sharing Location")).click();
	    driver.findElement(By.linkText("Stop Sharing Location")).click();
	    try {
	   	   Thread.sleep(1000);
	   	} catch (InterruptedException e) {
	   	   e.printStackTrace();
	   	}
	    driver.findElement(By.linkText("Logout")).click();
  }
  
  @Test
  public void shouldOpenEditMenuScreen() throws Exception {
	    driver.get("http://localhost:4200/home");
	    driver.findElement(By.linkText("Login")).click();
	    driver.findElement(By.id("form3")).click();
	    driver.findElement(By.id("form3")).clear();
	    driver.findElement(By.id("form3")).sendKeys("rjames@example.com");
	    driver.findElement(By.id("form2")).clear();
	    driver.findElement(By.id("form2")).sendKeys("password");
	    driver.findElement(By.xpath("//div[4]/button")).click();
	    driver.findElement(By.linkText("Dashboard")).click();
	    try {
	   	   Thread.sleep(4000);
	   	} catch (InterruptedException e) {
	   	   e.printStackTrace();
	   	}
	    driver.findElement(By.xpath("//a/span")).click();
  }
  @Test
  public void shouldEditMenuButNoChanges() throws Exception {
	    driver.get("http://localhost:4200/home");
	    driver.findElement(By.linkText("Login")).click();
	    driver.findElement(By.id("form3")).click();
	    driver.findElement(By.id("form3")).clear();
	    driver.findElement(By.id("form3")).sendKeys("rjames@example.com");
	    driver.findElement(By.id("form2")).clear();
	    driver.findElement(By.id("form2")).sendKeys("password");
	    driver.findElement(By.xpath("//div[4]/button")).click();
	    driver.findElement(By.linkText("Dashboard")).click();
	    try {
	   	   Thread.sleep(4000);
	   	} catch (InterruptedException e) {
	   	   e.printStackTrace();
	   	}
	    driver.findElement(By.xpath("//a/span")).click();
	    driver.findElement(By.xpath("//button[@id='update']/span")).click();
	    assertEquals("No changes.", closeAlertAndGetItsText());
}
  @Test
  public void shouldEditMenuAndMakeChanges() throws Exception {
	    driver.get("http://localhost:4200/home");
	    driver.findElement(By.linkText("Login")).click();
	    driver.findElement(By.id("form3")).click();
	    driver.findElement(By.id("form3")).clear();
	    driver.findElement(By.id("form3")).sendKeys("rjames@example.com");
	    driver.findElement(By.id("form2")).clear();
	    driver.findElement(By.id("form2")).sendKeys("password");
	    driver.findElement(By.xpath("//div[4]/button")).click();
	    driver.findElement(By.linkText("Dashboard")).click();
	    try {
	   	   Thread.sleep(4000);
	   	} catch (InterruptedException e) {
	   	   e.printStackTrace();
	   	}
	    driver.findElement(By.xpath("//a/span")).click();
	    try {
		   	   Thread.sleep(1000);
		   	} catch (InterruptedException e) {
		   	   e.printStackTrace();
		   	}
	    driver.findElement(By.id("item0")).click();
	    driver.findElement(By.id("item0")).clear();
	    driver.findElement(By.id("item0")).sendKeys("Honey Smoked Ham");
	    driver.findElement(By.xpath("//button[@id='update']/span")).click();
	    }
  
  

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}