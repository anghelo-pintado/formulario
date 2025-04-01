export interface CandidateMessage {
    candidate: { id: number; name: string };
    messages: Record<string, any>;
}

export interface MessagePayload {
    templateType: string;
    selectedChannels: string[];
    candidateMessages: CandidateMessage[];
}
  
export const sendMessages = (payload: MessagePayload): Promise<void> => {
    return new Promise((resolve) => {
      console.log("Enviando datos al backend:");
      console.log(JSON.stringify(payload, null, 2));
      setTimeout(() => {
        console.log("Datos enviados exitosamente");
        resolve();
      }, 1000);
    });
  };