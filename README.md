 # BODMAS Master Pro – Math Game System

## 📌 Project Overview

This project implements an interactive math-based game using **PHP, JavaScript, and MySQL**.

The goal of the system is to help users practice arithmetic operations using **BODMAS rules** in a fun and engaging way.

The project demonstrates how frontend interactivity and backend systems can be combined to create a complete game with real-time feedback, scoring, and leaderboard tracking.


---


## 1️ Game Engine (BODMAS Logic System)

This module dynamically generates arithmetic questions based on BODMAS rules.

### Input

* Difficulty Level (Easy / Medium / Hard)
* Random numbers and operators

### Output

* Generated Question
* Correct Answer (calculated automatically)

--- 

**Score & Leaderboard System**

This stores player scores and displays top results.

Input                                                                 

Player Name                                                      
Final Score                                                                  

Output                                                                           
Stored database entry                                                                   
Leaderboard display                                                          
Example Output                                                            
Kesar - 12                                                            
Rahul - 10                                                    
Sneha - 8                                              


---


**🧠 Game Logic Design**

Example logic used for question generation:

let question = `${num1} ${op1} ${num2} ${op2} ${num3}`;
let answer = Math.floor(eval(question));

---

# Game rules:

- Player has 60 seconds
- Player has 3 lives
- Each correct answer increases score
- Wrong answer reduces life
- Game ends when time or lives are over

  ---
  
# 🏗 System Architecture

The project follows a simple interactive architecture:

 User Interface (HTML / CSS)                      
                   ↓                                  
 Game Logic (JavaScript)           
                   ↓                               
 Backend (PHP)           
                   ↓       
Database (MySQL)


---

# 📂 Project Structure

 📁 bodmas-game
│
├── index.php                                                                              
├── style.css                                                                                             
├── script.js                                                                                      
├── db.php                                                                                        
├── save_score.php                                                                                          
└── leaderboard.php                                                                                              

--- 

# 🛠 Technologies Used

PHP

MySQL

HTML / CSS

JavaScript


--- 

# ⚙️ Setup Instructions

Install XAMPP or any PHP server.                                               

Place the project folder inside:                            
htdocs/                                                          
Create database:                                          
bodmas_game                                          
Create table:                                    
scores                                            
Run project in browser:                          
http://localhost/bodmas-game

---

# 📸 Screenshots
Game Start Screen

(Add screenshot here)

Game Play

(Add screenshot here)

Leaderboard

(Add screenshot here)
 

---

# 👩‍💻 Author

**Kesar Karale                                                                  
Regal College of Technology & Management                                                   
SNDT University**
