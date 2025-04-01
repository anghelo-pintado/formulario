import React from 'react';
import { 
    Box, 
    Typography, 
    Paper, 
    TextField, 
    Button 
} from '@mui/material';
import { Candidate, ChannelType, TemplateType } from '../../../types';

interface ChannelFormsProps {
  selectedChannels: ChannelType[];
  templateType: TemplateType;
  selectedCandidate: Candidate;
  smsMessage: string;
  whatsappMessage: string;
  emailSubject: string;
  emailMessage: string;
  onSmsChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
  onEmailSubjectChange: (value: string) => void;
  onEmailMessageChange: (value: string) => void;
  onBack: () => void;
  onSend: () => void;
  getTemplateMessage: (type: TemplateType, channel: ChannelType, candidate: Candidate) => any;
}

const ChannelForms: React.FC<ChannelFormsProps> = ({ selectedChannels, templateType, selectedCandidate, smsMessage, whatsappMessage, emailSubject, emailMessage, onSmsChange, onWhatsappChange, onEmailSubjectChange, onEmailMessageChange, onBack, onSend, getTemplateMessage }) => {
    const orderedChannels = ['Sms', 'Correo electronico', 'Whatsapp']
    .filter((channel): channel is ChannelType => selectedChannels
    .includes(channel as ChannelType))

  return (
    <Box sx={{ p: 3 }}>
      {orderedChannels.map((channel) => (
        <Paper key={channel} sx={{ p: 2, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {channel === 'Correo electronico'
              ? 'Correo electrónico'
              : channel === 'Sms'
              ? 'SMS'
              : 'WhatsApp'}
          </Typography>

          {(channel === 'Sms' || channel === 'Whatsapp') && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Mensaje
              </Typography>
              {templateType === 'Personalizado' ? (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Escribe mensaje"
                  value={channel === 'Sms' ? smsMessage : whatsappMessage}
                  onChange={(e) =>
                    channel === 'Sms' ? onSmsChange(e.target.value) : onWhatsappChange(e.target.value)
                  }
                />
              ) : (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={getTemplateMessage(templateType, channel, selectedCandidate)}
                />
              )}
            </Box>
          )}

          {channel === 'Correo electronico' && (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Asunto
                </Typography>
                {templateType === 'Personalizado' ? (
                  <TextField
                    fullWidth
                    placeholder="Escribe asunto"
                    value={emailSubject}
                    onChange={(e) => onEmailSubjectChange(e.target.value)}
                  />
                ) : (
                  <TextField
                    fullWidth
                    value={
                      (getTemplateMessage(templateType, channel, selectedCandidate) as { subject: string }).subject
                    }
                  />
                )}
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Mensaje
                </Typography>
                {templateType === 'Personalizado' ? (
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Escribe mensaje"
                    value={emailMessage}
                    onChange={(e) => onEmailMessageChange(e.target.value)}
                  />
                ) : (
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    value={
                      (getTemplateMessage(templateType, channel, selectedCandidate) as {
                        message: string;
                      }).message
                    }
                  />
                )}
              </Box>
            </>
          )}
        </Paper>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack} variant="outlined">
          Atrás
        </Button>
        <Button onClick={onSend} variant="contained" sx={{ bgcolor: 'black', '&:hover': { bgcolor: '#333' } }}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default ChannelForms;
