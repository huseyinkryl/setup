import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const url = 'https://course-api.com/react-tours-project'

const Replay = () => {
  const [isLoading, setIsLoading] = useState(true)
  const turState = useState([])

  //const [] = ['hüseyin', 'karayel']
  //const lastName = name[1]
  //const firstName = name[0]
  //console.log(name[0], name[1])

  //console.log(lastName, firstName)

  const [readMore, setReadMore] = useState(false)

  const removeTour = (id) => {
    const newTours = turState[0].filter((tour) => tour.id !== id)
    turState[1](newTours)
  }

  const fetchUrl = async () => {
    setIsLoading(true) // reflesh buttonu için konuldu
    try {
      const response = await fetch(url)
      const tours = await response.json()
      console.log(tours)
      //console kapatınca aşağıdaki fetchUrl() çalışmıyor
      turState[1](tours)
      //console.log(a)
      //console.log(setTours(tours))
      //console.log(setTours)
      //console.log(tours)
      // hazır yakalamışken console.log(setTours(tours)) veya console.log(setTours) hata diyen var undefined diyen var
    } catch (error) {
      console.log('eyvah')
    }
    setIsLoading(false) // bu noktada neden false ve neden catch içinde değil
  }

  useEffect(() => {
    fetchUrl()
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  if (turState[0].length === 0) {
    return (
      <main>
        <div className="title">
          <button className="btn" onClick={() => fetchUrl()}>
            reflesh
          </button>
        </div>
      </main>
    )
  }

  return (
    <div className="title">
      <h2>our tours</h2>
      <div className="underline"></div>
      <div className="tours">
        {turState[0].map((tour) => {
          return (
            <article key={tour.id} className="single-tour">
              <img src={tour.image} alt={tour.name} />
              <span className="tour-price">{tour.price}</span>
              <div className="tour-info">
                <h5>{tour.name}</h5>
                <p>
                  {readMore ? tour.info : `${tour.info.substring(0, 200)}...`}
                  <button
                    type="button"
                    className="info-btn"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? 'show less' : 'read more'}
                  </button>
                </p>
                <button
                  className="btn delete-btn"
                  type="button"
                  onClick={() => removeTour(tour.id)}
                >
                  not interested
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default Replay
