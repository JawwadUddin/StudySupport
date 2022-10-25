import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const InfoTable = ({ data, type }) => {
  let output = [];
  switch (type) {
    case "contact":
      output = [
        { rowLabel: "Full Name", value: data.fullName },
        {
          rowLabel: "Address",
          value: data.address + ", " + data.city + ", " + data.postCode,
        },
        { rowLabel: "Contact Number", value: data.mobile },
        { rowLabel: "Email", value: data.email },
        { rowLabel: "Emergency Contact Name", value: data.ecFullName },
        { rowLabel: "Emergency Contact Number", value: data.ecMobile },
        { rowLabel: "Emergency Contact Relation", value: data.ecRelation },
        { rowLabel: "Notes", value: data.notes },
      ];
      break;
    case "student":
      output = [
        { rowLabel: "Full Name", value: data.fullName },
        { rowLabel: "DOB", value: data.DOB },
        { rowLabel: "School Year", value: data.schoolYear },
        { rowLabel: "School Name", value: data.schoolName },
        { rowLabel: "Medical Info", value: data.medicalInfo },
        { rowLabel: "Notes", value: data.notes },
      ];
  }
  return (
    <Table>
      {output.map((item) => {
        return (
          <TableRow>
            <TableCell sx={{ width: 300, fontWeight: "bold" }}>
              {item.rowLabel}
            </TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        );
      })}
    </Table>
  );
};

export default InfoTable;
