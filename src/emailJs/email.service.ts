import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { EMAILJS_CONFIG } from './email.config';

@Injectable({
  providedIn: 'root',
})
export class EmailjsService {

  sendFranchiseConfirmation(params: { nom: string, prenom: string, to_email: string }): Promise<EmailJSResponseStatus> {
    return emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateIdFranchise,
      params,
      EMAILJS_CONFIG.publicKey
    );
  }
sendContactEmail(form: { name: string, email: string, message: string }): Promise<void> {

  const autoReplyParams = {
    from_name: form.name,
    from_email: form.email,
    message: form.message,
  };

  const params = {
    from_name: form.name,
    from_email: form.email,
    message: form.message,
    to_name: 'Tunav Team',
    reply_to: form.email,
  };

  return emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.contactTemplateAutoReply,
    autoReplyParams,
    EMAILJS_CONFIG.publicKey
  )
  .then(() => {
    console.log('✅ Auto-reply envoyé');

    return emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.contactTemplateId,
      params,
      EMAILJS_CONFIG.publicKey
    );
  })
  .then(() => {
  });
}


}
