import React from 'react';

interface TaxonomyLevel {
  level: string;
  description: string;
  verbs: string[];
  courseLevel: string;
}

const taxonomyData: TaxonomyLevel[] = [
  {
    level: "Remember",
    description: "Recall facts and basic concepts",
    verbs: ["Define", "Duplicate", "List", "Memorize", "Recall", "Repeat", "State", "Name", "Recognize", "Retrieve"],
    courseLevel: "Introductory (100-level)"
  },
  {
    level: "Understand",
    description: "Explain ideas or concepts",
    verbs: ["Classify", "Describe", "Discuss", "Explain", "Identify", "Locate", "Recognize", "Report", "Select", "Translate", "Paraphrase"],
    courseLevel: "Introductory (100-level)"
  },
  {
    level: "Apply",
    description: "Use information in new situations",
    verbs: ["Execute", "Implement", "Solve", "Use", "Demonstrate", "Interpret", "Operate", "Schedule", "Sketch", "Apply"],
    courseLevel: "Intermediate (200-level)"
  },
  {
    level: "Analyze",
    description: "Draw connections among ideas",
    verbs: ["Differentiate", "Organize", "Relate", "Compare", "Contrast", "Distinguish", "Examine", "Experiment", "Question", "Test"],
    courseLevel: "Intermediate (200-level), Advanced (300-level)"
  },
  {
    level: "Evaluate",
    description: "Justify a stand or decision",
    verbs: ["Appraise", "Argue", "Defend", "Judge", "Select", "Support", "Value", "Critique", "Weigh", "Evaluate"],
    courseLevel: "Advanced (300-level), Graduate (400-500 level)"
  },
  {
    level: "Create",
    description: "Produce new or original work",
    verbs: ["Design", "Assemble", "Construct", "Conjecture", "Develop", "Formulate", "Author", "Investigate", "Create", "Generate"],
    courseLevel: "Advanced (300-level), Graduate (400-500 level)"
  }
];

const BloomsTaxonomy: React.FC = () => {
  return (
    <div className="page-container">
      <h2>Bloom's Taxonomy</h2>
      <p>
        Bloom's Taxonomy is a hierarchical framework used to classify educational learning objectives 
        into levels of complexity and specificity. It was first introduced in 1956 by Benjamin Bloom 
        and later revised in 2001. The taxonomy helps instructors design appropriate learning objectives
        for their courses.
      </p>
      
      <h3>Why Use Bloom's Taxonomy?</h3>
      <ul>
        <li>Creates clear, measurable learning objectives</li>
        <li>Helps align assessments with learning goals</li>
        <li>Ensures appropriate cognitive challenge for course levels</li>
        <li>Provides a common language for educational objectives</li>
      </ul>
      
      <h3>The Taxonomy Levels</h3>
      <p>
        The revised Bloom's Taxonomy consists of six cognitive levels, arranged from lower-order thinking skills
        to higher-order thinking skills. Higher course levels typically engage with higher cognitive levels.
      </p>
      
      {taxonomyData.map((level, index) => (
        <div key={index} className="taxonomy-level">
          <h3>{level.level}</h3>
          <p><strong>Description:</strong> {level.description}</p>
          <p><strong>Typical Course Level:</strong> {level.courseLevel}</p>
          <p><strong>Action Verbs:</strong></p>
          <div className="verb-chips">
            {level.verbs.map((verb, i) => (
              <span key={i} className="verb-chip">{verb}</span>
            ))}
          </div>
        </div>
      ))}
      
      <h3>Crafting Effective Learning Objectives</h3>
      <p>
        An effective learning objective follows this formula:
      </p>
      <p style={{ fontStyle: 'italic' }}>
        "By the end of this course/module, students will be able to [Action Verb] + [Subject Content] + [Modifiers]"
      </p>
      <p>
        For example: "By the end of this module, students will be able to analyze the impacts of climate change on marine ecosystems through case study examination."
      </p>
    </div>
  );
};

export default BloomsTaxonomy;
