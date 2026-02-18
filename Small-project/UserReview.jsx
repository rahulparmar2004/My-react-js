import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const UserReview = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  if (!state) return <p className="text-center mt-10">No invoice data</p>;

  const {
    invoice,
    items,
    image,
    subTotal,
    discountAmount,
    gstAmount,
    finalTotal,
  } = state;


  const downloadPDF = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 1.5,
      backgroundColor: "#ffffff",
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      210,
      297,
      undefined,
      "FAST"
    );

    pdf.save(`Invoice-${invoice.invoiceNo || "001"}.pdf`);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* PDF AREA */}
      <div
  ref={invoiceRef}
  style={{
    width: "210mm",
    minHeight: "297mm",
    padding: "20mm",
    margin: "auto",
    backgroundColor: "#ffffff",
    color: "#000",
    fontFamily: "Arial, sans-serif",
  }}
>

        {/* Header */}
        <div
          style={{ borderBottom: "1px solid #ddd" }}
          className="flex justify-between pb-4"
        >
          <div>
            <h2 className="text-xl font-bold">{invoice.companyName}</h2>
            <p>{invoice.address}</p>
            <p>{invoice.email}</p>
          </div>

          {image && (
            <img
              src={image}
              alt="Logo"
              className="w-24 h-24 object-contain"
            />
          )}
        </div>

        {/* Client Info */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Bill To</h3>
            <p>{invoice.clientCompany}</p>
            <p>{invoice.clientName}</p>
            <p>{invoice.clientAddress}</p>
          </div>

          <div className="text-right">
            <p>Invoice No: {invoice.invoiceNo}</p>
            <p>Date: {invoice.invoiceDate}</p>
            <p>Due Date: {invoice.dueDate}</p>
          </div>
        </div>

        {/* Items Table */}
        <table
          className="w-full mt-6"
          style={{ borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={thStyle}>Item</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Rate</th>
              <th style={thStyle}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td style={tdStyle}>{item.name}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  {item.qty}
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  ₹ {item.rate}
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  ₹ {item.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mt-6">
          <div className="w-72">
            <Row label="Sub Total" value={subTotal} />
            <Row label="Discount" value={-discountAmount} />
            <Row label="GST" value={gstAmount} />
            <hr className="my-2" />
            <Row label="Total" value={finalTotal} bold />
          </div>
        </div>

        {/* Note */}
        {invoice.note && (
          <p style={{ color: "#555" }} className="mt-6 text-sm">
            {invoice.note}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="max-w-4xl mx-auto mt-6 flex gap-4">
        <button
          onClick={downloadPDF}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-xl"
        >
          Download Invoice (PDF)
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex-1 border border-indigo-600 text-indigo-600 py-2 rounded-xl"
        >
          Update Invoice
        </button>
      </div>
    </div>
  );
};

/* ===== Helpers ===== */

const thStyle = {
  border: "1px solid #ddd",
  padding: "8px",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "8px",
};

const Row = ({ label, value, bold }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontWeight: bold ? "bold" : "normal",
      fontSize: bold ? "18px" : "14px",
      marginBottom: "6px",
    }}
  >
    <span>{label}</span>
    <span>₹ {Math.abs(value).toFixed(2)}</span>
  </div>
);

export default UserReview;
