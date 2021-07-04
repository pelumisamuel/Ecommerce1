import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='grow'
      variant='success'
      role='status'
      style={{
        width: '50px',
        height: '50px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className='sr-only'> Loading...</span>
    </Spinner>
  )
}

export default Loader
