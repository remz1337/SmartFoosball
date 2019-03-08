#! /usr/bin/python3
# Capturing goals and sending over MQTT
import time
import board
import busio
import adafruit_vcnl4010
import adafruit_tca9548a
import paho.mqtt.publish as publish
 
# Initialize I2C bus and VCNL4010 module.
i2c = busio.I2C(board.SCL, board.SDA)

# Create the TCA9548A object and give it the I2C bus - multiplexer
tca = adafruit_tca9548a.TCA9548A(i2c)

# For each sensor, create it using the TCA9548A channel instead of the I2C object - 2 sensors
vcnl4010_1 = adafruit_vcnl4010.VCNL4010(tca[1])
vcnl4010_6 = adafruit_vcnl4010.VCNL4010(tca[6])

sensor = adafruit_vcnl4010.VCNL4010(i2c)
 
# You can optionally adjust the sensor LED current.  The default is 200mA
# which is the maximum value.  Note this is only set in 10mA increments.
#sensor.led_current_mA = 120  # Set 120 mA LED current
 
# You can also adjust the measurement frequency for the sensor.  The default
# is 390.625 khz, but these values are possible to set too:
# - FREQUENCY_3M125: 3.125 Mhz
# - FREQUENCY_1M5625: 1.5625 Mhz
# - FREQUENCY_781K25: 781.25 Khz
# - FREQUENCY_390K625: 390.625 Khz (default)
#sensor.frequency = adafruit_vcnl4010.FREQUENCY_3M125  # 3.125 Mhz

CALIBRATION = 300
total_1 = 0
total_6 = 0

for j in range (0,CALIBRATION,1):   
    total_1 = total_1 + vcnl4010_1.proximity
    total_6 = total_6 + vcnl4010_6.proximity

BASELINE_1 = total_1 / CALIBRATION
BASELINE_6 = total_6 / CALIBRATION


UPPER_LIMIT_1 = BASELINE_1 * 1.25
UPPER_LIMIT_6 = BASELINE_6 * 1.25

detection_1 = False
detection_6 = False

score       = 0
 
# Main loop runs forever printing the proximity and light level.
while True:
    proximity_1 = vcnl4010_1.proximity
    proximity_6 = vcnl4010_6.proximity
#    print(proximity_1)
#    print(proximity_6)

    if proximity_1 > UPPER_LIMIT_1:         # Sensor 1
        detection_1 = True
    else:
        if detection_1 == True:
            publish.single(topic="smartfoosball/red", payload="goal", hostname="127.0.0.1", auth={"username":"smartfoosball", "password":"dfoos123"})
        detection_1 = False

    if proximity_6 > UPPER_LIMIT_6:         # Sensor 6
        detection_6 = True
    else:
        if detection_6 == True:
            publish.single(topic="smartfoosball/blue", payload="goal", hostname="127.0.0.1", auth={"username":"smartfoosball", "password":"dfoos123"})
        detection_6 = False
    
    time.sleep(0.5) 
