
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

*/

#include <LiquidCrystal.h>
#include <SPI.h>
#include <Adafruit_PN532.h>

// If using the breakout with SPI, define the pins for SPI communication.
#define PN532_SCK  (9)
#define PN532_MOSI (7)
#define PN532_SS   (6)
#define PN532_MISO (8)

Adafruit_PN532 nfc(PN532_SCK, PN532_MISO, PN532_MOSI, PN532_SS);

uint8_t ndefprefix = NDEF_URIPREFIX_HTTP_WWWDOT;

// initialize the library by associating any needed LCD interface pin
// with the arduino pin number it is connected to
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

void setup(void) {
  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  lcd.print("hello");
  delay(2000);
  Serial.begin(9600);
  while (!Serial) delay(10); // for Leonardo/Micro/Zero

  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  // configure board to read RFID tags
  nfc.SAMConfig();  
}

void loop(void) 
{
   String address;
  lcd.setCursor(0, 0);
  if(Serial.available()){
   address = Serial.readString();
   lcd.print(address);
   lcd.setCursor(0, 1);
   lcd.print(":8080");
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Buffer to store the returned UID
  uint8_t uidLength;                        // Length of the UID (4 or 7 bytes depending on ISO14443A card type)
  uint8_t dataLength;

  // 1.) Wait for an NTAG203 card.  When one is found 'uid' will be populated with
  // the UID, and uidLength will indicate the size of the UID (normally 7)
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);
  
  // It seems we found a valid ISO14443A Tag!
  if (success) 
  {
    // 2.) Display some basic information about the card
    nfc.PrintHex(uid, uidLength);
    
      uint8_t data[32];
      
      // 3.) Check if the NDEF Capability Container (CC) bits are already set
      // in OTP memory (page 3)
      memset(data, 0, 4);
      
          // 4.) Determine and display the data area size
          dataLength = data[2]*8;
          
          // 5.) Erase the old data area
          for (uint8_t i = 4; i < (dataLength/4)+4; i++) 
          {
            memset(data, 0, 4);
            success = nfc.ntag2xx_WritePage(i, data);
          }
          
          // 6.) Try to add a new NDEF URI record
          char url[40];
          address.toCharArray(url, 40);
          success = nfc.ntag2xx_WriteNDEFURI(ndefprefix, url, dataLength);
                    
        } }}
    
