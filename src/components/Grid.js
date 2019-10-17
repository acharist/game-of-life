import React, { Component } from 'react';
import Box from './Box';

class Grid extends Component {
	render() {
        const width = this.props.cols * 22;
        const height = this.props.rows * 22;
        const rowsArr = [];

        let boxClass = '';
        let boxId = '';
        for(let i = 0; i < this.props.rows; i++) {
            for(let j = 0; j < this.props.cols; j++) {
                boxId = `${i}_${j}`;
                boxClass = this.props.gridFull[i][j] ? 'box on' : 'box off';
                rowsArr.push(
                    <Box
                        boxClass={boxClass}
                        key={boxId}
                        row={i}
                        col={j}
                        width={20}
                        height={20}
                        selectBox={this.props.selectBox}
                />)
            }
        }

		return (
			<div className="grid" style={{width: width, height: height}}>
				{rowsArr}
			</div>
		);
	}
}

export default Grid;