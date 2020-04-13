import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, screen, waitForElement } from "@testing-library/react";
import { render } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import NewUser from "./Pages/NewUser";

test("should show validation errors", async () => {
    const history = createMemoryHistory();
    const { container } = render(
        <Router history={history}>
            <NewUser />
        </Router>
    );
    
    // Clicking save btn
    fireEvent.click(screen.getByText('Save'));

    const validatorSpan = await waitForElement(
        () => screen.getByText('Username is required'),
        { container }
    )
    expect(validatorSpan).toBeTruthy()
});

test("should add user", async () => {
    const history = createMemoryHistory();
    const { container } = render(
        <Router history={history}>
            <NewUser />
        </Router>
    );

    
    // Clicking save btn
    fireEvent.change(screen.getByTestId('username-input'), { target: { value: 'user' } })
    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'user@test.com' } })
    fireEvent.change(screen.getByTestId('name-input'), { target: { value: 'User Test' } })

    // Clicking save btn
    fireEvent.click(screen.getByText('Save'));

    const snackBar = await waitForElement(
        () => screen.getByText('User Added!'),
        { container }
    )
    expect(snackBar).toBeTruthy()
});
