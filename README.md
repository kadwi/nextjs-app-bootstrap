# WXMAIL - Temporary Email Service

This project is a temporary email service built with Next.js. It connects to an IMAP email server to fetch emails and provides disposable email addresses.

## Running on cPanel / Shared Hosting

To run this project on cPanel or shared hosting, follow these steps:

### Prerequisites

- Node.js installed on your hosting environment (version 16 or higher recommended)
- Access to terminal/SSH on your hosting server
- IMAP email account credentials for fetching emails

### Setup

1. **Upload Project Files**

   Upload all project files to your hosting server, preferably inside a directory like `wxmail`.

2. **Install Dependencies**

   SSH into your hosting server and navigate to the project directory:

   ```bash
   cd wxmail
   ```

   Install the required dependencies:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root of the project with the following variables:

   ```
   IMAP_USER=your_imap_email@example.com
   IMAP_PASSWORD=your_imap_password
   IMAP_HOST=imap.example.com
   IMAP_PORT=993
   IMAP_TLS=true
   ```

   Replace the values with your actual IMAP server credentials.

4. **Build the Project**

   Run the build command:

   ```bash
   npm run build
   ```

5. **Start the Server**

   Start the Next.js server:

   ```bash
   npm start
   ```

   By default, the server will run on port 3000. If your hosting provider requires a different port, set the `PORT` environment variable before starting:

   ```bash
   PORT=8000 npm start
   ```

6. **Access the Website**

   Open your browser and navigate to your hosting domain with the appropriate port, e.g.:

   ```
   https://yourdomain.com:3000
   ```

### Notes

- Ensure your hosting provider allows running Node.js applications and opening the required ports.
- For cPanel shared hosting, you may need to use tools like **Setup Node.js App** in cPanel to manage the Node.js environment.
- Monitor the server logs for any errors related to IMAP connections or server startup.
- To avoid "Too many simultaneous connections" errors with IMAP, consider optimizing the email fetching logic to reuse connections.

### Troubleshooting

- **502 Bad Gateway**: This usually means the server is not running or crashed. Restart the server and check logs.
- **IMAP Authentication Errors**: Verify your IMAP credentials and ensure your email provider allows IMAP access.
- **Port Issues**: Make sure the port you use is open and allowed by your hosting provider.

---

If you need further assistance, feel free to ask.
