long randNumber;

void setup() {
  Serial.begin(9600);
}

void loop() {
  // print a ramp of numers going up and down
  for (int y=-2; y<=2 ; y++){
  for (int x=1; x<10; x++){
    randNumber=x*y;
  Serial.println(randNumber);
  }}

  delay(50);
}
