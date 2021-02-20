import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Form, InputGroup, Row, Table } from 'react-bootstrap';
import Countdown from 'react-countdown';
import kanto_clean from '../../../assets/img/kanto_clean.png';
export default function Home() {
    const newRun = 'New run'
    const endRun = 'End run'
    const resetRun = 'Reset'
    const timerReady = 'Go do it ape!'
    const runStarted = 'run started, end run to start timer'
    const countdownTime = 60000 * 60 * 18 //18 hours in millis
    const [loading, setLoading] = useState(true)
    const kantoRoute = {
        Route: [
            'Vermillion', 'Fuchsia', 'Cinnabar Island', 'Pewter City', 'Cerulean City', 'Celadon City', 'Saffron City'
        ],
        Type: [
            'Electric', 'Poison', 'Fire', 'Rock', 'Water', 'Grass', 'Psychic'
        ]
    }
    const [testSaving, setTestSaving] = useState(() =>
        JSON.parse(localStorage.getItem('POKEWATCH-timers')) ||
        {
            kanto: {
                timestamp: null,
            },
            hoen: {
                timestamp: null,
            },
            sinnoh: {
                timestamp: null,
            },
            unova: {
                timestamp: null,
            }
        })

    const [regions, setRegions] = useState(() => ({
        kanto: {
            timer: timerReady,
            button: newRun,
            btnClassNames: '',
            event: '0',
        },
        hoen: {
            timer: timerReady,
            button: newRun,
            btnClassNames: '',
            event: '1'
        },
        sinnoh: {
            timer: timerReady,
            button: newRun,
            btnClassNames: '',
            event: '2',
        },
        unova: {
            timer: timerReady,
            button: newRun,
            btnClassNames: '',
            event: '3'
        }
    }))

    const REGIONNAMES = {
        kanto: 'kanto',
        hoen: 'hoen',
        sinnoh: 'sinnoh',
        unova: 'unova'
    }


    useEffect(() => { //LOADING
        let names = ['kanto', 'hoen', 'sinnoh', 'unova']
        let allRegions = { ...regions };

        names.forEach(regionName => {

            if (testSaving[regionName].timestamp == null || testSaving[regionName].timestamp < Date.now()) return
            allRegions[regionName].timer = dailyResetTimer(regionName, allRegions[regionName].event, testSaving[regionName].timestamp)
            allRegions[regionName].btnClassNames = 'btn-danger'
            allRegions[regionName].button = resetRun
            allRegions[regionName].event = '1337'
        })
        setRegions(allRegions)
        setLoading(false)
    }, [])
    useEffect(() => {
        saveCountdownToLocalstorage()
    }, [testSaving])

    const saveCountdownToLocalstorage = () => {
        localStorage.setItem('POKEWATCH-timers', JSON.stringify(testSaving))
    }
    const handleTimerComplete = (region, ievent) => {
        resetTimer(region, ievent)
    }

    const resetTimer = (regionName, ievent) => {
        setTestSaving((prevstate) => ({ ...prevstate, [regionName]: { ...prevstate[regionName], timestamp: null } }))
        setRegions((prevstate) => ({
            ...prevstate, [regionName]: {
                ...prevstate[regionName],
                'timer': timerReady,
                'button': newRun,
                'btnClassNames': '',
                'event': ievent
            }
        }))
    }
    const dailyResetTimer = (region, ievent, time) => {
        return (
            <Countdown intervalDelay={1000} key={region} onComplete={(e) => handleTimerComplete(region, ievent)} date={parseInt(time)} /> //60000 * 60 * 18} />
        )
    }

    const handleClick = (region) => {
        const target = region.target
        if (regions[target.name].timer === timerReady) {
            setRegions((prevstate) => ({
                ...prevstate, [target.name]: {
                    ...prevstate[target.name],
                    'timer': runStarted,
                    'button': endRun,
                    'btnClassNames': 'btn-success'
                }
            }))
        } else if (regions[target.name].timer === runStarted) {
            const getTimeForCountdown = Date.now() + countdownTime
            setTestSaving((prevstate) => ({ ...prevstate, [target.name]: { ...prevstate[target.name], timestamp: getTimeForCountdown } }))
            setRegions((prevstate) => ({
                ...prevstate, [target.name]: {
                    ...prevstate[target.name],
                    'timer': dailyResetTimer(REGIONNAMES[target.name], target.dataset.ievent, getTimeForCountdown),
                    'button': resetRun,
                    'btnClassNames': 'btn-danger',
                    'event': '1337'
                }
            }))
        } else {
            resetTimer(target.name, target.dataset.ievent)
        }
    }
    if (loading) return <></>
    return (
        <>
            <div className="container">
                <br />
                <Accordion className="mb-3">
                    <Form.Group className="d-flex align-items-center sickbg">
                        <Accordion.Toggle size="md" className={regions.kanto.btnClassNames + " match-button-width ml-3"} data-ievent='0' eventKey={regions.kanto.event} name={REGIONNAMES.kanto} as={Button} onClick={handleClick}>{regions.kanto.button}</Accordion.Toggle>
                        <Form.Label className="bigText ml-3">Kanto: {regions.kanto.timer}</Form.Label>
                    </Form.Group>
                    <Accordion.Collapse eventKey='0'>
                        <Row>
                            <Col><img src={kanto_clean} /></Col>
                            <Col>
                                <Table className="white-text h-100 w-100" striped bordered>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {Object.keys(kantoRoute).map((item, key) => {
                                                return <th key={key}>{item}</th>
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {console.log(kantoRoute.Route)} */}
                                        {kantoRoute.Route.map((item, key) => {
                                            return (
                                                <tr key={key}>
                                                    <th>{key + 1}</th>
                                                    <th key={key}>
                                                        {item}
                                                    </th>
                                                    <th key={key + 1}>
                                                        {kantoRoute.Type[key]}
                                                    </th>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion className="mb-3">
                    <Form.Group className="d-flex align-items-center sickbg">
                        <Accordion.Toggle className={regions.hoen.btnClassNames + ' match-button-width ml-3'} size="md" data-ievent='1' eventKey={regions.hoen.event} name={REGIONNAMES.hoen} as={Button} onClick={handleClick} >{regions.hoen.button}</Accordion.Toggle>
                        <Form.Label className="bigText ml-3">Hoen: {regions.hoen.timer}</Form.Label>
                    </Form.Group>
                    <Accordion.Collapse eventKey='1'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion className="mb-3">
                    <Form.Group className="d-flex align-items-center sickbg">
                        <Accordion.Toggle className={regions.sinnoh.btnClassNames + ' match-button-width ml-3'} size="md" data-ievent='2' eventKey={regions.sinnoh.event} name={REGIONNAMES.sinnoh} as={Button} onClick={handleClick} >{regions.sinnoh.button}</Accordion.Toggle>
                        <Form.Label className="bigText ml-3">Sinnoh: {regions.sinnoh.timer}</Form.Label>
                    </Form.Group>
                    <Accordion.Collapse eventKey='2'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion className="mb-3">
                    <Form.Group className="d-flex align-items-center sickbg">
                        <Accordion.Toggle className={regions.unova.btnClassNames + ' match-button-width ml-3'} size="md" data-ievent='3' eventKey={regions.unova.event} name={REGIONNAMES.unova} as={Button} onClick={handleClick} >{regions.unova.button}</Accordion.Toggle>
                        <Form.Label className="bigText ml-3">Unova: {regions.unova.timer}</Form.Label>
                    </Form.Group>
                    <Accordion.Collapse eventKey='3'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>
                <br />

            </div> {/* CONTAINER */}

        </>

    )
}
