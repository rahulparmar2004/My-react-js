import { useState } from "react";
import { useNavigate } from "react-router-dom";


const UserForm = () => {
    const navigate = useNavigate();
   const [image, setImage] = useState(null);

const handleImage = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    setImage(reader.result); // base64
  };
  reader.readAsDataURL(file);
};


    const [invoice, setInvoice] = useState({

        // Company
        companyName: "",
        yourName: "",
        address: "",
        email: "",

        // Client
        clientCompany: "",
        clientName: "",
        clientAddress: "",
        clientEmail: "",

        // Invoice meta
        invoiceNo: "",
        invoiceDate: "",
        dueDate: "",

        // Payment
        accountNo: "",

        // Notes
        note: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setInvoice((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    const handleSubmit = (e) => {
        navigate("/review", {
            state: {
                invoice,
                items,
                image,
                subTotal,
                discountAmount,
                gstAmount,
                finalTotal,
            },
        })
    }








    const [items, setItems] = useState([
        { name: "", qty: 1, rate: 0, amount: 0 }
    ]);


    // Amount Logic
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];

        updatedItems[index][field] = value;

        const qty = Number(updatedItems[index].qty) || 0;
        const rate = Number(updatedItems[index].rate) || 0;

        updatedItems[index].amount = qty * rate;

        setItems(updatedItems);
    };

    //Add Logic
    const addItem = () => {
        setItems([...items, { item: "", qty: 1, rate: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    // Toal Logic
    const subTotal = items.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
    );

    const [discountPercent, setDiscountPercent] = useState(0);
    const discountAmount = (subTotal * discountPercent) / 100;

    const gstRate = 18;

    const taxableAmount = subTotal - discountAmount;
    const gstAmount = (taxableAmount * gstRate) / 100;

    const finalTotal = taxableAmount + gstAmount;




    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg p-8">

                {/* Top Header */}
                <div
                    className="flex flex-col gap-6 md:flex-row md:justify-between md:items-start border-b pb-6 "
                >
                    {/* Logo Upload */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-600 mb-2">
                            Company Logo
                        </h3>

                        {!image ? (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="block w-56 text-sm text-gray-600
                                 file:mr-4 file:py-2 file:px-4
                                  file:rounded-lg file:border-0
                                 file:bg-indigo-600 file:text-white
                                 hover:file:bg-indigo-700"
                            />
                        ) : (
                            <div>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="logo"
                                    className="w-24 h-24 object-contain border rounded-xl p-2"
                                />
                                <button
                                    onClick={() => setImage(null)}
                                    className="text-xs text-red-500 mt-2 hover:underline"
                                >
                                    Remove logo
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Invoice Title */}
                    <div className="text-right">
                        <h1 className="text-4xl font-bold text-gray-500 tracking-wide">
                            INVOICE
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Invoice Details
                        </p>
                    </div>

                </div>

                {/* Bill From & Bill To */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-8">

                    {/* Bill From */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Bill From
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                name="companyName"
                                value={invoice.companyName}
                                onChange={handleChange}
                                placeholder="Company Name"
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                name="yourName"
                                value={invoice.yourName}
                                onChange={handleChange}
                                placeholder="Your Name"
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                name="address"
                                value={invoice.address}
                                onChange={handleChange}
                                placeholder="Company Address"
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                name="email"
                                value={invoice.email}
                                onChange={handleChange}
                                placeholder="Phone / Email"
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    {/* Bill To */}
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            Bill To
                        </h2>

                        <div className="space-y-3">
                            <input
                                type="text"
                                name="clientCompany"
                                value={invoice.clientCompany}
                                onChange={handleChange}
                                placeholder="Client / Company Name"
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                name="clientName"
                                value={invoice.clientName}
                                onChange={handleChange}
                                placeholder="Client Name"
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                name="clientAddress"
                                value={invoice.clientAddress}
                                onChange={handleChange}
                                placeholder="Client Address"
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <input
                                type="text"
                                name="clientEmail"
                                value={invoice.clientEmail}
                                onChange={handleChange}
                                placeholder="Phone / Email"
                                className="w-full border border-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                </div>

                {/* Invoice Details */}
                <div className="mt-8 flex justify-end border-b pb-8">
                    <div className="w-full max-w-sm border rounded-xl p-4 bg-gray-50">

                        <h3 className="text-sm font-semibold text-gray-600 mb-4">
                            Invoice Details
                        </h3>

                        <div className="space-y-3">

                            <div className="flex items-center justify-between gap-3">
                                <label className="text-sm text-gray-600 whitespace-nowrap">
                                    Invoice No
                                </label>
                                <input
                                    type="number"
                                    name="invoiceNo"
                                    value={invoice.invoiceNo}
                                    onChange={handleChange}
                                    min="1"
                                    placeholder="INV-001"
                                    className="w-40 border border-gray-500 rounded-lg px-2 py-1
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <label className="text-sm text-gray-600 whitespace-nowrap">
                                    Invoice Date
                                </label>
                                <input
                                    type="date"
                                    name="invoiceDate"
                                    value={invoice.invoiceDate}
                                    onChange={handleChange}
                                    className="w-40 border border-gray-500 rounded-lg px-2 py-1
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <label className="text-sm text-gray-600 whitespace-nowrap">
                                    Due Date
                                </label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    value={invoice.dueDate}
                                    onChange={handleChange}
                                    className="w-40 border border-gray-500 rounded-lg px-2 py-1
                                 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Item Details */}
                <div className="mt-10 border-b pb-6">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 ">
                        Item Details
                    </h2>

                    <div className="border rounded-xl overflow-hidden">

                        {/* Table Header */}
                        <div className="grid grid-cols-12 bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600">
                            <div className="col-span-4">Item</div>
                            <div className="col-span-2 text-center">Qty</div>
                            <div className="col-span-2 text-right">Rate</div>
                            <div className="col-span-2 text-right">Amount</div>
                            <div className="col-span-2 text-center">Remove</div>
                        </div>

                        {/* Item Rows */}
                        {items.map((row, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-12 gap-2 px-4 py-3 border-t"
                            >
                                <input
                                    type="text"
                                    value={row.name}
                                    onChange={(e) =>
                                        handleItemChange(index, "name", e.target.value)
                                    }

                                    placeholder="Item name"
                                    className="col-span-4 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <input
                                    type="number"
                                    min="1"
                                    value={row.qty}
                                    onChange={(e) =>
                                        handleItemChange(index, "qty", e.target.value)
                                    }
                                    placeholder="1"
                                    className="col-span-2 border rounded-lg px-2 py-2 text-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <input
                                    type="number"
                                    min="1"
                                    value={row.rate}
                                    onChange={(e) =>
                                        handleItemChange(index, "rate", e.target.value)
                                    }
                                    placeholder="0.00"
                                    className="col-span-2 border rounded-lg px-2 py-2 text-right focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                <input
                                    type="number"
                                    value={row.amount}
                                    disabled
                                    placeholder="0.00"
                                    className="col-span-2 bg-gray-50 border rounded-lg px-2 py-2 text-right"
                                />

                                <button
                                    onClick={() => removeItem(index)}

                                    className="col-span-2 text-red-500 hover:text-red-700 font-semibold"
                                >
                                    ❌
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add Item Button */}
                    <button
                        onClick={addItem}
                        className="mt-4 flex items-center gap-2 text-indigo-600 font-medium hover:underline"
                    >
                        ➕ Add Item
                    </button>
                </div>


                {/* Total Summary */}
                <div className="mt-8 flex justify-end border-b pb-8">
                    <div className="w-full max-w-sm border rounded-xl p-5 bg-gray-50 space-y-4">

                        <h3 className="text-sm font-semibold text-gray-600">
                            Total Summary
                        </h3>

                        {/* Sub Total */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Sub Total</span>
                            <span className="font-medium">₹ {subTotal.toFixed(2)}</span>
                        </div>

                        {/* Discount % */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Discount (%)</span>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={discountPercent}
                                onChange={(e) =>
                                    setDiscountPercent(Number(e.target.value) || 0)
                                }
                                className="w-24 border border-gray-400 rounded-lg px-2 py-1 text-right
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Discount Amount */}
                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Discount Amount</span>
                            <span>- ₹ {discountAmount.toFixed(2)}</span>
                        </div>

                        {/* GST */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">GST (18%)</span>
                            <span className="font-medium">
                                ₹ {gstAmount.toFixed(2)}
                            </span>
                        </div>

                        <hr />

                        {/* Final Total */}
                        <div className="flex justify-between items-center text-lg font-semibold">
                            <span>Total</span>
                            <span className="text-indigo-600">
                                ₹ {finalTotal.toFixed(2)}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Payment & Due & Total */}
                <div className="mt-10 border rounded-xl overflow-hidden">

                    {/* Top Headings */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-600">
                        <div>PAYMENT INFO</div>
                        <div className="md:text-center">DUE BY</div>
                        <div className="md:text-right">TOTAL PAY</div>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-5 items-start">

                        {/* Payment Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <label className="text-sm text-gray-600 whitespace-nowrap">
                                    Account No:
                                </label>
                                <input
                                    type="text"
                                    name="accountNo"
                                    value={invoice.accountNo}
                                    onChange={handleChange}
                                    placeholder="Account No"
                                    className="w-full border border-gray-400 rounded-lg px-2 py-1
                                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Due Date */}
                        <div className="md:text-center">
                            <p className="text-lg font-medium text-gray-700">
                                {invoice.dueDate || "DD / MM / YYYY"}
                            </p>
                        </div>

                        {/* Total Pay */}
                        <div className="md:text-right">
                            <p className="text-2xl font-bold text-indigo-600">
                                ₹ {finalTotal.toFixed(2)}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Thank You / Notes */}
                <div className="mt-12 border-t pt-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                        Note / Message
                    </h3>

                    <textarea
                        rows="3"
                        name="note"
                        value={invoice.note}
                        onChange={handleChange}
                        placeholder="Thank you for your business! We truly appreciate your trust and look forward to working with you again."
                        className="w-full border border-gray-400 rounded-xl px-4 py-3 text-sm
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                </div>

                <button
                    onClick={handleSubmit}
                    className="mt-10 w-full py-2 rounded-xl bg-indigo-600 text-white"
                >
                    Review Invoice
                </button>


            </div>
        </div>
    );
};

export default UserForm;
