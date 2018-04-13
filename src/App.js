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
		this.intervalId;

		this.state = {
			toggler: 'hidden',
			color: true,
			generations: 0,
			gridFull: Array(this.rows).fill(Array(this.cols).fill(false))
		}

		this.toggleSidebar = this.toggleSidebar.bind(this);
		this.selectBox = this.selectBox.bind(this);
		this.seed = this.seed.bind(this);
	}

	toggleSidebar() {
        this.setState({
            toggler: !this.state.toggler
		});
		console.log(this.state.gridFull)
	}

	selectBox(row, col) {
		let updateGrid = copyGrid(this.state.gridFull);
		updateGrid[row][col] = !updateGrid[row][col]
		this.setState({
			gridFull: updateGrid
		})
	}

	seed() {
		let updateGrid = copyGrid(this.state.gridFull);
		for(let i = 0; i < this.rows; i++) {
			for(let j = 0; j < this.cols; j++) {
				updateGrid[i][j] = (Math.floor(Math.random() * 5)) === 4 ? !updateGrid[i][j] : updateGrid[i][j]; //25% chance
			}
		}
		this.setState({
			gridFull: updateGrid
		})
	}

	playButton() {
		clearInterval(this.intervalId);
		this.intervalId = setInterval(this.play, this.speed);
	}

	componentDidMount() {
		this.seed();
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