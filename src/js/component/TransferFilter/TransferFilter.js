import React, { useEffect, useRef, useState } from "react";
import Button from "@/component/Button";
import Message, { TYPE_SUCCESS } from "@/component/Message/Message";
import { getAllFormFieldValues, fillFormValues } from "@/helper/domHelper";
import { getFilters, saveFilter } from "@/service/TransferFilterService";
import "./TransferFilter.scss";

const getSortedFilters = async () => (await getFilters()).sort((a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
});

const TransferFilter = () => {
    const [filters, setFilters] = useState([]);
    const [message, setMessage] = useState("");
    const filterNameRef = useRef(null);
    const selectFilterRef = useRef(null);

    useEffect(async () => {
        setFilters(await getSortedFilters());
    }, []);

    const onFilterAddSubmit = async (event) => {
        event.preventDefault();
        const { current } = filterNameRef;

        if (current) {
            const formFieldValues = getAllFormFieldValues();
            const filterName = current.value;
            const saved = await saveFilter(filterName, formFieldValues);

            if (saved) {
                setFilters(await getSortedFilters());
                setMessage("Filter saved!");
                setTimeout(() => setMessage(""), 3000);
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
                <label className="transfer-filter__form-label">Create new filter (3-50 chars name):</label>
                <input
                    ref={filterNameRef}
                    minLength="3"
                    maxLength="50"
                    className="transfer-filter__form-field form-control input-sm"
                />
                <Button type="submit">Save</Button>
                {!!message && (
                    <div className="transfer-filter__message">
                        <Message type={TYPE_SUCCESS}>{message}</Message>
                    </div>
                )}
            </form>

            {filters.length > 0 && (
                <form className="transfer-filter__form transfer-filter__form--select" onSubmit={onFilterSelectSubmit}>
                    <label className="transfer-filter__form-label">Select existing filter:</label>
                    <select ref={selectFilterRef} className="transfer-filter__form-field form-control input-sm">
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
