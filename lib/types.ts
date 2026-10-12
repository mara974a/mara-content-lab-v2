export interface ProjectRequestInput {
  name: string;
  email: string;
  role: string;
  company?: string;
  website?: string;
  sourceUrl: string;
  audience: string;
  goal: string;
  notes?: string;
  consentTerms: boolean;
  marketingOptIn?: boolean;
}

export interface ProjectRequestRecord extends ProjectRequestInput {
  id: string;
  created_at: string;
  updated_at: string;
  status: "new" | "reviewing" | "accepted" | "declined" | "in_progress" | "delivered" | "archived";
  terms_version: string;
  consented_at: string;
  user_agent?: string;
}

export interface WaitlistInput {
  email: string;
  consent: boolean;
}

export interface WaitlistRecord {
  id: string;
  created_at: string;
  email: string;
  consent: boolean;
  consent_text: string;
  source: string;
}

export interface FeedbackInput {
  name: string;
  email: string;
  rating: number;
  mostUseful: string;
  improve: string;
  postResult?: string;
  allowQuote: boolean;
  displayName?: string;
}

export interface ActionResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  id?: string;
}
