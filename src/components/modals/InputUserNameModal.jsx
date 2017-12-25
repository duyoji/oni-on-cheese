import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  Input
} from 'reactstrap';
import { setUserName, getUserName } from '../../utils/localStorage';

class InputUserNameModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserName: getUserName() || ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      currentUserName: event.target.value
    });
  }

  handleSubmit(event) {
    setUserName(this.state.currentUserName);
    this.props.setUserName(this.state.currentUserName);
  }

  render() {
    return (
      <div className="InputUserNameModal">
        <Modal isOpen={!this.props.userName}>
          <ModalHeader>Set your name</ModalHeader>
          <ModalBody>
            <InputGroup>
              <Input
                type="text"
                name="uaername"
                id="username"
                placeholder="username"
                value={this.state.currentUserName}
                onChange={this.handleChange}/>
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.handleSubmit}
              disabled={!this.state.currentUserName}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

InputUserNameModal.propTypes = {
  setUserName: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};

export default InputUserNameModal;