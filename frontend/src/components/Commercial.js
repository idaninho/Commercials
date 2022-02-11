import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Commercial = ({ commercial }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/commercial/${commercial._id}`}>
        <Card.Img src={commercial.imageUrl} variant="top" />
        
      </Link>
      <Card.Body>
        <Link to={`/commercial/${commercial._id}`}>
          <Card.Title as="div">
            <strong>{commercial.description}</strong>
          </Card.Title>
        </Link>
        
      </Card.Body>
    </Card>
  )
}

export default Commercial
