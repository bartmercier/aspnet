# Task Management System

A full-stack task management application built with ASP.NET Core, Angular, and MariaDB. This application allows users to manage projects and tasks, with features like task assignment, priority levels, and status tracking.

## Features

- **User Management**: Create and manage user accounts with different roles
- **Project Management**: Create, update, and track projects
- **Task Management**: 
  - Create and assign tasks to users
  - Set task priorities (Low, Medium, High, Critical)
  - Track task status (Todo, In Progress, Review, Completed)
  - Kanban-style task board view
- **Real-time Updates**: Instant updates when tasks are modified
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Backend**:
  - ASP.NET Core 8.0
  - Entity Framework Core
  - MariaDB (via Docker)
  - RESTful API architecture

- **Frontend**:
  - Angular 17
  - Bootstrap 5
  - TypeScript
  - RxJS

- **DevOps**:
  - Docker
  - Docker Compose
  - Git

## Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Git](https://git-scm.com/)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/bartmercier/aspnet.git
   cd aspnet
   ```

2. Create a `.env` file in the MyAngularApp directory with the following content:
   ```
   DB_HOST=localhost
   DB_PORT=3306
   MYSQL_DATABASE=MyAngularApp
   MYSQL_USER=aspnetuser
   MYSQL_PASSWORD=your_secure_password
   MYSQL_ROOT_PASSWORD=your_secure_root_password
   ```

3. Start the MariaDB container:
   ```bash
   cd MyAngularApp
   docker-compose up -d
   ```

4. Install Angular dependencies:
   ```bash
   cd ClientApp
   npm install
   ```

5. Start the Angular development server:
   ```bash
   npm start
   ```

6. In a new terminal, start the ASP.NET Core application:
   ```bash
   cd ..
   dotnet run
   ```

7. Open your browser and navigate to:
   - Angular app: `https://localhost:4200`
   - API: `https://localhost:44478`

## Project Structure

```
MyAngularApp/
├── ClientApp/                # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Angular components
│   │   │   │   ├── components/  # Angular components
│   │   │   │   ├── models/      # TypeScript interfaces
│   │   │   │   └── services/    # Angular services
│   │   │   └── environments/    # Environment configurations
├── Controllers/             # ASP.NET Core API controllers
├── Models/                  # C# model classes
├── Data/                    # Entity Framework context and migrations
└── docker-compose.yml      # Docker compose configuration
```

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `GET /api/projects/user/{userId}` - Get user's projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/{id}` - Get task by ID
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 