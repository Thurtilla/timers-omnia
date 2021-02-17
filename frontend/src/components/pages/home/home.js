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
    const [loading, setLoading] = useState(false)
    const [loaded, setLoaded] = useState(false)



    const [forSaving, setForSaving] = useState({
        kanto: {
            timestamp: null,
        },
        hoen: {
            timestamp: null,
        },
        sinnoh: {
            timer: null,
        },
        unova: {
            timer: null,
        }
    })
    const [regions, setRegions] = useState({
        kanto: {
            timer: timerReady,
            button: newRun,
            btnClassNames: '',
            event: '0'
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
            event: '2'
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

    const testThis = () => {
        console.log(regions)
    }
    useEffect(() => {
        console.log('WE DID IT!')
        loadTheShit()
        // localStorage.getItem('POKEWATCH-timers') != null && setRegions(JSON.parse(localStorage.getItem('POKEWATCH-timers')))
        // getTimers()
    }, [])

    const setTimer = (region, ievent, time) => {
        setRegions({
            ...regions, [region]: {
                ...regions[region],
                'timer': dailyResetTimer(region, ievent, time),
                'button': resetRun,
                'btnClassNames': 'btn-danger',
                'event': '1337'
            }
        })
    }
    const loadTheShit = () => {
        setLoaded(true)
        if (localStorage.getItem('POKEWATCH-timers') == null) return
        setForSaving(JSON.parse(localStorage.getItem('POKEWATCH-timers')))
    }
    useEffect(() => { //LOADING
        if (!loaded) return
        let names = ['kanto', 'hoen']
        let allRegions = { ...regions };

        names.forEach(regionName => {
            allRegions[regionName].timer = dailyResetTimer(regionName, allRegions[regionName].event, forSaving[regionName].timestamp)
        })
        setRegions(allRegions)













        // names.forEach(region => {
        //     console.log(region)
        //     setRegions({
        //         ...regions, [region]: {
        //             ...regions[region],
        //             'timer': dailyResetTimer(region, regions[region].event, forSaving[region].timestamp)
        //         }
        //     })
        // })

        // setRegions({
        //     ...regions, [region]: {
        //         ...regions[region],
        //         'timer': dailyResetTimer(region, ievent, time),
        //         'button': resetRun,
        //         'btnClassNames': 'btn-danger',
        //         'event': '1337'
        //     }
        // })
        // setTimer('kanto', '0', forSaving.kanto.timestamp)
        // setTimer('hoen', '1', forSaving.hoen.timestamp)

    }, [forSaving])
    useEffect(() => {//SAVING
        if (!loaded) return
        saveCountdownToLocalstorage()
    }, [forSaving])
    const saveCountdownToLocalstorage = () => {
        localStorage.setItem('POKEWATCH-timers', JSON.stringify(forSaving))
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

        setForSaving({ ...forSaving, [regionName]: { ...forSaving[regionName], timestamp: null } })
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
        console.log(regions)
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
            setForSaving({ ...forSaving, [target.name]: { ...forSaving[target.name], timestamp: getTimeForCountdown } })
            setRegions({
                ...regions, [target.name]: {
                    ...regions[target.name],
                    'timer': dailyResetTimer(REGIONNAMES[target.name], target.dataset.ievent, getTimeForCountdown),
                    'button': resetRun,
                    'btnClassNames': 'btn-danger',
                    'event': '1337'
                }
            })
        } else {
            resetClicked(target.name, target.dataset.ievent)

        }


    }

    return (
        <>
            <div className="container">
                <h1>PokeWatch | Lets go!</h1>
                <br /><br /><br />
                <Accordion className="mb-3">
                    <Form.Group className="">
                        <Form.Label className="mr-4"><h2>Kanto: {regions.kanto.timer}</h2></Form.Label>
                        <Accordion.Toggle data-ievent='0' eventKey={regions.kanto.event} name={REGIONNAMES.kanto} as={Button} onClick={handleClick} size="small" className={regions.kanto.btnClassNames + " "}>{regions.kanto.button}</Accordion.Toggle>
                    </Form.Group>
                    <Accordion.Collapse eventKey='0'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>
                <Accordion className="mb-3">
                    <Form.Group className="">
                        <Form.Label className="mr-4"><h2>Hoen: {regions.hoen.timer}</h2></Form.Label>
                        <Accordion.Toggle data-ievent='1' eventKey={regions.hoen.event} name={REGIONNAMES.hoen} as={Button} onClick={handleClick} size="small" className={regions.hoen.btnClassNames + ' '}>{regions.hoen.button}</Accordion.Toggle>
                    </Form.Group>
                    <Accordion.Collapse eventKey='1'>
                        <span>Cool pic here ; )</span>
                    </Accordion.Collapse>
                </Accordion>


                <Button className="btn-danger" onClick={testThis}>Test!</Button>
            </div> {/* CONTAINER */}

        </>

    )
}
