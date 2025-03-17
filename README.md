## Career Catalyst: Resume Generator & ATS Checker

Career Catalyst is an advanced tool designed to streamline the process of creating professional resumes while ensuring they are optimized for Applicant Tracking Systems (ATS). This project simplifies the resume-building experience by leveraging user-provided inputs such as personal details, educational qualifications, work experience, and projects.

## Features

- **Interactive Resume Builder**: Create professional resumes with an intuitive form-based interface
- **Multiple Template Options**: Choose from various professionally designed resume templates
- **ATS Compatibility Checker**: Analyze your resume against ATS algorithms to improve visibility
- **PDF Export**: Generate high-quality, downloadable PDF resumes
- **Project Showcase**: Highlight your projects with detailed descriptions and links
- **User Authentication**: Secure login system to save and manage multiple resumes
- **Admin Dashboard**: Administrative controls for managing ATS scoring parameters and templates

## Technologies Used

### Frontend
- React.js
- React Router
- PDFMake
- Axios
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/career-catalyst.git
cd career-catalyst
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/career-catalyst
JWT_SECRET=your_jwt_secret
PORT=5000
```

Start the backend server:
```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the frontend directory (if needed):
```
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Usage

1. Register or login to your account
2. Navigate to the Resume Builder
3. Fill out all sections: Personal Information, Education, Experience, Skills, and Projects
4. Choose a template design
5. Preview your resume
6. Run the ATS check to get optimization suggestions
7. Download your ATS-optimized resume as a PDF

## Project Structure

```
├── LICENSE
├── package.json
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── models/
│   │   ├── AtsSettings.js
│   │   ├── Resume.js
│   │   └── User.js
│   ├── routes/
│   │   ├── ats.js
│   │   ├── auth.js
│   │   ├── resume.js
│   │   └── userRoutes.js
│   └── utils/
│       └── resumeAnalyzer.js
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       ├── App.js
│       └── ...
└── scripts/
    └── storeTemplates.js
```

