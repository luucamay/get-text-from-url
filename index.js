import got from 'got';
import express from 'express';
import cors from 'cors';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';

const app = express()
app.use(cors())
const port = 3000


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/article/:url', (req, res) => {
  // make request with Got
  // use JSDOm to create a DOM in server
  // use Readability to extract the article

  // TO DO get the audio as soon as possible maybe stream for smaller parts
  // TO DO check to use security defined by Readability Mozilla
  // const url = 'https://dev.to/luucamay/the-week-i-danced-with-martha-graham-and-unleashed-ai-magic-at-rc-2d1a'
  // TO DO Make sure the url is encoded in the client 'encodeURIComponent'
  // TO DO remove emojis?
  // TO DO get text from PDF?
  const url = req.params.url || 'https%3A%2F%2Fdev.to%2Fsteveblue%2Fthe-state-of-web-components-in-2022-1ip3'
  got(url).text().then((html) => {
    const doc = new JSDOM(html, {
      url: url
    });
    let reader = new Readability(doc.window.document);
    let article = reader.parse();
    res.send(article)
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

