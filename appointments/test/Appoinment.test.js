import React from 'react';
import {createRoot} from 'react-dom/client';

import { Appointment } from '../src/Appointment';

describe("Appointment", () => {
    let container;
    let customer;

    beforeEach(() => {
        container = document.createElement("div");
    });

    const render = component => {
        const root = createRoot(container);
        React.act(() => root.render(component));
    }

    it("renders the customer first name", () => {
        customer = { firstName: "Ashley" };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch("Ashley");
    });

    it("renders another customer first name", () => {
        customer = { firstName: "Jordan" };
        render(<Appointment customer={customer} />);
        expect(container.textContent).toMatch("Jordan");
    });
});