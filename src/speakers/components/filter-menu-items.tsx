import { ReactElement } from "react";
import React from "react";
import { MenuItem, Select, InputBase } from "@material-ui/core";
import { Streams, ALL_STREAMS } from "../../constants/app";
import './filter-menu-items.css';

const FilterDropdown = ({ eventType, handleEventTypeChange }: { eventType: string, handleEventTypeChange: (event: any) => void }): ReactElement => {
    return (
        <Select
            id="searchByStreamSelect"
            value={eventType}
            onChange={handleEventTypeChange}
            input={
                <InputBase
                    className="searchInputWrapper searchOptionText"
                    classes={{ input: 'streamSelectInput' }}
                />
            }
            fullWidth
        >

            <MenuItem classes={{ root: 'dropdownItem' }} value={ALL_STREAMS}>
                All
            </MenuItem>
            <MenuItem classes={{ root: 'dropdownItem' }} value={Streams.WEB}>
                Web Meetup
            </MenuItem>
            <MenuItem classes={{ root: 'dropdownItem' }} value={Streams.MOBILE}>
                Mobile Meetup
            </MenuItem>
            <MenuItem classes={{ root: 'dropdownItem' }} value={Streams.CLOUD}>
                Cloud Meetup
            </MenuItem>
        </Select>
    );
}

export default FilterDropdown;