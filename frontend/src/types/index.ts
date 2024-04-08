export type UserResponse = {
  user: {
    _id: string;
    name: string;
    email: string;
    lembretes: Lembrete[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
  token: string;
  lembretes: Lembrete[];
  setLembretes: React.Dispatch<React.SetStateAction<any>>;
};

export type User = {
  data: {
    _id: string;
    name: string;
    email: string;
    lembretes: Lembrete[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
};

export type Lembrete = {
  annotationId: string;
  annotationName: string;
  annotationDate: string;
};

export type ILembreteContainer = {
  setLembretes: React.Dispatch<React.SetStateAction<any>>;
}
