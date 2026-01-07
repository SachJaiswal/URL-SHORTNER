# LinkSnap - Advanced URL Shortener 🔗

<!-- PASTE YOUR WEBSITE IMAGE LINK BELOW -->
<img width="377" height="98" alt="image" src="https://github.com/user-attachments/assets/01a96752-bbad-4197-bef4-71912fce2678" />

<br>

LinkSnap is a robust, full-stack URL shortener application built with Node.js, Express, and MongoDB. It allows users to shorten long URLs, track visit analytics, and generate downloadable QR codes for their links in a dedicated gallery.

## 🚀 Features

- **User Authentication**: Secure Signup and Login functionality to manage your personal links.
- **Instant URL Shortening**: Convert long, unwieldy URLs into short, shareable links using unique IDs.
- **QR Code Generator**: Automatically generate high-resolution QR codes for every shortened link.
- **QR Code Gallery**: A dedicated dashboard to view, manage, and download QR codes for all your links.
- **Detailed Analytics**: Track total clicks and view detailed visit history (IP addresses and timestamps).
- **Link Management**: Dashboard to view all generated links and delete them when no longer needed.
- **Responsive Design**: A modern, mobile-friendly interface built with EJS and CSS.

## 📸 Screenshots

<!-- PASTE SCREENSHOTS LINKS BELOW -->

| Landing Page |
|:---:|
| <img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/a62fdd63-a0ab-4583-9fe8-04c042c6f669" /> |

| Dashboard |
|:---:|
| <img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/1df64c12-d2fc-4d34-bb75-d1a87966dd03" /> |

| QR Code Gallery | 
|:---:|
| <img width="600" height="600" alt="image" src="https://github.com/user-attachments/assets/dafc4f40-8a5e-4e1d-806f-47ecb2fe085b" /> |



## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Templating**: EJS (Embedded JavaScript)
- **Styling**: Custom CSS with responsive design
- **Key Libraries**:
  - `nanoid`: For generating unique short IDs.
  - `qrcode`: For server-side QR code generation.
  - `cookie-parser`: For handling authentication sessions.

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
https://github.com/SachJaiswal/URL-SHORTNER.git
cd linksnap
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add the following:

```env
PORT=8000
MONGODB_CONNECT=mongodb://127.0.0.1:27017/short-url
```

### 4. Start the Server
```bash
npm start
```

### 5. Access the Application
Open your browser and navigate to:
`http://localhost:8000`

## 📂 Project Structure

```
├── controller/      # Business logic for URLs and Users
├── middleware/      # Auth checks and request logging
├── model/           # Mongoose schemas (Url, User)
├── routes/          # Express route definitions
├── views/           # EJS templates (Home, Landing, QR Gallery)
├── index.js         # Application entry point
└── package.json     # Dependencies and scripts
