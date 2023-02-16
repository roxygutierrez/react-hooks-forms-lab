import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onItemFormSubmit }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  //handles search event
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  //filters search
  const textFilter = (item) => {
    return item.name.toUpperCase().includes(searchText.toUpperCase());
  };

  //filters category
  const categoryFilter = (item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  };

  //handles category event
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  //filtered array of items
  const itemsToDisplay = items.filter(textFilter).filter(categoryFilter);

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit} />
      <Filter
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearch}
        search={searchText}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
