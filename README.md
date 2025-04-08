# Career Catalyst: Resume Generator & ATS Checker v2.5.0

Career Catalyst is an advanced tool designed to streamline the process of creating professional resumes while ensuring they are optimized for Applicant Tracking Systems (ATS). This project simplifies the resume-building experience by leveraging user-provided inputs such as personal details, educational qualifications, work experience, and projects.

## Features

### Resume Builder
- **Interactive Form Interface**: User-friendly multi-step form for collecting all resume information
- **Multiple Template Options**: Choose from 8 professionally designed resume templates
- **Live Preview**: See your resume update in real-time as you enter information
- **Dynamic Sections**: Add unlimited entries for experience, education, skills, and projects
- **PDF Export**: Generate high-quality, downloadable PDF resumes optimized for printing

### ATS Checker
- **Resume Analysis**: Advanced algorithm to evaluate resume against ATS standards
- **Keyword Analysis**: Identifies missing industry-specific keywords and phrases
- **Structure Evaluation**: Checks formatting, section organization, and content quality
- **Scoring System**: Provides a detailed score (0-100) with color-coded indicators
- **Actionable Recommendations**: Specific suggestions for improving ATS compatibility

### User Management
- **Secure Authentication**: Email/password authentication with JWT token system
- **Profile Management**: Save multiple resume versions and track improvements
- **Resume History**: Access previously created resumes and ATS check results

### Admin Dashboard
- **ATS Score Control**: Configure the ATS scoring algorithm parameters
- **Keyword Management**: Update the database of industry-specific keywords
- **Template Management**: Add, modify, or remove resume templates
- **User Management**: View and manage user accounts and their resumes

## Technologies Used

### Frontend
- React.js 18.2.0
- React Router 6.11.1
- PDFMake 0.2.7
- Axios 1.4.0
- React Icons 4.8.0
- Material UI 5.12.3

### Backend
- Node.js 18.x
- Express.js 4.18.2
- MongoDB 6.0
- Mongoose 7.1.0
- JSON Web Token 9.0.0
- bcrypt 5.1.0

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

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
NODE_ENV=development
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

Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_VERSION=2.5.0
```

Start the frontend development server:
```bash
npm start
```

The application will be available at http://localhost:3000

## Usage

### Regular User Flow
1. Register or login to your account
2. Navigate to the Resume Builder from the dashboard
3. Fill out all sections:
   - Personal Information (name, contact details, professional summary)
   - Education (degrees, institutions, dates, achievements)
   - Experience (job titles, companies, dates, key responsibilities)
   - Skills (technical, soft, and language skills)
   - Projects (titles, descriptions, technologies, links)
4. Choose a template design from the available options
5. Preview your resume and make any necessary adjustments
6. Run the ATS check to get optimization suggestions
7. Implement the suggestions to improve your ATS score
8. Download your ATS-optimized resume as a PDF

### Admin User Flow
1. Log in with admin credentials (default: admin/admin)
2. Access the Admin Dashboard
3. Configure ATS scoring parameters:
   - Set keyword importance weighting
   - Adjust scoring thresholds
   - Manage industry-specific keyword libraries
4. View and manage user accounts if needed
5. Monitor system analytics and performance metrics

## Project Structure

```
├── LICENSE
├── package.json
├── README.md
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── models/
│   │   ├── AtsSettings.js   # ATS configuration schema
│   │   ├── Resume.js        # Resume data schema
│   │   └── User.js          # User account schema
│   ├── routes/
│   │   ├── ats.js           # ATS analysis endpoints
│   │   ├── auth.js          # Authentication endpoints
│   │   ├── resume.js        # Resume management endpoints
│   │   └── userRoutes.js    # User account endpoints
│   ├── middleware/
│   │   ├── auth.js          # Authentication middleware
│   │   └── admin.js         # Admin role verification
│   └── utils/
│       └── resumeAnalyzer.js # ATS analysis algorithm
├── frontend/
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── auth/        # Login, Register components
│       │   ├── common/      # Shared UI components
│       │   ├── dashboard/   # User dashboard components
│       │   ├── resume/      # Resume builder components
│       │   │   └── templates/ # Resume template designs
│       │   ├── ats/         # ATS checker components
│       │   └── admin/       # Admin dashboard components
│       │       └── AtsScoreControl.js # ATS parameter control
│       ├── contexts/        # React context providers
│       ├── utils/           # Utility functions
│       │   └── pdfGenerator.js # PDF generation logic
│       ├── App.js           # Main application component
│       └── index.js         # Application entry point
└── scripts/
    └── storeTemplates.js    # Template management utility
```

## Latest Version Changes (v2.5.0)

- Added new professional resume template "Executive"
- Enhanced ATS algorithm with improved keyword recognition
- Implemented dynamic PDF coloring options
- Added dark mode support throughout the application
- Improved mobile responsiveness for all components
- Fixed PDF generation issues with special characters
- Added option to include LinkedIn and GitHub profiles
- Enhanced admin controls for ATS parameter configuration
- Performance optimizations for large resume processing

## License

This project is licensed under the MIT License - see the LICENSE file for details.

