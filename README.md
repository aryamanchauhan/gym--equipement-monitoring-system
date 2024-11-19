# Intelligent Gym Equipment Management System
## Overview
The **Intelligent Gym Equipment Management System** is a technology-driven solution designed to enhance gym resource management and streamline user experiences. By leveraging **Near Field Communication (NFC)** technology, **proximity sensors**, and an **Arduino-based controller**, this system automates workout tracking and equipment usage monitoring.

### Key Features:
- **Hands-Free Workout Tracking**: Proximity sensors and NFC readers log equipment usage automatically.
- **Real-Time Data Streaming**: Enables live updates on equipment availability and user activity using an Express.js server with WebSocket integration.
- **User Authentication**: NFC ensures secure and seamless user identification.
- **Improved Efficiency**: Offers gym managers detailed insights into equipment utilization and maintenance needs.

## System Architecture
The system integrates hardware components and software frameworks for optimal performance:

### Hardware Components:
- **Arduino Microcontroller**: Core processing unit for sensors and NFC readers.
- **NFC Reader**: Authenticates users via NFC-enabled devices.
- **Proximity Sensors**: Detect user presence and automate workout session logging.
- **LCD Screen**: Displays user ID and session details.
- **Wi-Fi Module**: Facilitates server communication.

### Software Stack:
- **Express.js Server**: Handles data processing and client communication.
- **WebSocket Protocol**: Enables real-time updates.
- **Frontend Interface**: Mobile-friendly design for user workout data and administrator dashboards.

## Features in Detail
### User Experience:
1. Users authenticate themselves by scanning an NFC-enabled card or smartphone.
2. Proximity sensors detect user presence and log workout duration.
3. Workout data is displayed on an LCD and updated in real-time for both users and gym administrators.

### Administrator Benefits:
- Monitor equipment usage live.
- Generate detailed reports on gym activity.
- Optimize equipment maintenance schedules based on real-time data.

## System Setup
### Prerequisites:
1. **Hardware**:
   - Arduino board with NFC reader, proximity sensors, and LCD.
   - Wi-Fi module for server connectivity.
2. **Software**:
   - Node.js and Express.js for the server.
   - Arduino IDE for microcontroller programming.

### Installation:
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/IntelligentGymSystem.git
   ```

2. Navigate to the project directory:
   ```bash
   cd IntelligentGymSystem
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Upload the Arduino code from the hardware directory to your microcontroller.

5. Start the server:
   ```bash
   node server.js
   ```

6. Access the system via the provided frontend or API.

## Project Results
- **Accuracy**: Reliable logging of workout sessions with NFC and proximity sensors.
- **Real-Time Functionality**: Instant updates for users and administrators.
- **Enhanced Gym Management**: Simplified tracking of equipment status and user engagement.

## Future Work
- **Wearable Integration**: Compatibility with fitness trackers for more personalized insights.
- **AI Analytics**: Intelligent workout recommendations and user behavior insights.
- **Offline Mode**: Ensure functionality in low-connectivity environments.

## Authors
- Aditya Pratap Singh
- Aryaman Chauhan
- Kshitij Sharma

**Supervisor**: Dr. Pradeep K, School of Computer Science and Engineering, Vellore Institute of Technology.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
Special thanks to Dr. P. Nithyanandam and the faculty at Vellore Institute of Technology for their guidance and support.

## References
- WO2016037012A1 - Fitness Data Using Sensors
- WO2015038051A1 - Gym Equipment Digitization
- US20160361601A1 - NFC Integrated Treadmill Module
