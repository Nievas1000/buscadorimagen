import { useState } from 'react';
import {Formik, Form, Field} from 'formik'
import './header.css'
import './content.css'
import './article.css'

function App() {
  const [photos, setPhotos]=useState([])
  const open = url => window.open(url)
  console.log(photos)
  return (
    <div>
      <header>
        <Formik 
          initialValues={{search:''}}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}` , {
              headers:{
                'Authorization':'Client-ID yKTFbh5OL9m2wz1tMtPDwHOlE2dBMITcnqtFmW1nhLo'
              }
            })
            const data = await response.json()
            setPhotos(data.results)
          }}>
            <Form>
              <Field name="search">

              </Field>
            </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photos =>
            <article key={photos.id} onClick={() =>open(photos.links.html)}>
              <img src={photos.urls.regular} />
              <p>{[photos.description, photos.alt_description].join('-')}</p>
            </article>)}
        </div>
      </div>
    </div>
  );
}

export default App;
