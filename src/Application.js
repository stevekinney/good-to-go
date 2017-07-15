import React, { Component } from 'react';
import CountDown from './CountDown';
import NewItem from './NewItem';
import Items from './Items';
import PerformanceTools from './PerformanceTools';
import './Application.css';

let count = 0;

const defaultState = [
  { value: 'Pants', id: count++, packed: false },
  { value: 'Jacket', id: count++, packed: false },
  { value: 'iPhone Charger', id: count++, packed: false },
  { value: 'MacBook', id: count++, packed: false },
  { value: 'Sleeping Pills', id: count++, packed: true },
  { value: 'Underwear', id: count++, packed: false },
  { value: 'Hat', id: count++, packed: false },
  { value: 'T-Shirts', id: count++, packed: false },
  { value: 'Belt', id: count++, packed: false },
  { value: 'Passport', id: count++, packed: true },
  { value: 'Sandwich', id: count++, packed: true },
];

const defaultTripTime = Date.now() + (1000 * 60 * 10);
const calculateTimeLeft = () => {
  const distance = defaultTripTime - Date.now();
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return `in ${minutes} minute(s) and ${seconds} second(s)`;
};

const filterUnpackedItems = items => items.filter(item => !item.packed);
const filterPackedItems = items => items.filter(item => item.packed);
const filterItems = (items) => {
  const packedItems = filterPackedItems(items);
  const unpackedItems = filterUnpackedItems(items);
  return {
    packedItems,
    unpackedItems,
  };
};

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...filterItems(defaultState),
      timeLeft: calculateTimeLeft(),
    };

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markAsPacked = this.markAsPacked.bind(this);
    this.markAllAsUnpacked = this.markAllAsUnpacked.bind(this);
  }

  componentDidMount() {
    this.countDownInterval = setInterval(() => {
      const { timeLeft } = this.state;
      const newTimeLeft = calculateTimeLeft();
      if (timeLeft !== newTimeLeft) this.setState({ timeLeft: newTimeLeft });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.countDownInterval);
  }

  addItem(item) {
    this.setState({ unpackedItems: [item, ...this.state.unpackedItems] });
  }

  removeItem(item) {
    this.setState({ items: this.state.items.filter(other => other.id !== item.id) });
  }

  markAsPacked(item) {
    const otherItems = this.state.items.filter(other => other.id !== item.id);
    const updatedItem = { ...item, packed: !item.packed };
    this.setState({ items: [updatedItem, ...otherItems] });
  }

  markAllAsUnpacked() {
    const items = this.state.items.map(item => ({ ...item, packed: false }));
    this.setState({ items });
  }

  render() {
    const { packedItems, unpackedItems } = this.state;

    return (
      <div className="Application">
        <NewItem onSubmit={this.addItem} />
        <CountDown {...this.state} />
        <Items
          title="Unpacked Items"
          items={unpackedItems}
          onCheckOff={this.markAsPacked}
          onRemove={this.removeItem}
        />
        <Items
          title="Packed Items"
          items={packedItems}
          onCheckOff={this.markAsPacked}
          onRemove={this.removeItem}
        />
        <button
          className="button full-width"
          onClick={this.markAllAsUnpacked}
        >
          Mark All As Unpacked
        </button>
        { process.env.NODE_ENV === 'development' && <PerformanceTools /> }
      </div>
    );
  }
}

export default Application;
