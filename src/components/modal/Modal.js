import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import starwars from '../../APIs/starwars';
import Spinner from 'react-bootstrap/Spinner';

export function MainModal(props) {
  // console.log('props on modal', props)
  const [homeworld, setHomeworld]= useState([])
  const [films, setFilms]= useState([])
  const [loadingHomeworld, setLoadingHomeworld] = useState([true])
  const [loadingFilms, setLoadingFilms] = useState([true])


  useEffect(() => {
    starwars.getEntityByURL(props.selecteditem[0].homeworld).then((response)=> {
      console.log('homeworld response', response)
     setHomeworld([response.name]);
     setLoadingHomeworld([false])
    })
   
  }, []);

  useEffect(()=> {
     starwars.getEntitiesFromListOfURLS(props.selecteditem[0].films).then((response)=> {
      console.log('films response', response)
     setFilms(response);
     setLoadingFilms([false])
    })
  },[]);

  console.log('films', films)
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.selecteditem[0]? props.selecteditem[0].name : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Details</h4>
        <p>
         Height: {props.selecteditem[0]? props.selecteditem[0].height : ''}cm
        </p>
        <p>
         Weight: {props.selecteditem[0]? props.selecteditem[0].mass : ''}kg
        </p>
        <p>
         Eye Color: {props.selecteditem[0]? props.selecteditem[0].eye_color : ''}
        </p>
       <p>
        Home World: {props.selecteditem[0] ? homeworld[0] : ''}
        </p>  
        
        Films: {films.length > 0 && !loadingFilms[0] ?
<ol>
  {films.map((film, index) => 
    <li key={index}>{film.title}</li>
  )}
</ol> : <Spinner animation="grow" />}

        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
