export interface OrganizerRequest {
  docId?: string;
  firstName: string;
  lastName: string;
  uid: string;
  topic: string;
  title: string;
  email: string;
  companyNumber: string;
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyWebsite?: string;
  companyDescription: string;
  motivation: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  adminId?: string;
}
