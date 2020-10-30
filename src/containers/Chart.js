import React, { useEffect } from 'react'
import * as d3 from 'd3'
import uuid from 'uuid'

const uid = `chart_${uuid()}`

const Chart = props => {
    const {} = props

    const width = 954
    const height = width
    const margin = 10
    const innerRadius = width / 5
    const outerRadius = width / 2 - margin
    const getChart = () => d3.select(`#${uid}`)
    const y = d3
        .scaleLinear()
        .domain([40, 100])
        .range([innerRadius, outerRadius])
    const x = d3
        .scaleLinear()
        .domain([0, 24])
        .range([0, 2 * Math.PI])
    const createChart = () => {
        const svg = getChart()
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
                                .text(
                                    (x, i) => `${x.toFixed(0)}${i ? '' : '°F'}`,
                                )
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
        console.log(x.ticks(24))
        const xAxis = g =>
            g
                .attr('font-family', 'sans-serif')
                .attr('font-size', 10)
                .call(g =>
                    g
                        .selectAll('g')
                        .data(x.ticks(24))
                        .join('g')
                        .call(g =>
                            g
                                .append('path')
                                .attr('stroke', '#000')
                                .attr('stroke-opacity', 0.2)
                                .attr(
                                    'd',
                                    d => `
              M${d3.pointRadial(x(d), innerRadius)}
              L${d3.pointRadial(x(d), outerRadius)}
            `,
                                ),
                        ),
                )

        svg.append('g').call(yAxis)
        svg.append('g').call(xAxis)
    }

    useEffect(() => {
        createChart()
    }, [])

    return (
        <div style={{ height: '100%', textAlign: 'center' }}>
            <svg id={uid} style={{ width: width, height: height }} />
        </div>
    )
}

export default Chart
