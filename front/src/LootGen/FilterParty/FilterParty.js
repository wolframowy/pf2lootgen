import './FilterParty.css';
import {Component} from 'react';
import { Box, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

class FilterParty extends Component{

    constructor(props) {
        super(props);
        this.state = {
            lvl: 1,
            size: 4,
            rarity: ''
        }
    }

    handleRarityChange(event) {
        this.setState({
            rarity: event.target.value
        });
    }

    handleLvlChange(e) {
        this.setState({
            lvl: e.target.value
        })
    }

    handleSizeChange(e) {
        this.setState({
            size: e.target.value
        })
    }

    render() {
        return(
            <Box>
                <TextField className='FilterParty_text_field' id='pt_lvl' required label='Party level' type='number' value={this.state.lvl} onChange={(e) => this.handleLvlChange(e)}/>
                <TextField className='FilterParty_text_field' id='pt_size' required label='Party size' type='number' value={this.state.size} onChange={(e) => this.handleSizeChange(e)}/>
                <FormControl>
                    <InputLabel id='rarity_label'>Rarity</InputLabel>
                    <Select className='FilterParty_rarity_select' id="rarity" labelId='rarity_label' autoWidth value={this.state.rarity} onChange={(e) => this.handleRarityChange(e)}>
                        <MenuItem value='c'>Common</MenuItem>
                        <MenuItem value='u'>Uncommon</MenuItem>
                        <MenuItem value='r'>Rare</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        );
    }

};

export default FilterParty;
