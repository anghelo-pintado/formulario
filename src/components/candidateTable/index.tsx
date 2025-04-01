import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
  } from "@mui/material";
  import { FC, useState } from "react";
  import { Candidate } from "../../types";
  
  interface CandidateTableProps {
    candidates: Candidate[];
    onSelectionChange?: (selectedCandidates: Candidate[]) => void;
  }
  
  const CandidateTable: FC<CandidateTableProps> = ({ candidates, onSelectionChange }) => {
    const [selected, setSelected] = useState<string[]>([]);
      const handleToggle = (candidateName: string) => {
      const currentIndex = selected.indexOf(candidateName);
      const newSelected = [...selected];
  
      if (currentIndex === -1) {
        newSelected.push(candidateName);
      } else {
        newSelected.splice(currentIndex, 1);
      }
  
      setSelected(newSelected);
      
      if (onSelectionChange) {
        const selectedCandidateObjects = candidates.filter(candidate => 
          newSelected.includes(candidate.name)
        );
        onSelectionChange(selectedCandidateObjects);
      }
    };
  
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
  
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">Seleccionar</TableCell>
              <TableCell>Nombre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => {
              const isItemSelected = isSelected(candidate.name);
  
              return (
                <TableRow
                  key={candidate.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  selected={isItemSelected}
                  onClick={() => handleToggle(candidate.name)}
                  hover
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{ 'aria-labelledby': `checkbox-${candidate.name}` }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row" id={`checkbox-${candidate.name}`}>
                    {candidate.name}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
  export default CandidateTable;