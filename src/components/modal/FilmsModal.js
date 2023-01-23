import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function FilmsModal(props) {

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.selecteditem[0] ? props.selecteditem[0].title : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Details</h4>
        <p>
          Release Date: {props.selecteditem[0] ? props.selecteditem[0].release_date : ''}
        </p>
        <p>
          Chronological Place: {props.selecteditem[0] ? props.selecteditem[0].episode_id : ''}
        </p>
        <p>
          Director: {props.selecteditem[0] ? props.selecteditem[0].director : ''}
        </p>
      </Modal.Body>

    </Modal>
  );
}
