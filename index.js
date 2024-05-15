// Define the URL of your Flask app's endpoint
const url = 'https://github.com/BilalShahid-13/Text-To-Image-Generator-Ai/blob/main/txt-image.py/generate_image';

// Define the prompt you want to use for generating the image
const prompt = 'batman';

// Define the JSON data payload for the POST request
const data = { prompt: prompt };

// Define options for the fetch request
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
};

// Make the POST request
fetch(url, options)
  .then(response => {
    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Parse the JSON response data
      return response.json();
    } else {
      // Handle errors
      throw new Error(`Error: ${response.status}`);
    }
  })
  .then(jsonData => {
    // Extract the images data from the response
    const imagesData = jsonData.images;
    // Process the images data as needed
    console.log(imagesData);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error.message);
  });
