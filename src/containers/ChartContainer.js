import React from 'react'
import { Row, Col, Card, Spin } from 'antd'
import Chart from './Chart'

const ChartContainer = () => {
    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col span={10}>
                <Card style={{ height: '100%' }}>
                    {/*<Spin spinning={loading}>*/}
                    <Chart />
                    {/*</Spin>*/}
                </Card>
            </Col>
        </Row>
    )
}

export default ChartContainer
