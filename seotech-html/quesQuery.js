
function getQuery() {
    const Query = document.getElementById('query').value;
    return Query;
}

document.getElementById('form1').addEventListener('submit', async (event) => {
    event.preventDefault();
    const userQuery = getQuery();

    const apiKey = "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";
    const API_ENDPOINT = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };
    const data = {
        'prompt': userQuery,
        'temperature': 0.5,
        'max_tokens': 1000,
        'top_p': 1,
        'frequency_penalty': 0,
        'presence_penalty': 0
    };

    await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => {
            const result = json.choices[0].text;
            document.getElementById('answer').innerHTML = result;
        })
        .catch(error => {
            console.error(error);
        });

    const imgurl = 'https://api.openai.com/v1/images/generations';
    await fetch(imgurl, {
        method: 'POST',
        headers: headers,

        body: JSON.stringify({
            "model": "image-alpha-001",
            "prompt": userQuery,
            "num_images": 1,
            "size": "256x256",
            "response_format": "url"
        })
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            const imageData = json.data[0].url;
            console.log(imageData);
            document.getElementById('imgGen').setAttribute('src', imageData);
        })
        .catch(error => {
            console.error(error);
        });
});
