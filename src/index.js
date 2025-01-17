// Check if our JavaScript file is working and connected to our HTML file
console.log("Connected")

// Create variables we'll use throughout our code
const GARAGE = "garage_one" // Give a name for our garage in the API
const garageUrl = `https://garage.api.lewagon.com/${GARAGE}/cars` // Make a dynamic URL we'll use to communicate with the API

// Find the HTML elements we need to work with (DOM elements)
const carsList = document.querySelector(".cars-list") // Find the div where we'll show all our cars
const carForm = document.querySelector(".car-form") // Find the form where users will input new car info

// 1 - Fetch all cars from the API and show them on our page
const fetchAllCars = () => {
  // fetch is like making a phone call to the API - we ask for information and wait for the response
  fetch(garageUrl)
  // When we get the response, we need to convert it to a format JavaScript can understand (JSON)
  .then(response => response.json())
  // Now we can use the data we received
  .then((data) => {
    console.log(data)  // Show in console what we received from the API
    carsList.innerHTML = ""; // Clear the list of cars so we don't show duplicates
    // 2 - Interate over the cars in the array coming from the API and insert each car on the HTML card
    data.forEach((car) => insertCarCard(car))
  });
}
// Run this function when the page loads so we can see all cars immediately
fetchAllCars();

// 3 - Insert into the HTML the car's information
const insertCarCard = (car) => {
  // Create the HTML for one car using the template from index.html
  // ${car.brand} etc. will be replaced with the actual car information
  const carCard = `<div class="car">
  <div class="car-info">
    <h4>${car.brand} - ${car.model}</h4>
    <p><strong>Owner:</strong> ${car.owner}</p>
    <p><strong>Plate:</strong> ${car.plate}</p>
  </div>
  </div>`
  // Add this new car card to our page at the end of the list
  carsList.insertAdjacentHTML("beforeend", carCard)
}

// 4 - Get the car information from the user
// When? When the user click on the form button to submit a new car.
const createCar = (event) => {
  // Prevent the form from refreshing the page (default behavior)
  event.preventDefault()
  // FormData is a helper that collects all the information from our form inputs
  const formData = new FormData(event.currentTarget)
  // Convert the form data into a format that's easier to work with
  const myNewCar = Object.fromEntries(formData)
  // Send POST request with the information to create new car
  fetch(garageUrl, {
    method: "POST",  // Tell the API we want to add new information
    headers: { "Content-Type": "application/json" }, // Tell the API we're sending JSON data
    body: JSON.stringify(myNewCar)  // Convert our car information into JSON format
  })
  .then(() => fetchAllCars()) // After the car is added, update our display to show all cars including the new one
}

// Watch for when someone submits the form
// When they do, run our createCar function
carForm.addEventListener("submit", createCar)
