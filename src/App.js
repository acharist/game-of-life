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
		this.cols = 50;

		this.state = {
			toggle: 'hidden',
			color: true,
			generations: 0,
			gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
		}

		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.selectBox = this.selectBox.bind(this);
		this.seed = this.seed.bind(this);
		this.play = this.play.bind(this);

		this.playBtn = this.playBtn.bind(this);
		this.pauseBtn = this.pauseBtn.bind(this);
		this.slowBtn = this.slowBtn.bind(this);
		this.fastBtn = this.fastBtn.bind(this);
		this.clearBtn = this.clearBtn.bind(this);
		this.sizeBtn = this.sizeBtn.bind(this);
	}

	toggleSidebar() {
		this.setState({
			toggle: !this.state.toggle
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
		});

	}

	playBtn() {
		clearInterval(this.intervalId);

		this.intervalId = setInterval(() => {
			this.play();
		}, this.speed);
	}

	pauseBtn() {
		clearInterval(this.intervalId);
	}
	
	slowBtn() {
		this.speed = 1000;
		this.playBtn()
	}
	
	fastBtn() {
		this.speed = 100;
		this.playBtn();
	}

	seed() {
		this.pauseBtn();
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
		clearInterval(this.intervalId);
		this.setState({
			gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
		})
	}

	sizeBtn(size) {
		switch(size) {
			case '0':
				this.rows = 50;
				this.cols = 70;
				break;
			case '1':
				this.rows = 30;
				this.cols = 50;
				break;
			default:
				this.rows = 10;
				this.cols = 30;
		}

		this.clearBtn();
	}

	componentDidMount() {
		this.seed();
		this.playBtn();
	}

	render() {
		return (
			<div className="app">
				<ToggleSidebarButton
					toggle={this.toggleSidebar}
					isToggle={this.state.toggle}
					color={this.state.color}
				/>
				<Sidebar
					toggle={this.toggleSidebar}
					isToggle={this.state.toggle}
					btns={Btns}
					playBtn={this.playBtn} 
					pauseBtn={this.pauseBtn}
					clearBtn={this.clearBtn}
					slowBtn={this.slowBtn} 
					fastBtn={this.fastBtn} 
					seedBtn={this.seed}
					sizeBtn={this.sizeBtn}
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
