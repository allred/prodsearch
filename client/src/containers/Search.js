import React, { Component } from 'react'

class Search extends Component {
  state = {
    query: '',
  }

  fetch(endpoint) {
    return new Promise((resolve, reject) => {
      window.fetch(endpoint)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    })
  }

  getSearch = () => {
    this.fetch('api/products?name=' + this.state.query)
    .then(products => {
      this.setState({products: products})
    })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getSearch()
        }
      }
    })
  }

  render() {
    let products = this.state.products
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>Results{this.state.query ? " for: " + this.state.query : ":"}</p>
        <div>{products && products.length >= 1 ? products.map((product) =>
          <div key={product.product.id}>

            <div><img src={product.product.image} alt={product.product.name} /></div>
            <div>
            <strong>Description: {product.product.description}</strong>
            </div>

            <div>
              <div><strong>Inventory:</strong></div>
              {product.inventory && product.inventory.length >= 1 ? product.inventory.map((inventory) =>
                <div key={inventory.id}>style: {inventory.style}, waist: {inventory.waist}, length: {inventory.length}, count: {inventory.count}</div>
              ): ''
              }
            </div>

          </div>
         ): <div>No products found</div>
        }</div>
      </form>
    )
  }
}

export default Search
