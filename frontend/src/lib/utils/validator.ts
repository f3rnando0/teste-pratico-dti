import { SafeParseReturnType, z } from "zod";

export const validate = (
  field: string,
  value: string
): SafeParseReturnType<string, string> => {
  switch (field) {
    case "name": {
      const schema = z
        .string()
        .min(3, "Nome precisa ter mais que 3 caracteres.")
        .max(32, "Nome precisa ter menos que 32 caracteres.");
      const isValid = schema.safeParse(value);

      return isValid;
    }
    case "email": {
      const schema = z.string().email("Email inválido.");
      const isValid = schema.safeParse(value);

      return isValid;
    }
    case "password": {
      const schema = z
        .string()
        .min(6, "Sua senha deve ter pelo menos 6 caracteres.");
      const isValid = schema.safeParse(value);

      return isValid;
    }
    default: {
      const schema = z.string();
      const isValid = schema.safeParse(value);

      return isValid;
    }
  }
};
