# NET Centric Computing - Complete Teaching Plan
## Course Information (As per Syllabus)

**Course Title:** NET Centric Computing  
**Course Code:** CSC367  
**Semester:** VI  
**Nature:** Theory + Lab  
**Credit Hours:** 3  
**Full Marks:** 60 + 20 + 20 (Theory + Internal + Practical)  
**Pass Marks:** 24 + 8 + 8  

**Prescribed Textbooks:**
- T1: C# 8.0 and .NET Core 3.0 – Modern Cross-Platform Development, Fourth Edition, by Mark J. Price, 2019
- T2: ASP.NET Core in Action, by Andrew Lock, 2018
- T3: Learning ASP.NET Core 2.0, Michel Bruchet, Jason De Oliveira, 2017
- T4: Learn ASP.NET Core 3 - Second Edition, Kenneth Yamikani Fukizi, Jason De Oliveira, Michel Bruchet, 2019

---

## Course Learning Outcomes (CLOs)

**CLO1:** Understand and apply C# language features including OOP concepts, LINQ, async/await, and delegates (Unit 1)  
**CLO2:** Explain .NET architecture, compilation process, and ASP.NET Core framework components (Units 2, 3)  
**CLO3:** Design and develop ASP.NET Core MVC web applications with controllers, views, models, and routing (Unit 4)  
**CLO4:** Implement database operations using ADO.NET and Entity Framework Core (Unit 5)  
**CLO5:** Apply state management techniques and client-side technologies in web applications (Units 6, 7)  
**CLO6:** Implement authentication, authorization, and security measures in ASP.NET Core applications (Unit 8)  
**CLO7:** Deploy ASP.NET Core applications to various hosting environments including cloud platforms (Unit 9)

---

## Syllabus Coverage Matrix

