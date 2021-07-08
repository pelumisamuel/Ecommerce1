import { Carousel, Image } from 'react-bootstrap'

const PageCarousel = () => {
  return (
    <Carousel pause='hover'>
      <Carousel.Item key='homePage1'>
        <Image src='/images/tech-store.jpg' alt='tech Store' fluid />
        <Carousel.Caption>
          <h2> Find Every of your tech need in our store! </h2>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default PageCarousel
