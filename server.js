const express = require('express');
  const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const dummyRestaurants = [
  { id: 1, name: "Pizza Place", description: "Best pizza in town!", address: "Ntinda, Kampala", phone: "5995-555-555" },
  { id: 2, name: "Burger King", description: "Best burgers around!", address: "Bukoto road", phone: "555-5775-555" },
  { id: 3, name: "Taco Bell", description: "Best taco in town!", address: "Kamwokya", phone: "555-5455-555" },
];

// Endpoint to get the list of restaurants
app.get('/restaurants', (req, res) => {
  res.json(dummyRestaurants);
});

// Endpoint to add a restaurant to the list of restaurants
app.post('/restaurants', (req, res) => {

  console.log("request body", req.body);

  const { name, description, address, phone } = req.body;
  
  console.log("THE ADDRESS IS: ", address);
  console.log("the name is : ", name);
  console.log("the description is : ", description);
  console.log("the phone is : ", phone);

  // Simple validation to ensure name and details are provided
  if (!name || !description || !address || !phone) {
    return res.status(400).json({ message: 'Please provide all details.' });
  }

  // Create a new restaurant object
  const newRestaurant = {
    id: dummyRestaurants.length + 1, 
    name,
    description,
    address,
    phone
  };

  // Add the new restaurant to the dummy array (simulating database insertion)
  dummyRestaurants.push(newRestaurant);

  // Respond with the newly added restaurant
  res.status(201).json(newRestaurant);
});

// EDITING RESTAURANTS
app.put('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, address, phone } = req.body;

  // Find the index of the restaurant with the given ID
  const index = dummyRestaurants.findIndex(restaurant => restaurant.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Restaurant not found.' });
  }

  // Update the restaurant's details
  const updatedRestaurant = { id: parseInt(id), name, description, address, phone };
  dummyRestaurants[index] = updatedRestaurant;

  // Respond with the updated restaurant
  res.json(updatedRestaurant);
});


// DELETING RESTAURANTS
app.delete('/restaurants/:id', (req, res) => {
  const { id } = req.params;

  // Find the index of the restaurant with the given ID
  const index = dummyRestaurants.findIndex(restaurant => restaurant.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Restaurant not found.' });
  }

  // Remove the restaurant from the array
  dummyRestaurants.splice(index, 1);

  // Respond with a message indicating successful deletion
  res.json({ message: 'Restaurant deleted successfully.' });
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
