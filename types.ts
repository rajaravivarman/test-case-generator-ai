export interface Project {
  name: string;
  description: string;
}

export interface Requirement {
  id: string;
  text: string;
}

export interface TestCase {
  id: string;
  title: string;
  description: string;
  steps: string[];
  expectedResults: string;
  requirementId: string;
  status?: 'generated' | 'approved' | 'rejected';
}

export interface TraceabilityData {
    reqId: string;
    testCases: number;
}
