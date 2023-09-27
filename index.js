import got from 'got';
import express from 'express';
import { htmlToText } from 'html-to-text';

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/extract', (req, res) => {
  // make html request
  const url = 'https://dev.to/luucamay/the-week-i-danced-with-martha-graham-and-unleashed-ai-magic-at-rc-2d1a'
  const data = got(url).text().then(
    (htmlString) => {
      const text = htmlToText(htmlString, {
        wordwrap: 130
      });

      res.send(text)
    }
  )
  // convert html to text

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

