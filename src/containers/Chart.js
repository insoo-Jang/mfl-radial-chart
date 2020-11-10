import React, { useEffect } from 'react'
import * as d3 from 'd3'
import uuid from 'uuid'
import testData from './data'

const uid = `chart_${uuid()}`

const Chart = () => {
    const width = 600
    const height = width
    const margin = 10
    const innerRadius = width / 8
    const outerRadius = width / 2 - margin
    const getChart = () => d3.select(`#${uid}`)

    let timer
    const xAxisKey = Object.keys(testData.ch_data_map_proc)
    let svg
    let count = 0
    const jdata = Object.keys(testData.ch_data_map_proc).reduce((acc, keys) => {
        acc.push(testData.ch_data_map_proc[keys].proc[count])
        return acc
    }, [])
    jdata.push(jdata[0])
    const minVal = d3.min(jdata)
    const maxVal = 1
    const y = d3
        .scaleLinear()
        .domain([0, maxVal])
        .range([innerRadius, outerRadius])
    const x = d3
        .scaleLinear()
        .domain([0, 29])
        .range([0, 2 * Math.PI])

    const line = d3
        .lineRadial()
        .radius((d, i) => y(d))
        .angle((d, i) => (i / 22) * 2 * Math.PI)

    const createChart = () => {
        svg = getChart()
        svg.attr('viewBox', [-width / 2, -height / 2, width, height])
            .attr('stroke-linejoin', 'round')
            .attr('stroke-linecap', 'round')

        const yAxis = g =>
            g
                .attr('text-anchor', 'middle')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .call(g =>
                    g
                        .selectAll('g')
                        .data(y.ticks(5).reverse())
                        .join('g')
                        .attr('fill', 'none')
                        .call(g =>
                            g
                                .append('circle')
                                .attr('stroke', '#000')
                                .attr('stroke-opacity', 0.2)
                                .attr('r', y),
                        )
                        .call(g =>
                            g
                                .append('text')
                                .attr('y', d => -y(d))
                                .attr('dy', '0.35em')
                                .attr('stroke', '#fff')
                                .attr('stroke-width', 5)
                                .text(x => x)
                                .clone(true)
                                .attr('y', d => y(d))
                                .selectAll(function() {
                                    return [this, this.previousSibling]
                                })
                                .clone(true)
                                .attr('fill', 'currentColor')
                                .attr('stroke', 'none'),
                        ),
                )

        const xAxis = g =>
            g
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .call(g =>
                    g
                        .selectAll('.line-ticks')
                        .data(xAxisKey)
                        .enter()
                        .append('g')
                        .attr(
                            'transform',
                            (d, i) =>
                                `rotate(${(i / xAxisKey.length) * 360 -
                                    90})translate(${y(maxVal)})`,
                        )
                        .attr('class', 'line-ticks')
                        .call(g =>
                            g
                                .append('line')
                                .attr('x2', -1 * (y(maxVal) - innerRadius))
                                .attr('stroke', '#CCC')
                                .attr('fill', "'#CCC"),
                        )
                        .call(g =>
                            g
                                .append('text')
                                .text(String)
                                .attr('text-anchor', 'middle')
                                .attr('transform', (d, i) =>
                                    (i / xAxisKey.length) * 360 < 180
                                        ? `translate(-${y(maxVal) -
                                              innerRadius +
                                              margin})`
                                        : `rotate(180)translate(${y(maxVal) -
                                              innerRadius +
                                              margin})`,
                                )
                                .attr('dy', 3),
                        ),
                )

        const lineAxis = g =>
            g
                .selectAll('lineWrapper')
                .data([jdata])
                .enter()
                .append('g')
                .attr('fill', 'none')
                .attr('stroke', 'steelblue')
                .append('path')
                .attr('class', 'line')
                .attr('stroke', 'steelblue')
                .attr('stroke-width', 1.5)
                .attr('fill', 'steelblue')
                .attr('fill-opacity', 0.3)
                .attr('d', line)

        svg.append('g').call(yAxis)
        svg.append('g').call(xAxis)
        svg.append('g').call(lineAxis)
    }

    useEffect(() => {
        createChart()
    }, [])

    const tick = param => {
        count += 1
        svg.selectAll('path')
            .data([param])
            .transition()
            .duration(150)
            .ease(d3.easeLinear)
            .attr('d', line)
    }

    const start = () => {
        clearInterval(timer)
        timer = setInterval(() => {
            console.log(count)
            const datum = Object.keys(testData.ch_data_map_proc).reduce(
                (acc, keys) => {
                    acc.push(testData.ch_data_map_proc[keys].proc[count])
                    return acc
                },
                [],
            )
            datum.push(datum[0])
            tick(datum)
        }, 150)
    }

    const stop = () => {
        clearInterval(timer)
        timer = null
    }

    return (
        <div style={{ height: '100%', textAlign: 'center' }}>
            <svg id={uid} style={{ width: width, height: height }} />
            <button onClick={start}>Play</button>
            <button onClick={stop}>Stop</button>
        </div>
    )
}

export default Chart
