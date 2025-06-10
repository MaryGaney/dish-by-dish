For Mikey and Pri :)  
because this is in development we are going to use localhost to test basic changes  

### Before starting, make sure you have the following installed on your system:  
Node.js & npm (v18+ recommended)  
Git  
A modern web browser (Chrome, Firefox, etc.)  

### Run these in the terminal of your chosen IDE, make sure to be in a folder where you want the information to save  
git clone https://github.com/your-username/dish-by-dish.git  
cd dish-by-dish  
npm install  

### Setting up the .env file  
In the project root, create a file called .env with the following contents:  
  
GOOGLE_CLIENT_ID=your_google_client_id  
GOOGLE_CLIENT_SECRET=your_google_client_secret  
MONGO_URI=your_mongo_atlas_connection_string  
Ask Mary for the correct values if you don’t have them.  
MongoDB and Google Cloud - i created a project with the same login information that I gave you both  

### To run the development server  
node index.js  
http://localhost:3000  

