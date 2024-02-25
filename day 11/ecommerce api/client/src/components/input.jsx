/** @format */
"use client";

export function InputComponent({
  className,
  min = 0,
  max = Infinity,
  id,
  quantity,
  setQuantity,
}) {
  const decrement = () => {
    if (quantity > min) setQuantity(quantity - 1);
  };
  const increment = () => {
    if (quantity < Number(max)) setQuantity(Number(quantity) + 1);
  };

  const updateQty = (e) => {
    const number = Number(e.target.value);
    if ((number >= min && number < Number(max)) || !number) {
      setQuantity(number || min);
    } else {
      setQuantity(Number(max));
    }
  };

  return (
    <div className={`flex  border-2 p-2 ${className}  rounded-xl text-center`}>
      <button type="button" onClick={decrement}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20 12.75H4a.75.75 0 1 1 0-1.5h16a.75.75 0 1 1 0 1.5Z"></path>
          </svg>{" "}
        </svg>
      </button>
      <input
        className="w-full text-center outline-none "
        value={quantity}
        onChange={updateQty}
        id={id}
      />
      <button type="button" onClick={increment}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 11.25h-7.25V4a.75.75 0 1 0-1.5 0v7.25H4a.75.75 0 1 0 0 1.5h7.25V20a.75.75 0 1 0 1.5 0v-7.25H20a.75.75 0 1 0 0-1.5Z"></path>
        </svg>
      </button>
    </div>
  );
}
