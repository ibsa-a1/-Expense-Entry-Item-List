import React, { Component } from 'react';
import './ExpenseEntryItemList.css'

class ExpenseEntryItemList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: [],
            error: null
        };
    }

    componentDidMount() {
        this.fetchRemoteItems();
    }

    setItems(remoteItems) {
        const items = remoteItems.map(item => ({
            id: item.id,
            name: item.title,   
            amount: item.price,     
            spendDate: new Date().toISOString(), // Use today's date since the API doesn't have one
            category: item.category 
        }));

        this.setState({
            isLoaded: true,
            items: items
        });
    }

    fetchRemoteItems() {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(
                (results) => {
                    this.setItems(results.products);
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }
    
    handleDelete = (id, e) => {
        e.preventDefault();
        console.log("Simulating delete for item with id:", id);
        const updatedItems = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updatedItems });
    };

    render() {
        const { error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading from Public API...</div>;
        } else {
            const lists = items.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>${item.amount}</td>
                    <td>{new Date(item.spendDate).toDateString()}</td>
                    <td>{item.category}</td>
                    <td>
                        <a href='#' onClick={(e) => this.handleDelete(item.id, e)}>Remove</a>
                    </td>
                </tr>
            ));

            return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lists.length > 0 ? lists : <tr><td colSpan="5">No expenses found!</td></tr>}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default ExpenseEntryItemList;