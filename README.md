# Q&A Assistant

The **Q&A Assistant** is a web application that allows users to upload a file and ask questions about its contents. Powered by the **Google Gemini API**, the app uses advanced natural language processing to provide accurate and relevant answers based on the uploaded file.

---

## Features

- **File Upload**: Upload text-based files (e.g., `.txt`, `.pdf`, `.docx`) to analyze their contents.
- **Interactive Chat**: Ask questions about the file content and get instant responses.
- **AI-Powered**: Utilizes the **Google Gemini API** for intelligent question-answering.
- **User-Friendly Interface**: Simple and intuitive design for seamless user experience.

---

## Screenshots

![Screenshot](https://github.com/mirdanish6594/Expense-Splitter/blob/main/src/assets/screenshot.png)

---

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **API**: Google Gemini API
- **Tools**: Axios (for API calls), Lucide Icons (for UI icons)

---

## Getting Started

Follow these steps to set up and run the **File Q&A Assistant** on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed. Download it from [here](https://nodejs.org/).
- **Google Gemini API Key**: Obtain an API key from the [Google Cloud Console](https://console.cloud.google.com/).

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/file-qa-assistant.git
   cd file-qa-assistant
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   - Create a .env file in the root directory.
   - Add your Google Gemini API key:
   ```bash
   REACT_APP_GEMINI_API_KEY=your_api_key_here
   ```
4. **Run the Application**:
   ```bash
   npm run dev
   ```
   The app will open in your browser at ```bash http://localhost:3000 ```

### How to Use
**Upload a File:**
Click the Browse Files button or drag and drop a file into the upload area.
Supported file formats: .txt, .pdf, .docx.

**Ask Questions:**
Once the file is uploaded, type your question in the chat input and press Enter.
The assistant will analyze the file content and provide an answer.

**Change File:**
To upload a new file, click the Change File button.


## API Integration
The app uses the Google Gemini API for question-answering. Here’s how the API is integrated:

**Request Payload**
```bash
{
  "contents": [
    {
      "parts": [
        {
          "text": "You are a helpful assistant that answers questions about the file: <file_name>. The file content is: <file_content>. User question: <user_question>"
        }
      ]
    }
  ]
}
```
**Response Handling**
The assistant’s response is extracted from:
```bash
response.data.candidates[0].content.parts[0].text
```

## Error Handling
The app handles common errors gracefully:

**429 (Too Many Requests):** Displays a message asking the user to try again later.

**401 (Unauthorized):** Ensures the API key is valid.

**Generic Errors:** Displays a user-friendly error message.


## Contributing
Contributions are welcome! If you’d like to contribute to this project, follow these steps:

- Fork the repository.
- Create a new branch:
```bash
git checkout -b feature/your-feature-name
```
- Commit your changes:
```bash
git commit -m "Add your feature"
```
- Push to the branch:
```bash
git push origin feature/your-feature-name
```
- Open a pull request.


## License
This project is licensed under the MIT License. See the LICENSE file for details.

##Acknowledgments
- **Google Gemini API:** For providing the AI-powered question-answering capabilities.
- **React Community:** For the amazing tools and libraries.
- **Lucide Icons:** For the beautiful icons used in the UI.
