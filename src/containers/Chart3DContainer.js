import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Card, Col, Row, Spin, Button } from 'antd'
import Chart3D from './Chart3D'
import testData from './data'

const fetchData = async param => {
    try {
        // const humidityValues = () => Array.from({ length: 24 }).reduce((acc, datum, i) => {
        //     acc.push([0,i,1])
        //     return acc
        // }, []);
        const datum = () => {
            const response = []
            for (let i = 0; i < 6000; i++) {
                Object.keys(testData.ch_data_map_proc).map((datum, ii) => {
                    response.push([
                        ii,
                        i,
                        testData.ch_data_map_proc[ii].proc[i],
                    ])
                })
            }
            return response
        }
        return datum()
    } catch (e) {
        console.error('[ERROR] : 3D-Chart. fetchData()', e)
    }
}

const ChartContainer = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({
        prps3D: [],
        anomaly: [],
        timeLength: 590,
    })
    const [play, setPlay] = useState(null)
    const onClick = param => {
        setPlay(param)
    }

    const title = () => {
        return (
            <div>
                <Row justify="space-between">
                    <Col>PRPS(3D)</Col>
                    <Button onClick={() => onClick(true)}>START</Button>
                    <Button onClick={() => onClick(false)}>STOP</Button>
                </Row>
            </div>
        )
    }
    useEffect(() => {
        setLoading(true)
        fetchData()
            .then(response => {
                if (response) {
                    // const { value, average, max } = response
                    // const timeSeriesData = value.reduce((prev, next) => {
                    //     prev.push(...next)
                    //     return prev
                    // }, [])
                    const newData = {
                        prps3D: response,
                        // timeLength: !isEmpty(timeSeriesData) ? (timeSeriesData.length - 5120) / 1280 : 360,
                        timeLength: response
                            ? (response.length - 2200) / 220
                            : 590,
                        anomaly: testData.flaws,
                    }
                    setData(newData)
                    setLoading(false)
                } else {
                    setData([])
                    setLoading(false)
                }
            })
            .catch(error => {
                setLoading(false)
                console.error('[ERROR] : ChartContainer useEffect()', e)
            })
    }, [])

    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col span={8}>
                <Card title={title()} style={{ width: '100%', height: '100%' }}>
                    <Spin spinning={loading}>
                        <Chart3D data={data} pd3DPlay={play} />
                    </Spin>
                </Card>
            </Col>
        </Row>
    )
}

export default ChartContainer
