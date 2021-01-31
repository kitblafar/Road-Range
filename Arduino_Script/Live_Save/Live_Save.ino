long randNumber1;
long randNumber2;
void setup() {
  Serial.begin(9600);

  // if analog input pin 0 is unconnected, random analog
  // noise will cause the call to randomSeed() to generate
  // different seed numbers each time the sketch runs.
  // randomSeed() will then shuffle the random function.
  randomSeed(analogRead(0));
}

void loop() {
  for (int x=1; x<=100; x++){
 // print a random number from 0 to 299
  randNumber1 = random(0, 300);
  Serial.println(randNumber1);

  delay(50);
  }
  for (int x=1; x<=4; x++){
  Serial.println(0); //four 0s indicates a change to saved data

  delay(50);
  }
   
   for (int x=1; x<=500; x++){
 // print a random number from 0 to 299
  randNumber2 = random(0, 300);
  Serial.println(randNumber2);

  delay(50);
  }
   
    
}
