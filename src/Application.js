import React, { Component } from 'react';
import NewItem from './NewItem';
import Items from './Items';
import './Application.css';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  addItem(item) {
    this.setState({ items: [item, ...this.state.items] });
  }

  removeItem(item) {
    this.setState({
      items: this.state.items.filter(other => other.id !== item.id),
    });
  }

  toggle(item) {
    const otherItems = this.state.items.filter(other => other.id !== item.id);
    const updatedItem = { ...item, packed: !item.packed };
    this.setState({ items: [updatedItem, ...otherItems] });
  }

  render() {
    const { items } = this.state;
    const unpackedItems = items.filter(item => !item.packed);
    const packedItems = items.filter(item => item.packed);

    return (
      <div className="Application">
        <NewItem onSubmit={this.addItem} />
        <Items
          title="Unpacked Items"
          items={unpackedItems}
          onCheckOff={this.toggle}
          onRemove={this.removeItem}
        />
        <Items
          title="Packed Items"
          items={packedItems}
          onCheckOff={this.toggle}
          onRemove={this.removeItem}
        />
      </div>
    );
  }
}

export default Application;
