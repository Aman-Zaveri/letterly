import re
import pyperclip
from g4f.client import Client
from utils.filter_text import filter_text


def generate_text(organization, job_title):
    client = Client()
    output = ""

    while len(output.split()) > 400 or len(output.split()) < 100:

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "user",
                    "content": f"""
Pretend your name is Aman Zaveri and you need to write a cover letter for a job using the work experience, projects, and skills listed below. First find information about the job such as the projects they are working on, their goals as a company, what they have done in the past, and much more. Include keywords and phrases in the cover letter while still make it persuasive and professional. Make sure the cover letter shows why you fit the role using specific information from your projects and skills. For the company, be very specific on how exactly you can help them with certain goals and projects they have. Keep it under 200 words. Only return paragraphs, not the full cover letter. Only use relevant information in the resume posted below. Do not lie or add any extra information to the cover letter. Only use the skills, projects, and work experience listed below. Do not use bullet points. Only full paragprahs and sentences. Make sure the cover letter is atleast 4 paragraphs. The output should begin with "Dear Hiring Manager, " and end with "Sincerely, Aman Zaveri". Don't reference back to the resume in the cover letter. Don't add any bolding or styling to the text, just leave the text plain. Keep in mind that I am still in university and have no graduated yet.

The output should look like this:
Dear Hiring Manager,

Ullamco ut id id ullamco aliqua occaecat dolore qui ipsum non adipisicing. Duis deserunt aute aliqua officia sint in. Non duis minim commodo eiusmod esse aliqua nostrud elit.

Dolore enim voluptate ex occaecat. Cupidatat consequat veniam aliquip do aliquip. Culpa magna culpa cillum dolore magna eu reprehenderit magna adipisicing velit sit aute cillum. Ea nulla mollit Lorem minim anim est commodo eiusmod tempor dolore laborum amet consectetur.

Cupidatat Lorem mollit anim elit esse officia duis qui cillum aute elit proident do. Cupidatat dolore voluptate proident fugiat labore aliqua excepteur. Consequat dolore fugiat aute Lorem aliquip tempor sunt eiusmod. Nisi ea consectetur enim qui do deserunt magna aliqua sit magna do occaecat anim.

Veniam labore eu velit voluptate eu dolore et ullamco esse proident aliqua dolor sit. Commodo laboris elit ullamco qui incididunt ipsum occaecat consequat consequat Lorem quis ea aliqua ut. Esse irure irure excepteur excepteur nulla occaecat magna. Tempor voluptate labore nulla eiusmod esse culpa aute et culpa aute ut eiusmod. Ea adipisicing aliquip et mollit amet ullamco officia in cillum proident reprehenderit pariatur Lorem. Duis velit nisi consectetur sit incididunt est anim. Officia id nulla consectetur anim tempor aliquip ullamco tempor.

Sincerely,

Aman Zaveri

SKILL
Programming Skills: Python, C, C++ Next.JS 14, SQL, Typescript, Arduino
Tools: GitHub, MongoDB, SQLite Studio, Vercel, Jupyter Notebook
________________________________________
WORK EXPERIENCE
Software Quality Assurance Engineer, Transpire Technologies                                                            
•	Developed a Python-driven event scraper utilizing Selenium to systematically gather event data from various online sources, achieving a 95% reduction in data collection time compared to manual methods. Implemented LLM’s to analyze and classify extracted information, resulting in a 90% accuracy rate in event classification based on relevancy towards company goals. Organized and stored data in Excel using Openpyxl, facilitating easy access and further analysis.
•	Developed a grade tracking application using Next.js 14, Shadcn and Python. Utilized Flask to build APIs, Redis for server-side caching, optimizing application performance and scalability, and bcrypt for secured password hashing, achieving a 95% reduction in password-related security incidents.
•	Leveraged Playwright and Robot Framework for automation testing, resulting cutting manual testing efforts in half and a 60% increase in test coverage. Implemented robust test suites to validate functionality, performance, and user experience across multiple browsers and devices, ensuring software quality and reliability.
•	Managed database operations using SQL and SQLite Studio, ensuring efficient storage, retrieval, and manipulation of data. Implemented SQL Alchemy ORM to map Python objects, reducing code complexity by 20% and reducing database-related bugs by 50%.

WIFI Software Engineer, Ford Motor Company (This job happens in the future)
• Expected to collaborate in an Agile development environment to deliver advanced software solutions for cloud-connected in-vehicle modules using CAN and Ethernet networks, enhancing vehicle communication and connectivity.
• Tasked with designing, implementing, and maintaining automation test scripts using Python and Selenium, ensuring high-quality performance and reliability of in-vehicle WiFi systems.
• Responsible for Object-Oriented software design principles with Python, and utilize Git for version control, facilitating seamless collaboration and efficient code management.
• Planning to propose and implement process improvements, including advanced logging mechanisms and performance monitoring tools, to optimize development workflows and system diagnostics.

Firmware Developer, Electrium Mobility
•	Optimized firmware for ESP32, STM32F401, and RP2040 embedded systems, improving performance enhancement and a reduction in power consumption for electric skateboards and one-wheelers.
•	Collaborated with the Electrical team to implement seamless Over-The-Air (OTA) and Serial code updates, optimizing efficiency and minimizing downtime.

Frontend Software Developer, Singapore Hope Foundation
•	Developed the home website from concept to deployment using HTML, CSS, JavaScript, and responsive design principles while conducting thorough testing and debugging processes to ensure cross-browser compatibility.
•	Created high-fidelity website prototypes and mock-ups in Figma using UI/UX best practices to optimize user experience. Coded the full site following the visual design and then integrated it live with continued maintenance.
________________________________________
PROJECTS
Toyota Autonomous Vehicle Robot
• Developed and deployed autonomous control algorithms for a Turtle Bot using Python, ROS2, and Ubuntu. Leveraged command line proficiency within a Linux VM and seamlessly integrated Gazebo simulations for streamlined development and robust real-world validation.
• Executed Lidar sensor integration for dynamic environmental mapping, facilitating precise path planning and obstacle avoidance. Enhanced stop sign detection accuracy by 50% through the implementation of a camera-based YOLOv8 machine learning model and advanced image masking techniques.
• Engineered a highly modular and maintainable codebase by applying Object-Oriented Programming (OOP) principles, utilizing class methods and inheritance, and adhering rigorously to the Software Development Life Cycle (SDLC). Employed Git for version control, ensuring seamless collaboration and effective code management.

WATApply
•  Created a Google Chrome extension using React, Tailwind, and ShadCN that streamlines the job application process for 40,000+ University of Waterloo students, increasing application efficiency through AI-driven resume-job matching, personalized resume improvement advice, and automated cover letter generation.
•  Leveraged AI and machine learning through Python and TensorFlow to analyze 5,000+ job descriptions and resumes monthly, enabling a relevance rating system to rate job suitability with an 80% accuracy. Implemented React.js features to sort job listing tables based on students customizable conditions.
•  Incorporated an NLP system to generate tailored cover letters based on job description and student experiences, reducing writing time by 95%. Designed an SQL database to manage job listings and student interactions, ensuring quick data retrieval and scalability.

Real-Time Chat Application
•	Developed a real-time chat application with Next.js 13, MongoDB, and Socket.io to enable messaging between users. Leveraged Pusher to enhance real-time communication capabilities, augmenting the application with efficient data synchronization and instant updates. 
•	Utilized Socket.io's scalable architecture to support connectivity across multiple servers. Key features included one-on-one messaging, group chat rooms, presence tracking, and typing indicators. 
•	Integrated a MongoDB database for persistent user data, chat history, and presence tracking. Authentication handled sign-up and login workflows using NextAuth. App deployed to production utilizing modern technologies stack.

Tower Defense Python Game 
•	Developed and implemented a machine learning model using Python to accurately predict tomorrow's S&P 500 index price based on historical data obtained through the yfinance package. Conducted data cleaning and preprocessing tasks using pandas, resulting in a dataset comprising over 10 years of S&P 500 index price data.
•	Employed advanced methodologies to mitigate common issues such as overfitting, including rigorous back testing procedures and feature engineering techniques. This comprehensive approach resulted in a model with an improved accuracy rate of 60% and showcased a deep understanding of machine learning principles.

Autonomous Robot
• Built a fully autonomous Arduino robot integrated with light, distance, and motion sensors, and a 3D printed a real-time custom wireless controller featuring dual joysticks, buttons, LEDs, and a switch.
• Programmed an Arduino Nano and Uno to drive motors, read sensors, and facilitate bidirectional RF communication between robot and controller using NRF24L01 modules.
• Designed the robot and its controller using AutoCAD and SolidWorks, leveraging advanced 3D modeling techniques to craft intricate mechanical structures and components with precision and industry level dimensioning.

Tennis Match Analysis System
• Improved pretrained YOLOv8 model accuracy of tennis ball from 33% to over 75% by training dataset from Roboflow in Google Colab, while accurately identifying players in images and videos to track their average speed, distance covered, average speed of the ball, and length of a rally.
• Implemented a mini court of the tennis match showcasing key points on the court, tennis ball coverage, and player movement using complex algorithms to convert the pixels the players bounding boxes have moved intometers, allowing information from a 3D frame to be read on a 2D plane.
• Worked with PyTorch to develop and train a Convolutional Neural Network tailored for extracting key pointswithin tennis court frames, including the serve boxes, double alleys, and center court. 

Stock Prediction Software
• Developed and implemented a machine learning model using Python to accurately predict tomorrow's S&P 500 index price based on historical data obtained through the yfinance package. Conducted data cleaning and preprocessing tasks using pandas, resulting in a dataset comprising over 50 years of S&P 500 index price data.
• Employed advanced methodologies to mitigate common issues such as, overfitting including rigorous back testingprocedures and feature engineering techniques. This comprehensive approach resulted in a model with an improved accuracy rate of 60% and showcased a deep understanding of machine learning principles.
________________________________________
EDUCATION
Bachelor of Applied Sciences in Mechatronics Engineering, University of Waterloo

Job Information:
Organization: {organization}
Position: {job_title}""",
                }
            ],
        )

        output = filter_text(response.choices[0].message.content)

    pyperclip.copy(output)
    output = output.strip()
    return output
