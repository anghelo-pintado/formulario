// src/components/MessageTemplate/ChannelSelection.tsx

import React from 'react';
import { Box, Typography, Button, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { ChannelType } from '../../../types';


interface ChannelSelectionProps {
  selectedChannels: ChannelType[];
  onChannelChange: (channel: ChannelType) => void;
  onNext: () => void;
  onBack: () => void;
}

const ChannelSelection: React.FC<ChannelSelectionProps> = ({ selectedChannels, onChannelChange, onNext, onBack }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Selección de Canales</Typography>
      </Box>
      <FormControl component="fieldset">
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedChannels.includes('Sms')}
              onChange={() => onChannelChange('Sms')}
            />
          }
          label="SMS"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedChannels.includes('Correo electronico')}
              onChange={() => onChannelChange('Correo electronico')}
            />
          }
          label="Correo electrónico"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedChannels.includes('Whatsapp')}
              onChange={() => onChannelChange('Whatsapp')}
            />
          }
          label="WhatsApp"
        />
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack} variant="outlined">
          Atrás
        </Button>
        <Button
          onClick={onNext}
          variant="contained"
          disabled={selectedChannels.length === 0}
          sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}
        >
          Siguiente
        </Button>
      </Box>
    </Box>
  );
};

export default ChannelSelection;
