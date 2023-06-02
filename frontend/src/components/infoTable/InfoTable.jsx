import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { level } from "../../helpers/level";

const InfoTable = ({ data, type }) => {
  let output = [];
  switch (type) {
    case "contact":
      output = [
        { rowLabel: "Full Name", value: data.fullName },
        {
          rowLabel: "Address",
          value: data.address + ", " + data.postCode,
        },
        { rowLabel: "Contact Number", value: data.mobile },
        { rowLabel: "Email", value: data.email },
        { rowLabel: "Emergency Contact Name", value: data.ecFullName },
        { rowLabel: "Emergency Contact Number", value: data.ecMobile },
        { rowLabel: "Emergency Contact Address", value: data.ecAddress },
        { rowLabel: "Emergency Contact Relation", value: data.ecRelation },
        { rowLabel: "Notes", value: data.notes },
      ];
      break;
    case "student":
      output = [
        { rowLabel: "Full Name", value: data.fullName },
        { rowLabel: "DOB", value: data.DOB },
        { rowLabel: "School Year", value: data.schoolYear },
        { rowLabel: "Level", value: level[data.levelID] },
        { rowLabel: "School Name", value: data.school },
        { rowLabel: "Medical Info", value: data.medicalInfo },
        { rowLabel: "Notes", value: data.notes },
      ];
      break;
    default:
      console.log("Unknown type passed to InfoTable");
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
