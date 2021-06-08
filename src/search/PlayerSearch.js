import { Component } from 'react';
import './PlayerSearch.css';

export default class PlayerSearch extends Component {
  state = {
    search: ''
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value });
  }

  handleSubmit = e => {
    const { onSearch } = this.props;
    const { search } = this.state;
    e.preventDefault();
    onSearch(search);
  }
  
  render() {
       
    return (
      <form className="PlayerSearch" onSubmit={this.handleSubmit}>
        <input value={this.state.search} onChange={this.handleSearchChange}>

        </input>
        <button>Search</button>
      </form>
    );
  }

}