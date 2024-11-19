#include <LiquidCrystal.h>
#include <SoftwareSerial.h>
#include <WiFiNINA.h>

// WiFi credentials
char ssid[] = "YourWiFiSSID";     // Replace with your WiFi network name
char pass[] = "YourWiFiPassword"; // Replace with your WiFi password

// ThingSpeak settings
char server[] = "api.thingspeak.com";
String writeAPIKey = "YourThingSpeakWriteAPIKey"; // Replace with your ThingSpeak Write API Key

// Initialize the LCD library
LiquidCrystal lcd(13, 12, 11, 10, 9, 8);
SoftwareSerial mySerial(A4, A5);

const int RedlED = 5;
const int GreenlED = 6;
const int Buzzer = 7;
const int SensorPin = A0;

unsigned long lastTime = millis();
unsigned long timeInMil = 0;
int time = 0;
int count = 0;
char c;
String id;

int wait = 5000;
int status = WL_IDLE_STATUS;
WiFiClient client;

void setup() {
    Serial.begin(9600);
    mySerial.begin(9600);
    pinMode(RedlED, OUTPUT);
    pinMode(GreenlED, OUTPUT);
    pinMode(Buzzer, OUTPUT);
    pinMode(SensorPin, INPUT);
    mySerial.println("Please scan your RFID Card");

    lcd.begin(20, 4);
    lcd.setCursor(0, 0);
    lcd.print(" CARD:   ");
    lcd.setCursor(0, 2);
    lcd.print("time: ");
    lcd.print(0);
    lcd.print(" sec  ");

    // Connect to WiFi
    while (status != WL_CONNECTED) {
        Serial.print("Attempting to connect to SSID: ");
        Serial.println(ssid);
        status = WiFi.begin(ssid, pass);
        delay(10000);
    }
    Serial.println("Connected to WiFi");
    printWiFiStatus();
}

void loop() {
    float Volts = analogRead(SensorPin) * 0.0048828125;
    int Distance = 65 * pow(Volts, -1.10);

    lcd.setCursor(0, 3);
    lcd.print("Distance: ");
    lcd.print(Distance);
    lcd.print(" cm   ");

    while (Serial.available() > 0) {
        c = Serial.read();
        count++;
        id += c;
    }

    mySerial.print("id: ");
    mySerial.println(id);

    if (Distance < 25) {
        timeInMil += millis() - lastTime;
        mySerial.println(timeInMil);
        time = timeInMil / 1000;
        lcd.setCursor(0, 2);
        lcd.print("time: ");
        lcd.print(time);
        lcd.print(" sec  ");

        if (time > 2 && count == 12) {
            mySerial.print(id);
            mySerial.println(" -> Valid Card");
            lcd.setCursor(0, 1);
            lcd.print(id);

            digitalWrite(GreenlED, HIGH);

            // Send data to ThingSpeak
            sendToThingSpeak(id, Distance, time);
        }
    } else {
        count = 0;
        id = "";
        timeInMil = 0;
        time = 0;
        lcd.setCursor(0, 1);
        lcd.print("                 ");
        digitalWrite(GreenlED, LOW);
        lcd.setCursor(0, 2);
        lcd.print("time: ");
        lcd.print(0);
        lcd.print(" sec  ");
    }

    lastTime = millis();
    delay(500);
}

void sendToThingSpeak(String cardId, int distance, int duration) {
    if (client.connect(server, 80)) {
        String postStr = writeAPIKey;
        postStr += "&field1=";
        postStr += cardId;
        postStr += "&field2=";
        postStr += String(distance);
        postStr += "&field3=";
        postStr += String(duration);
        postStr += "\r\n\r\n";

        client.print("POST /update HTTP/1.1\n");
        client.print("Host: api.thingspeak.com\n");
        client.print("Connection: close\n");
        client.print("X-THINGSPEAKAPIKEY: " + writeAPIKey + "\n");
        client.print("Content-Type: application/x-www-form-urlencoded\n");
        client.print("Content-Length: ");
        client.print(postStr.length());
        client.print("\n\n");
        client.print(postStr);

        Serial.println("Data sent to ThingSpeak");
    }
    client.stop();
}

void printWiFiStatus() {
    Serial.print("SSID: ");
    Serial.println(WiFi.SSID());
    IPAddress ip = WiFi.localIP();
    Serial.print("IP Address: ");
    Serial.println(ip);
    long rssi = WiFi.RSSI();
    Serial.print("Signal strength (RSSI):");
    Serial.print(rssi);
    Serial.println(" dBm");
}