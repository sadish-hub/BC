import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const Search = ({ items, fetchItems, selectItem, id, labelKey, title, minLength, placeholder, selected, renderMenuItemChildren, multiple }) => {
    const [value, setValue] = useState('');
    const options = (items.search[value] || []).map(id => items.detail[id]);
    const props = {};
    if (renderMenuItemChildren) {
        props.renderMenuItemChildren = renderMenuItemChildren;
    }
    if (selected) {
        props.selected = selected;
    }

    return (
        <div className="form-group">
            <label htmlFor={id}>{title}</label>
            <AsyncTypeahead
                {...props}
                autoFocus
                labelKey={labelKey || "name"}
                multiple = {multiple || false}
                minLength={minLength || 3}
                id={id}
                filterBy={() => true}
                onSearch={term => {
                    fetchItems(term);
                    setValue(term);
                }}
                onChange={selectItem}
                placeholder={placeholder}
                isLoading={Boolean(value) && !items.search[value]}
                options={options}
            />
        </div>
    );
};
export default Search;
