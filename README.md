# Angular CRUD Application with PrimeNG and ngx-charts

## Project Description

This is a simple Angular CRUD (Create, Read, Update, Delete) application that showcases the use of PrimeNG for UI components and ngx-charts for data visualization. The application allows users to manage a list of products with fields such as name, price, and category. It features a responsive PrimeNG table to display the products and a bar chart that dynamically updates based on the changes made to the table.

### Features

- **Display Products**: View a list of products in a PrimeNG table.
- **Add Products**: A form to input new product details.
- **Edit Products**: Option to update existing product information.
- **Delete Products**: Remove products from the list.
- **Data Synchronization**: The ngx-charts bar chart updates in real-time based on the products in the table.

## Technologies Used

- Angular
- PrimeNG
- ngx-charts
- JSON Server (for mocking API)

## Prerequisites

Before running the application, ensure you have the following installed on your machine:

- Node.js (version 18.x.x or later)
- Angular CLI (version 18 )

## Getting Started

Follow these steps to clone and run the application locally:

### 1. Clone the repository

Open your terminal and run the following command:

git clone https://github.com/shivpujari/assignmentTask.git


### 2. Navigate to the project directory

### 3. Install dependencies
run the command "npm install"

### 4. To the mock API you need to run the JSON server 
go to the server folder and open the terminal and run the command "json-server --watch db.json"
The JSON server will start at http://localhost:3000.


### 5. Run your application 
ng serve
Visit "http://localhost:4200"






