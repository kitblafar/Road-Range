/*MEng Group Project Receiver Code 
 * 
 Demonstrates the use a 16x2 LCD display, NFC and LoRa
 
  The circuit:
 * LCD RS pin to digital pin 12
 * LCD Enable pin to digital pin 11
 * LCD D4 pin to digital pin 5
 * LCD D5 pin to digital pin 4
 * LCD D6 pin to digital pin 3
 * LCD D7 pin to digital pin 2
 * LCD R/W pin to ground
 * LCD VSS pin to ground
 * LCD VCC pin to 5V
 * 10K resistor:
 * ends to +5V and ground
 * wiper to LCD VO pin (pin 3)
 
 *LoRa and NFC share SPI pins 
 *MOSI= digital pin 7
 *SCK= digital pin 9
 *SS= digtal pin 6
 *MISO=digital pin 8

*/

// include the library code:
#include <LiquidCrystal.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

// If using the breakout with SPI, define the pins for SPI communication.
#define PN532_SCK  (10)
#define PN532_MISO (9)
#define PN532_MOSI (8)
#define PN532_SS   (7)

Adafruit_PN532 nfc(PN532_SCK, PN532_MISO, PN532_MOSI, PN532_SS);
uint8_t ndefprefix = NDEF_URIPREFIX_HTTP;
char *url;

// initialize the library by associating any needed LCD interface pin
// with the arduino pin number it is connected to
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

void setup() {
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);

  nfc.begin();
  //begin serial connection
  Serial.begin(9600);
  // configure board to read RFID tags
  nfc.SAMConfig();  
}

void loop() {
  lcd.clear();
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  uint8_t dataLength;
  
  String address;
  
  if(Serial.available()>0){
   address = Serial.readString();
   //NFC
  // Wait for an NTAG203 card.  When one is found 'uid' will be populated with
  // the UID, and uidLength will indicate the size of the UID (normally 7)
     success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
     if (success){
    nfc.PrintHex(uid, uidLength);
    uint8_t data[32];
    memset(data, 0, 4);
      nfc.ntag2xx_ReadPage(3, data);
      dataLength = data[2]*8;
      //erase old data
         for (uint8_t i = 4; i < (dataLength/4)+4; i++) 
          {
            memset(data, 0, 4);
            success = nfc.ntag2xx_WritePage(i, data);
          }
        String addressfull=address+":8080";
        char urlArray[25];
        addressfull.toCharArray(urlArray, 26);
        url=urlArray;
        nfc.ntag2xx_WriteNDEFURI(ndefprefix, url, dataLength);
     }
     
     //LCD
     
     lcd.clear();
lcd.setCursor(0, 0);
String addressToPrint=address+"    ";
     lcd.print(addressToPrint);
lcd.setCursor(0, 1);
lcd.print(":8080           ");
  }
}
