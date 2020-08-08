import { ReactElement } from 'react';
import React from 'react';
import { MenuItem, Select, InputBase } from '@material-ui/core';
import './filter-menu-items.css';
import { ListItem } from '../../../entities/entities';

export interface FilterDropdownProps {
    value: string;
    onValueChange: (event: any) => void;
    items: ListItem[];
}

const FilterDropdown = ({ value, onValueChange, items }: FilterDropdownProps): ReactElement => {
    return (
        <Select
            id="searchByStreamSelect"
            value={value}
            onChange={onValueChange}
            input={
                <InputBase className="searchInputWrapper searchOptionText" classes={{ input: 'streamSelectInput' }} />
            }
            fullWidth
        >
            {items.map(item => (
                <MenuItem key={item.value} classes={{ root: 'dropdownItem' }} value={item.value}>
                    {item.title}
                </MenuItem>
            ))}
        </Select>
    );
};

export default FilterDropdown;
