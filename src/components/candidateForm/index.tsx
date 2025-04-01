import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import { Candidate, TemplateType, ChannelType } from '../../types';
import ChannelForms from './channelForms';
import ChannelSelection from './channelSelection';
import TemplateSelection from './templateSelection';
import { MessagePayload, sendMessages } from '../../service/messageService';


export interface MessageTemplateProps {
  selectedCandidates: Candidate[];
  onClose: () => void;
}

const MessageTemplateSystem: React.FC<MessageTemplateProps> = ({ selectedCandidates, onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [templateType, setTemplateType] = useState<TemplateType | ''>('');
  const [selectedChannels, setSelectedChannels] = useState<ChannelType[]>([]);
  const [smsMessage, setSmsMessage] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  const getTemplateMessage = (type: TemplateType, channel: ChannelType, candidate: Candidate) => {

    if (type === 'Invitacion') {
      if (channel === 'Sms' || channel === 'Whatsapp') {
        return `Hola ${candidate.name}, te invitamos a participar en el proceso de [nombre del proceso/actividad] que se llevará a cabo el [fecha] a las [hora]. Por favor, confirma tu asistencia respondiendo a este mensaje. ¡Te esperamos!`;
      } else if (channel === 'Correo electronico') {
        return {
          subject: `Invitación al proceso de [nombre del proceso]`,
          message: `Estimado/a ${candidate.name},\n\nEsperamos que te encuentres bien. A través de este medio, queremos invitarte a participar en el proceso de [nombre del proceso], que se llevará a cabo el [fecha] a las [hora]. El lugar del encuentro será [dirección/sala virtual].\n\nTu participación es muy importante para nosotros. Agradeceríamos que confirmes tu asistencia respondiendo a este correo.\n\nCordialmente,\n[Nombre del remitente]\n[Puesto]\n[Empresa/Organización]`
        };
      }
    } else if (type === 'Recordatorio') {
      if (channel === 'Sms' || channel === 'Whatsapp') {
        return `Hola ${candidate.name}, te recordamos que el proceso de [nombre del proceso/actividad] al que confirmaste tu asistencia se realizará el [fecha] a las [hora]. ¡Te esperamos puntual!`;
      } else if (channel === 'Correo electronico') {
        return {
          subject: `Recordatorio del proceso de [nombre del proceso]`,
          message: `Estimado/a ${candidate.name},\n\nQueremos recordarte que el proceso de [nombre del proceso], al que amablemente confirmaste tu asistencia, se realizará el [fecha] a las [hora].\n\nEl evento tendrá lugar en [dirección/sala virtual]. Si tienes alguna duda o necesitas asistencia previa, no dudes en contactarnos.\n\nTe esperamos puntual.\n\nSaludos cordiales,\n[Nombre del remitente]\n[Puesto]\n[Empresa/Organización]`,
        };
      }
    }

    if (type === 'Personalizado') {
      if (channel === 'Sms') return smsMessage;
      if (channel === 'Whatsapp') return whatsappMessage;
      if (channel === 'Correo electronico') {
        return {
          subject: emailSubject,
          message: emailMessage,
        };
      }
    }
    return '';
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplateType(e.target.value as TemplateType);
  };

  const handleChannelChange = (channel: ChannelType) => {
    setSelectedChannels((prev) =>
      prev.includes(channel) ? prev.filter((c) => c !== channel) : [...prev, channel]
    );
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSendMessages = async () => {
    const candidateMessages = selectedCandidates.map((candidate) => ({
        candidate,
        messages: {
          Sms:
            templateType === 'Personalizado'
              ? smsMessage
              : getTemplateMessage(templateType as TemplateType, 'Sms', candidate),
          Whatsapp:
            templateType === 'Personalizado'
              ? whatsappMessage
              : getTemplateMessage(templateType as TemplateType, 'Whatsapp', candidate),
          "Correo electronico":
            templateType === 'Personalizado'
              ? { subject: emailSubject, message: emailMessage }
              : getTemplateMessage(templateType as TemplateType, 'Correo electronico', candidate),
        },
      }));
  
      const payload: MessagePayload = {
        templateType: templateType as string,
        selectedChannels,
        candidateMessages,
      };
  
      await sendMessages(payload);
      onClose();
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <TemplateSelection
            templateType={templateType}
            onTemplateChange={handleTemplateChange}
            onClose={onClose}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <ChannelSelection
            selectedChannels={selectedChannels}
            onChannelChange={handleChannelChange}
            onBack={handleBack}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <ChannelForms
            selectedChannels={selectedChannels}
            templateType={templateType as TemplateType}
            selectedCandidate={selectedCandidates[0]}
            smsMessage={smsMessage}
            whatsappMessage={whatsappMessage}
            emailSubject={emailSubject}
            emailMessage={emailMessage}
            onSmsChange={setSmsMessage}
            onWhatsappChange={setWhatsappMessage}
            onEmailSubjectChange={setEmailSubject}
            onEmailMessageChange={setEmailMessage}
            onBack={handleBack}
            onSend={handleSendMessages}
            getTemplateMessage={getTemplateMessage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal open onClose={onClose} aria-labelledby="message-template-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 24,
          outline: 'none',
        }}
      >
        {renderStep()}
      </Box>
    </Modal>
  );
};

export default MessageTemplateSystem;
