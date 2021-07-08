import { Carousel, Image } from 'react-bootstrap'

const PageCarousel = () => {
  return (
    <Carousel pause='hover'>
      <Carousel.Item key='homePage1'>
        <Image
          className='d-block w-100'
          src='/images/slide1.jpg'
          alt='tech Store'
          fluid
        />
        <Carousel.Caption>
          <h1> Find Every of your tech need in our store! </h1>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item key='homePage4'>
        <Image
          className='d-block w-100'
          src='/images/slide4.jpg'
          alt='tech Store'
          fluid
        />
        <Carousel.Caption>
          <h1> Find Gadgets that are specially tailored for you </h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item key='homePage2'>
        <Image
          className='d-block w-100'
          src='/images/slide2.jpg'
          alt='tech Store'
          fluid
        />
        <Carousel.Caption>
          <h1 style={{ color: 'black' }}>
            Get the best of quality gadgets here
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item key='homePage3'>
        <Image
          className='d-block w-100'
          src='/images/slide3.jpg'
          alt='tech Store'
          fluid
        />
        <Carousel.Caption>
          <h1> High Graded and Updated Tech are our passion </h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default PageCarousel
