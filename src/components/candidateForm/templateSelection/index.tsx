import React from 'react';
import { 
    Box, 
    Typography,  
    Button, 
    FormControl, 
    RadioGroup, 
    FormControlLabel, 
    Radio 
} from '@mui/material';

interface TemplateSelectionProps {
  templateType: string;
  onTemplateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onNext: () => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({ templateType, onTemplateChange, onClose, onNext }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Selección de Plantilla</Typography>
      </Box>
      <FormControl component="fieldset">
        <RadioGroup value={templateType} onChange={onTemplateChange}>
          <FormControlLabel value="Invitacion" control={<Radio />} label="Invitación" />
          <FormControlLabel value="Recordatorio" control={<Radio />} label="Recordatorio" />
          <FormControlLabel value="Personalizado" control={<Radio />} label="Personalizado" />
        </RadioGroup>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={onNext}
          variant="contained"
          disabled={!templateType}
          sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default TemplateSelection;
