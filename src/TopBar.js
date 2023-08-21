import firebase from "firebase/compat/app";
import "firebase/compat/database";
import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { CashCoin, DoorClosed, PlusCircle, XLg } from 'react-bootstrap-icons';
import styles from './TopBar.module.scss';

var channel = window.location.pathname.slice(1).toLowerCase();

const TopBar = (props) => {
  const databaseRef = firebase.database().ref();

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const newSession = () => {
    firebase.database().ref().child(`${channel}`).child('destiny').remove();
    firebase.database().ref().child(`${channel}`).child('chat').push().set(`<span>----------------------------------------------</span>`)
    firebase.database().ref().child(`${channel}`).child('message').push().set({ text: '--------------------------------------------------------------------' })
  }

  return (
    <Container className={`${props.className ?? ''} top-level-container`}>
      <Row className={styles.buttonsContainer}>
        <Col className={styles.buttonWrapper} xs='3'>
          <Button className={styles.button} variant='success' href='https://paypal.me/SkyJedi' target="_blank" title='Visit SkyJedi PayPal page'><CashCoin></CashCoin> Donate</Button>
        </Col>
        <Col className={styles.buttonWrapper} xs='3'>
          <Button className={styles.button} variant='secondary' href='/' title='Return to login'><DoorClosed></DoorClosed> Logout</Button>
        </Col>
        <Col className={styles.buttonWrapper} xs='3'>
          <Button className={styles.button} variant='danger' onClick={setShowDeleteModal.bind(this, true)} title='Delete whole channel'><XLg></XLg> Delete</Button>
          <Modal show={showDeleteModal} onHide={(_) => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Channel</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure, this will delete all Data in <strong>{channel}</strong></Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={(_) => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={(_) => {
                firebase.database().ref().child(`${channel}`).remove();
                setShowDeleteModal(false);
                window.location = `/`;
              }
              }>
                DELETE
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col className={styles.buttonWrapper} xs='3'>
          <Button className={styles.button} variant='primary' onClick={newSession.bind(this)} title='New Session'><PlusCircle></PlusCircle> Session</Button>
        </Col>
      </Row>
    </Container>
  );
}
export default TopBar;
