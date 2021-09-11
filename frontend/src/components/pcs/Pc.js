const React = require('react');
const { Accordion, Form, Button } = require('react-bootstrap');

class PC extends React.Component {
  constructor(name) {
    super();
    this.name = name;
    this.timer = 'Available';
    this.button = 'Occupy this PC';
    this.btnClassNames = '';
    this.event = '0';
    this.textClass = '';
  }
  handleClick() {
	switch (this.timer) {
		case 'Available':
			this.timer = 'Ready to start, Click to start period'
			this.button = 'Start period'
			this.btnClassNames = 'btn-success'
			break;
	
		default:
			break;
	}
  }
  render() {
    return (
      <>
        <Accordion className='mb-3'>
          <Form.Group className='d-flex align-items-center sickbg'>
            <Accordion.Toggle
              size='md'
              className={this.btnClassNames + ' match-button-width ml-3'}
              data-ievent='1'
              eventKey={this.event}
              name={this.name}
              as={Button}
              onClick={this.handleClick}
            >
              {this.button}
            </Accordion.Toggle>
            <Form.Label className={`${this.textClass} bigText ml-3`}>
              {this.name}: {this.timer}
            </Form.Label>
          </Form.Group>
          {/* <Accordion.Collapse eventKey='1'>
          </Accordion.Collapse> */}
        </Accordion>
      </>
    );
  }
}

module.exports = PC;
