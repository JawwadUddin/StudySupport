import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const BulkResultsModal = ({ bulkResults, onClose }) => {
  const hasResults = bulkResults?.length > 0;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div
        className="modalCard resultsCard"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`modalAccent ${hasResults ? "successAccent" : ""}`}
        />
        <div className="modalHeader">
          <div
            className={`modalIconWrap ${hasResults ? "successWrap" : ""}`}
          >
            {hasResults ? (
              <CheckCircleOutlineIcon className="modalIcon" />
            ) : (
              <ReceiptLongIcon className="modalIcon" />
            )}
          </div>
          <IconButton
            onClick={onClose}
            aria-label="close"
            size="small"
            className="modalClose"
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </div>
        <div className="modalBody">
          <h2>
            {hasResults
              ? `${bulkResults.length} Invoice${
                  bulkResults.length !== 1 ? "s" : ""
                } Created`
              : "No Invoices Created"}
          </h2>
          {hasResults ? (
            <>
              <p>Click any row to open the invoice in a new tab.</p>
              <div className="resultsTableWrap">
                <table className="bulkResultsTable">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Amount Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkResults.map((invoice, i) => (
                      <tr
                        key={invoice.invoice_id}
                        onClick={() =>
                          window.open(
                            `/invoices/${invoice.invoice_id}`,
                            "_blank"
                          )
                        }
                        style={{ animationDelay: `${i * 0.04}s` }}
                      >
                        <td>
                          {invoice.first_name} {invoice.last_name}
                        </td>
                        <td className="amountCell">
                          £{Number(invoice.amount_due).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p>
              All customers already have invoices for the selected month, or
              no customers had sessions.
            </p>
          )}
        </div>
        <div className="modalActions">
          <Button
            variant="contained"
            size="large"
            onClick={onClose}
            sx={{
              background: "#0075c5",
              "&:hover": { background: "#005a9e" },
            }}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkResultsModal;
