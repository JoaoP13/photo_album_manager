interface Company {
  id: number;
  name: string;
  catchPhrase: string;
  bs: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export { Company };
