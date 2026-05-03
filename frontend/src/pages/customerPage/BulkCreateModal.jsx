import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const BulkCreateModal = ({
  bulkMonth,
  onMonthChange,
  onClose,
  onSubmit,
  bulkLoading,
  bulkError,
}) => {
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalCard" onClick={(e) => e.stopPropagation()}>
        <div className="modalAccent" />
        <div className="modalHeader">
          <div className="modalIconWrap">
            <ReceiptLongIcon className="modalIcon" />
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
          <h2>Bulk Create Invoices</h2>
          <p>
            Generate invoices for all customers who don't already have one for
            the selected month.
          </p>
          <div className="bulkMonthPicker">
            <label htmlFor="bulkMonth">Invoice Month</label>
            <input
              type="month"
              id="bulkMonth"
              value={bulkMonth}
              onChange={(e) => onMonthChange(e.target.value)}
              onClick={(e) => e.target.showPicker()}
            />
          </div>
          {bulkError && <p className="bulkError">{bulkError}</p>}
        </div>
        <div className="modalActions">
          <Button
            variant="outlined"
            size="large"
            onClick={onClose}
            sx={{
              borderColor: "#d0d5dd",
              color: "#344054",
              "&:hover": { borderColor: "#98a2b3", background: "#f9fafb" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={onSubmit}
            disabled={!bulkMonth || bulkLoading}
            sx={{
              background: "#0075c5",
              "&:hover": { background: "#005a9e" },
              minWidth: 160,
            }}
          >
            {bulkLoading ? (
              <CircularProgress size={22} sx={{ color: "#fff" }} />
            ) : (
              "Create Invoices"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkCreateModal;
