# Course Compass

## Overview

An website to help students select courses and plan their degrees. Based on various course data such as ratings, reviews, calendar, and more, students can acquire and share information with other students.

Course Compass is a platform for managing and reviewing courses and professors. The project is built using Next.js, React, and MongoDB, with Tailwind CSS for styling. It follows best practices for version control and team collaboration.

## Technologies

### Web app

- **Next.js**: A React-based framework for building server-side rendered and static web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for quickly designing custom UIs.
- **JavaScript**: The primary programming language used for both frontend and backend.
- **MongoDB**: A NoSQL database used to store user and course data.
- **Vercel**: Hosting and deployment platform for the application.

### AI chatbot

- **Python**: For backend development and integration with AI models.
- **Large Language Models (LLMs)**: Used for generating intelligent insights and recommendations.
- **REST APIs**: For communication between the frontend and backend.
- **HuggingFace**: Utilized for pre-trained NLP models and fine-tuning LLMs.
- **RAG (Retrieval-Augmented Generation)**: A technique that combines document retrieval and generation to provide accurate, context-aware responses.
- **Knowledge Graphs**: Structures the relationship between courses, topics, and professors, providing a richer context for AI-driven insights.
- **Neo4j**: A graph database used to store and query the knowledge graph, enhancing data retrieval and recommendations.

## Setup

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v13+)
- npm or yarn
- MongoDB (optional for local development)

### Installation

1. Clone the repository using either the command line or [GitHub Desktop](https://desktop.github.com/).

   **Command Line:**

   ```bash
   git clone https://github.com/sfuosdev/CourseCompass.git
   cd clientjs
   ```

   **GitHub Desktop:**

   - Open GitHub Desktop.
   - Click on `File > Clone Repository`.
   - Select `URL` and enter the repository URL: `https://github.com/sfuosdev/CourseCompass.git`.
   - Choose a local path and click `Clone`.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file at the root of the project with the following:

   ```bash
   NEXT_PUBLIC_API_URL=https://course-compass-vcos.vercel.app/api
   ```

4. For local development, set up your '.env.local'. MongoDB credentials are stored in the Vercel environment for security purposes.

   **Note**: The `MONGODB_URI` is configured in Vercel for security reasons and should not be committed to the `.env` file.

   - **however, it should be added to your .env.local and it will be shared privately by a tech lead.**

### Running the Application

To run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server after the build:

```bash
npm start
```

## Styling

The project uses **Tailwind CSS** for fast, responsive design. Tailwind’s utility classes allow you to build custom designs without writing much CSS. To learn more about Tailwind, check out the [Tailwind CSS documentation](https://tailwindcss.com/docs).

## Version Control Guidelines

We follow a Git branching strategy to ensure smooth collaboration. Here are some key guidelines:

### Branching and Pull Requests

1. **Branching**: Always create a new branch for every feature or bug fix. Name your branch based on the task you're working on, for example:

   ```bash
   git checkout -b feature/add-course-page
   ```

   _You can also use [GitHub Desktop](https://desktop.github.com/) to create and switch branches easily._

2. **Pull Requests**: When your feature is complete, open a pull request (PR) for merging it into the `main` branch. Your PR must be reviewed and approved by at least one other team member before merging.

3. **Commit Regularly**: Always commit your changes frequently to avoid conflicts when multiple team members are working on the same branch. Use meaningful commit messages. We follow these commit message conventions:

   - **feat**: Feature addition or enhancement
   - **fix**: Fixing a bug
   - **docs**: Documentation changes
   - **style**: Code formatting or lint fixes (no functional changes)
   - **refactor**: Refactoring code without changing external behavior
   - **test**: Adding or updating tests
   - **chore**: Maintenance tasks (e.g., updating dependencies)
   - **init**: Initial project setup and commit
   - **rearrange**: Moving, adding, or deleting files
   - **update**: Updating versions, libraries, or compatibility

   Example commit:

   ```bash
   git commit -m "feat: Add new API endpoint for courses"
   ```

   _If using GitHub Desktop, make sure to follow the same message format when committing changes._

4. **Issue Tracking**: Create issues for any tasks or bugs. If your work relates to an open issue, reference it in your commits. Close issues once the task is complete.

   Example of closing an issue in a commit:

   ```bash
   git commit -m "fix: Corrected pagination issue. Closes #123"
   ```

5. **Team Communication**: Always communicate with other members or tech leads before making significant changes, especially if more than one person is working on a branch.

## Environment Variables

The project uses environment variables for configuration. Here's a summary of the variables used:

- **NEXT_PUBLIC_API_URL**: The base URL for the API. This is public and defined in the `.env` file.
- **MONGODB_URI**: The MongoDB connection string. This is stored securely in Vercel's environment settings.

## Contribution Guidelines

1. Always work on a separate branch for new features or bug fixes.
2. Make sure your code passes all tests and linting checks before creating a pull request.
3. If a PR is opened, at least one team member must approve it before merging into the `main` branch.
4. Keep the repository clean by regularly closing completed issues and deleting merged branches.

## Troubleshooting

- **Common Issues**: If you face any issues during development, check the logs for specific errors. You can also create an issue in the repository for further help or talk to any tech lead.

## License

This project is licensed under the MIT License and our OpenSource License. See the [LICENSE](LICENSE) and [LICENCE](LICENSE-OpenSource), respectively, for details.
