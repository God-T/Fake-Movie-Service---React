import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onSelect,
  selectedGroupTextProperty,
}) => {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onSelect(item)}
          className={
            selectedGroupTextProperty === item[textProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
