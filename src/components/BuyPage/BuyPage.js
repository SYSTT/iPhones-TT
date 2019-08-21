import React, { useState, useEffect } from 'react';
import './BuyPage.css';

function BuyPage() {
    const [priceTable, setPriceTable] = useState(null);

    useEffect(() => {
        async function fetchPriceTable() {
            const res = await fetch('./pricelist.json');
            const priceTable = await res.json();
            setPriceTable(priceTable);
        }
        fetchPriceTable();
    }, []);

    const items = priceTable ? Object.keys(priceTable).map(model => (
        <div className="BuyPage-item" key={model}>
            <h3 className="BuyPage-item-title">{ priceTable[model].name }</h3>
            <div className="BuyPage-item-options">
                { Object.keys(priceTable[model].prices).map(memory => (
                <div className="BuyPage-item-option" key={memory}>
                    <div className="BuyPage-item-memory">{ memory.toUpperCase() }</div>
                    <div className="BuyPage-item-price">${ priceTable[model].prices[memory] }</div>
                </div>
                ))}
            </div>
        </div>
    ))
    : null;
    
    return (
        <div className="BuyPage">
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
}

export default BuyPage;
