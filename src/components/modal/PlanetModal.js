import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function PlanetModal(props) {

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.selecteditem[0] ? props.selecteditem[0].name : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Details</h4>
        <p>
          Population: {props.selecteditem[0] ? props.selecteditem[0].population : ''}
        </p>
        <p>
          Climate: {props.selecteditem[0] ? props.selecteditem[0].climate : ''}
        </p>
        <p>
          Day Length: {props.selecteditem[0] ? props.selecteditem[0].rotation_period : ''}hrs
        </p>
        <p>
          Diameter: {props.selecteditem[0] ? props.selecteditem[0].diameter : ''}km
        </p>
      </Modal.Body>
      <Modal.Footer>
        
      </Modal.Footer>
    </Modal>
  );
}
