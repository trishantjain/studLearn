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
        'Authorization': `Bearer ${apiKey}`
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
            const result2 = json.choices[0].text;
            document.getElementById('answer').innerHTML = result2;

            const imgurl = 'https://api.openai.com/v1/images/generations';

            fetch(imgurl, {
                method: 'POST',
                headers: headers,

                body: JSON.stringify({
                    "model": "image-alpha-001",
                    "prompt": result2,
                    "num_images": 1,
                    "size": "256x256",
                    "response_format": "url"
                })
            })
                .then(response => response.json())
                .then(json => {
                    const imageData = json.data[0].url;
                    document.getElementById('imgGen').setAttribute('src', imageData);
                })
                .catch(error => {
                    console.error(error);
                });
        })
        .catch(error => {
            console.error(error);
        });

    // const imgurl = 'https://api.openai.com/v1/images/generations';
    // await fetch(imgurl, {
    //     method: 'POST',
    //     headers: headers,

    //     body: JSON.stringify({
    //         "model": "image-alpha-001",
    //         "prompt": result,
    //         "num_images": 1,
    //         "size": "256x256",
    //         "response_format": "url"
    //     })
    // })
    //     .then(response => response.json())
    //     .then(json => {
    //         const imageData = json.data[0].url;
    //         document.getElementById('imgGen').setAttribute('src', imageData);
    //     })
    //     .catch(error => {
    //         console.error(error);
    //     });
});
