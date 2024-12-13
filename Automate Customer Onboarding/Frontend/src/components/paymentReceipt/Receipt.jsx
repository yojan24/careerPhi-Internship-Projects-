import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Link, useNavigate } from "react-router-dom";

const Receipt = ({ idv, plan, premiumAmount, gstAmount, totalAmount }) => {
  const navigate = useNavigate();
  const receipt = useRef(null);

  const handleDownload = () => {
    const element = receipt.current;
    if (element) {
      html2pdf()
        .from(element) // Capture the content from the receiptRef
        .set({
          margin: 10,
          filename: "receipt.pdf",
          image: { type: "jpeg", quality: 1 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .toPdf()
        .get("pdf")
        .then((pdf) => {
          const pdfUrl = pdf.output("bloburl");

          const newTab = window.open(pdfUrl, "_blank");
          if (!newTab) {
            alert("Please allow popups for this site.");
          }
        })
        .catch((error) => {
          console.error("Error generating PDF:", error);
          alert("There was an error generating the PDF. Please try again.");
        });
    }
  };

  return (
    <div>
      {/* Visible Receipt Content */}
      <div
        style={{
          width: "100%", // Ensure it's visible to be captured
          padding: "20px",
          background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-center py-2">
          Payment Receipt
        </h2>
        {plan && (
          <p className="mb-2">
            <strong>Plan Type:</strong> {plan}
          </p>
        )}
        {idv && (
          <p className="mb-2">
            <strong>IDV:</strong> {idv}
          </p>
        )}
        <p className="mb-2">
          <strong>Premium Amount:</strong> {premiumAmount}
        </p>
        <p className="mb-2">
          <strong>GST (18%):</strong> {gstAmount}
        </p>
        <p className="mb-2">
          <strong>Total Amount:</strong> {totalAmount}
        </p>
        <p className="">
          <strong>Payment Date:</strong> {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Hidden Receipt Content (for PDF generation) */}
      <div
        style={{
          width: "0", // Keep width and height set to full or auto so it captures the layout correctly
          height: "auto", // Allow the height to expand based on the content
          visibility: "hidden", // Make sure it is hidden but still in the DOM for html2pdf to capture
          position: "absolute", // Keep it out of the visible flow of the page
          overflow: "hidden", // Prevent overflow issues
        }}
      >
        <div
          ref={receipt}
          style={{
            padding: "30px",
            background: "#fff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",

            // Don't change layout styles; maintain the original design for PDF
          }}
        >
          <h1 className="w-full text-center text-3xl font-semibold text-purple-600 mb-2">
            Insurance
          </h1>
          <hr />
          <h2 className="w-full text-center text-xl font-bold">
            Payment Receipt
          </h2>
          <hr />
          <div>
            <p className="flex justify-end mb-4">
              <p>Payment Date:</p> {new Date().toLocaleDateString()}
            </p>
            {plan && (
              <p className="mb-2 flex justify-between gap-3">
                <strong>Plan Type:</strong> <p>{plan}</p>
              </p>
            )}
            {idv && (
              <p className="mb-2 flex justify-between gap-3">
                <strong>IDV:</strong> <p>{idv}</p>
              </p>
            )}
            <p className="mb-2 flex  justify-between gap-3">
              <strong>Premium Amount:</strong> <p>{premiumAmount}</p>
            </p>
            <p className="mb-2 flex justify-between gap-3">
              <strong>GST (18%):</strong> <p>{gstAmount}</p>
            </p>
            <p className="mb-2 flex justify-between gap-3 border-t-2">
              <strong>Total Amount:</strong> <p>{totalAmount}</p>
            </p>
          </div>
        </div>
      </div>

      <div className=" flex flex-wrap gap-5">
        <button
          type="button"
          className="download-btn bg-blue-500 p-3 rounded-md text-white font-semibold mt-4 hover:bg-blue-600"
          onClick={handleDownload}
        >
          Download Receipt PDF
        </button>
        <Link
          to={"/policy-status"}
          className="bg-green-500 text-white rounded-md hover:bg-green-400 mt-4 active:text-black p-3"
        >
          {" "}
          Check Status
        </Link>
      </div>
    </div>
  );
};

export default Receipt;
