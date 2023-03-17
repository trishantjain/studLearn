const axios = require('axios');
require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY;
const fs = require('fs');




// Getting picture related to the query
// Set up the API endpoint URL and parameters
// const url = "https://api.unsplash.com/search/photos";
// const accessKey = process.env.UNPLASH_API_KEY;

// Define the API endpoint
const API_ENDPOINT = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

// Define the prompt
const prompt = 'how data is parse in server';
const imgName = prompt.slice(0, 5);


// Define the request headers
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
};

// Define the request data
const data = {
    'prompt': prompt,
    'temperature': 0.5,
    'max_tokens': 100,
    'top_p': 1,
    'frequency_penalty': 0,
    'presence_penalty': 0
};


// fetch(apiUrl, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//         'model': 'image-alpha-001',
//         'prompt': 'a cute cat sleeping on a pillow',
//         'num_images': 1,
//         'size': '256x256',
//         'response_format': 'url'
//     })
// })

// .then(response => response.json())
// .then(data => {
//   const imageUrl = data.data[0].url;
//   const img = document.createElement('img');
//   img.src = imageUrl;
//   document.body.appendChild



// Send the request to the OpenAI API
axios.post(API_ENDPOINT, data, { headers })
    .then(response => {
        console.log(response.data.choices[0].text);
    })
    .catch(error => {
        console.error(error);
    });
console.log('Answer Done')

function generateImage(prompt) {
    const imageUrl = 'https://api.openai.com/v1/images/generations';
    axios.post(imageUrl, {
        "model": "image-alpha-001",
        "prompt": prompt,
        "num_images": 1,
        "size": "256x256",
        "response_format": "url"
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        responseType: 'arraybuffer'
    })
        .then(response => {
            const imageData = Buffer.from(response.data, 'binary');
            fs.writeFileSync(`${imgName}.png`, imageData);
            console.log('File Saved')

            // Use the image URL from the API response to modify your web page
            // ...
        })
        .catch(error => {
            console.error(error);
        });
}

generateImage(prompt);