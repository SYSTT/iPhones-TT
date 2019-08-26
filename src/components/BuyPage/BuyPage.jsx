import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BuyPage.css';

import ContactForm from './../forms/ContactForm';

function BuyPage({ location, history }) {
    const [priceTable, setPriceTable] = useState(null);
    const [selected, setSelected] = useState(null);
    const [contactInfo, setContactInfo] = useState(null);

    useEffect(() => {
        async function fetchPriceTable() {
            const res = await fetch('./assets/sellpricelist.json');
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
    }, [location.search]);

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
            <h1>Buy Your iPhone Here</h1>
            <p>View our available iPhones and prices below. We’ve marked New iPhones with an “*” and left A-Grade iPhones unmarked.</p>
            <div className="BuyPage-list">
                {items}
            </div>
            <div className="BuyPage-contact">
            </div>
        </div>
    );

    const sendEmailUrl = (contactInfo, selected) =>
        'https://us-central1-iphones-tt-176b7.cloudfunctions.net/sendMail?' +
        `name=${encodeURIComponent(contactInfo.name)}&` +
        `email=${encodeURIComponent(contactInfo.email)}&` +
        `contact=${encodeURIComponent(contactInfo.tel)}&` +
        `address=${encodeURIComponent(contactInfo.address)}&` +
        `model=${encodeURIComponent(priceTable[selected.model].name)}&` +
        `memory=${encodeURIComponent(selected.memory.toUpperCase())}&` +
        `price=${encodeURIComponent(priceTable ? priceTable[selected.model].prices[selected.memory] : '')}`;
    const onSubmit = async (contactInfo) => {
        setContactInfo(contactInfo);
        const res = await fetch(sendEmailUrl(contactInfo, selected));
        if (res.ok) {
            history.push(`${location.pathname}${location.search}&complete=true`);
        }
    };

    const postSelection = selected ? (
        <>
            <div className="BuyPage-content">
                { item(selected.model, selected.memory) }
            </div>
            <ContactForm onSubmit={onSubmit} />
        </>
    ) : null;

    const postOrder = selected ? (
        <div className="BuyPage-content">
            <h1>Your order has been submitted</h1>
            <p>We'll call you within the hour to confirm your order.</p>
            <h2>Your order:</h2>
            { item(selected.model, selected.memory) }
            { contactInfo &&
            <>
            <h2>Your info:</h2>
            <p>{ contactInfo.name }</p>
            <p>{ contactInfo.email }</p>
            <p>{ contactInfo.tel }</p>
            <p>{ contactInfo.address }</p>
            </>
            }
        </div>
    ): null;
    
    return (
        <div className="BuyPage">
            { !selected ? preselection : !selected.complete ? postSelection : postOrder }
        </div>
    );
}

export default BuyPage;
