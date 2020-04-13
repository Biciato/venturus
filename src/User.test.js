import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { fireEvent, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { render } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import Users from "./Pages/Users";


test("should populate users table", () => {
    const users = [
        {
            Username: "Bret",
            Name: "Leanne Graham",
            "E-mail": "Sincere@april.biz",
            City: "Gwenborough",
            "Ride in group": "Never",
            "Day of the week": "Week Days",
            Posts: 10,
            Albums: 10,
            Photos: 50,
        },
    ];
    const history = createMemoryHistory();
    const { container } = render(
        <Router history={history}>
            <Users users={users} />
        </Router>
    );

    expect(container.innerHTML).toMatch(/^Bret|Leanne Graham|Sincere@april.biz|Gwenborough|Never|Week Days|10|10|50$/);
});

test("should filter table", async () => {
    const users = [
        {
            Username: "Bret",
            Name: "Leanne Graham",
            "E-mail": "Sincere@april.biz",
            City: "Gwenborough",
            "Ride in group": "Never",
            "Day of the week": "Week Days",
            Posts: 10,
            Albums: 10,
            Photos: 50,
        },
        {
            Username: "Antonette",
            Name: "Ervin Howell",
            "E-mail": "Shanna@melissa.tv",
            City: "Wisokyburgh",
            "Ride in group": "Sometimes",
            "Day of the week": "Mon, Wed, Fri",
            Posts: 10,
            Albums: 10,
            Photos: 50,
        },
    ];
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <Users users={users} />
        </Router>
    );
    // getting table rows
    let rows = screen.getAllByRole("row").length;
    expect(rows).toBe(3);
    // typing in search filter
    const el = screen.getByPlaceholderText(/Search/);
    fireEvent.keyDown(el, { key: "a", code: "KeyA" });
    fireEvent.keyDown(el, { key: "n", code: "KeyN" });
    fireEvent.keyDown(el, { key: "t", code: "KeyT" });
    // await for table update
    waitForElementToBeRemoved(() => screen.getByText('Bret'))
        .then(() => {
            rows = screen.getAllByRole("row").length;
            expect(rows).toBe(2)
        })    
});
