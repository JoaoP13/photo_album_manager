import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import PreviewIcon from "@mui/icons-material/Preview";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

/**
 *
 * @interface ColumnProps
 * @member {number} width
 * @member {string} label
 * @member {string} dataKey
 */
interface ColumnProps {
  width: number;
  label: string;
  dataKey: string;
}

interface GenericTableProps {
  rows: any[] | undefined | any;
  headerColor?: string;
  viewDataLabel?: string;
  columns: ColumnProps[];
  canDelet?: boolean;
  canEdit?: boolean;
  canViewData?: boolean;
  onClickViewData?: (element: any) => void;
  onClickEdit?: (element: any) => void;
  onClickDelete?: (element: any) => void;
}

export default function GenericTable(props: GenericTableProps) {
  const VirtuosoTableComponents: any = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props: any) => (
      <Table
        {...props}
        sx={{
          borderCollapse: "separate",
          tableLayout: "fixed",
          width: "98vw",
        }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }: any) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: props.headerColor ? props.headerColor : "#3C3633",
      color: theme.palette.common.white,
    },

    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableCell)(() => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#F8FAE5",
    },

    "&:nth-of-type(even)": {
      backgroundColor: "#F8FAE5",
    },

    "&:nth-of-type(odd):hover": {
      backgroundColor: "#F8FAE5",
    },

    "&:nth-of-type(even):hover": {
      backgroundColor: "#F8FAE5",
    },
  }));

  function fixedHeaderContent(
    columns: any,
    canDelet: boolean | undefined,
    canEdit: boolean | undefined,
    canViewData: boolean | undefined,
    viewDataLabel: string | undefined
  ) {
    return (
      <React.Fragment>
        {columns.map((column: any) => (
          <StyledTableCell
            key={column.dataKey}
            variant="head"
            align={"left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </StyledTableCell>
        ))}
        {canViewData && (
          <StyledTableCell
            variant="head"
            align={"left"}
            style={{ width: 20 }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {viewDataLabel ? viewDataLabel : "View"}
          </StyledTableCell>
        )}
        {canEdit && (
          <StyledTableCell
            variant="head"
            align={"left"}
            style={{ width: 1 }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            Edit
          </StyledTableCell>
        )}
        {canDelet && (
          <StyledTableCell
            variant="head"
            align={"left"}
            style={{ width: 1 }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            Delete
          </StyledTableCell>
        )}
      </React.Fragment>
    );
  }

  function rowContent(
    _index: number,
    row: any,
    columns: ColumnProps[],
    canDelet: boolean | undefined,
    canEdit: boolean | undefined,
    canViewData: boolean | undefined,
    onClickViewData: any,
    onClickEdit: any,
    onClickDelete: any
  ) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <StyledTableRow key={column.dataKey}>
            {row[column.dataKey]}
          </StyledTableRow>
        ))}
        {canViewData && (
          <StyledTableRow align="left" onClick={() => onClickViewData(row)}>
            <Button>
              <PreviewIcon style={{ color: "black" }}></PreviewIcon>
            </Button>
          </StyledTableRow>
        )}
        {canEdit && (
          <StyledTableRow>
            <Button onClick={() => onClickEdit(row)}>
              <EditOutlinedIcon
                sx={{
                  color: "#000000",
                }}
              />
            </Button>
          </StyledTableRow>
        )}
        {canDelet && (
          <StyledTableRow>
            <Button onClick={() => onClickDelete(row)}>
              <DeleteIcon
                sx={{
                  color: "#990000",
                }}
              />
            </Button>
          </StyledTableRow>
        )}
      </React.Fragment>
    );
  }

  return (
    <TableVirtuoso
      style={{
        backgroundColor: "#F8FAE5",
        width: "100vw",
      }}
      data={props.rows}
      components={VirtuosoTableComponents}
      fixedHeaderContent={() =>
        fixedHeaderContent(
          props.columns,
          props.canDelet,
          props.canEdit,
          props.canViewData,
          props.viewDataLabel
        )
      }
      itemContent={(index: any, item: any) =>
        rowContent(
          index,
          item,
          props.columns,
          props.canDelet,
          props.canEdit,
          props.canViewData,
          props.onClickViewData,
          props.onClickEdit,
          props.onClickDelete
        )
      }
    />
  );
}
