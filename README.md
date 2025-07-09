
•	A basic Snake Game - DevOps CI/CD Demo

This project demonstrates a complete DevOps CI/CD workflow using a simple Snake Game built with HTML/CSS/JavaScript.  
It is containerized using Docker, versioned via GitHub, and automatically deployed to an AWS EC2 instance via GitHub Actions.

•	Project Structure

o	Frontend: Static HTML
o	Dockerized: using `nginx` to serve static content
o	CI/Cd: GitHub Actions workflow builds and pushes Docker image to Docker Hub and deploys it to AWS EC2
o	Hosted at: AWS EC2 (Amazon Linux)

•	CI/CD Pipeline Overview

The flow is like
GitHub → GitHub Actions → Docker Hub → AWS EC2
o	Code Commit: Push to main branch triggers workflow
o	CI: GitHub Actions builds Docker image and pushes to Docker Hub
o	CD: SSH into EC2, stops old container, pull updated image, run new container
****************************************************************
 Technologies Used
o	HTML, CSS, JavaScript
o	Docker
o	GitHub Actions
o	AWS EC2 (Amazon Linux 2023)
o	Nginx
****************************************************************
Live Deployment
You can view the live game at:
http://51.20.114.191:8080/
****************************************************************
 Maintained By:
Shamaila Qayyum
DevOps Learner & Educator | GitHub: @ShamailaQayyum
****************************************************************

