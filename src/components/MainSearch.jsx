import { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import Job from './Job'





const mapStateToProps = state =>{
  return{
    toShow: state.cart.companies
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    addFavourite: company =>{
      dispatch({
        type: "Add_To_Favourite",
        payload: company
      })
    }
  }
}






const MainSearch = (props) => {
  const [query, setQuery] = useState('')
  const [jobs, setJobs] = useState([])

  const baseEndpoint = 'https://strive-jobs-api.herokuapp.com/jobs?search='

  const handleChange = (e) => {
    setQuery(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(baseEndpoint + query + '&limit=20')
      if (response.ok) {
        const { data } = await response.json()
        setJobs(data)
        props.addFavourite(data)
        console.log(props.toShow)
      } else {
        alert('Error fetching results')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={10} className="mx-auto my-3">
          <h1>Remote Jobs Search</h1>
        </Col>
        <Col xs={10} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="type and press Enter"
            />
          </Form>
        </Col>
        <Col xs={10} className="mx-auto mb-5">
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(MainSearch)
