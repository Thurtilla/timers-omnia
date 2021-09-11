import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, Col, Row } from 'react-bootstrap';
import Timer from '../timers/Timer';
import omnia from '../../assets/img/omnia_zoomed.png';
import { ArrowClockwise, PauseBtn } from 'react-bootstrap-icons';

export default function PcComp() {
  const [loading, setLoading] = useState(true);
  const status = {
    0: 'AVAILABLE',
    1: 'OCCUPIED',
  };
  const [pcs, setPcs] = useState([
    {
      name: 'Alpha',
      status: 1,
      time: 1000 * 60 * 60,
    },
    {
      name: 'PC2',
      status: 0,
    },
    {
      name: 'PC3',
      status: 0,
    },
    {
      name: 'PC4',
      status: 0,
    },
  ]);
  useEffect(() => {
    setLoading(false);
    return () => {};
  }, [pcs]);
  if (loading) return <div>loading...</div>;
  return (
    <Row xs={1} sm={2} lg={4}>
      {pcs.map((pc) => {
        return (
          <>
            <Col>
              <Card className='bg-dark'>
                <Card.Img style={{ minHeight: '200px' }} src={omnia} alt='Omnia logo' />
                <Card.ImgOverlay className="backgroundColor">
                  <Card.Text className='text-center'>
                    <h2 className="">{pc.name}</h2>
                    <h4 className='text-center font-weight-bold '>{status[pc.status]}</h4>
                    <Timer overtime={true} time={pc.time || 0} />
                     <ButtonGroup className="centerAbs">  {/*</Card.Text>style={{ position: 'absolute', bottom: "15px", left: "30%"}}> */}
                      <Button
                        variant='warning'
                      >
                        <PauseBtn color='white' />
                      </Button>
                      <Button
                        variant='danger'
                      >
                        <ArrowClockwise />
                      </Button>
                    </ButtonGroup>
                  </Card.Text>
                </Card.ImgOverlay>
              </Card>
            </Col>
          </>
        );
      })}
    </Row>
  );
}
