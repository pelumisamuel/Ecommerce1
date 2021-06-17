import { Modal, Button } from 'react-bootstrap'

function ModalTest({ handleClose, show, action }) {
  // const [show, setShow] = useState(false)

  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  return (
    <>
      {/* <Button variant='primary' onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to delete the user from the database?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            No! Close
          </Button>
          <Button variant='primary' onClick={action}>
            yes! Delete User
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalTest
