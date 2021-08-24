import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Form, FormControl, InputGroup, Row, Table } from 'react-bootstrap';
import Countdown from 'react-countdown';
export default function Home() {
  const occupy = 'Occupy this PC';
  const endRun = 'Start renting';
  const resetRun = 'Reset';
  const timerReady = 'Available';
  const runStarted = 'Ready to start, Click to start period';
  const [rentPeriod, setRentPeriod] = useState({ hours: 1, minutes: 0 });
  const [loading, setLoading] = useState(true);
  const [testSaving, setTestSaving] = useState(
    () =>
      JSON.parse(localStorage.getItem('omnia-timers')) || {
        pc1: {
          timestamp: null,
        },
        pc2: {
          timestamp: null,
        },
        pc3: {
          timestamp: null,
        },
        pc4: {
          timestamp: null,
        },
      }
  );

  const [pcs, setPcs] = useState(() => ({
    pc1: {
      timer: timerReady,
      button: occupy,
      btnClassNames: '',
      event: '0',
      textClass: '',
    },
    pc2: {
      timer: timerReady,
      button: occupy,
      btnClassNames: '',
      event: '1',
      textClass: '',
    },
    pc3: {
      timer: timerReady,
      button: occupy,
      btnClassNames: '',
      event: '2',
	  textClass: '',
    },
    pc4: {
      timer: timerReady,
      button: occupy,
      btnClassNames: '',
      event: '3',
	  textClass: '',
    },
  }));

  const PCNAMES = {
    pc1: 'pc1',
    pc2: 'pc2',
    pc3: 'pc3',
    pc4: 'pc4',
  };

  useEffect(() => {
    //LOADING
    let names = ['pc1', 'pc2', 'pc3', 'pc4'];
    let allPcs = { ...pcs };

    names.forEach((pc) => {
      const currentPC = allPcs[pc];
      if (testSaving[pc].timestamp == null) return;
      currentPC.timer = dailyResetTimer(pc, allPcs[pc].event, testSaving[pc].timestamp);
      currentPC.btnClassNames = 'btn-danger';
      currentPC.button = resetRun;
      currentPC.event = '1337';
      console.log(allPcs[pc]);
      if (currentPC.timer.props.date < Date.now()) currentPC.textClass = 'red-shadow';
    });
    setPcs(allPcs);
    setLoading(false);
  }, []);
  useEffect(() => {
    saveCountdownToLocalstorage();
  }, [testSaving]);

  const saveCountdownToLocalstorage = () => {
    localStorage.setItem('omnia-timers', JSON.stringify(testSaving));
  };
  const handleTimerComplete = (region, ievent) => {
    redShadowOnTimer(region);
    //resetTimer(region, ievent);
  };
  const redShadowOnTimer = (timer) => {
    setPcs((prevState) => ({
      ...prevState,
      [timer]: { ...prevState[timer], textClass: 'red-shadow' },
    }));
  };
  const resetTimer = (regionName, ievent) => {
    setTestSaving((prevstate) => ({
      ...prevstate,
      [regionName]: { ...prevstate[regionName], timestamp: null },
    }));
    setPcs((prevstate) => ({
      ...prevstate,
      [regionName]: {
        ...prevstate[regionName],
        timer: timerReady,
        button: occupy,
        btnClassNames: '',
        event: ievent,
		textClass: ''
      },
    }));
  };
  const dailyResetTimer = (region, ievent, time) => {
    return (
      <Countdown
        intervalDelay={1000}
        overtime={true}
        key={region}
        onComplete={(e) => handleTimerComplete(region, ievent)}
        date={parseInt(time)}
      /> //60000 * 60 * 18} />
    );
  };

  const calculateCountdown = () => {
    const hours = 60000 * 60 * rentPeriod.hours;
    const minutes = 60000 * rentPeriod.minutes;
    return hours + minutes;
  };

  const handleChange = (e) => {
    setRentPeriod((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleClick = (region) => {
    const target = region.target;
    if (pcs[target.name].timer === timerReady) {
      setPcs((prevstate) => ({
        ...prevstate,
        [target.name]: {
          ...prevstate[target.name],
          timer: runStarted,
          button: endRun,
          btnClassNames: 'btn-success',
        },
      }));
    } else if (pcs[target.name].timer === runStarted) {
      const getTimeForCountdown = Date.now() + calculateCountdown();
      setTestSaving((prevstate) => ({
        ...prevstate,
        [target.name]: { ...prevstate[target.name], timestamp: getTimeForCountdown },
      }));
      setPcs((prevstate) => ({
        ...prevstate,
        [target.name]: {
          ...prevstate[target.name],
          timer: dailyResetTimer(
            PCNAMES[target.name],
            target.dataset.ievent,
            getTimeForCountdown
          ),
          button: resetRun,
          btnClassNames: 'btn-danger',
          event: '1337',
        },
      }));
    } else {
      resetTimer(target.name, target.dataset.ievent);
    }
  };
  if (loading) return <>Loading...</>;
  return (
    <>
      <div className='container'>
        <br />
        <Form.Group className='d-flex align-items-center sickbg'>
          <Form.Label className='bigText ml-3'>Rent period: </Form.Label>
          <InputGroup className=' col-2'>
            <InputGroup.Prepend>
              <InputGroup.Text>Hours</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl name='hours' value={rentPeriod.hours} onChange={handleChange} />
          </InputGroup>
          <InputGroup className='col-2'>
            <InputGroup.Prepend>
              <InputGroup.Text>Minutes</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl name='minutes' value={rentPeriod.minutes} onChange={handleChange} />
          </InputGroup>
        </Form.Group>
        <Accordion className='mb-3'>
          <Form.Group className='d-flex align-items-center sickbg'>
            <Accordion.Toggle
              size='md'
              className={pcs.pc1.btnClassNames + ' match-button-width ml-3'}
              data-ievent='0'
              eventKey={pcs.pc1.event}
              name={PCNAMES.pc1}
              as={Button}
              onClick={handleClick}
            >
              {pcs.pc1.button}
            </Accordion.Toggle>
            <Form.Label className={`${pcs.pc1.textClass} bigText ml-3`}>
              PC 1: {pcs.pc1.timer}
            </Form.Label>
          </Form.Group>
          <Accordion.Collapse eventKey='0'>
            <Row></Row>
          </Accordion.Collapse>
        </Accordion>

        <Accordion className='mb-3'>
          <Form.Group className='d-flex align-items-center sickbg'>
            <Accordion.Toggle
              size='md'
              className={pcs.pc2.btnClassNames + ' match-button-width ml-3'}
              data-ievent='1'
              eventKey={pcs.pc2.event}
              name={PCNAMES.pc2}
              as={Button}
              onClick={handleClick}
            >
              {pcs.pc2.button}
            </Accordion.Toggle>
            <Form.Label className={`${pcs.pc2.textClass} bigText ml-3`}>
              PC 2: {pcs.pc2.timer}
            </Form.Label>
          </Form.Group>
          <Accordion.Collapse eventKey='1'>
            <Row></Row>
          </Accordion.Collapse>
        </Accordion>

        <br />
      </div>{' '}
      {/* CONTAINER */}
    </>
  );
}
