import React from 'react';

interface ExampleObjective {
  subject: string;
  courseLevel: string;
  bloomsLevel: string;
  objectives: string[];
}

const exampleData: ExampleObjective[] = [
  {
    subject: "Computer Science",
    courseLevel: "100-level (Introductory)",
    bloomsLevel: "Remember/Understand",
    objectives: [
      "Define basic programming concepts such as variables, loops, and conditionals.",
      "Explain how data types are used in program construction.",
      "Describe the difference between compiled and interpreted languages.",
      "Recognize common programming patterns in source code examples."
    ]
  },
  {
    subject: "Computer Science",
    courseLevel: "200-level (Intermediate)",
    bloomsLevel: "Apply/Analyze",
    objectives: [
      "Implement data structures such as linked lists, stacks, and queues to solve programming problems.",
      "Compare the efficiency of different sorting algorithms using Big O notation.",
      "Debug programs using appropriate testing and debugging techniques.",
      "Differentiate between various object-oriented programming concepts."
    ]
  },
  {
    subject: "Computer Science",
    courseLevel: "300-level (Advanced)",
    bloomsLevel: "Analyze/Evaluate/Create",
    objectives: [
      "Design complex software systems using appropriate design patterns and architectures.",
      "Evaluate the security implications of various implementation choices.",
      "Create specialized algorithms to address complex computational problems.",
      "Critique existing codebases for maintainability, extensibility, and performance."
    ]
  },
  {
    subject: "Biology",
    courseLevel: "100-level (Introductory)",
    bloomsLevel: "Remember/Understand",
    objectives: [
      "Identify the major organelles in eukaryotic cells and describe their functions.",
      "Explain the basic principles of Mendelian genetics.",
      "Recognize the different levels of biological organization from molecules to ecosystems.",
      "Describe the process of natural selection and its role in evolution."
    ]
  },
  {
    subject: "Biology",
    courseLevel: "300-level (Advanced)",
    bloomsLevel: "Analyze/Evaluate/Create",
    objectives: [
      "Design experimental protocols to test hypotheses about gene expression.",
      "Evaluate competing theories about the origins of specific adaptations.",
      "Analyze complex ecological interactions using appropriate statistical methods.",
      "Formulate novel hypotheses based on analysis of current research in the field."
    ]
  },
  {
    subject: "Psychology",
    courseLevel: "200-level (Intermediate)",
    bloomsLevel: "Apply/Analyze",
    objectives: [
      "Apply psychological theories to explain everyday human behaviors.",
      "Analyze experimental designs for potential confounding variables.",
      "Interpret statistical results from psychological studies.",
      "Compare and contrast major perspectives in psychology."
    ]
  }
];

const ExampleObjectives: React.FC = () => {
  // Group examples by subject
  const subjectGroups = exampleData.reduce((acc, example) => {
    if (!acc[example.subject]) {
      acc[example.subject] = [];
    }
    acc[example.subject].push(example);
    return acc;
  }, {} as Record<string, ExampleObjective[]>);

  return (
    <div className="page-container">
      <h2>Example Learning Objectives</h2>
      <p>
        Below are examples of learning objectives across different subjects and course levels. 
        Note how the cognitive complexity increases with higher course levels, in accordance 
        with Bloom's Taxonomy.
      </p>
      
      {Object.entries(subjectGroups).map(([subject, examples]) => (
        <div key={subject} className="example-section">
          <h3>{subject}</h3>
          
          {examples.map((example, index) => (
            <div key={index} className="example-card">
              <h4>{example.courseLevel} - {example.bloomsLevel}</h4>
              <ul>
                {example.objectives.map((objective, i) => (
                  <li key={i}>{objective}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      
      <div className="tips-section">
        <h3>Tips for Writing Effective Objectives</h3>
        <ul>
          <li>Use specific action verbs that match the desired cognitive level</li>
          <li>Focus on what students will do, not what you will teach</li>
          <li>Make objectives measurable and observable</li>
          <li>Ensure objectives align with assessments and teaching activities</li>
          <li>Keep statements concise and focused on a single outcome</li>
        </ul>
      </div>
    </div>
  );
};

export default ExampleObjectives;