| Unit | Topics | Lecture Hours | Lab Hours | Weightage (%) | CLO Mapping |
|------|--------|---------------|-----------|---------------|-------------|
| Unit 1 | Language Preliminaries (C# Features) | 8 | 10 | 20% | CLO1 |
| Unit 2 | Introduction to ASP.NET | 3 | 3 | 7% | CLO2 |
| Unit 3 | HTTP and ASP.NET Core | 3 | 3 | 7% | CLO2 |
| Unit 4 | Creating ASP.NET Core MVC Applications | 10 | 12 | 25% | CLO3 |
| Unit 5 | Working with Database | 6 | 8 | 15% | CLO4 |
| Unit 6 | State Management | 4 | 5 | 10% | CLO5 |
| Unit 7 | Client-side Development | 4 | 5 | 8% | CLO5 |
| Unit 8 | Securing Applications | 5 | 6 | 12% | CLO6 |
| Unit 9 | Hosting and Deployment | 2 | 3 | 6% | CLO7 |
| **Total** | | **45 Hrs** | **55 Hrs** | **100%** | |

---

## Week-by-Week Teaching Schedule

### Week 1-2: Unit 1 - Language Preliminaries (Part 1)
**Lecture Topics:**
- Introduction to .NET Framework and .NET Core
- Compilation and execution of .NET applications (CLI, MSIL, CLR)
- Basic language constructs in C# (variables, data types, operators, control structures)
- Object-Oriented Programming: Classes, Objects, Constructors, Properties

**Lab Work:**
- Lab 1: Setup .NET Core SDK, create first console application
- Lab 2: Write programs demonstrating basic C# syntax and OOP concepts

**Study Materials:**
- Chapter notes on .NET architecture (Reference: T1, Chapters 1-2)
- Practice problems on C# basics

**Textbook Reference:** T1 (Chapters 1-2)

---

### Week 3-4: Unit 1 - Language Preliminaries (Part 2)
**Lecture Topics:**
- Arrays, Strings, and Indexers
- Inheritance, base keyword, Method hiding and overriding
- Polymorphism and code extensibility
- Structs, Enums, Abstract classes, Sealed classes, Interfaces

**Lab Work:**
- Lab 3: Implement inheritance hierarchies and polymorphism
- Lab 4: Work with collections and interfaces

**Study Materials:**
- Notes on advanced OOP concepts
- Code examples for inheritance and polymorphism scenarios

**Textbook Reference:** T1 (Chapters 5-6)

---

### Week 5-6: Unit 1 - Language Preliminaries (Part 3)
**Lecture Topics:**
- Delegates and Events
- Partial classes
- Collections and Generics
- File I/O operations
- LINQ fundamentals and Lambda expressions

**Lab Work:**
- Lab 5: Event handling and delegate implementation
- Lab 6: LINQ queries on collections and file operations

**Study Materials:**
- LINQ query syntax and method syntax examples
- Delegate and event pattern implementation guide

**Textbook Reference:** T1 (Chapters 11-12)

---

### Week 7: Unit 1 - Language Preliminaries (Part 4)
**Lecture Topics:**
- Try statements and Exception handling
- Attributes: Attribute classes, named and positional parameters, targets
- Asynchronous Programming: Async/Await patterns in C#

**Lab Work:**
- Lab 7: Exception handling scenarios
- Lab 8: Async/await programming with Task-based operations

**Study Materials:**
- Exception handling best practices
- Async programming patterns guide

**Textbook Reference:** T1 (Chapters 7, 14)

**Assessment:** Assignment 1 - C# Programming (Covers Unit 1, CLO1)

---

### Week 8: Unit 2 - Introduction to ASP.NET
**Lecture Topics:**
- .NET, .NET Core, Mono frameworks
- ASP.NET Web Forms, MVC, Web API comparison
- ASP.NET Core introduction
- .NET Architecture and Design Principles
- CLI, MSIL, CLR in detail
- .NET CLI: build, run, test, deploy commands

**Lab Work:**
- Lab 9: Using .NET CLI for project creation and management
- Lab 10: Exploring .NET Core project structure

**Study Materials:**
- Comparison chart: .NET Framework vs .NET Core vs ASP.NET Core
- CLI command reference guide

**Textbook Reference:** T1 (Chapter 1), T2 (Chapter 1)

---

### Week 9: Unit 3 - HTTP and ASP.NET Core
**Lecture Topics:**
- HTTP protocol fundamentals
- Request and Response message formats
- Common web application architectures
- MVC Pattern explained
- ASP.NET Core Architecture Overview
- Projects and Conventions in ASP.NET Core

**Lab Work:**
- Lab 11: Analyze HTTP requests/responses using browser tools
- Lab 12: Create basic ASP.NET Core project structure

**Study Materials:**
- HTTP methods and status codes reference
- MVC architecture diagram and explanation
- ASP.NET Core folder structure guide

**Textbook Reference:** T2 (Chapters 2-3)

---

### Week 10-11: Unit 4 - Creating ASP.NET Core MVC (Part 1)
**Lecture Topics:**
- Setting up ASP.NET Core development environment
- Controllers and Actions
- Creating Controllers and Action methods
- Action Results Types (ViewResult, JsonResult, etc.)
- Rendering HTML with Views
- Razor syntax and features

**Lab Work:**
- Lab 13: Create controllers with various action methods
- Lab 14: Work with Razor views and view components

**Study Materials:**
- Controller action types and use cases
- Razor syntax cheat sheet
- Code examples for various ActionResult types

**Textbook Reference:** T2 (Chapters 4-5, 7)

---

### Week 12-13: Unit 4 - Creating ASP.NET Core MVC (Part 2)
**Lecture Topics:**
- Understanding Tag Helpers
- Models: Model binding and validation
- Data annotations for validation
- URL Routing and routing features
- Convention-based and attribute-based routing

**Lab Work:**
- Lab 15: Implement model validation with data annotations
- Lab 16: Configure custom routing patterns

**Study Materials:**
- Tag Helpers reference guide
- Model validation attributes list
- Routing configuration examples

**Textbook Reference:** T2 (Chapters 6, 8, 13)

**Assessment:** Mid-term Examination (Covers Units 1-3)

---

### Week 14: Unit 4 - Creating ASP.NET Core MVC (Part 3)
**Lecture Topics:**
- Web API Applications
- Creating API Controllers
- Working with JSON serialization
- Dependency Injection and IoC containers
- Built-in DI in ASP.NET Core

**Lab Work:**
- Lab 17: Build RESTful Web APIs
- Lab 18: Implement dependency injection in services

**Study Materials:**
- REST API design principles
- Dependency injection patterns and lifetimes
- Web API testing with Postman

**Textbook Reference:** T2 (Chapters 9-10)

**Assessment:** Assignment 2 - ASP.NET Core MVC Application (Covers Units 2-4, CLO2, CLO3)

---

### Week 15-16: Unit 5 - Working with Database
**Lecture Topics:**
- ADO.NET basics: Connection, Command, DataReader, DataAdapter
- Introduction to Entity Framework (EF) Core
- Object-Relational Mapper (ORM) concepts
- Adding EF Core to application
- Choosing database providers (SQL Server, SQLite, PostgreSQL)
- Data models and DbContext
- Querying data: LINQ to Entities
- Saving data: Create, Read, Update, Delete (CRUD) operations

**Lab Work:**
- Lab 19: ADO.NET database connectivity and operations
- Lab 20: EF Core setup and migrations
- Lab 21: CRUD operations using EF Core

**Study Materials:**
- EF Core concepts and architecture
- Code First vs Database First approach comparison
- Migration commands reference
- LINQ to Entities query examples

**Textbook Reference:** T2 (Chapter 12), T4 (Chapter 7)

---

### Week 17: Unit 6 - State Management
**Lecture Topics:**
- State management on stateless HTTP
- Server-side strategies:
  - Session State
  - TempData
  - HttpContext
  - Cache
- Client-side strategies:
  - Cookies
  - Query Strings
  - Hidden Fields

**Lab Work:**
- Lab 22: Implement session and TempData
- Lab 23: Work with cookies and query strings

**Study Materials:**
- State management decision flowchart
- Comparison of state management techniques
- Security considerations for each approach

**Textbook Reference:** T2 (Chapter 14)

---

### Week 18: Unit 7 - Client-side Development
**Lecture Topics:**
- Common client-side web technologies (HTML, CSS, JavaScript)
- jQuery library basics
- Forms and client-side validation
- Introduction to Single Page Applications (SPA)
- SPA Frameworks: Angular, React overview

**Lab Work:**
- Lab 24: jQuery for DOM manipulation and AJAX calls
- Lab 25: Client-side form validation

**Study Materials:**
- jQuery selectors and methods reference
- JavaScript validation patterns
- SPA vs traditional web apps comparison

**Textbook Reference:** T2 (Chapter 16), T3 (Chapter 8)

**Assessment:** Assignment 3 - Database Integration (Covers Units 5-7, CLO4, CLO5)

---

### Week 19-20: Unit 8 - Securing Applications
**Lecture Topics:**
- Authentication concepts
- ASP.NET Core Identity framework
- Adding authentication to applications
- Identity service configurations
- Authorization: Roles, Claims, Policies
- Securing Controllers and Action Methods
- [Authorize] attribute and custom authorization

**Common Vulnerabilities:**
- Cross-site Scripting (XSS) attacks
- SQL Injection attacks
- Cross-site Request Forgery (CSRF)
- Open Redirect Attacks

**Lab Work:**
- Lab 26: Implement ASP.NET Core Identity
- Lab 27: Role-based and policy-based authorization
- Lab 28: Security vulnerability testing and mitigation

**Study Materials:**
- Authentication vs Authorization explanation
- Identity framework architecture
- OWASP Top 10 security vulnerabilities
- Security best practices checklist

**Textbook Reference:** T2 (Chapter 15), T4 (Chapter 9)

---

### Week 21: Unit 9 - Hosting and Deployment
**Lecture Topics:**
- App Servers and Hosting models
- IIS, Nginx, Apache web servers
- ASP.NET Core Module
- Kestrel web server
- Docker and Containerization basics
- Publishing applications
- Deploying to Azure cloud

**Lab Work:**
- Lab 29: Publish application to IIS/Kestrel
- Lab 30: Docker containerization of ASP.NET Core app
- Lab 31: Deploy to Azure App Service

**Study Materials:**
- Hosting options comparison
- Deployment checklist
- Docker basics for .NET developers
- Azure deployment step-by-step guide

**Textbook Reference:** T2 (Chapter 17), T4 (Chapter 10)

**Assessment:** Assignment 4 - Complete Web Application with Security (Covers Units 8-9, CLO6, CLO7)

---

### Week 22: Revision and Final Project
**Activities:**
- Comprehensive syllabus revision
- Final project: E-commerce or CMS application covering all concepts
- Practice exam questions from all units
- Doubt clearing sessions

**Assessment:** Final Practical Examination

---

## Assessment Plan

### Internal Assessment (20 Marks)
1. **Assignment 1:** C# Programming fundamentals (5 marks) - Week 7
2. **Assignment 2:** ASP.NET Core MVC application (5 marks) - Week 14
3. **Mid-term Examination:** Written test covering Units 1-3 (10 marks) - Week 13

### Practical Assessment (20 Marks)
1. **Assignment 3:** Database integration project (5 marks) - Week 18
2. **Assignment 4:** Secure web application (5 marks) - Week 21
3. **Final Lab Exam:** Complete application development (10 marks) - Week 22

### External Theory Examination (60 Marks)
- Comprehensive exam covering all 9 units
- Question pattern: Section A (Compulsory), Section B (Choose any 4 from 6)
- Covers CLO1 through CLO7

---

## Question Pattern (External Exam - 60 Marks)

**Section A: (10×2=20 marks) - Compulsory**
- Short answer questions covering all units

**Section B: (4×10=40 marks) - Answer any FOUR**
- Long answer questions with options from each unit
- Mix of theoretical concepts and code-based questions

---

## Laboratory Work Summary

**Total Lab Sessions:** 31 labs covering:
1. C# basics and advanced features (Labs 1-8)
2. ASP.NET Core fundamentals (Labs 9-12)
3. MVC development (Labs 13-18)
4. Database operations (Labs 19-21)
5. State management and client-side (Labs 22-25)
6. Security implementation (Labs 26-28)
7. Deployment and hosting (Labs 29-31)

**Lab Assessment Criteria:**
- Code quality and functionality (40%)
- Adherence to best practices (20%)
- Documentation and comments (15%)
- Problem-solving approach (15%)
- Timely submission (10%)

---

## Recommended Study Resources

### Essential Reading
- Textbooks T1-T4 (as prescribed in syllabus)
- Microsoft official ASP.NET Core documentation
- C# programming guide

### Online Resources
- Microsoft Learn platform
- Pluralsight ASP.NET Core courses
- GitHub sample projects

### Tools Required
- Visual Studio 2019/2022 or VS Code
- .NET Core SDK 3.1 or higher
- SQL Server Express or SQLite
- Postman for API testing
- Git for version control

---

## Course Completion Checklist for Students

### Unit 1: Language Preliminaries
- ☐ Understand .NET architecture and compilation process
- ☐ Master C# OOP concepts
- ☐ Write programs using delegates and events
- ☐ Use LINQ for data queries
- ☐ Implement async/await patterns

### Unit 2: Introduction to ASP.NET
- ☐ Differentiate .NET frameworks
- ☐ Understand .NET Core architecture
- ☐ Use .NET CLI commands

### Unit 3: HTTP and ASP.NET Core
- ☐ Explain HTTP protocol
- ☐ Understand MVC pattern
- ☐ Know ASP.NET Core project structure

### Unit 4: Creating ASP.NET Core MVC
- ☐ Create controllers and actions
- ☐ Work with Razor views
- ☐ Implement model validation
- ☐ Configure routing
- ☐ Build Web APIs
- ☐ Apply dependency injection

### Unit 5: Working with Database
- ☐ Use ADO.NET for database operations
- ☐ Implement EF Core in applications
- ☐ Perform CRUD operations
- ☐ Create and apply migrations

### Unit 6: State Management
- ☐ Implement session state
- ☐ Use TempData and cookies
- ☐ Choose appropriate state management strategy

### Unit 7: Client-side Development
- ☐ Use jQuery for DOM manipulation
- ☐ Implement client-side validation
- ☐ Understand SPA frameworks basics

### Unit 8: Securing Applications
- ☐ Implement ASP.NET Core Identity
- ☐ Add authentication and authorization
- ☐ Secure against common vulnerabilities
- ☐ Apply security best practices

### Unit 9: Hosting and Deployment
- ☐ Publish applications to IIS/Kestrel
- ☐ Containerize with Docker
- ☐ Deploy to Azure cloud

---

## Important Notes for Students

1. **100% syllabus coverage** is essential for exam preparation
2. All **lab assignments must be completed** as they constitute 20% of total marks
3. Focus on **high-weightage units** (Units 1, 4, 5) for better exam preparation
4. Practice **coding** regularly - this is a practical-oriented course
5. Refer to **prescribed textbooks** for in-depth understanding
6. **Attend all labs** - practical skills are crucial
7. Start **final project early** to manage time effectively

---

**Prepared by:** Senior Professor, Computer Science Department  
**Syllabus Reference:** CSC367 - NET Centric Computing, Semester VI  
**Academic Year:** 2024-2025
