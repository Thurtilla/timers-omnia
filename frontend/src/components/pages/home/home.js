import React, { useEffect, useState } from 'react';
import { Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import Countdown from 'react-countdown';
export default function Home() {
    const newRun = 'New run'
    const endRun = 'End run'
    const resetRun = 'Reset'
    const timerReady = 'Go do it ape!'
    const runStarted = 'run started, end run to start timer'
    const countdownTime = 60000 * 60 * 18 //18 hours in millis

    const [testSaving, setTestSaving] = useState(
        JSON.parse(localStorage.getItem('POKEWATCH-timers')) ||
        {
            kanto: {
                timestamp: null,
            },
            hoen: {
                timestamp: null,
            }
        })

    const [regions, setRegions] = useState({
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
    })

    const REGIONNAMES = {
        kanto: 'kanto',
        hoen: 'hoen',
        sinnoh: 'sinnoh',
        unova: 'unova'
    }


    useEffect(() => { //LOADING
        let names = ['kanto', 'hoen']
        let allRegions = { ...regions };

        names.forEach(regionName => {
            
            if (testSaving[regionName].timestamp == null || testSaving[regionName].timestamp < Date.now) return
            console.log('We have timestamp!')
            allRegions[regionName].timer = dailyResetTimer(regionName, allRegions[regionName].event, testSaving[regionName].timestamp)
            allRegions[regionName].btnClassNames = 'btn-danger'
            allRegions[regionName].button = resetRun
            allRegions[regionName].event = '1337'
        })
        setRegions(allRegions)

    }, [])
    useEffect(() => {
        saveCountdownToLocalstorage()
    }, [testSaving])

    const saveCountdownToLocalstorage = () => {
        localStorage.setItem('POKEWATCH-timers', JSON.stringify(testSaving))
    }
    const handleTimerComplete = (region, ievent) => {
        setRegions({
            ...regions, [region]: {
                ...regions[region],
                'timer': timerReady,
                'button': newRun,
                'btnClassNames': '',
                'event': ievent
            }
        })
    }

    const dailyResetTimer = (region, ievent, time) => {
        return (
            <Countdown onComplete={() => handleTimerComplete(region, ievent)} date={parseInt(time)} /> //60000 * 60 * 18} />
        )
    }
    const resetClicked = (regionName, ievent) => {
        console.log('Reset clicked')

        setTestSaving({ ...testSaving, [regionName]: { ...testSaving[regionName], timestamp: null } })
        setRegions({
            ...regions, [regionName]: {
                ...regions[regionName],
                'timer': timerReady,
                'button': newRun,
                'btnClassNames': '',
                'event': ievent
            }
        })
    }

    const handleClick = (region) => {
        const target = region.target
        if (regions[target.name].timer === timerReady) {
            setRegions({
                ...regions, [target.name]: {
                    ...regions[target.name],
                    'timer': runStarted,
                    'button': endRun,
                    'btnClassNames': 'btn-success'
                }
            })
        } else if (regions[target.name].timer === runStarted) {
            const getTimeForCountdown = Date.now() + countdownTime
            setTestSaving({ ...testSaving, [target.name]: { ...testSaving[target.name], timestamp: getTimeForCountdown } })
            setRegions({
                ...regions, [target.name]: {
                    ...regions[target.name],
                    'timer': dailyResetTimer(REGIONNAMES[target.name], target.dataset.ievent, getTimeForCountdown),
                    'button': resetRun,
                    'btnClassNames': 'btn-danger',
                    'event': '1337'
                }
            })
            console.log('TESTSAVING:' + testSaving)
        } else {
            resetClicked(target.name, target.dataset.ievent)
        }
    }


    const testThis = () => {
        console.log(regions)
    }

    return (
        <>
            <div className="container">
                <h1 className="mt-2">PokeWatch | Lets go!</h1>
                <br /><br />
                <Accordion className="mb-3">
                    <Form.Group className="d-flex align-items-center sickbg">
                        <Accordion.Toggle size="md" className={regions.kanto.btnClassNames + " minwidth-xd ml-3"} data-ievent='0' eventKey={regions.kanto.event} name={REGIONNAMES.kanto} as={Button} onClick={handleClick}>{regions.kanto.button}</Accordion.Toggle>
                        <Form.Label className="bigText ml-3">Kanto: {regions.kanto.timer}</Form.Label>
                    </Form.Group>
                    <Accordion.Collapse eventKey='0'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion className="mb-3">
                    <Form.Group className="d-flex align-items-center sickbg">
                        <Accordion.Toggle className={regions.hoen.btnClassNames + ' minwidth-xd ml-3'} size="md" data-ievent='1' eventKey={regions.hoen.event} name={REGIONNAMES.hoen} as={Button} onClick={handleClick} >{regions.hoen.button}</Accordion.Toggle>
                        <Form.Label className="bigText ml-3">Hoen: {regions.hoen.timer}</Form.Label>
                    </Form.Group>
                    <Accordion.Collapse eventKey='1'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion className="mb-3">
                    <Form.Group className="d-flex align-items-center sickbg">
                        <Accordion.Toggle className={regions.hoen.btnClassNames + ' minwidth-xd ml-3'} size="md" data-ievent='1' eventKey={regions.hoen.event} name={REGIONNAMES.hoen} as={Button} onClick={handleClick} >{regions.hoen.button}</Accordion.Toggle>
                        <Form.Label className="bigText ml-3">Sinnoh: {regions.hoen.timer}</Form.Label>
                    </Form.Group>
                    <Accordion.Collapse eventKey='1'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion className="mb-3">
                    <Form.Group className="d-flex align-items-center sickbg">
                        <Accordion.Toggle className={regions.hoen.btnClassNames + ' minwidth-xd ml-3'} size="md" data-ievent='1' eventKey={regions.hoen.event} name={REGIONNAMES.hoen} as={Button} onClick={handleClick} >{regions.hoen.button}</Accordion.Toggle>
                        <Form.Label className="bigText ml-3">Unova: {regions.hoen.timer}</Form.Label>
                    </Form.Group>
                    <Accordion.Collapse eventKey='1'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>


                <Button className="btn-danger mt-5" onClick={testThis}>Test!</Button>
            </div> {/* CONTAINER */}

        </>

    )
}
