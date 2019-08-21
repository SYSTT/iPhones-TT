import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BuyPage.css';

import ContactForm from './../forms/ContactForm';

function BuyPage({ location }) {
    const [priceTable, setPriceTable] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        async function fetchPriceTable() {
            const res = await fetch('./pricelist.json');
            const priceTable = await res.json();
            setPriceTable(priceTable);
        }
        fetchPriceTable();
    }, []);

    useEffect(() => {
        if (location.search) {
            const params = location.search.slice(1).split('&');
            const paramsObj = {};
            for (const param of params) {
                const [key, val] = param.split('=');
                paramsObj[key] = val;
            }
            setSelected(paramsObj);
        } else {
            setSelected(null);
        }
    }, [location.search])

    const makeSelection = (index, model, memory) => {
        setSelected({ model, memory });
        setSelectedIndex(index);

    }

    const modelOption = (model, memory) => (priceTable ?
        <Link
            key={memory}
            to={`?model=${model}&memory=${memory}`}
            className="BuyPage-item-option"
        >
            <div className="BuyPage-item-memory">{ memory.toUpperCase() }</div>
            <div className="BuyPage-item-price">${ priceTable[model].prices[memory] }</div>
        </Link>
        : null
    );

    const item = (model, memory) => (priceTable ? 
        <div
            key={model}
            className={`BuyPage-item ${selected ? 'BuyPage-item-selected' : null}`}
        >
            <h3
                className={`BuyPage-item-title ${selected ? 'BuyPage-item-title-selected' : null}`}
            >
                { priceTable[model].name }
            </h3>
            <div className="BuyPage-item-options">
                { !memory
                ?   Object.keys(priceTable[model].prices).map(memory => modelOption(model, memory))
                :   modelOption(model, memory)}
            </div>
        </div>
        : null
    );

    const items = priceTable ? Object.keys(priceTable).map((model, index) => (
        item(model)
    ))
    : null;

    const preselection = (
        <div className="BuyPage-content">
            <h1>Purchase iPhones</h1>
            <p>Find the list of iPhones available and prices below.</p>
            <div className="BuyPage-list">
                {items}
            </div>
            <div className="BuyPage-contact">
                <p>Send us an email to purchase!</p>
                <a href="mailto:iphonestnt@gmail.com" target="_blank" rel="noopener noreferrer">
                    <button type="submit">Contact</button>
                </a>
            </div>
        </div>
    );

    const postSelection = selected ? (
        <>
            <div className="BuyPage-content">
                { item(selected.model, selected.memory) }
            </div>
            <ContactForm />
        </>
    ) : null;
    
    return (
        <div className="BuyPage">
            { !selected ? preselection : postSelection }
        </div>
    );
}

export default BuyPage;
