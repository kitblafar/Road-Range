#include <SoftwareSerial.h>

SoftwareSerial mySerial(7, 13); // RX, TX

void setup() {
  // put your setup code here, to run once:
  mySerial.print("AT+IPR=115200\r\n");
  mySerial.begin(115200); //Comminicate with the device.
  Serial.begin(57600); //Communicate with the SerialMonitor.
  delay(100);

  Serial.print("AT+MODE=0\r\n");
  mySerial.print("AT+MODE=0\r\n");
  delay(100);

  Serial.print("AT+PARAMETER=10,7,1,7\r\n");//For More than 3Kms
  mySerial.print("AT+PARAMETER=10 ,7,1,7\r\n");
  delay(100);   //wait for module to respond

  Serial.print("AT+BAND=868500000\r\n");    //Bandwidth set to 868.5MHz
  mySerial.print("AT+BAND=868500000\r\n");
  delay(100);   //wait for module to respond

  Serial.print("AT+ADDRESS=116\r\n");   //needs to be unique
  mySerial.print("AT+ADDRESS=116\r\n");
  delay(100);   //wait for module to respond

  Serial.print("AT+NETWORKID=6\r\n");   //needs to be same for receiver and transmitter
  mySerial.print("AT+NETWORKID=6\r\n");
  delay(100);   //wait for module to respond
}

void loop() {
  // put your main code here, to run repeatedly:
  String inString;
  while (mySerial.available())
  {

    if (mySerial.available()) {
      inString += String(char(mySerial.read()));
    }
  }
  if (inString.length() > 0)
  {
    Serial.print("Recieved value is: ");
    Serial.print(inString[11]);
    Serial.print(inString[12]);
    Serial.print(inString[13]);
    Serial.print(inString[14]);
    Serial.print("\n");
    inString.remove(0);
  }
}
