import React, { Component } from 'react';

import Sidebar from './components/Sidebar';
import ToggleSidebarButton from './components/ToggleSidebarButton';
import Grid from './components/Grid';

import Btns from './data/menuBtns';

class App extends Component {
	constructor(props) {
		super(props);

		this.speed = 100;
		this.rows = 30;
		this.cols = 60;

		this.state = {
			toggler: 'hidden',
			color: true,
			generations: 0,
			gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
		}

		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.selectBox = this.selectBox.bind(this);
		this.seed = this.seed.bind(this);
		this.play = this.play.bind(this);
		this.clearBtn = this.clearBtn.bind(this);
	}

	toggleSidebar() {
		this.setState({
			toggler: !this.state.toggler
		});
	}

	selectBox(row, col) {
		let updateGrid = copyGrid(this.state.gridFull);
		updateGrid[row][col] = !updateGrid[row][col]
		this.setState({
			gridFull: updateGrid
		})
	}

	play() {
		let originalGrid = this.state.gridFull;
		let updateGrid = copyGrid(this.state.gridFull);

		for(let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				let count = 0;
				if(i > 0) {
					if(originalGrid[i - 1][j]) {
						count++;
					}
				}

				if(i > 0 && j > 0) {
					if(originalGrid[i - 1][j - 1]) {
						count++;
					}
				}

				if(i > 0 && j < this.cols - 1) {
					if(originalGrid[i - 1][j + 1]) {
						count++;
					}
				}

				if(j < this.cols - 1) {
					if(originalGrid[i][j + 1]) {
						count++;
					}
				}

				if(j > 0) {
					if(originalGrid[i][j - 1]) {
						count++;
					}
				}

				if(i < this.rows - 1) {
					if(originalGrid[i + 1][j]) {
						count++;
					}
				}

				if(i < this.rows - 1 && j > 0) {
					if(originalGrid[i + 1][j - 1]) {
						count++;
					}
				}

				if(i < this.rows - 1 && j < this.cols - 1) {
					if(originalGrid[i + 1][j + 1]) {
						count++;
					}
				}

				if(originalGrid[i][j] && (count < 2 || count > 3)) {
					updateGrid[i][j] = false;
				}

				if(!originalGrid[i][j] && count === 3) {
					updateGrid[i][j] = true;
				}
			}
		}

		this.setState({
			gridFull: updateGrid
		})

	}

	seed() {
		let updateGrid = copyGrid(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				updateGrid[i][j] = (Math.floor(Math.random() * 5)) === 4 ? !updateGrid[i][j] : updateGrid[i][j]; //25% chance
			}
		}
		this.setState({
			gridFull: updateGrid
		})
	}

	clearBtn() {
		this.setState({
			gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
		})
	}

	playButton() {
		clearInterval(this.intervalId);

		this.intervalId = setInterval(() => {
			this.play();
		}, this.speed);
	}

	componentDidMount() {
		this.seed();
		this.playButton();
	}

	render() {
		return (
			<div className="app">
				<ToggleSidebarButton
					toggler={this.toggleSidebar}
					isToggle={this.state.toggler}
					color={this.state.color}
				/>
				<Sidebar
					toggler={this.toggleSidebar}
					isToggle={this.state.toggler}
					btns={Btns}
					clearBtn={this.clearBtn}
				/>
				<Grid
					gridFull={this.state.gridFull}
					rows={this.rows}
					cols={this.cols}
					selectBox={this.selectBox}
				/>
			</div>
		);
	}
}

function copyGrid(arr) {
	return JSON.parse(JSON.stringify(arr));
}

export default App;