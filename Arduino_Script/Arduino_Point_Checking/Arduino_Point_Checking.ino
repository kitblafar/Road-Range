
void setup() {
  Serial.begin(9600);
}

void loop() {
  int x1;
  int x2;
  int x3;
  int x4;
 
  for (int x=0; x<7; x++){
   String x1=String(x);
    String x2=String(x*x);
    String x3=String(-x);
    String x4=String(-x*x);
   Serial.println(x1+","+x2+","+x3+","+x4);
   delay(96000);
  }

 }
 
