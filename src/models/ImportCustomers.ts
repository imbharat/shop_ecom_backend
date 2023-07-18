type ImportCutomers =
  | {
      customer_name: string;
    } & {
      business_id: number;
      created_by: number;
      modified_by: number;
    };

export default ImportCutomers;
