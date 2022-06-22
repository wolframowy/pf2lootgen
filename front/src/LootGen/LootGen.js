import './LootGen.css';
import FilterParty from './FilterParty/FilterParty'
import FilterItem from './FilterItem/FilterItem'
import {Component} from "react";
import {Box, Button, ButtonGroup} from '@mui/material';

class LootGen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode_party: true,
            loading: false,
            items: [],
            party: {}
        };
    }

    handleModeClick(mode) {
        this.setState({
            mode_party: mode === 'p'
        })
    }

    render() {
        return (
            <Box className='LootGen'>
                <Box className='LootGen_filter'>
                    <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                        <Button variant={this.state.mode_party ? "contained" : "text"} onClick={() => { this.handleModeClick('p') }}>Party</Button>
                        <Button variant={this.state.mode_party ? "text" : "contained"} onClick={() => { this.handleModeClick('i') }}>Item</Button>
                    </ButtonGroup>
                    {this.state.mode_party ? <FilterParty /> : <FilterItem />}
                </Box>
                <Box className='LootGen_results'>
                    <div />
                </Box>

            </Box>
        );
    }
}

export default LootGen;
