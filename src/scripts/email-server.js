const Imap = require('imap');
const { simpleParser } = require('mailparser');

// IMAP configuration
const imapConfig = {
  user: '',
  password: '',
  host: 'imap.gmail.com',
  port: 993,
  tls: true,
  tlsOptions: { 
    rejectUnauthorized: false,
    servername: 'imap.gmail.com'
  }
};

// Create IMAP connection
const imap = new Imap(imapConfig);

function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

imap.once('ready', () => {
  console.log('Connected to IMAP server');
  
  openInbox((err, box) => {
    if (err) {
      console.error('Error opening inbox:', err);
      return;
    }

    // Listen for new emails
    imap.on('mail', () => {
      console.log('New email received');
      fetchNewEmails();
    });

    // Initial fetch of existing emails
    fetchNewEmails();
  });
});

imap.once('error', (err) => {
  console.error('IMAP error:', err);
});

imap.once('end', () => {
  console.log('Connection ended');
});

function fetchNewEmails() {
  openInbox((err, box) => {
    if (err) {
      console.error('Error opening inbox:', err);
      return;
    }

    // Search for all emails
    imap.search(['ALL'], (err, results) => {
      if (err) {
        console.error('Error searching emails:', err);
        return;
      }

      if (!results || results.length === 0) {
        console.log('No emails found');
        return;
      }

      // Get the last 10 emails
      const fetch = imap.fetch(results.slice(-10), {
        bodies: '',
        struct: true
      });

      fetch.on('message', (msg) => {
        msg.on('body', (stream) => {
          simpleParser(stream, (err, parsed) => {
            if (err) {
              console.error('Error parsing email:', err);
              return;
            }

            const email = {
              from: parsed.from?.text,
              to: parsed.to?.text,
              subject: parsed.subject,
              date: parsed.date,
              body: parsed.text
            };

            console.log('Email received:', {
              from: email.from,
              to: email.to,
              subject: email.subject,
              date: email.date
            });
          });
        });
      });

      fetch.once('error', (err) => {
        console.error('Fetch error:', err);
      });

      fetch.once('end', () => {
        console.log('Fetch completed');
      });
    });
  });
}

// Start the connection
console.log('Connecting to IMAP server...');
imap.connect();

// Handle process termination
process.on('SIGINT', () => {
  console.log('Disconnecting from IMAP server...');
  imap.end();
  process.exit();
});
