import React from "react";

const ProductCard = React.forwardRef(
  ({ name, image, description, price }, ref) => {
    return (
      <div
        ref={ref}
        className="card p-4 space-y-1 w-56 h-72 rounded-xl shadow-md shadow-slate-400 bg-slate-100 flex flex-col justify-center"
      >
        <img
          src={image}
          alt={name}
          className="object-cover object-center w-full rounded-xl"
        />
        <div className="px-1 space-y-1">
          <h2 className="font-extrabold">{name}</h2>
          <p className="font-thin text-sm text-slate-600">{description}</p>
          <p className="font-extralight text-sm">
            Price: <span className="font-semibold">${price}</span>
          </p>
        </div>
      </div>
    );
  }
);

export default ProductCard;
