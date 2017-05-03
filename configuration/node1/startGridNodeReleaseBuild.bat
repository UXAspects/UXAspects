cd C:\Git\UXAspects

java -Dwebdriver.chrome.driver="C:\Selenium\ChromeDriver\chromedriver.exe" -Dwebdriver.gecko.driver="C:\Selenium\GeckoDriver\geckodriver.exe" -Dwebdriver.ie.driver="C:\Selenium\IEDriverServer\IEdriverServer.exe" -jar C:\Selenium\selenium-server-standalone-3.3.1.jar -role node -nodeConfig C:\Git\UXAspects\configuration\node1\nodeConfigReleaseBuild.json

