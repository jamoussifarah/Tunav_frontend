import { Component, OnInit } from '@angular/core';
declare var Email: any;
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor() { }
  form = {
    name: '',
    email: '',
    message: ''
  };

  ngOnInit(): void {
    // Charger le script SMTP.js dynamiquement
    const script = document.createElement('script');
    script.src = 'https://smtpjs.com/v3/smtp.js';
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }

  sendEmail(): void {
    if (!this.form.name || !this.form.email || !this.form.message) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    Email.send({
      Host: "smtp.office365.com", // ex: smtp.gmail.com
      Username: "farah_tunav@outlook.fr",
      Password: "DmXbQX5Rby$m$3n", 
      To: 'farah_tunav@outlook.fr',
      From: this.form.email,
      Subject: `Message de ${this.form.name}`,
      Body: `
        <strong>Nom:</strong> ${this.form.name}<br>
        <strong>Email:</strong> ${this.form.email}<br><br>
        <strong>Message:</strong><br>${this.form.message}
      `
    }).then(
      () => alert("✅ Email envoyé avec succès !"),
      error => alert("❌ Erreur : " + JSON.stringify(error))
    );
  }
}
