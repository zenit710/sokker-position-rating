import React, { useEffect, useRef, useState } from "react";
import Button from "@/component/Button";
import { getAllFormFieldValues, fillFormValues } from "@/helper/domHelper";
import { getFilters, saveFilter } from "@/service/TransferFilterService";

const TransferFilter = () => {
    const [filters, setFilters] = useState([]);
    const [message, setMessage] = useState("");
    const filterNameRef = useRef(null);
    const selectFilterRef = useRef(null);

    useEffect(async () => {
        setFilters(await getFilters());
    }, []);

    const onFilterAddSubmit = async (event) => {
        event.preventDefault();
        const { current } = filterNameRef;

        if (current) {
            const formFieldValues = getAllFormFieldValues();
            const filterName = current.value;
            const saved = await saveFilter(filterName, formFieldValues);

            if (saved) {
                setFilters(await getFilters());
                setMessage("Filter saved!");
            }
        }
    };

    const onFilterSelectSubmit = (event) => {
        event.preventDefault();
        const { current: filterSelect } = selectFilterRef;
        const { current: nameInput } = filterNameRef;

        if (filterSelect && nameInput && filterSelect.value > -1) {
            const selectedFilter = filters[filterSelect.value];
            nameInput.value = selectedFilter.name;
            fillFormValues(selectedFilter.formValues);
        }
    };

    return (
        <div className="transfer-filter">
            <form className="transfer-filter__form transfer-filter__form--add" onSubmit={onFilterAddSubmit}>
                <label className="transfer-filter__form-label">Filter name (3-50 chars):</label>
                <input ref={filterNameRef} min="3" max="50" />
                <Button type="submit">Save</Button>
                {!!message && <span className="transfer-filter__message">{message}</span>}
            </form>

            {filters.length > 0 && (
                <form className="transfer-filter__form transfer-filter__form--select" onSubmit={onFilterSelectSubmit}>
                    <label className="transfer-filter__form-label">Select existing filter:</label>
                    <select ref={selectFilterRef}>
                        <option value="-1">-- Choose filter --</option>
                        {filters.map((filter, index) => (
                            <option value={index} key={filter.name}>{filter.name}</option>
                        ))}
                    </select>
                    <Button type="submit">Load</Button>
                </form>
            )}
        </div>
    );
};

export default TransferFilter;
