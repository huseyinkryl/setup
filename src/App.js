import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }

  const fetchTours = async () => {
    setIsLoading(true)

    try {
      const response = await fetch(url)
      const tours = await response.json()
      //console.log(tours)
      setTours(tours)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
    setIsLoading(false) // aliye sor catch(error) da yakalama yapmıyor mu da
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }

  // TODO

  if (tours.length === 0) {
    return (
      <div className="title">
        <h2>no tours left</h2>
        <button
          type="button"
          className="btn"
          style={{ marginTop: '2rem' }}
          onClick={() => fetchTours()}
        >
          refresh
        </button>
      </div>
    )
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App
