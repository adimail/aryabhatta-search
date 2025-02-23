export interface TestQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface TestConfig {
  id: string;
  subject: string;
  topic: string;
  description: string;
  duration: number; // in minutes
  questions: TestQuestion[];
  difficulty: "Easy" | "Medium" | "Hard";
  imageUrl?: string;
}

export const testsConfig: TestConfig[] = [
  {
    id: "math-linear-algebra",
    subject: "Mathematics",
    topic: "Linear Algebra",
    description:
      "Test your understanding of vectors, matrices, and linear transformations",
    duration: 30,
    difficulty: "Medium",
    imageUrl: "/images/math.jpg",
    questions: [
      {
        id: "la-q1",
        question: "What is the determinant of a 2x2 matrix [[a, b], [c, d]]?",
        options: ["a + d", "a * d", "ad - bc", "ac + bd"],
        correctAnswer: "ad - bc",
        explanation: "The determinant of a 2x2 matrix is calculated as ad - bc",
      },
      {
        id: "la-q2",
        question:
          "Which of the following is a property of orthogonal matrices?",
        options: [
          "Their inverse equals their transpose",
          "Their determinant is always 1",
          "They must be square matrices",
          "They must be symmetric",
        ],
        correctAnswer: "Their inverse equals their transpose",
        explanation: "An orthogonal matrix Q satisfies the property Q^T = Q^-1",
      },
      {
        id: "la-q3",
        question: "What is the rank of a zero matrix?",
        options: ["0", "1", "Depends on the size", "Infinity"],
        correctAnswer: "0",
        explanation: "The rank of a zero matrix is always 0",
      },
      {
        id: "la-q4",
        question: "What is the identity matrix for a 3x3 matrix?",
        options: [
          "[[1, 0, 0], [0, 1, 0], [0, 0, 1]]",
          "[[1, 1, 1], [1, 1, 1], [1, 1, 1]]",
          "[[0, 0, 0], [0, 0, 0], [0, 0, 0]]",
          "[[1, 0, 0], [0, 0, 1], [0, 1, 0]]",
        ],
        correctAnswer: "[[1, 0, 0], [0, 1, 0], [0, 0, 1]]",
        explanation:
          "The identity matrix has 1's on the diagonal and 0's elsewhere",
      },
      {
        id: "la-q5",
        question: "What is the dot product of vectors [1, 2] and [3, 4]?",
        options: ["5", "7", "11", "13"],
        correctAnswer: "11",
        explanation: "The dot product is calculated as 1*3 + 2*4 = 11",
      },
      {
        id: "la-q6",
        question: "What is the transpose of the matrix [[1, 2], [3, 4]]?",
        options: [
          "[[1, 3], [2, 4]]",
          "[[1, 2], [3, 4]]",
          "[[4, 3], [2, 1]]",
          "[[2, 1], [4, 3]]",
        ],
        correctAnswer: "[[1, 3], [2, 4]]",
        explanation: "The transpose of a matrix swaps rows with columns",
      },
      {
        id: "la-q7",
        question: "What is the trace of the matrix [[1, 2], [3, 4]]?",
        options: ["1", "4", "5", "6"],
        correctAnswer: "5",
        explanation:
          "The trace of a matrix is the sum of its diagonal elements",
      },
      {
        id: "la-q8",
        question:
          "Which of the following is a scalar multiple of the vector [1, 2]?",
        options: ["[2, 4]", "[1, 1]", "[2, 1]", "[3, 5]"],
        correctAnswer: "[2, 4]",
        explanation:
          "A scalar multiple of a vector multiplies each component by a scalar",
      },
      {
        id: "la-q9",
        question:
          "What is the result of multiplying the matrices [[1, 2], [3, 4]] and [[2, 0], [1, 1]]?",
        options: [
          "[[4, 2], [10, 4]]",
          "[[2, 1], [4, 3]]",
          "[[3, 1], [6, 2]]",
          "[[1, 0], [2, 1]]",
        ],
        correctAnswer: "[[4, 2], [10, 4]]",
        explanation:
          "Matrix multiplication is performed by multiplying rows by columns",
      },
      {
        id: "la-q10",
        question: "What is the inverse of the matrix [[1, 0], [0, 1]]?",
        options: [
          "[[1, 0], [0, 1]]",
          "[[0, 1], [1, 0]]",
          "[[1, 1], [1, 1]]",
          "[[0, 0], [0, 0]]",
        ],
        correctAnswer: "[[1, 0], [0, 1]]",
        explanation:
          "The inverse of the identity matrix is the identity matrix itself",
      },
    ],
  },
  {
    id: "science-gravity",
    subject: "Science",
    topic: "Gravity",
    description: "Explore gravitational forces and their effects",
    duration: 25,
    difficulty: "Medium",
    imageUrl: "/images/physics.jpg",
    questions: [
      {
        id: "grav-q1",
        question:
          "What is the acceleration due to gravity on Earth (approximate value)?",
        options: ["5.8 m/s²", "7.8 m/s²", "9.8 m/s²", "11.8 m/s²"],
        correctAnswer: "9.8 m/s²",
        explanation:
          "The acceleration due to gravity on Earth is approximately 9.8 meters per second squared",
      },
      {
        id: "grav-q2",
        question:
          "According to Newton's law of universal gravitation, gravitational force is:",
        options: [
          "Directly proportional to the distance",
          "Inversely proportional to the distance",
          "Directly proportional to the square of the distance",
          "Inversely proportional to the square of the distance",
        ],
        correctAnswer: "Inversely proportional to the square of the distance",
        explanation:
          "Gravitational force follows an inverse square relationship with distance",
      },
      {
        id: "grav-q3",
        question:
          "What is the formula for gravitational force between two masses?",
        options: [
          "F = G * m1 * m2 / r²",
          "F = G * m1 * m2 * r",
          "F = G * m1 / m2 * r²",
          "F = G * m1 * m2 / r",
        ],
        correctAnswer: "F = G * m1 * m2 / r²",
        explanation:
          "The formula for gravitational force is F = G * m1 * m2 / r²",
      },
      {
        id: "grav-q4",
        question:
          "What is the gravitational constant (G) approximately equal to?",
        options: [
          "6.67430 × 10^-11 m³ kg^-1 s^-2",
          "9.8 m/s²",
          "1.67 × 10^-27 kg",
          "3.00 × 10^8 m/s",
        ],
        correctAnswer: "6.67430 × 10^-11 m³ kg^-1 s^-2",
        explanation:
          "The gravitational constant G is approximately 6.67430 × 10^-11 m³ kg^-1 s^-2",
      },
      {
        id: "grav-q5",
        question: "What is the escape velocity from Earth?",
        options: ["11.2 km/s", "7.8 km/s", "9.8 km/s", "5.6 km/s"],
        correctAnswer: "11.2 km/s",
        explanation:
          "The escape velocity from Earth is approximately 11.2 km/s",
      },
      {
        id: "grav-q6",
        question: "What is the gravitational potential energy formula?",
        options: [
          "U = -G * m1 * m2 / r",
          "U = G * m1 * m2 * r",
          "U = -G * m1 / m2 * r",
          "U = G * m1 * m2 / r²",
        ],
        correctAnswer: "U = -G * m1 * m2 / r",
        explanation:
          "The gravitational potential energy formula is U = -G * m1 * m2 / r",
      },
      {
        id: "grav-q7",
        question:
          "What is the weight of an object on the moon compared to its weight on Earth?",
        options: ["Same", "1/6th", "1/3rd", "1/2"],
        correctAnswer: "1/6th",
        explanation:
          "The weight of an object on the moon is 1/6th of its weight on Earth",
      },
      {
        id: "grav-q8",
        question: "What is the shape of the orbit of planets around the sun?",
        options: ["Circle", "Ellipse", "Parabola", "Hyperbola"],
        correctAnswer: "Ellipse",
        explanation: "The orbits of planets around the sun are elliptical",
      },
      {
        id: "grav-q9",
        question: "What is the force that keeps satellites in orbit?",
        options: ["Gravity", "Magnetism", "Electricity", "Friction"],
        correctAnswer: "Gravity",
        explanation: "Gravity is the force that keeps satellites in orbit",
      },
      {
        id: "grav-q10",
        question:
          "What is the effect of altitude on the acceleration due to gravity?",
        options: ["Increases", "Decreases", "Remains the same", "Becomes zero"],
        correctAnswer: "Decreases",
        explanation:
          "The acceleration due to gravity decreases with increasing altitude",
      },
    ],
  },
  {
    id: "cs-operating-systems",
    subject: "Computer Science",
    topic: "Operating Systems",
    description: "Test your knowledge of OS concepts and process management",
    duration: 35,
    difficulty: "Hard",
    imageUrl: "/images/cs.jpg",
    questions: [
      {
        id: "os-q1",
        question: "What is a deadlock in operating systems?",
        options: [
          "A process that never completes",
          "A situation where two or more processes are unable to proceed",
          "A process that uses too much CPU",
          "A system crash",
        ],
        correctAnswer:
          "A situation where two or more processes are unable to proceed",
        explanation:
          "Deadlock occurs when processes are waiting for resources held by other processes",
      },
      {
        id: "os-q2",
        question:
          "Which scheduling algorithm has the shortest completion time?",
        options: [
          "First Come First Serve",
          "Shortest Job First",
          "Round Robin",
          "Priority Scheduling",
        ],
        correctAnswer: "Shortest Job First",
        explanation:
          "SJF minimizes average waiting time by executing shortest jobs first",
      },
      {
        id: "os-q3",
        question: "What is a race condition in operating systems?",
        options: [
          "A situation where two processes access shared data concurrently",
          "A situation where two processes execute in parallel",
          "A situation where two processes are in a deadlock",
          "A situation where a process is waiting for I/O",
        ],
        correctAnswer:
          "A situation where two processes access shared data concurrently",
        explanation:
          "A race condition occurs when the system's behavior depends on the sequence or timing of uncontrollable events",
      },
      {
        id: "os-q4",
        question: "What is the purpose of a semaphore in operating systems?",
        options: [
          "To manage concurrent access to shared resources",
          "To schedule processes",
          "To allocate memory",
          "To handle interrupts",
        ],
        correctAnswer: "To manage concurrent access to shared resources",
        explanation:
          "A semaphore is used to control access to a common resource by multiple processes",
      },
      {
        id: "os-q5",
        question: "What is a context switch in operating systems?",
        options: [
          "Switching the CPU from one process to another",
          "Switching from user mode to kernel mode",
          "Switching from one thread to another within the same process",
          "Switching from one CPU to another",
        ],
        correctAnswer: "Switching the CPU from one process to another",
        explanation:
          "A context switch involves storing the state of a process and loading the state of another",
      },
      {
        id: "os-q6",
        question: "What is the purpose of paging in operating systems?",
        options: [
          "To divide memory into fixed-size blocks",
          "To allocate memory dynamically",
          "To manage virtual memory",
          "To handle interrupts",
        ],
        correctAnswer: "To manage virtual memory",
        explanation:
          "Paging is a memory management scheme that eliminates the need for contiguous allocation of physical memory",
      },
      {
        id: "os-q7",
        question: "What is a kernel in operating systems?",
        options: [
          "The core part of the operating system",
          "A user application",
          "A hardware device",
          "A system call",
        ],
        correctAnswer: "The core part of the operating system",
        explanation:
          "The kernel manages system resources and hardware communication",
      },
      {
        id: "os-q8",
        question: "What is the purpose of a file system in operating systems?",
        options: [
          "To manage files on disk",
          "To manage processes",
          "To manage memory",
          "To manage network communication",
        ],
        correctAnswer: "To manage files on disk",
        explanation: "A file system controls how data is stored and retrieved",
      },
      {
        id: "os-q9",
        question: "What is a process in operating systems?",
        options: [
          "An instance of a program in execution",
          "A hardware device",
          "A system call",
          "A thread",
        ],
        correctAnswer: "An instance of a program in execution",
        explanation: "A process is an active entity that executes a program",
      },
      {
        id: "os-q10",
        question: "What is the purpose of a cache in operating systems?",
        options: [
          "To store frequently accessed data",
          "To manage processes",
          "To allocate memory",
          "To handle interrupts",
        ],
        correctAnswer: "To store frequently accessed data",
        explanation:
          "A cache is a smaller, faster memory that stores copies of frequently accessed data",
      },
    ],
  },
  {
    id: "dbms-sql",
    subject: "DBMS",
    topic: "SQL/PostgreSQL",
    description: "Practice database queries and management concepts",
    duration: 40,
    difficulty: "Hard",
    imageUrl: "/images/db.jpg",
    questions: [
      {
        id: "sql-q1",
        question:
          "What is the difference between HAVING and WHERE clause in SQL?",
        options: [
          "They are the same",
          "WHERE is used before GROUP BY, HAVING is used after",
          "HAVING is used before GROUP BY, WHERE is used after",
          "They cannot be used together",
        ],
        correctAnswer: "WHERE is used before GROUP BY, HAVING is used after",
        explanation:
          "WHERE filters individual rows before grouping, HAVING filters groups after GROUP BY",
      },
      {
        id: "sql-q2",
        question: "Which of the following is not a type of JOIN in SQL?",
        options: ["INNER JOIN", "LEFT JOIN", "PARALLEL JOIN", "CROSS JOIN"],
        correctAnswer: "PARALLEL JOIN",
        explanation:
          "PARALLEL JOIN is not a standard SQL JOIN type. The standard types are INNER, LEFT, RIGHT, FULL, and CROSS JOIN",
      },
      {
        id: "sql-q3",
        question: "What is a primary key in SQL?",
        options: [
          "A unique identifier for a record",
          "A foreign key",
          "A non-unique index",
          "A composite key",
        ],
        correctAnswer: "A unique identifier for a record",
        explanation: "A primary key uniquely identifies each record in a table",
      },
      {
        id: "sql-q4",
        question: "What is the purpose of the SELECT statement in SQL?",
        options: [
          "To retrieve data from a database",
          "To insert data into a database",
          "To update data in a database",
          "To delete data from a database",
        ],
        correctAnswer: "To retrieve data from a database",
        explanation:
          "The SELECT statement is used to query data from a database",
      },
      {
        id: "sql-q5",
        question: "What is a foreign key in SQL?",
        options: [
          "A field that links two tables together",
          "A unique identifier for a record",
          "A non-unique index",
          "A composite key",
        ],
        correctAnswer: "A field that links two tables together",
        explanation:
          "A foreign key is a field in one table that uniquely identifies a row in another table",
      },
      {
        id: "sql-q6",
        question: "What is the purpose of the INSERT statement in SQL?",
        options: [
          "To add new data to a database",
          "To retrieve data from a database",
          "To update data in a database",
          "To delete data from a database",
        ],
        correctAnswer: "To add new data to a database",
        explanation: "The INSERT statement is used to add new rows to a table",
      },
      {
        id: "sql-q7",
        question: "What is the purpose of the UPDATE statement in SQL?",
        options: [
          "To modify existing data in a database",
          "To retrieve data from a database",
          "To add new data to a database",
          "To delete data from a database",
        ],
        correctAnswer: "To modify existing data in a database",
        explanation:
          "The UPDATE statement is used to modify existing records in a table",
      },
      {
        id: "sql-q8",
        question: "What is the purpose of the DELETE statement in SQL?",
        options: [
          "To remove data from a database",
          "To retrieve data from a database",
          "To add new data to a database",
          "To update data in a database",
        ],
        correctAnswer: "To remove data from a database",
        explanation: "The DELETE statement is used to remove rows from a table",
      },
      {
        id: "sql-q9",
        question: "What is a view in SQL?",
        options: [
          "A virtual table based on the result-set of an SQL statement",
          "A physical table",
          "A temporary table",
          "A stored procedure",
        ],
        correctAnswer:
          "A virtual table based on the result-set of an SQL statement",
        explanation:
          "A view is a result set of a query that can be referenced as a table",
      },
      {
        id: "sql-q10",
        question: "What is an index in SQL?",
        options: [
          "A data structure that improves the speed of data retrieval",
          "A primary key",
          "A foreign key",
          "A view",
        ],
        correctAnswer:
          "A data structure that improves the speed of data retrieval",
        explanation:
          "An index is used to quickly locate data without having to search every row in a table",
      },
    ],
  },
];
