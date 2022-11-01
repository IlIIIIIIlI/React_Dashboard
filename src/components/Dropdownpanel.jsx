import React from "react";

const options = [
    {
        label: "Apple",
        value: "apple",
    },
    {
        label: "Mango",
        value: "mango",
    },
    {
        label: "Banana",
        value: "banana",
    },
    {
        label: "Pineapple",
        value: "pineapple",
    },
];

export default class Dropdownpanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fruit: "banana",
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log("Fruit Selected!!");
        this.setState({ fruit: e.target.value });
    }

    render() {
        return (
            <div id="Dropdownpanel">
                <div className="select-container">
                    <select value={this.state.fruit} onChange={this.handleChange}>
                        {options.map((option) => (
                            <option value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        );
    }
}